import Image from 'next/image';

import Header from '@/components/shared/Header';

import Footer from '../../shared/Footer';

import styles from './styles.module.scss';

export default function HomePage() {
  return (
    <div className={styles.home}>
      <Header />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroGradient} />
          <div className={styles.heroGrid} />
          <div className={styles.heroOrbs}>
            <div className={`${styles.heroOrb} ${styles.heroOrbBlue}`} />
            <div className={`${styles.heroOrb} ${styles.heroOrbPink}`} />
            <div className={`${styles.heroOrb} ${styles.heroOrbAmber}`} />
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.heroInner}>
            <div className={styles.heroContent}>
              <span className={styles.badge}>IT Solutions & Business</span>
              <h1 className={styles.title}>Transform Your Business With Modern IT Services</h1>
              <p className={styles.subtitle}>
                We deliver high-quality, scalable solutions tailored for startups, SMEs, and
                enterprises. From strategy to execution, our team helps you move faster.
              </p>
              <div className={styles.ctaRow}>
                <a href="#services" className={styles.primaryBtn}>
                  Get Started
                </a>
                <a href="#about" className={styles.ghostBtn}>
                  Learn More
                </a>
              </div>
              <div className={styles.stats}>
                <div>
                  <div className={styles.statNum}>10+</div>
                  <div className={styles.statLabel}>Years</div>
                </div>
                <div>
                  <div className={styles.statNum}>250+</div>
                  <div className={styles.statLabel}>Projects</div>
                </div>
                <div>
                  <div className={styles.statNum}>98%</div>
                  <div className={styles.statLabel}>Satisfaction</div>
                </div>
              </div>
            </div>
            <div className={styles.heroMedia}>
              <div className={styles.heroCard}>
                <div className={styles.heroCardBg} />
                <Image
                  src="/window.svg"
                  alt="Hero Illustration"
                  width={800}
                  height={600}
                  className={styles.heroImage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands strip */}
      <section className={styles.brands}>
        <div className={styles.container}>
          <div className={styles.brandsRow}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={styles.brandItem}>
                <Image src="/vercel.svg" alt="Brand" width={120} height={32} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>What We Do</span>
            <h2 className={styles.h2}>Our IT Services</h2>
            <p className={styles.lead}>
              Comprehensive, scalable solutions designed to accelerate your business.
            </p>
          </div>
          <div className={styles.servicesGrid}>
            {[
              {
                title: 'Managed IT Services',
                desc: 'Proactive monitoring and support to keep systems running.',
              },
              {
                title: 'Cloud Migration',
                desc: 'Move to the cloud securely with zero downtime strategies.',
              },
              {
                title: 'Cybersecurity',
                desc: 'Protect your data with modern security controls and audits.',
              },
              {
                title: 'App Development',
                desc: 'Build robust web and mobile apps with modern stacks.',
              },
              {
                title: 'Data & Analytics',
                desc: 'Unlock insights with data pipelines and BI dashboards.',
              },
              {
                title: 'IT Consulting',
                desc: 'Strategic guidance to align IT with business goals.',
              },
            ].map((s, i) => (
              <div className={styles.serviceCard} key={i}>
                <div className={styles.serviceIcon} />
                <h3 className={styles.h3}>{s.title}</h3>
                <p className={styles.text}>{s.desc}</p>
                <a href="#" className={styles.link}>
                  Read More
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className={styles.sectionAlt}>
        <div className={styles.container}>
          <div className={styles.split}>
            <div className={styles.splitMedia}>
              <div className={styles.mediaFrame}>
                <Image
                  src="/globe.svg"
                  alt="About"
                  width={640}
                  height={480}
                  className={styles.mediaImg}
                />
              </div>
            </div>
            <div className={styles.splitContent}>
              <span className={styles.kicker}>About Us</span>
              <h2 className={styles.h2}>Trusted Partner For Your Digital Growth</h2>
              <p className={styles.text}>
                We combine domain expertise with engineering excellence to deliver measurable
                business outcomes.
              </p>
              <ul className={styles.list}>
                <li>Dedicated senior engineers</li>
                <li>Battle-tested delivery process</li>
                <li>Transparent communication</li>
              </ul>
              <div className={styles.row}>
                <a href="#contact" className={styles.primaryBtn}>
                  Contact Us
                </a>
                <a href="#" className={styles.link}>
                  Discover More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Counters */}
      <section className={styles.counters}>
        <div className={styles.container}>
          <div className={styles.countersRow}>
            {[
              { num: '35+', label: 'Expert Engineers' },
              { num: '40+', label: 'Active Clients' },
              { num: '650+', label: 'Tickets Resolved' },
              { num: '24/7', label: 'Support Availability' },
            ].map((c, i) => (
              <div className={styles.counter} key={i}>
                <div className={styles.counterNum}>{c.num}</div>
                <div className={styles.counterLabel}>{c.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>Testimonials</span>
            <h2 className={styles.h2}>What Clients Say</h2>
            <p className={styles.lead}>
              We measure success by the value we create for our customers.
            </p>
          </div>
          <div className={styles.testimonials}>
            {[1, 2, 3].map((i) => (
              <div className={styles.testimonial} key={i}>
                <div className={styles.quote}>“</div>
                <p className={styles.text}>
                  The team was responsive, highly skilled, and delivered beyond expectations. We
                  achieved our goals on time.
                </p>
                <div className={styles.avatarRow}>
                  <div className={styles.avatar} />
                  <div>
                    <div className={styles.h4}>Alex Johnson</div>
                    <div className={styles.muted}>COO, GrowthCorp</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>Blog</span>
            <h2 className={styles.h2}>Latest Articles</h2>
            <p className={styles.lead}>Insights and best practices from our engineering team.</p>
          </div>
          <div className={styles.blogGrid}>
            {[1, 2, 3].map((i) => (
              <article className={styles.post} key={i}>
                <div className={styles.postMedia} />
                <div className={styles.postBody}>
                  <a href="#" className={styles.link}>
                    How to plan your cloud migration
                  </a>
                  <p className={styles.text}>
                    Key steps to reduce risk and ensure business continuity during migration.
                  </p>
                  <div className={styles.meta}>Oct 1, 2025 • 7 min read</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaBox}>
            <div>
              <h3 className={styles.h2}>Ready to get started?</h3>
              <p className={styles.lead}>Let’s discuss how we can help accelerate your roadmap.</p>
            </div>
            <a href="#contact" className={styles.primaryBtn}>
              Request a Quote
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
