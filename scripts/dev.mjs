#!/usr/bin/env node
import { spawn } from 'child_process';
import fs from 'fs';
import { createRequire } from 'module';
import net from 'net';
import path from 'path';

function getArg(name) {
  const idx = process.argv.findIndex((a) => a === name || a.startsWith(`${name}=`));
  if (idx === -1) return undefined;
  const val = process.argv[idx].includes('=')
    ? process.argv[idx].split('=')[1]
    : process.argv[idx + 1];
  return val;
}

function getForwardArgs() {
  // Forward all args except our handled port flags and their values
  const args = [];
  for (let i = 2; i < process.argv.length; i += 1) {
    const a = process.argv[i];
    if (a === '--port' || a === '-p' || a.startsWith('--port=') || a.startsWith('-p=')) {
      // skip value if separate
      if (a === '--port' || a === '-p') i += 1;
      continue;
    }
    args.push(a);
  }
  return args;
}

async function findFreePort() {
  return await new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on('error', reject);
    server.listen(0, () => {
      const address = server.address();
      const port = typeof address === 'object' && address ? address.port : 0;
      server.close(() => resolve(port));
    });
  });
}

function loadDotEnvEnvVars() {
  const envPath = path.join(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) return;
  try {
    const content = fs.readFileSync(envPath, 'utf8');
    for (const line of content.split(/\r?\n/)) {
      if (!line || line.trim().startsWith('#')) continue;
      const idx = line.indexOf('=');
      if (idx === -1) continue;
      const key = line.slice(0, idx).trim();
      let value = line.slice(idx + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!(key in process.env)) {
        process.env[key] = value;
      }
    }
  } catch {
    // ignore .env parse errors
  }
}

async function main() {
  // Ensure .env values are loaded so PORT in .env is respected
  loadDotEnvEnvVars();
  const argPort = getArg('--port') || getArg('-p');
  const envPort = process.env.PORT;
  const port = Number(argPort || envPort) || (await findFreePort());
  const forwardArgs = getForwardArgs();

  // Best-effort cleanup for Windows file lock issues on .next/trace
  try {
    const tracePath = path.join(process.cwd(), '.next', 'trace');
    fs.rmSync(tracePath, { force: true });
  } catch {}

  // Resolve local Next.js CLI entry instead of relying on a package manager binary
  const require = createRequire(import.meta.url);
  const nextPkgJsonPath = path.dirname(require.resolve('next/package.json'));
  const nextCliPath = path.join(nextPkgJsonPath, 'dist', 'bin', 'next');

  const child = spawn(process.execPath, [nextCliPath, 'dev', '-p', String(port), ...forwardArgs], {
    stdio: 'inherit',
    env: { ...process.env, PORT: String(port) },
  });

  child.on('exit', (code) => process.exit(code ?? 0));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
