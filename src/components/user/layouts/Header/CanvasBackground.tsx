'use client';

import { useEffect, useRef } from 'react';

interface CherryBlossom {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
  colorRgba: string;
}

interface SnowFlake {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

const CherryBlossomCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const blossomsRef = useRef<CherryBlossom[]>([]);
  const snowflakesRef = useRef<SnowFlake[]>([]);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking for hover effect
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      mouseRef.current = {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // Initialize cherry blossoms
    const initBlossoms = () => {
      blossomsRef.current = [];
      // Tối ưu: Giảm số lượng hoa anh đào để di chuyển tự do
      const blossomCount = Math.floor((canvas.width * canvas.height) / 50000);

      for (let i = 0; i < blossomCount; i++) {
        // Màu hoa anh đào: hồng nhạt đến hồng đậm với độ ngẫu nhiên cao hơn
        const hue = Math.random() * 50 + 300; // 300-350 (mở rộng phạm vi màu)
        const saturation = Math.random() * 60 + 30; // 30-90% (tăng độ ngẫu nhiên)
        const lightness = Math.random() * 40 + 60; // 60-100% (tăng độ ngẫu nhiên)

        blossomsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1.2, // Di chuyển chậm ngang
          vy: (Math.random() - 0.5) * 1.2, // Di chuyển chậm dọc (lên xuống)
          size: Math.random() * 12 + 3,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.05,
          opacity: Math.random() * 0.6 + 0.2,
          color: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
          colorRgba: `hsla(${hue}, ${saturation}%, ${lightness}%, 0.15)`,
        });
      }
    };

    // Initialize snowflakes
    const initSnowflakes = () => {
      snowflakesRef.current = [];
      // Tối ưu: Giảm số lượng tuyết để di chuyển tự do
      const snowflakeCount = Math.floor((canvas.width * canvas.height) / 60000);

      for (let i = 0; i < snowflakeCount; i++) {
        snowflakesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.8, // Di chuyển chậm ngang
          vy: (Math.random() - 0.5) * 0.8, // Di chuyển chậm dọc (lên xuống)
          size: Math.random() * 4 + 2,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          opacity: Math.random() * 0.8 + 0.2,
        });
      }
    };

    initBlossoms();
    initSnowflakes();

    // Draw cherry blossom petal
    const drawPetal = (
      x: number,
      y: number,
      size: number,
      rotation: number,
      color: string,
      colorRgba: string,
      opacity: number,
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;

      // Create petal shape
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-size * 0.3, -size * 0.5, -size * 0.8, -size * 0.2, -size, 0);
      ctx.bezierCurveTo(-size * 0.8, size * 0.2, -size * 0.3, size * 0.5, 0, 0);
      ctx.closePath();

      // Gradient fill
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, colorRgba);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Petal outline
      ctx.strokeStyle = `${color}CC`;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      ctx.restore();
    };

    // Draw snowflake with glow effect
    const drawSnowflake = (snowflake: SnowFlake) => {
      ctx.save();
      ctx.translate(snowflake.x, snowflake.y);
      ctx.rotate(snowflake.rotation);
      ctx.globalAlpha = snowflake.opacity;

      const size = snowflake.size;
      const angle = Math.PI / 3; // 60 degrees

      // Glow effect
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // Draw snowflake shape (6-pointed star)
      ctx.strokeStyle = '#ffffff';
      ctx.fillStyle = '#ffffff';
      ctx.lineWidth = 1;

      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const x1 = Math.cos(i * angle) * size;
        const y1 = Math.sin(i * angle) * size;
        const x2 = Math.cos((i + 0.5) * angle) * (size * 0.5);
        const y2 = Math.sin((i + 0.5) * angle) * (size * 0.5);

        if (i === 0) {
          ctx.moveTo(x1, y1);
        } else {
          ctx.lineTo(x1, y1);
        }
        ctx.lineTo(x2, y2);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Reset shadow
      ctx.shadowBlur = 0;

      ctx.restore();
    };

    // Draw cherry blossom
    const drawCherryBlossom = (blossom: CherryBlossom) => {
      const petals = 5;
      const angleStep = (Math.PI * 2) / petals;

      for (let i = 0; i < petals; i++) {
        const petalRotation = blossom.rotation + i * angleStep;
        drawPetal(
          blossom.x,
          blossom.y,
          blossom.size,
          petalRotation,
          blossom.color,
          blossom.colorRgba,
          blossom.opacity,
        );
      }

      // Draw center with glow effect
      ctx.save();
      ctx.globalAlpha = blossom.opacity;
      ctx.shadowColor = '#FFB6C1';
      ctx.shadowBlur = 3;
      ctx.fillStyle = '#FFB6C1';
      ctx.beginPath();
      ctx.arc(blossom.x, blossom.y, blossom.size * 0.15, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();
    };

    // Tính toán vị trí núi tại một điểm x
    const getMountainY = (x: number) => {
      const startY = canvas.height - 80;
      const points = 40;
      const i = (x / canvas.width) * points;

      // Tính toán y dựa trên các sóng
      const wave1 = Math.sin(i * 0.2) * 15;
      const wave2 = Math.sin(i * 0.4) * 10;
      const wave3 = Math.sin(i * 0.8) * 6;
      const wave4 = Math.sin(i * 1.2) * 4;
      const wave5 = Math.sin(i * 2.0) * 3;
      const wave6 = Math.sin(i * 3.5) * 2;

      return startY + wave1 + wave2 + wave3 + wave4 + wave5 + wave6;
    };

    // Draw bottom shape - đồng nhất với nền trắng
    const drawBottomShape = () => {
      ctx.save();

      // Tạo gradient đồng nhất với nền header
      const gradient = ctx.createLinearGradient(0, canvas.height - 80, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(219, 234, 254, 0.9)'); // Xanh dương cực nhạt (giống nền)
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)'); // Trắng
      gradient.addColorStop(1, 'rgba(255, 255, 255, 1.0)'); // Trắng hoàn toàn

      // Vẽ shape dưới chân
      ctx.fillStyle = gradient;
      ctx.beginPath();

      // Tạo núi thấp hơn từ trái sang phải
      const startY = canvas.height - 80; // Giảm chiều cao xuống 80px
      const endY = canvas.height;

      ctx.moveTo(0, startY);

      // Tạo nhiều điểm để có nhiều uốn lượn
      const points = 40; // Tăng số điểm để có nhiều uốn lượn
      for (let i = 0; i <= points; i++) {
        const x = (canvas.width / points) * i;
        // Tạo nhiều sóng với tần số khác nhau để có uốn lượn
        const wave1 = Math.sin(i * 0.2) * 15; // Sóng lớn
        const wave2 = Math.sin(i * 0.4) * 10; // Sóng vừa
        const wave3 = Math.sin(i * 0.8) * 6; // Sóng nhỏ
        const wave4 = Math.sin(i * 1.2) * 4; // Sóng rất nhỏ
        const wave5 = Math.sin(i * 2.0) * 3; // Sóng siêu nhỏ
        const wave6 = Math.sin(i * 3.5) * 2; // Sóng chi tiết
        const y = startY + wave1 + wave2 + wave3 + wave4 + wave5 + wave6;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(canvas.width, endY);
      ctx.lineTo(0, endY);
      ctx.closePath();
      ctx.fill();

      // Thêm hiệu ứng glow trắng nhẹ
      ctx.shadowColor = 'rgba(255, 255, 255, 0.3)';
      ctx.shadowBlur = 15;
      ctx.fill();

      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw bottom shape
      drawBottomShape();

      // Debug: Draw hover radius (commented out to remove visual artifact)
      // ctx.save();
      // ctx.globalAlpha = 0.1;
      // ctx.fillStyle = '#be185d';
      // ctx.beginPath();
      // ctx.arc(mouseRef.current.x, mouseRef.current.y, 150, 0, Math.PI * 2);
      // ctx.fill();
      // ctx.restore();

      // Update and draw cherry blossoms
      blossomsRef.current.forEach((blossom) => {
        // Calculate distance from mouse
        const dx = blossom.x - mouseRef.current.x;
        const dy = blossom.y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const hoverRadius = 150; // Tăng radius hover effect

        // Apply hover effect
        if (distance < hoverRadius && distance > 0) {
          const force = Math.pow((hoverRadius - distance) / hoverRadius, 2); // Sử dụng power để tạo hiệu ứng mạnh hơn
          const pushForce = force * 4; // Tăng cường độ đẩy

          // Normalize direction vector
          const normalizedDx = dx / distance;
          const normalizedDy = dy / distance;

          blossom.vx += normalizedDx * pushForce;
          blossom.vy += normalizedDy * pushForce;
        }

        // Update position
        blossom.x += blossom.vx;
        blossom.y += blossom.vy;
        blossom.rotation += blossom.rotationSpeed;

        // Add some wind effect (tối ưu: giảm tần suất)
        if (Math.random() < 0.1) {
          // Chỉ 10% thời gian thay vì 100%
          blossom.vx += (Math.random() - 0.5) * 0.02;
          blossom.vy += (Math.random() - 0.5) * 0.02; // Thêm wind effect cho vy
          blossom.vx = Math.max(-1.5, Math.min(1.5, blossom.vx)); // Giới hạn chậm
          blossom.vy = Math.max(-1.5, Math.min(1.5, blossom.vy)); // Cho phép di chuyển lên chậm
        }

        // Kiểm tra va chạm với núi - tan biến khi chạm núi
        const mountainY = getMountainY(blossom.x);
        if (blossom.y >= mountainY) {
          // Tan biến bằng cách giảm opacity
          blossom.opacity -= 0.05;
          if (blossom.opacity <= 0) {
            // Reset position khi tan biến hoàn toàn
            blossom.x = Math.random() * canvas.width;
            blossom.y = Math.random() * (canvas.height * 0.3); // Chỉ xuất hiện ở 30% trên
            blossom.opacity = Math.random() * 0.6 + 0.2;
          }
        }

        // Wrap around screen - di chuyển tự do qua lại (chỉ khi không chạm núi)
        if (blossom.x < -blossom.size) {
          blossom.x = canvas.width + blossom.size;
          blossom.y = Math.random() * canvas.height;
        }
        if (blossom.x > canvas.width + blossom.size) {
          blossom.x = -blossom.size;
          blossom.y = Math.random() * canvas.height;
        }
        if (blossom.y < -blossom.size) {
          blossom.y = canvas.height + blossom.size;
          blossom.x = Math.random() * canvas.width;
        }

        // Draw blossom
        drawCherryBlossom(blossom);
      });

      // Update and draw snowflakes
      snowflakesRef.current.forEach((snowflake) => {
        // Update position
        snowflake.x += snowflake.vx;
        snowflake.y += snowflake.vy;
        snowflake.rotation += snowflake.rotationSpeed;

        // Add gentle wind effect (tối ưu: giảm tần suất)
        if (Math.random() < 0.05) {
          // Chỉ 5% thời gian thay vì 100%
          snowflake.vx += (Math.random() - 0.5) * 0.01;
          snowflake.vy += (Math.random() - 0.5) * 0.01; // Thêm wind effect cho vy
          snowflake.vx = Math.max(-1, Math.min(1, snowflake.vx)); // Giới hạn chậm
          snowflake.vy = Math.max(-1, Math.min(1, snowflake.vy)); // Cho phép di chuyển lên chậm
        }

        // Kiểm tra va chạm với núi - tan biến khi chạm núi
        const mountainY = getMountainY(snowflake.x);
        if (snowflake.y >= mountainY) {
          // Tan biến bằng cách giảm opacity
          snowflake.opacity -= 0.08;
          if (snowflake.opacity <= 0) {
            // Reset position khi tan biến hoàn toàn
            snowflake.x = Math.random() * canvas.width;
            snowflake.y = Math.random() * (canvas.height * 0.3); // Chỉ xuất hiện ở 30% trên
            snowflake.opacity = Math.random() * 0.8 + 0.2;
          }
        }

        // Wrap around screen - di chuyển tự do qua lại (chỉ khi không chạm núi)
        if (snowflake.x < -snowflake.size) {
          snowflake.x = canvas.width + snowflake.size;
          snowflake.y = Math.random() * canvas.height;
        }
        if (snowflake.x > canvas.width + snowflake.size) {
          snowflake.x = -snowflake.size;
          snowflake.y = Math.random() * canvas.height;
        }
        if (snowflake.y < -snowflake.size) {
          snowflake.y = canvas.height + snowflake.size;
          snowflake.x = Math.random() * canvas.width;
        }

        // Draw snowflake
        drawSnowflake(snowflake);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'auto', // Cho phép mouse events
        cursor: 'none', // Ẩn cursor để tạo hiệu ứng đẹp hơn
      }}
    />
  );
};

export default CherryBlossomCanvas;
