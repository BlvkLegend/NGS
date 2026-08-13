"use client";

import { motion } from "framer-motion";
import { useMode } from "@/lib/mode-context";
import { asset } from "@/lib/asset";

/* ─── Step illustration SVGs ────────────────────────────────────────────── */

function IllustrationFind() {
  return (
    <svg viewBox="0 0 280 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      {/* bg pattern */}
      <rect width="280" height="200" fill="transparent"/>
      {/* character body */}
      <ellipse cx="80" cy="170" rx="38" ry="12" fill="#0a2e22" opacity="0.3"/>
      <rect x="55" y="100" width="50" height="65" rx="12" fill="#16a34a"/>
      {/* head */}
      <circle cx="80" cy="88" r="24" fill="#6B3F1A"/>
      {/* hair */}
      <ellipse cx="80" cy="68" rx="24" ry="10" fill="#1a0a00"/>
      {/* magnifying glass handle */}
      <line x1="130" y1="115" x2="155" y2="140" stroke="#d97706" strokeWidth="7" strokeLinecap="round"/>
      {/* magnifying glass circle */}
      <circle cx="110" cy="96" r="34" fill="none" stroke="#d97706" strokeWidth="6"/>
      <circle cx="110" cy="96" r="28" fill="rgba(255,255,255,0.08)"/>
      {/* three leader portrait squares inside glass */}
      <rect x="90" y="78" width="16" height="18" rx="3" fill="#22c55e"/>
      <circle cx="98" cy="83" r="4" fill="#fff"/>
      <rect x="110" y="78" width="16" height="18" rx="3" fill="#f97316"/>
      <circle cx="118" cy="83" r="4" fill="#fff"/>
      <rect x="100" y="98" width="16" height="18" rx="3" fill="#3b82f6"/>
      <circle cx="108" cy="103" r="4" fill="#fff"/>
      {/* arms */}
      <path d="M55 120 Q30 108 40 95" stroke="#6B3F1A" strokeWidth="10" strokeLinecap="round" fill="none"/>
      <path d="M105 110 Q115 95 125 88" stroke="#6B3F1A" strokeWidth="10" strokeLinecap="round" fill="none"/>
      {/* legs */}
      <rect x="62" y="162" width="14" height="28" rx="7" fill="#1c1c1e"/>
      <rect x="82" y="162" width="14" height="28" rx="7" fill="#1c1c1e"/>
      {/* question marks floating */}
      <text x="185" y="70" fontSize="28" fill="#22c55e" opacity="0.8" fontWeight="bold">?</text>
      <text x="210" y="110" fontSize="18" fill="#f97316" opacity="0.6" fontWeight="bold">?</text>
      <text x="170" y="130" fontSize="14" fill="#22c55e" opacity="0.4" fontWeight="bold">?</text>
    </svg>
  );
}

function IllustrationAnswer() {
  return (
    <svg viewBox="0 0 280 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <rect width="280" height="200" fill="transparent"/>
      {/* desk shadow */}
      <ellipse cx="150" cy="185" rx="80" ry="10" fill="#0a2e22" opacity="0.25"/>
      {/* desk */}
      <rect x="60" y="145" width="170" height="14" rx="4" fill="#6b3f1a" opacity="0.8"/>
      {/* papers on desk */}
      <rect x="90" y="100" width="80" height="50" rx="5" fill="#fff" transform="rotate(-4 130 125)"/>
      <rect x="95" y="105" width="70" height="40" rx="4" fill="#f8fafc" transform="rotate(-4 130 125)"/>
      {/* checkmarks on paper */}
      <text x="100" y="118" fontSize="11" fill="#16a34a" transform="rotate(-4 130 125)">✓ Infrastructure</text>
      <text x="100" y="130" fontSize="11" fill="#16a34a" transform="rotate(-4 130 125)">✓ Education</text>
      <text x="100" y="142" fontSize="11" fill="#d4d4d4" transform="rotate(-4 130 125)">○ Security</text>
      {/* progress dots */}
      <circle cx="120" cy="88" r="5" fill="#22c55e"/>
      <circle cx="135" cy="88" r="5" fill="#22c55e"/>
      <circle cx="150" cy="88" r="5" fill="#22c55e"/>
      <circle cx="165" cy="88" r="5" fill="#d4d4d4" opacity="0.4"/>
      <circle cx="180" cy="88" r="5" fill="#d4d4d4" opacity="0.4"/>
      {/* character */}
      <circle cx="65" cy="100" r="22" fill="#8B5A2B"/>
      <ellipse cx="65" cy="80" rx="22" ry="9" fill="#1a0a00"/>
      <rect x="42" y="120" width="45" height="55" rx="10" fill="#f97316"/>
      {/* arm with pen */}
      <path d="M87 125 Q115 115 130 118" stroke="#8B5A2B" strokeWidth="9" strokeLinecap="round" fill="none"/>
      <line x1="130" y1="118" x2="145" y2="112" stroke="#d97706" strokeWidth="4" strokeLinecap="round"/>
      <line x1="142" y1="111" x2="147" y2="106" stroke="#f5f5f5" strokeWidth="3" strokeLinecap="round"/>
      {/* legs */}
      <rect x="50" y="172" width="13" height="24" rx="6" fill="#1c1c1e"/>
      <rect x="68" y="172" width="13" height="24" rx="6" fill="#1c1c1e"/>
    </svg>
  );
}

function IllustrationCard() {
  return (
    <svg viewBox="0 0 280 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <rect width="280" height="200" fill="transparent"/>
      {/* glow behind card */}
      <ellipse cx="185" cy="110" rx="60" ry="50" fill="#22c55e" opacity="0.12"/>
      {/* NGSC card */}
      <rect x="140" y="55" width="105" height="140" rx="10" fill="#0a2e22"/>
      <rect x="140" y="55" width="105" height="140" rx="10" fill="url(#cardGrad)" opacity="0.9"/>
      <defs>
        <linearGradient id="cardGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#167a4a"/>
          <stop offset="100%" stopColor="#0a2e22"/>
        </linearGradient>
      </defs>
      <text x="152" y="78" fontSize="9" fill="rgba(255,255,255,0.5)" fontWeight="600" letterSpacing="2">NGSC</text>
      <text x="152" y="92" fontSize="9" fill="rgba(255,255,255,0.7)">Adaeze Nwosu</text>
      <text x="152" y="103" fontSize="7" fill="rgba(255,255,255,0.45)">Governor · Enugu</text>
      {/* grade circle */}
      <circle cx="222" cy="85" r="22" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
      <text x="213" y="91" fontSize="18" fontWeight="900" fill="#fff">B+</text>
      {/* bars */}
      <rect x="152" y="115" width="45" height="4" rx="2" fill="rgba(255,255,255,0.2)"/>
      <rect x="152" y="115" width="37" height="4" rx="2" fill="#22c55e"/>
      <rect x="152" y="125" width="45" height="4" rx="2" fill="rgba(255,255,255,0.2)"/>
      <rect x="152" y="125" width="28" height="4" rx="2" fill="#22c55e"/>
      <rect x="152" y="135" width="45" height="4" rx="2" fill="rgba(255,255,255,0.2)"/>
      <rect x="152" y="135" width="33" height="4" rx="2" fill="#22c55e"/>
      <text x="152" y="175" fontSize="6" fill="rgba(255,255,255,0.3)">ngsc.ng</text>
      <text x="205" y="175" fontSize="7" fontWeight="700" fill="rgba(255,255,255,0.5)">74/100</text>
      {/* character holding card */}
      <circle cx="75" cy="88" r="24" fill="#4A2810"/>
      <ellipse cx="75" cy="67" rx="24" ry="10" fill="#111"/>
      <rect x="52" y="110" width="46" height="60" rx="12" fill="#3b82f6"/>
      {/* arms raised */}
      <path d="M52 118 Q30 100 35 80" stroke="#4A2810" strokeWidth="11" strokeLinecap="round" fill="none"/>
      <path d="M98 115 Q125 95 140 80" stroke="#4A2810" strokeWidth="11" strokeLinecap="round" fill="none"/>
      {/* legs */}
      <rect x="60" y="167" width="13" height="26" rx="6" fill="#1c1c1e"/>
      <rect x="79" y="167" width="13" height="26" rx="6" fill="#1c1c1e"/>
      {/* stars/sparkles */}
      <text x="30" y="75" fontSize="18" fill="#fbbf24" opacity="0.8">★</text>
      <text x="112" y="55" fontSize="12" fill="#22c55e" opacity="0.7">✦</text>
    </svg>
  );
}

function IllustrationShare() {
  return (
    <svg viewBox="0 0 280 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <rect width="280" height="200" fill="transparent"/>
      {/* crowd silhouettes at back */}
      <ellipse cx="220" cy="160" rx="50" ry="35" fill="#0a2e22" opacity="0.4"/>
      <circle cx="200" cy="145" r="14" fill="#1a2a1a" opacity="0.7"/>
      <rect x="188" y="158" width="24" height="30" rx="8" fill="#1a2a1a" opacity="0.6"/>
      <circle cx="235" cy="148" r="12" fill="#1a2a1a" opacity="0.6"/>
      <rect x="224" y="159" width="22" height="28" rx="7" fill="#1a2a1a" opacity="0.5"/>
      {/* phone with NGSC card */}
      <rect x="88" y="75" width="72" height="110" rx="12" fill="#1c1c1e" stroke="#333" strokeWidth="1.5"/>
      <rect x="93" y="83" width="62" height="94" rx="8" fill="#0a2e22"/>
      {/* card on phone */}
      <text x="100" y="98" fontSize="6" fill="rgba(255,255,255,0.5)" fontWeight="600" letterSpacing="2">NGSC</text>
      <text x="100" y="108" fontSize="7" fill="rgba(255,255,255,0.7)">Adaeze Nwosu</text>
      <circle cx="142" cy="100" r="14" fill="rgba(255,255,255,0.12)"/>
      <text x="135" y="105" fontSize="11" fontWeight="900" fill="#fff">B+</text>
      <rect x="100" y="118" width="42" height="3" rx="1.5" fill="rgba(255,255,255,0.15)"/>
      <rect x="100" y="118" width="32" height="3" rx="1.5" fill="#22c55e"/>
      <rect x="100" y="125" width="42" height="3" rx="1.5" fill="rgba(255,255,255,0.15)"/>
      <rect x="100" y="125" width="25" height="3" rx="1.5" fill="#22c55e"/>
      {/* share arc lines */}
      <path d="M160 120 Q185 95 165 70" stroke="#22c55e" strokeWidth="2.5" strokeDasharray="4 3" fill="none" opacity="0.7"/>
      <path d="M162 122 Q200 110 205 135" stroke="#22c55e" strokeWidth="2.5" strokeDasharray="4 3" fill="none" opacity="0.6"/>
      {/* social icons */}
      <circle cx="170" cy="62" r="12" fill="#25D366"/>
      <text x="165" y="67" fontSize="12" fill="#fff">W</text>
      <circle cx="195" cy="130" r="12" fill="#111"/>
      <text x="190" y="135" fontSize="12" fill="#fff">X</text>
      {/* character */}
      <circle cx="58" cy="90" r="22" fill="#8B5A2B"/>
      <ellipse cx="58" cy="71" rx="22" ry="9" fill="#111"/>
      <rect x="36" y="110" width="44" height="58" rx="10" fill="#8b5cf6"/>
      <path d="M80 118 Q100 108 90 90" stroke="#8B5A2B" strokeWidth="9" strokeLinecap="round" fill="none"/>
      <path d="M36 118 Q20 105 25 88" stroke="#8B5A2B" strokeWidth="9" strokeLinecap="round" fill="none"/>
      <rect x="44" y="165" width="12" height="26" rx="6" fill="#1c1c1e"/>
      <rect x="62" y="165" width="12" height="26" rx="6" fill="#1c1c1e"/>
    </svg>
  );
}

/* ─── Step data ──────────────────────────────────────────────────────────── */

const STEPS = {
  taxpayer: [
    {
      label: "Find the official",
      body: "Search by name, state, or office.",
      Illustration: IllustrationFind,
    },
    {
      label: "Answer ten questions",
      body: "Infrastructure, transparency, health, and more.",
      Illustration: IllustrationAnswer,
    },
    {
      label: "Get your NGSC card",
      body: "A grade, a score, and category breakdowns.",
      Illustration: IllustrationCard,
    },
    {
      label: "Post it. Let it hold.",
      body: "It enters the public record.",
      Illustration: IllustrationShare,
    },
  ],
  cruise: [
    {
      label: "Find who you wan drag",
      body: "Search their name, state, or office.",
      Illustration: IllustrationFind,
    },
    {
      label: "Answer ten gbege questions",
      body: "Infrastructure, health, school, and more.",
      Illustration: IllustrationAnswer,
    },
    {
      label: "Collect your NGSC card",
      body: "Grade, score, and full breakdown.",
      Illustration: IllustrationCard,
    },
    {
      label: "Drop am, make dem see.",
      body: "E enter the record.",
      Illustration: IllustrationShare,
    },
  ],
};

export function HowItWorks() {
  const { mode } = useMode();
  const steps = STEPS[mode];
  const isCruise = mode === "cruise";

  return (
    <section id="how-it-works" className="mx-auto max-w-[1400px] scroll-mt-16">
      {/* Photo hero band — Lagos National Theatre */}
      <div className="relative -mx-6 h-44 overflow-hidden lg:-mx-10 sm:h-52">
        <img
          src={asset("/lagos-landmark.jpg")}
          alt=""
          aria-hidden
          loading="lazy"
          className="h-full w-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.50) 55%, rgba(0,0,0,0.20) 100%), " +
              "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%)",
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-5 lg:px-10">
          <span className="ledger-index text-[12px] text-forest-300">
            {isCruise ? "02 / how e dey work" : "Process"}
          </span>
          <h2 className="mt-1 max-w-md text-2xl font-bold text-paper sm:text-3xl">
            {isCruise ? "Four steps, one gist." : "Four steps, one record."}
          </h2>
        </div>
      </div>

      {/* Step cards */}
      <div className="px-6 py-8 lg:px-10">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex flex-col overflow-hidden rounded-2xl border border-line bg-paper-raised dark:border-white/8 dark:bg-white/5"
            >
              {/* Illustration area */}
              <div className="h-44 bg-forest-tint/40 dark:bg-[#0f1a0f]">
                <step.Illustration />
              </div>
              {/* Text */}
              <div className="border-t border-line p-4 dark:border-white/8">
                <h3 className="text-[14px] font-semibold text-ink">{step.label}</h3>
                <p className="mt-0.5 text-[12px] leading-relaxed text-ink-muted">{step.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
