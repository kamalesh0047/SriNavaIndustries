import { useEffect, useState } from "react";
import { motion } from "motion/react";

const navLinks = ["Home", "Facilities", "Capabilities", "Projects", "Contact"];

const facilities = [
  {
    name: "Laser Cutting",
    tag: "Cutting",
    icon: "M3 20h18M6 16l3-8 3 6 3-10 3 12",
    desc: "High-precision CNC laser cutting for industrial sheet metal fabrication.",
  },
  {
    name: "Press Brake Forming",
    tag: "Bending",
    icon: "M4 6h16M6 10h12M8 14h8M10 18h4",
    desc: "Accurate bending and forming operations for custom fabrication needs.",
  },
  {
    name: "Heavy Welding",
    tag: "Joining",
    icon: "M4 18l5-5 3 3 8-8",
    desc: "Reliable welding systems for structural steel and general fabrication.",
  },
  {
    name: "Material Handling",
    tag: "Logistics",
    icon: "M5 19V8l7-4 7 4v11M9 19v-6h6v6",
    desc: "Safe and efficient movement of heavy raw materials and finished assemblies.",
  },
];

const cinemaStyles = `
  .hero-cinema {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100vh;
    min-height: 600px;
    overflow: hidden;
    background:
      radial-gradient(ellipse at 28% 16%, rgba(229,56,59,0.16), transparent 56%),
      radial-gradient(ellipse at 80% 84%, rgba(193,18,31,0.12), transparent 52%),
      linear-gradient(160deg, #080808 0%, #160406 50%, #050505 100%);
    z-index: 50;
  }
  .hero-cinema::after {
    content: "";
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse at center, transparent 46%, rgba(0,0,0,0.78) 100%),
      linear-gradient(180deg, rgba(193,18,31,0.10) 0%, transparent 35%, rgba(0,0,0,0.4) 100%);
    pointer-events: none; z-index: 20;
  }
  .cinema-texture::before {
    content: "";
    position: absolute; inset: 0;
    background-image:
      repeating-linear-gradient(118deg, rgba(255,255,255,0.008) 0px, rgba(255,255,255,0.008) 1px, transparent 1px, transparent 7px),
      linear-gradient(rgba(229,56,59,0.022) 1px, transparent 1px),
      linear-gradient(90deg, rgba(229,56,59,0.022) 1px, transparent 1px);
    background-size: auto, 64px 64px, 64px 64px;
    opacity: 0.5;
    pointer-events: none;
  }
  .light-streak {
    position: absolute; top: 0; left: -40%;
    width: 70%; height: 100%;
    background: linear-gradient(105deg, transparent, rgba(229,56,59,0.11), rgba(255,255,255,0.045), transparent);
    transform: skewX(-16deg);
    animation: sweep 18s ease-in-out infinite;
    pointer-events: none;
  }
  .light-streak.delay { animation-delay: 9s; opacity: 0.5; }
  @keyframes sweep {
    0% { left: -60%; }
    100% { left: 140%; }
  }
  .particles { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
  .spark {
    position: absolute;
    width: 2px; height: 2px; border-radius: 50%;
    background: #E5383B;
    box-shadow: 0 0 7px 1px rgba(229,56,59,0.7);
    bottom: -10px;
    animation: rise linear infinite;
    opacity: 0;
  }
  @keyframes rise {
    0% { transform: translateY(0) scale(1); opacity: 0; }
    12% { opacity: 0.9; }
    82% { opacity: 0.5; }
    100% { transform: translateY(-105vh) scale(0.2); opacity: 0; }
  }
  .scene {
    position: absolute; inset: 0;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center; padding: 0 24px;
    opacity: 0; pointer-events: none;
    transition: opacity 0.9s ease;
  }
  .scene.active { opacity: 1; pointer-events: auto; }
  .head-white {
    font-family: Georgia, serif;
    font-weight: 600; letter-spacing: 2px; line-height: 1.06;
    color: #FFFFFF;
    text-shadow: 0 1px 30px rgba(229,56,59,0.35);
  }
  .head-white .accent { color: #E5383B; }
  .gilt {
    font-family: Georgia, serif;
    font-weight: 600; letter-spacing: 2px; line-height: 1.08;
    background: linear-gradient(115deg, #C1121F 0%, #E5383B 30%, #ffffff 52%, #E5383B 74%, #8a0d16 100%);
    background-size: 250% auto;
    -webkit-background-clip: text; background-clip: text;
    color: transparent;
    animation: shimmer 7s ease-in-out infinite;
  }
  @keyframes shimmer {
    0%, 100% { background-position: 0% center; }
    50% { background-position: 100% center; }
  }
  .subtitle {
    margin-top: 22px;
    font-size: clamp(0.85rem, 1.7vw, 1.05rem);
    color: #B5B5B5;
    max-width: 580px;
    font-style: italic;
  }
  .gold-rule {
    margin: 26px auto 0;
    width: 120px; height: 1px;
    background: linear-gradient(90deg, transparent, #E5383B, transparent);
    position: relative;
  }
  .gold-rule::after {
    content: "";
    position: absolute; left: 50%; top: 50%;
    width: 6px; height: 6px; border: 1px solid #E5383B;
    background: #121212; transform: translate(-50%,-50%) rotate(45deg);
  }
  @keyframes revealUp {
    from { opacity: 0; transform: translateY(46px); filter: blur(10px); }
    to { opacity: 1; transform: translateY(0); filter: blur(0); }
  }
  #scene1 .big { font-size: clamp(2.1rem, 6.6vw, 5.2rem); letter-spacing: 3px; }
  .scene.active .reveal-1 { animation: revealUp 1.3s cubic-bezier(.22,1,.36,1) both; }
  .scene.active .reveal-2 { animation: revealUp 1.3s cubic-bezier(.22,1,.36,1) 0.4s both; }
  .scene.active .reveal-3 { animation: revealUp 1.3s cubic-bezier(.22,1,.36,1) 0.7s both; }
  #scene2 .counter {
    font-family: Georgia, serif;
    font-weight: 700;
    font-size: clamp(2.8rem, 9vw, 7.2rem);
    color: #E5383B;
  }
  #scene2 .label {
    font-size: clamp(0.95rem, 2.6vw, 1.4rem);
    letter-spacing: 7px; color: #E5383B; margin-top: 8px;
    text-transform: uppercase;
  }
  .scene.active .zoom-in { animation: zoomFrame 1.3s cubic-bezier(.22,1,.36,1) both; }
  @keyframes zoomFrame {
    from { opacity: 0; transform: scale(1.28); filter: blur(12px); }
    to { opacity: 1; transform: scale(1); filter: blur(0); }
  }
  .values { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; }
  .value-word {
    font-family: Georgia, serif;
    font-weight: 600;
    font-size: clamp(1.4rem, 5vw, 3rem);
    letter-spacing: 5px; padding: 0 34px; position: relative;
    color: #E5383B; opacity: 0;
  }
  .value-word + .value-word::before {
    content: "";
    position: absolute; left: 0; top: 16%; height: 68%;
    width: 1px; background: linear-gradient(transparent, #E5383B, transparent);
  }
  .scene.active .v1 { animation: revealUp 1s cubic-bezier(.22,1,.36,1) 0.15s both; }
  .scene.active .v2 { animation: revealUp 1s cubic-bezier(.22,1,.36,1) 0.7s both; }
  .scene.active .v3 { animation: revealUp 1s cubic-bezier(.22,1,.36,1) 1.25s both; }
  .spark-sweep {
    position: absolute; inset: 0; pointer-events: none; opacity: 0; z-index: 30;
    background: linear-gradient(90deg, transparent, rgba(193,18,31,0.34), rgba(255,255,255,0.5), rgba(193,18,31,0.28), transparent);
    transform: translateX(-100%);
  }
  .spark-sweep.run { animation: sparkSweep 1.4s cubic-bezier(.4,0,.2,1) both; }
  @keyframes sparkSweep {
    0% { transform: translateX(-100%); opacity: 0; }
    45% { opacity: 1; }
    100% { transform: translateX(120%); opacity: 0; }
  }
  #scene4 { background: radial-gradient(ellipse at center, rgba(40,6,8,0.85), rgba(5,5,5,0.96)); }
  .skip {
    position: absolute; bottom: 28px; right: 30px; z-index: 40;
    font-size: 0.82rem; letter-spacing: 3px; color: #B5B5B5;
    text-transform: uppercase;
    background: transparent; border: 1px solid rgba(229,56,59,0.3);
    padding: 8px 20px; border-radius: 2px; cursor: pointer;
  }
  .skip.hide { opacity: 0; pointer-events: none; }
  .ind-nav {
    position: sticky; top: 0; z-index: 70;
    background: rgba(8,8,8,0.82);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid rgba(229,56,59,0.15);
  }
  .nav-brand { color: #FFFFFF; font-size: 1.25rem; text-transform: uppercase; }
  .nav-brand .dot { color: #E5383B; }
  .nav-link { color: #B5B5B5; font-size: 0.78rem; letter-spacing: 0.18em; text-transform: uppercase; }
  .nav-cta {
    border: 1px solid rgba(229,56,59,0.4); color: #FFFFFF;
    font-size: 0.74rem; letter-spacing: 0.16em; text-transform: uppercase;
    padding: 9px 22px; border-radius: 2px; background: transparent;
  }
  .sec-label-line { width: 40px; height: 1px; background: #E5383B; }
  .sec-label-text {
    color: #B5B5B5; text-transform: uppercase;
    font-size: 0.7rem; letter-spacing: 0.38em; font-weight: 600;
  }
  .fac-card {
    position: relative;
    border: 1px solid rgba(229,56,59,0.15);
    background: linear-gradient(155deg, rgba(229,56,59,0.04), rgba(255,255,255,0.008)), #121212;
    transition: border-color 0.5s, transform 0.5s, box-shadow 0.5s;
    overflow: hidden;
  }
  .fac-card:hover {
    border-color: rgba(229,56,59,0.55);
    transform: translateY(-8px) scale(1.015);
    box-shadow: 0 22px 60px -22px rgba(229,56,59,0.35);
  }
  .fac-icon {
    width: 46px; height: 46px; border-radius: 4px;
    display: flex; align-items: center; justify-content: center;
    border: 1px solid rgba(229,56,59,0.25);
    background: rgba(229,56,59,0.06);
    color: #E5383B;
  }
  .fac-title { color: #FFFFFF; }
  .ind-ambient {
    position: relative;
    background:
      radial-gradient(ellipse 60% 40% at 15% 8%, rgba(229,56,59,0.07), transparent 60%),
      radial-gradient(ellipse 50% 40% at 85% 50%, rgba(193,18,31,0.06), transparent 60%),
      radial-gradient(ellipse 70% 40% at 50% 100%, rgba(229,56,59,0.05), transparent 60%),
      #080808;
  }
`;

function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pc = document.getElementById("particles");
    const sweep = document.getElementById("sweep");
    const skip = document.getElementById("skip");

    if (!pc || !sweep || !skip) return;

    pc.innerHTML = "";

    for (let i = 0; i < 22; i++) {
      const s = document.createElement("div");
      s.className = "spark";
      s.style.left = Math.random() * 100 + "%";
      s.style.animationDuration = 9 + Math.random() * 9 + "s";
      s.style.animationDelay = Math.random() * 10 + "s";
      const scale = 0.5 + Math.random() * 1.4;
      s.style.transform = `scale(${scale})`;
      pc.appendChild(s);
    }

    const scenes = ["scene1", "scene2", "scene3", "scene4"];
    const timers: ReturnType<typeof setTimeout>[] = [];

    function clearAll() {
      timers.forEach(clearTimeout);
    }

    function show(idx: number) {
      scenes.forEach((id) => {
        const el = document.getElementById(id);
        el?.classList.remove("active");
      });
      document.getElementById(scenes[idx])?.classList.add("active");
    }

    function runSweep() {
      sweep!.classList.remove("run");
      void sweep!.offsetWidth;
      sweep!.classList.add("run");
    }

    function animateCounter() {
      const node = document.getElementById("count");
      if (!node) return;

      const target = 10000;
      const dur = 2400;
      let t0: number | null = null;

      function step(ts: number) {
        if (!t0) t0 = ts;
        const p = Math.min((ts - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 5);
        node!.textContent = Math.floor(target * eased).toLocaleString();
        if (p < 1) requestAnimationFrame(step);
        else node!.textContent = "10,000";
      }

      requestAnimationFrame(step);
    }

    function finish() {
      clearAll();
      show(3);
      skip?.classList.add("hide");
      setTimeout(onComplete, 1400);
    }

    function play() {
      if (reduced) {
        finish();
        return;
      }

      show(0);
      timers.push(setTimeout(() => runSweep(), 3800));
      timers.push(setTimeout(() => {
        show(1);
        animateCounter();
      }, 4100));
      timers.push(setTimeout(() => runSweep(), 7800));
      timers.push(setTimeout(() => show(2), 8100));
      timers.push(setTimeout(() => runSweep(), 12000));
      timers.push(setTimeout(() => finish(), 12300));
    }

    skip.addEventListener("click", finish);
    play();

    return () => {
      clearAll();
      skip.removeEventListener("click", finish);
    };
  }, [onComplete]);

  return <style>{cinemaStyles}</style>;
}

export function FacilitiesPage() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="ind-ambient min-h-screen">
      <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-[#E5383B]/0 via-[#E5383B] to-[#E5383B]/0 z-[80]" />

      {showIntro && (
        <>
          <CinematicIntro onComplete={() => setShowIntro(false)} />
          <section className="hero-cinema cinema-texture">
            <div className="light-streak"></div>
            <div className="light-streak delay"></div>
            <div className="particles" id="particles"></div>

            <div className="scene" id="scene1">
              <h1 className="head-white big reveal-1">
                Built to <span className="accent">Perform.</span><br />
                Ready for Any Scale.
              </h1>
              <div className="gold-rule reveal-2"></div>
              <p className="subtitle reveal-3">World-class facilities, engineered for your fabrication vision.</p>
            </div>

            <div className="scene" id="scene2">
              <div className="zoom-in">
                <div className="counter"><span id="count">0</span>+</div>
                <div className="label">Square Feet of Facility</div>
                <p className="subtitle">Equipped with cutting-edge technology and master craftsmanship.</p>
              </div>
            </div>

            <div className="scene" id="scene3">
              <div className="values">
                <span className="value-word v1">PRECISION</span>
                <span className="value-word v2">STRENGTH</span>
                <span className="value-word v3">RELIABILITY</span>
              </div>
            </div>

            <div className="scene" id="scene4">
              <h2 className="gilt" style={{ fontSize: "clamp(2rem, 6vw, 4.2rem)", letterSpacing: "3px" }}>
                FACILITIES OVERVIEW
              </h2>
              <div className="gold-rule"></div>
              <p className="subtitle">An invitation to explore our state-of-the-art infrastructure.</p>
            </div>

            <div className="spark-sweep" id="sweep"></div>
            <button className="skip" id="skip">Skip Intro</button>
          </section>
        </>
      )}

      <nav className="ind-nav">
        <div className="px-8 md:px-16 lg:px-24 py-5 flex items-center justify-between">
          <div className="nav-brand">FORGE<span className="dot">.</span>WORKS</div>
          <div className="hidden md:flex items-center gap-9">
            {navLinks.map((l) => (
              <span key={l} className="nav-link">{l}</span>
            ))}
          </div>
          <button className="nav-cta">Request a Quote</button>
        </div>
      </nav>

      <div className="px-8 md:px-16 lg:px-24 py-24">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="sec-label-line" />
            <span className="sec-label-text">Our Capabilities</span>
          </div>

          <h2
            className="text-white mb-3"
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(2.2rem, 4.4vw, 3.4rem)",
              fontWeight: 600,
              letterSpacing: "0.01em",
              lineHeight: 1.1,
            }}
          >
            Fabrication Showcase
          </h2>

          <div className="h-px w-24 bg-gradient-to-r from-[#E5383B] to-transparent mb-8" />

          <p
            className="max-w-2xl"
            style={{ color: "#B5B5B5", fontSize: "1.08rem", lineHeight: 1.9, fontWeight: 300 }}
          >
            Discover the excellence and precision that define our fabrication services.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-16">
          {facilities.map((f, i) => (
            <motion.div
              key={f.name}
              className="fac-card p-9 rounded-sm"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="fac-icon">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={f.icon} />
                  </svg>
                </div>

                <span
                  className="px-3 py-1 border rounded-full uppercase"
                  style={{
                    color: "#B5B5B5",
                    borderColor: "rgba(229,56,59,0.3)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.2em",
                  }}
                >
                  {f.tag}
                </span>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <span
                  style={{
                    color: "#E5383B",
                    fontFamily: "Georgia, serif",
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3
                  className="fac-title"
                  style={{ fontFamily: "Georgia, serif", fontSize: "1.5rem", fontWeight: 600 }}
                >
                  {f.name}
                </h3>
              </div>

              <p style={{ color: "#B5B5B5", fontSize: "0.92rem", lineHeight: 1.8, fontWeight: 300 }}>
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
