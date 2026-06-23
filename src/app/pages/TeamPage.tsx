import { useNavigate } from "react-router";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, useState, type ReactNode } from "react";

const teamMembers = [
  {
    name: "K. Bhuvanendran",
    role: "Founder",
    expertise: "Strategic Vision & Leadership",
    bio: "Visionary founder who established Sri Nava Industries in 1985, building a legacy of excellence in fabrication and engineering.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F8d59509cf87341108edce9d018bc2251%2F00069108c25d40428305c9e6076ac7a4?format=webp&width=800&height=1200",
  },
  {
    name: "Vijayalakshmi Bhuvanendran",
    role: "Managing Director & Finance",
    expertise: "Business Strategy & Finance",
    bio: "Leads overall business operations and financial management, ensuring sustainable growth and profitability.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F8d59509cf87341108edce9d018bc2251%2F06964036adde469bbf95cc6e2403dd1b?format=webp&width=800&height=1200",
  },
  {
    name: "Kathiravan B",
    role: "Operations Manager & Administration",
    expertise: "Operations & Administration",
    bio: "Oversees daily operations, resource management, and administrative functions for seamless business delivery.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fd804a884d1294eac9363b52e819be07b%2Fc150baa7acad4741b119baabb752da24?format=webp&width=800&height=1200",
  },
  {
    name: "Karthigeyan B",
    role: "Design Engineer & CAD Specialist",
    expertise: "CAD Design & Engineering",
    bio: "Creates precision designs and technical specifications using advanced CAD tools for complex fabrication projects.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fd804a884d1294eac9363b52e819be07b%2Faeabf3660714467494ceeb8be96b8f10?format=webp&width=800&height=1200",
  },
  {
    name: "Kamalesh S",
    role: "Accounts & Information Technology",
    expertise: "Finance & IT Systems",
    bio: "Manages financial operations, IT infrastructure, and systems to support business growth and data security.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fd804a884d1294eac9363b52e819be07b%2Fee07453fcebd435c9d7aa1bcd637d990?format=webp&width=800&height=1200",
  },
];

const stats = [
  { value: "1985", label: "Established" },
  { value: "41+", label: "Years Legacy" },
  { value: "9+", label: "Professionals" },
  { value: "100%", label: "Precision" },
];

/* ─────────────────────────────────────────────
   3D Tilt Card — reacts to cursor with real depth
   ───────────────────────────────────────────── */
function TiltCard({ children, index, glowColor = "225,29,46" }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // smooth spring physics for buttery motion
  const springConfig = { stiffness: 220, damping: 22, mass: 0.6 };
  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [12, -12]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-12, 12]),
    springConfig
  );

  // parallax layers push toward/away from viewer
  const glareX = useTransform(mouseX, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [0, 1], ["0%", "100%"]);

  function handleMove(e) {
    const r = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width);
    mouseY.set((e.clientY - r.top) / r.height);
  }

  function handleLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setHovered(false);
  }

  return (
    <motion.div
      ref={ref}
      className="tilt-card"
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 60, rotateX: -18 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.85,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
    >
      {/* cursor-follow glare */}
      <motion.div
        className="tilt-glare"
        style={{
          background: `radial-gradient(circle at ${glareX.get()} ${glareY.get()}, rgba(${glowColor},0.22), transparent 55%)`,
          opacity: hovered ? 1 : 0,
        }}
      />
      {children}
    </motion.div>
  );
}

export function TeamPage() {
  const navigate = useNavigate();

  return (
    <div className="team-page-wrapper">
      <style>{`
        .team-page-wrapper {
          --steel-950: #050506;
          --steel-900: #08090b;
          --steel-800: #0d0e11;
          --steel-700: #15171b;
          --crimson: #e11d2e;
          --crimson-bright: #ff3340;
          --crimson-deep: #8f0f1a;
          --crimson-soft: rgba(225, 29, 46, 0.5);
          --crimson-faint: rgba(225, 29, 46, 0.14);
          --ember: #ff7a2c;
          --line: rgba(255, 255, 255, 0.08);
          --line-strong: rgba(255, 255, 255, 0.14);
          --text: rgba(255, 255, 255, 0.94);
          --text-dim: rgba(255, 255, 255, 0.56);
          --text-faint: rgba(255, 255, 255, 0.34);

          position: relative;
          min-height: 100vh;
          background: radial-gradient(140% 90% at 50% -10%, #141416 0%, var(--steel-950) 60%);
          color: var(--text);
          padding-top: 5rem;
          overflow: hidden;
          font-family: inherit;
          -webkit-font-smoothing: antialiased;
          perspective: 1600px;
        }

        /* ── Animated backdrop layers ── */
        .bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(225,29,46,0.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(225,29,46,0.055) 1px, transparent 1px);
          background-size: 54px 54px;
          mask-image: radial-gradient(circle at 50% 25%, black 0%, transparent 78%);
          animation: gridDrift 32s linear infinite;
          pointer-events: none;
          transform: translateZ(-200px) scale(1.2);
        }
        @keyframes gridDrift {
          from { background-position: 0 0, 0 0; }
          to   { background-position: 54px 54px, 54px 54px; }
        }

        .bg-grid-2 {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,122,44,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,122,44,0.04) 1px, transparent 1px);
          background-size: 120px 120px;
          mask-image: radial-gradient(circle at 50% 40%, black 0%, transparent 70%);
          animation: gridDrift 48s linear infinite reverse;
          pointer-events: none;
        }

        .bg-glow {
          position: absolute;
          top: -12%;
          left: 50%;
          width: 75vw;
          height: 65vh;
          transform: translateX(-50%);
          background: radial-gradient(ellipse at center, rgba(225,29,46,0.18) 0%, transparent 70%);
          filter: blur(50px);
          pointer-events: none;
          animation: pulseGlow 8s ease-in-out infinite;
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.55; transform: translateX(-50%) scale(1); }
          50%      { opacity: 1; transform: translateX(-50%) scale(1.08); }
        }

        .bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
          pointer-events: none;
          opacity: 0.4;
        }
        .bg-orb.one {
          width: 380px; height: 380px;
          background: radial-gradient(circle, rgba(225,29,46,0.4), transparent 70%);
          top: 30%; left: -8%;
          animation: floatOrb 14s ease-in-out infinite;
        }
        .bg-orb.two {
          width: 320px; height: 320px;
          background: radial-gradient(circle, rgba(255,122,44,0.3), transparent 70%);
          bottom: 10%; right: -6%;
          animation: floatOrb 18s ease-in-out infinite reverse;
        }
        @keyframes floatOrb {
          0%, 100% { transform: translate(0,0); }
          50%      { transform: translate(40px,-40px); }
        }

        .bg-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(120% 120% at 50% 0%, transparent 55%, rgba(0,0,0,0.55) 100%);
          pointer-events: none;
        }

        .scan-beam {
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--crimson-bright), transparent);
          opacity: 0.5;
          animation: scan 7.5s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes scan {
          0%   { top: 6%;  opacity: 0; }
          15%  { opacity: 0.55; }
          85%  { opacity: 0.55; }
          100% { top: 96%; opacity: 0; }
        }

        .spark {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: var(--ember);
          box-shadow: 0 0 8px 2px rgba(255, 122, 44, 0.7);
          pointer-events: none;
          animation: rise linear infinite;
        }
        @keyframes rise {
          0%   { transform: translateY(0) scale(1); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.8; }
          100% { transform: translateY(-92vh) scale(0.2); opacity: 0; }
        }

        .team-inner { position: relative; z-index: 2; }

        /* ── Header ── */
        .team-header {
          padding: clamp(3rem, 8vw, 6rem) clamp(1.5rem, 4vw, 3rem) clamp(1.5rem, 4vw, 2.5rem);
          text-align: center;
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.7rem;
          font-size: 0.72rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--crimson-bright);
          font-weight: 700;
          margin-bottom: 1.4rem;
        }
        .eyebrow::before, .eyebrow::after {
          content: "";
          width: 36px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--crimson-bright));
        }
        .eyebrow::after {
          background: linear-gradient(90deg, var(--crimson-bright), transparent);
        }

        .team-title {
          font-size: clamp(2.6rem, 7.5vw, 5rem);
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 1.02;
          margin-bottom: 1.4rem;
          background: linear-gradient(135deg, #ffffff 0%, #f2f2f2 42%, var(--crimson-bright) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .team-subtitle {
          font-size: clamp(1rem, 2vw, 1.12rem);
          color: var(--text-dim);
          line-height: 1.75;
          max-width: 640px;
          margin: 0 auto;
          text-align: center;
        }

        /* ── Stats strip ── */
        .stats-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: clamp(1rem, 4vw, 3.5rem);
          margin-top: 2.6rem;
          padding-top: 2rem;
          border-top: 1px solid var(--line);
          width: 100%;
          max-width: 760px;
        }
        .stat-item { text-align: center; }
        .stat-value {
          font-size: clamp(1.6rem, 4vw, 2.4rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #fff, var(--crimson-bright));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .stat-label {
          font-size: 0.66rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-faint);
          font-weight: 600;
          margin-top: 0.35rem;
        }

        /* ── Grid ── */
        .team-grid-wrapper {
          padding: clamp(2rem, 5vw, 3.5rem) clamp(1.5rem, 4vw, 3rem) clamp(4rem, 8vw, 7rem);
          max-width: 1280px;
          margin: 0 auto;
        }
        .team-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          max-width: 1080px;
          margin: 0 auto;
        }
        @media (min-width: 720px) {
          .team-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1040px) {
          .team-grid { grid-template-columns: repeat(3, 1fr); }
        }

        /* ── 3D Tilt Card ── */
        .tilt-card {
          position: relative;
          padding: 2rem 1.85rem 1.85rem;
          border: 1px solid var(--line);
          border-radius: 18px;
          background: linear-gradient(135deg, rgba(225,29,46,0.08) 0%, rgba(13,14,17,0.7) 55%), rgba(13,14,17,0.9);
          overflow: hidden;
          transform-style: preserve-3d;
          will-change: transform;
          transition: border-color 0.3s ease, box-shadow 0.35s ease;
        }
        .tilt-card:hover {
          border-color: var(--crimson-soft);
          box-shadow:
            0 30px 60px -20px rgba(225,29,46,0.55),
            0 0 0 1px rgba(225,29,46,0.25) inset;
        }

        .tilt-glare {
          position: absolute;
          inset: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
          border-radius: 18px;
          z-index: 3;
        }

        /* depth layers — pushed forward in 3D space */
        .layer-avatar { transform: translateZ(55px); }
        .layer-text   { transform: translateZ(30px); }
        .layer-tag    { transform: translateZ(40px); }

        .avatar-ring {
          position: relative;
          width: 6.5rem;
          height: 6.5rem;
          margin: 0 auto 1.2rem;
          border-radius: 50%;
          padding: 3px;
          background: conic-gradient(from 0deg, var(--crimson-bright), var(--ember), var(--crimson-deep), var(--crimson-bright));
          animation: spinRing 6s linear infinite;
        }
        @keyframes spinRing {
          to { transform: rotate(360deg); }
        }
        .avatar-inner {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
          background: var(--steel-800);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .avatar-inner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          /* counter-rotate so image stays still while ring spins */
          animation: spinRing 6s linear infinite reverse;
        }
        .avatar-fallback {
          font-size: 2.4rem;
          font-weight: 800;
          color: var(--crimson-soft);
        }

        .card-name {
          font-size: 1.18rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.4rem;
          letter-spacing: -0.01em;
          text-align: center;
        }
        .card-role {
          font-size: 0.78rem;
          color: var(--crimson-bright);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 700;
          margin-bottom: 0.9rem;
          text-align: center;
        }
        .tag-wrap { display: flex; justify-content: center; margin-bottom: 0.9rem; }
        .card-tag {
          display: inline-block;
          font-size: 0.64rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-faint);
          font-weight: 600;
          padding: 0.45rem 0.85rem;
          border: 1px solid var(--crimson-faint);
          border-radius: 999px;
          background: linear-gradient(135deg, rgba(225,29,46,0.12), rgba(225,29,46,0.04));
        }
        .card-bio {
          font-size: 0.86rem;
          color: var(--text-dim);
          line-height: 1.62;
          text-align: center;
        }

        .card-line {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--crimson-bright), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 4;
        }
        .tilt-card:hover .card-line { opacity: 1; }

        .emoji-badge {
          font-size: 3rem;
          text-align: center;
          margin-bottom: 1rem;
        }

        /* ── CTA ── */
        .cta-section {
          max-width: 880px;
          margin: 0 auto;
          padding: 0 clamp(1.5rem, 4vw, 3rem) clamp(5rem, 9vw, 8rem);
        }
        .cta-card {
          position: relative;
          text-align: center;
          padding: clamp(2.5rem, 6vw, 4rem);
          border: 1px solid var(--line-strong);
          border-radius: 22px;
          background:
            linear-gradient(135deg, rgba(225,29,46,0.16), rgba(13,14,17,0.4) 60%),
            rgba(8,9,11,0.85);
          overflow: hidden;
          transform-style: preserve-3d;
        }
        .cta-card h2 {
          font-size: clamp(1.8rem, 4.5vw, 2.8rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #fff, var(--crimson-bright));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .cta-card p {
          color: var(--text-dim);
          line-height: 1.7;
          max-width: 480px;
          margin: 0 auto 2rem;
        }
        .cta-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.95rem 2.2rem;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: #fff;
          background: linear-gradient(135deg, var(--crimson-bright), var(--crimson-deep));
          box-shadow: 0 12px 30px -8px rgba(225,29,46,0.6);
          overflow: hidden;
        }
        .cta-btn::after {
          content: "";
          position: absolute;
          top: 0; left: -120%;
          width: 80%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
          transform: skewX(-20deg);
          transition: left 0.6s ease;
        }
        .cta-btn:hover::after { left: 140%; }

        @media (prefers-reduced-motion: reduce) {
          .bg-grid, .bg-grid-2, .bg-glow, .scan-beam, .spark,
          .bg-orb, .avatar-ring, .avatar-inner img { animation: none; }
        }
      `}</style>

      {/* ── Animated backdrop ── */}
      <div className="bg-grid" />
      <div className="bg-grid-2" />
      <div className="bg-glow" />
      <div className="bg-orb one" />
      <div className="bg-orb two" />
      <div className="scan-beam" />
      <div className="bg-vignette" />
      {[...Array(9)].map((_, i) => (
        <span
          key={i}
          className="spark"
          style={{
            left: `${6 + i * 10.5}%`,
            bottom: "-10px",
            animationDuration: `${5 + (i % 4) * 1.5}s`,
            animationDelay: `${i * 0.7}s`,
          }}
        />
      ))}

      <div className="team-inner">
        {/* ── Header ── */}
        <div className="team-header">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="eyebrow">Our Team</span>
          </motion.div>

          <motion.h1
            className="team-title"
            initial={{ opacity: 0, y: 40, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformStyle: "preserve-3d" }}
          >
            Talented Professionals
          </motion.h1>

          <motion.p
            className="team-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            Our team comprises industry veterans and skilled craftspeople
            dedicated to delivering excellence in every project. With combined
            experience spanning decades, we bring innovation and precision to
            every challenge.
          </motion.p>

          {/* Animated stats */}
          <motion.div
            className="stats-row"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="stat-item"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 16,
                  delay: 0.5 + i * 0.1,
                }}
              >
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Team Grid ── */}
        <div className="team-grid-wrapper">
          <div className="team-grid">
            {teamMembers.map((member, i) => (
              <TiltCard key={member.name} index={i}>
                <div className="layer-avatar">
                  <div className="avatar-ring">
                    <div className="avatar-inner">
                      {member.image ? (
                        <img src={member.image} alt={member.name} />
                      ) : (
                        <span className="avatar-fallback">
                          {member.name.charAt(0)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="layer-text">
                  <h3 className="card-name">{member.name}</h3>
                  <div className="card-role">{member.role}</div>
                </div>

                <div className="layer-tag tag-wrap">
                  <span className="card-tag">{member.expertise}</span>
                </div>

                <p className="card-bio layer-text">{member.bio}</p>
                <div className="card-line" />
              </TiltCard>
            ))}

            {/* Professionals Count Card */}
            <TiltCard index={teamMembers.length}>
              <motion.div
                className="emoji-badge layer-avatar"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                👥
              </motion.div>
              <div className="layer-text">
                <h3 className="card-name">9+ Professionals</h3>
                <div className="card-role">Skilled Specialists</div>
              </div>
              <div className="layer-tag tag-wrap">
                <span className="card-tag">Expanding Team</span>
              </div>
              <p className="card-bio layer-text">
                Dedicated experts across manufacturing, engineering, and
                operations working together to deliver excellence.
              </p>
              <div className="card-line" />
            </TiltCard>
          </div>
        </div>

      </div>
    </div>
  );
}
