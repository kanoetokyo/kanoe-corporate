/**
 * ブルーカラー軍師 Landing Page
 * Design: Neo-Minimalism × Craftsman Sincerity
 * Colors: Navy #1e3a5f / Off-white #f8f8f7 / Gold #c9a84c / Dark Navy #0f2540
 * Font: Noto Sans JP
 * Layout: Left-aligned, thin borders, numbered lists
 * Concept: 大将（一人親方）を戦略的に支える軍師・経営参謀
 */

import { useState, useEffect, useRef } from "react";

const C = {
  navy: "#1e3a5f",
  darkNavy: "#0f2540",
  gold: "#c9a84c",
  offWhite: "#f8f8f7",
  text: "#1a1a19",
  textMuted: "rgba(255,255,255,0.65)",
  textLight: "rgba(255,255,255,0.85)",
};

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393929968/iYwBZn5CdVZAZNoSzLfUqs/temoto-hero-bg-3CWWaY2FU4McBxx3zNaaUF.webp";
const PROBLEM_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393929968/iYwBZn5CdVZAZNoSzLfUqs/temoto-problem-bg-mW2wTd4GobMQo5He3esn4h.webp";
const CTA_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393929968/iYwBZn5CdVZAZNoSzLfUqs/temoto-cta-bg-DypGZzMWEat2pC4oXS7tie.webp";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const problems = [
  { num: "01", title: "雇用したいけど、一歩が踏み出せない", desc: "採用にかかるコストや手間、失敗したときのリスクを考えると、なかなか動けない。大将一人で戦い続けるのにも限界がある。" },
  { num: "02", title: "採用しても辞められる・独立される繰り返し", desc: "せっかく育てた人材が辞めていく。独立されて競合になることも。雇用に良い経験がない。" },
  { num: "03", title: "現場は回っているが、会社が成長しない", desc: "組織化はできたが現状維持から抜け出せない。売上が頭打ちで次の戦略が見えない。" },
  { num: "04", title: "一人親方から経営者になりたいが何から始めればいい？", desc: "技術という武器はある。でも経営という戦略は誰も教えてくれなかった。マインドの切り替え方がわからない。" },
  { num: "05", title: "現場仕事と経営の両立ができていない", desc: "自分が現場に出ないと回らない。大将が前線に出続けていては、組織は大きくなれない。" },
];

const reasons = [
  { num: "01", title: "現場叩き上げのリアルな経験", desc: "机上の兵法ではなく、実際にブルーカラーの現場で積み上げた経験をもとに戦略を立てます。" },
  { num: "02", title: "ブルーカラー専門に特化", desc: "建設・清掃・塗装など、ブルーカラー業種特有の課題と文化を深く理解した軍師です。" },
  { num: "03", title: "オンラインサロンで継続的に伴走", desc: "単発の作戦会議ではなく、定期的な発信と交流で、時間をかけてマインドを変えていきます。" },
  { num: "04", title: "一人親方から組織化まで一気通貫", desc: "雇用の第一歩から、組織の拡大・DX推進まで、成長ステージに合わせて戦略を共に描きます。" },
];

export default function Temoto() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", company: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = "ブルーカラー軍師｜ブルーカラー経営者の経営参謀・戦略コンサルティング";
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const navLinks = [
    { label: "軍師とは", id: "about" },
    { label: "こんな方へ", id: "problems" },
    { label: "選ばれる理由", id: "reasons" },
    { label: "料金", id: "pricing" },
    { label: "お問い合わせ", id: "contact" },
  ];

  return (
    <div style={{ fontFamily: "'Noto Sans JP', sans-serif", backgroundColor: C.offWhite, color: C.text }}>
      {/* ===== HEADER ===== */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: scrolled ? "rgba(15,37,64,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? `1px solid rgba(201,168,76,0.2)` : "none",
          transition: "all 0.3s ease",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <button onClick={() => scrollTo("hero")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: "0.06em", color: C.gold }}>ブルーカラー軍師</span>
          </button>

          {/* Desktop nav */}
          <nav style={{ display: "flex", gap: 32, alignItems: "center" }} className="hidden md:flex">
            {navLinks.map(l => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "rgba(255,255,255,0.8)", letterSpacing: "0.06em", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = C.gold)}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
              >
                {l.label}
              </button>
            ))}
            <a
              href="https://lin.ee/FyWcNMb"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 12, fontWeight: 600, padding: "8px 18px", backgroundColor: C.gold, color: "#fff", letterSpacing: "0.06em", textDecoration: "none", transition: "opacity 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              LINE相談
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5, padding: 4 }}
            className="md:hidden"
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{ display: "block", width: 22, height: 1.5, backgroundColor: C.gold, transition: "all 0.3s" }} />
            ))}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ backgroundColor: C.darkNavy, borderTop: `1px solid rgba(201,168,76,0.2)`, padding: "16px 24px 24px" }}>
            {navLinks.map(l => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "rgba(255,255,255,0.8)", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.08)", letterSpacing: "0.06em" }}
              >
                {l.label}
              </button>
            ))}
            <a
              href="https://lin.ee/FyWcNMb"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "block", marginTop: 16, textAlign: "center", fontSize: 13, fontWeight: 600, padding: "12px", backgroundColor: C.gold, color: "#fff", textDecoration: "none", letterSpacing: "0.06em" }}
            >
              LINEで無料相談
            </a>
          </div>
        )}
      </header>

      {/* ===== HERO ===== */}
      <section
        id="hero"
        style={{
          minHeight: "100vh",
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(10,25,45,0.72)" }} />
        <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto", padding: "0 24px", paddingTop: 80 }}>
          <div style={{ maxWidth: 700 }}>
            <p style={{ fontSize: 11, letterSpacing: "0.22em", color: C.gold, marginBottom: 20, textTransform: "uppercase" }}>
              Blue-collar Strategic Consulting
            </p>
            <h1 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 700, color: "#fff", letterSpacing: "0.06em", lineHeight: 1.2, marginBottom: 20 }}>
              ブルーカラー軍師
            </h1>
            <div style={{ width: 48, height: 2, backgroundColor: C.gold, marginBottom: 28 }} />
            <p style={{ fontSize: "clamp(15px, 2.2vw, 19px)", color: C.textLight, lineHeight: 1.7, marginBottom: 12, fontWeight: 500 }}>
              大将（一人親方）の隣に、軍師を。
            </p>
            <p style={{ fontSize: "clamp(13px, 1.6vw, 15px)", color: C.textMuted, lineHeight: 1.9, marginBottom: 48, maxWidth: 560 }}>
              現場で圧倒的な力を持つブルーカラーの大将が、経営という戦場でも勝ち続けるために。<br />
              現場叩き上げの経営参謀が、あなたの会社の軍師として戦略を共に描きます。
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a
                href="https://lin.ee/FyWcNMb"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, padding: "14px 32px", backgroundColor: C.gold, color: "#fff", textDecoration: "none", letterSpacing: "0.06em", transition: "opacity 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                LINEで無料相談する
              </a>
              <button
                onClick={() => scrollTo("about")}
                style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 500, padding: "14px 32px", backgroundColor: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.4)", cursor: "pointer", letterSpacing: "0.06em", transition: "border-color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = C.gold)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)")}
              >
                詳しく見る
              </button>
            </div>
          </div>
        </div>
        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 10, letterSpacing: "0.18em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: 1, height: 40, backgroundColor: "rgba(255,255,255,0.2)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "40%", backgroundColor: C.gold, animation: "scrollLine 1.8s ease-in-out infinite" }} />
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" style={{ padding: "96px 24px", backgroundColor: C.offWhite }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontSize: 11, letterSpacing: "0.22em", color: C.gold, textTransform: "uppercase", marginBottom: 16 }}>About</p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }} className="grid-cols-1 md:grid-cols-2">
            <Reveal delay={100}>
              <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 700, color: C.darkNavy, lineHeight: 1.5, marginBottom: 0 }}>
                「軍師」とは、<br />
                <span style={{ color: C.gold }}>大将を勝たせるための<br />戦略家</span>のこと。
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <div style={{ borderLeft: `2px solid ${C.gold}`, paddingLeft: 28 }}>
                <p style={{ fontSize: 15, lineHeight: 1.9, color: "#444", marginBottom: 20 }}>
                  戦国時代、武将（大将）の隣には必ず軍師がいました。現場で圧倒的な力を持つ大将が、戦略という視点を持つ軍師と組むことで、はじめて天下を取ることができた。
                </p>
                <p style={{ fontSize: 15, lineHeight: 1.9, color: "#444", marginBottom: 20 }}>
                  現代のブルーカラー経営も同じです。建設・清掃・塗装などの現場で圧倒的な技術と信頼を持つ一人親方（大将）が、経営という戦場でも勝ち続けるためには、戦略を共に描く軍師が必要です。
                </p>
                <p style={{ fontSize: 15, lineHeight: 1.9, color: "#444" }}>
                  ブルーカラー軍師は、現場叩き上げの経営参謀として、あなたの会社の軍師になります。オンラインサロン「脱一人親方塾」を通じて、一人親方から経営者へのマインドチェンジを時間をかけてサポートします。
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== PROBLEMS ===== */}
      <section
        id="problems"
        style={{
          padding: "96px 24px",
          backgroundImage: `url(${PROBLEM_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(10,25,45,0.88)" }} />
        <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontSize: 11, letterSpacing: "0.22em", color: C.gold, textTransform: "uppercase", marginBottom: 16 }}>Common Problems</p>
            <h2 style={{ fontSize: "clamp(22px, 3.2vw, 36px)", fontWeight: 700, color: "#fff", marginBottom: 56 }}>
              こんな悩みを抱えていませんか？
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 1, backgroundColor: "rgba(255,255,255,0.08)" }}>
            {problems.map((p, i) => (
              <Reveal key={p.num} delay={i * 80}>
                <div
                  style={{ padding: "32px 28px", backgroundColor: "rgba(15,37,64,0.6)", backdropFilter: "blur(4px)", height: "100%" }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(201,168,76,0.12)")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "rgba(15,37,64,0.6)")}
                >
                  <span style={{ fontSize: 11, letterSpacing: "0.18em", color: C.gold, display: "block", marginBottom: 12 }}>{p.num}</span>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: "#fff", marginBottom: 10, lineHeight: 1.5 }}>{p.title}</h3>
                  <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.8 }}>{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={500}>
            <div style={{ marginTop: 48, padding: "24px 28px", borderLeft: `3px solid ${C.gold}`, backgroundColor: "rgba(201,168,76,0.08)" }}>
              <p style={{ fontSize: 15, color: C.textLight, lineHeight: 1.8 }}>
                大将一人で戦い続けることに、もう限界を感じていませんか？<br />
                <strong style={{ color: C.gold }}>ブルーカラー軍師は、あなたの経営の「駆け込み寺」です。</strong>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== SERVICE ===== */}
      <section style={{ padding: "96px 24px", backgroundColor: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontSize: 11, letterSpacing: "0.22em", color: C.gold, textTransform: "uppercase", marginBottom: 16 }}>Our Service</p>
            <h2 style={{ fontSize: "clamp(22px, 3.2vw, 36px)", fontWeight: 700, color: C.darkNavy, marginBottom: 56 }}>
              ブルーカラー軍師のサービス
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, backgroundColor: "#eee" }} className="grid-cols-1 md:grid-cols-2">
            {/* Service 1 */}
            <Reveal delay={100}>
              <div style={{ backgroundColor: C.darkNavy, padding: "48px 40px" }}>
                <p style={{ fontSize: 11, letterSpacing: "0.22em", color: C.gold, textTransform: "uppercase", marginBottom: 16 }}>Main Service</p>
                <h3 style={{ fontSize: "clamp(18px, 2.2vw, 26px)", fontWeight: 700, color: "#fff", marginBottom: 20, lineHeight: 1.4 }}>
                  脱一人親方塾
                </h3>
                <div style={{ width: 32, height: 1, backgroundColor: C.gold, marginBottom: 24 }} />
                <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.9, marginBottom: 24 }}>
                  オンラインサロン形式で、定期的な発信・動画・コミュニティ交流を通じて、一人親方（大将）から経営者へのマインドチェンジを時間をかけてサポートします。すでに組織化している会社の「成長停滞の打破」にも有効です。
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {["毎月の経営戦略コンテンツ配信", "メンバー限定コミュニティ", "個別相談（LINEサポート）", "組織化ロードマップの提供"].map((item, i) => (
                    <li key={i} style={{ fontSize: 13, color: C.textLight, padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: C.gold, flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            {/* Service 2 */}
            <Reveal delay={200}>
              <div style={{ backgroundColor: C.offWhite, padding: "48px 40px" }}>
                <p style={{ fontSize: 11, letterSpacing: "0.22em", color: C.navy, textTransform: "uppercase", marginBottom: 16 }}>For All Stages</p>
                <h3 style={{ fontSize: "clamp(18px, 2.2vw, 26px)", fontWeight: 700, color: C.darkNavy, marginBottom: 20, lineHeight: 1.4 }}>
                  大将の成長ステージに<br />合わせて伴走します
                </h3>
                <div style={{ width: 32, height: 1, backgroundColor: C.navy, marginBottom: 24 }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    { stage: "Stage 01", title: "一人親方（大将）", desc: "雇用の第一歩を踏み出したい。経営者マインドを身につけたい。" },
                    { stage: "Stage 02", title: "小規模組織（2〜10名）", desc: "採用・定着に悩んでいる。組織の仕組みを作りたい。" },
                    { stage: "Stage 03", title: "中規模組織（10〜20名）", desc: "成長が止まっている。DXを進めたい。次の戦略を考えたい。" },
                  ].map((s, i) => (
                    <div key={i} style={{ padding: "16px 20px", backgroundColor: "#fff", borderLeft: `3px solid ${C.navy}` }}>
                      <span style={{ fontSize: 10, letterSpacing: "0.18em", color: C.gold, textTransform: "uppercase" }}>{s.stage}</span>
                      <p style={{ fontSize: 14, fontWeight: 600, color: C.darkNavy, margin: "4px 0" }}>{s.title}</p>
                      <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7 }}>{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== REASONS ===== */}
      <section id="reasons" style={{ padding: "96px 24px", backgroundColor: C.offWhite }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontSize: 11, letterSpacing: "0.22em", color: C.gold, textTransform: "uppercase", marginBottom: 16 }}>Why Us</p>
            <h2 style={{ fontSize: "clamp(22px, 3.2vw, 36px)", fontWeight: 700, color: C.darkNavy, marginBottom: 56 }}>
              ブルーカラー軍師が選ばれる理由
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 32 }}>
            {reasons.map((r, i) => (
              <Reveal key={r.num} delay={i * 100}>
                <div style={{ borderTop: `2px solid ${C.gold}`, paddingTop: 24 }}>
                  <span style={{ fontSize: 32, fontWeight: 700, color: "rgba(201,168,76,0.2)", letterSpacing: "0.05em", display: "block", marginBottom: 8 }}>{r.num}</span>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: C.darkNavy, marginBottom: 12, lineHeight: 1.5 }}>{r.title}</h3>
                  <p style={{ fontSize: 13, color: "#555", lineHeight: 1.8 }}>{r.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section id="pricing" style={{ padding: "96px 24px", backgroundColor: C.darkNavy }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontSize: 11, letterSpacing: "0.22em", color: C.gold, textTransform: "uppercase", marginBottom: 16 }}>Pricing</p>
            <h2 style={{ fontSize: "clamp(22px, 3.2vw, 36px)", fontWeight: 700, color: "#fff", marginBottom: 56 }}>
              料金プラン
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <div style={{ maxWidth: 520, border: `1px solid rgba(201,168,76,0.4)`, padding: "48px 40px", position: "relative" }}>
              <div style={{ position: "absolute", top: -1, left: 32, right: 32, height: 3, backgroundColor: C.gold }} />
              <p style={{ fontSize: 11, letterSpacing: "0.22em", color: C.gold, textTransform: "uppercase", marginBottom: 12 }}>脱一人親方塾</p>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 24 }}>オンラインサロン会員プラン</h3>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 48, fontWeight: 700, color: C.gold }}>¥5,500</span>
                <span style={{ fontSize: 14, color: C.textMuted }}>/ 月（税込）</span>
              </div>
              <p style={{ fontSize: 12, color: C.textMuted, marginBottom: 32 }}>初月無料・いつでも解約可能</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px" }}>
                {["毎月の経営戦略コンテンツ・動画配信", "メンバー限定コミュニティへのアクセス", "LINEサポート（個別相談）", "組織化ロードマップの提供", "過去コンテンツのアーカイブ閲覧"].map((item, i) => (
                  <li key={i} style={{ fontSize: 13, color: C.textLight, padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ color: C.gold, fontSize: 16 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="https://lin.ee/FyWcNMb"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block", textAlign: "center", fontSize: 14, fontWeight: 600, padding: "14px 32px", backgroundColor: C.gold, color: "#fff", textDecoration: "none", letterSpacing: "0.06em", transition: "opacity 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                LINEで申し込む・詳細を聞く
              </a>
            </div>
          </Reveal>
          <Reveal delay={250}>
            <p style={{ fontSize: 13, color: C.textMuted, marginTop: 24 }}>
              ※ 個別コンサルティング・スポット相談については、LINEまたはお問い合わせフォームよりご相談ください。
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== PROFILE ===== */}
      <section style={{ padding: "96px 24px", backgroundColor: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontSize: 11, letterSpacing: "0.22em", color: C.gold, textTransform: "uppercase", marginBottom: 16 }}>Profile</p>
            <h2 style={{ fontSize: "clamp(22px, 3.2vw, 36px)", fontWeight: 700, color: C.darkNavy, marginBottom: 56 }}>
              軍師プロフィール
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 56, alignItems: "start" }} className="grid-cols-1 md:grid-cols-profile">
              {/* Photo */}
              <div>
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663393929968/iYwBZn5CdVZAZNoSzLfUqs/profile-teshigahara3_164381b5.jpg"
                  alt="勅使河原 将"
                  style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", objectPosition: "center top", display: "block" }}
                />
              </div>
              {/* Bio */}
              <div>
                <div style={{ borderLeft: `2px solid ${C.gold}`, paddingLeft: 28 }}>
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: C.darkNavy, marginBottom: 4 }}>
                    勅使河原 将（テシガハラ ショウ）
                  </h3>
                  <p style={{ fontSize: 13, color: C.gold, letterSpacing: "0.1em", marginBottom: 24 }}>
                    ブルーカラー軍師 主宰 / 株式会社カノエ 代表取締役
                  </p>
                  <p style={{ fontSize: 14, color: "#444", lineHeight: 1.9, marginBottom: 24 }}>
                    福岡県北九州市出身、37歳。同志社大学文学部英文学科卒業後、ニトリに新卒入社。店舗運営・新卒採用・海外事業を経験した後、JETROの南アフリカ駐在、航空系スタートアップのハワイ事業担当を経て、31歳で脱サラ。
                    2019年8月、おそうじ本舗大井町店を個人事業主として開業。2020年に株式会社カノエとして法人化。現在は東京・神奈川・大阪で7店舗を展開し、従業員20名超・年商1億円を突破。
                    <br /><br />
                    「ホワイトカラーの経営スキル×ブルーカラーの現場力」を掛け合わせ、一人親方から組織化・拡大を実現してきた経験をもとに、同じ課題を抱えるブルーカラー経営者の軍師として伴走するサービスを立ち上げる。
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {[
                      { label: "キャリア", value: "ニトリ（店舗・採用・海外事業）→ JETRO南アフリカ駐在 → 航空系スタートアップ（ハワイ事業）→ 独立開業" },
                      { label: "実績", value: "おそうじ本舗7店舗展開 / 従業員20名超 / 年商1億円突破 / テレビ朝日グッド！モーニング・ZIP・ヒルナンデス出演" },
                      { label: "趣味", value: "トライアスロン（マレーシアでIronmanロング完走）・ボディメイク・大掃除と模様替え" },
                    ].map((item, i) => (
                      <div key={i} style={{ padding: "12px 16px", backgroundColor: C.offWhite, borderLeft: `3px solid ${C.gold}` }}>
                        <p style={{ fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: "0.1em", marginBottom: 4 }}>{item.label}</p>
                        <p style={{ fontSize: 13, color: "#555", lineHeight: 1.7 }}>{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section
        style={{
          padding: "80px 24px",
          backgroundImage: `url(${CTA_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          textAlign: "center",
        }}
      >
        <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(10,25,45,0.80)" }} />
        <div style={{ position: "relative" }}>
          <Reveal>
            <p style={{ fontSize: 11, letterSpacing: "0.22em", color: C.gold, textTransform: "uppercase", marginBottom: 16 }}>Get Started</p>
            <h2 style={{ fontSize: "clamp(20px, 3.2vw, 34px)", fontWeight: 700, color: "#fff", marginBottom: 16, lineHeight: 1.6 }}>
              大将の隣に、軍師を。<br />まずは無料でLINE相談してください。
            </h2>
            <p style={{ fontSize: 14, color: C.textMuted, marginBottom: 40, lineHeight: 1.8 }}>
              相談は無料です。あなたの現状と目標を聞かせてください。<br />
              一緒に次の戦略を考えましょう。
            </p>
            <a
              href="https://lin.ee/FyWcNMb"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 15, fontWeight: 600, padding: "16px 40px", backgroundColor: C.gold, color: "#fff", textDecoration: "none", letterSpacing: "0.06em", transition: "opacity 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              LINEで無料相談する
            </a>
          </Reveal>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" style={{ padding: "96px 24px", backgroundColor: C.offWhite }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontSize: 11, letterSpacing: "0.22em", color: C.gold, textTransform: "uppercase", marginBottom: 16 }}>Contact</p>
            <h2 style={{ fontSize: "clamp(22px, 3.2vw, 36px)", fontWeight: 700, color: C.darkNavy, marginBottom: 16 }}>
              お問い合わせ
            </h2>
            <p style={{ fontSize: 14, color: "#666", marginBottom: 48, lineHeight: 1.8 }}>
              LINEでの相談のほか、以下のフォームからもお問い合わせいただけます。<br />
              2営業日以内にご返信いたします。
            </p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64, alignItems: "start" }} className="grid-cols-1 md:grid-cols-contact">
            {/* LINE CTA */}
            <Reveal delay={100}>
              <div style={{ backgroundColor: C.darkNavy, padding: "32px 28px" }}>
                <p style={{ fontSize: 11, letterSpacing: "0.18em", color: C.gold, textTransform: "uppercase", marginBottom: 12 }}>Recommended</p>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 12 }}>LINEで相談する</h3>
                <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.8, marginBottom: 24 }}>
                  最も早くご返答できます。気軽にメッセージをお送りください。
                </p>
                <a
                  href="https://lin.ee/FyWcNMb"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "block", textAlign: "center", fontSize: 13, fontWeight: 600, padding: "12px 24px", backgroundColor: "#06C755", color: "#fff", textDecoration: "none", letterSpacing: "0.06em" }}
                >
                  LINEを開く
                </a>
              </div>
            </Reveal>
            {/* Form */}
            <Reveal delay={200}>
              {submitted ? (
                <div style={{ padding: "48px 32px", backgroundColor: "#fff", border: `1px solid ${C.gold}`, textAlign: "center" }}>
                  <span style={{ fontSize: 32, display: "block", marginBottom: 16 }}>✓</span>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: C.darkNavy, marginBottom: 8 }}>送信完了しました</h3>
                  <p style={{ fontSize: 14, color: "#666" }}>2営業日以内にご返信いたします。</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {[
                    { label: "お名前", key: "name", type: "text", placeholder: "山田 太郎", required: true },
                    { label: "会社名・屋号", key: "company", type: "text", placeholder: "（任意）株式会社〇〇 / 山田塗装", required: false },
                    { label: "メールアドレス", key: "email", type: "email", placeholder: "example@email.com", required: true },
                  ].map(f => (
                    <div key={f.key}>
                      <label style={{ fontSize: 12, fontWeight: 600, color: C.darkNavy, letterSpacing: "0.06em", display: "block", marginBottom: 6 }}>
                        {f.label}{f.required && <span style={{ color: C.gold, marginLeft: 4 }}>*</span>}
                      </label>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        required={f.required}
                        value={formData[f.key as keyof typeof formData]}
                        onChange={e => setFormData(prev => ({ ...prev, [f.key]: e.target.value }))}
                        style={{ width: "100%", padding: "12px 16px", border: "1px solid #ddd", fontSize: 14, outline: "none", backgroundColor: "#fff", boxSizing: "border-box", transition: "border-color 0.2s" }}
                        onFocus={e => (e.currentTarget.style.borderColor = C.navy)}
                        onBlur={e => (e.currentTarget.style.borderColor = "#ddd")}
                      />
                    </div>
                  ))}
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: C.darkNavy, letterSpacing: "0.06em", display: "block", marginBottom: 6 }}>
                      お問い合わせ内容 <span style={{ color: C.gold }}>*</span>
                    </label>
                    <textarea
                      placeholder="現在の状況やご相談内容をお書きください"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      style={{ width: "100%", padding: "12px 16px", border: "1px solid #ddd", fontSize: 14, outline: "none", resize: "vertical", backgroundColor: "#fff", boxSizing: "border-box", transition: "border-color 0.2s" }}
                      onFocus={e => (e.currentTarget.style.borderColor = C.navy)}
                      onBlur={e => (e.currentTarget.style.borderColor = "#ddd")}
                    />
                  </div>
                  <button
                    type="submit"
                    style={{ fontSize: 14, fontWeight: 600, padding: "14px 32px", backgroundColor: C.navy, color: "#fff", border: "none", cursor: "pointer", letterSpacing: "0.06em", transition: "opacity 0.2s", alignSelf: "flex-start" }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                    onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                  >
                    送信する
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ backgroundColor: C.darkNavy, padding: "40px 24px", borderTop: `1px solid rgba(201,168,76,0.2)` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: "0.06em", color: C.gold, display: "block", marginBottom: 4 }}>ブルーカラー軍師</span>
            <p style={{ fontSize: 12, color: C.textMuted }}>ブルーカラー経営者の経営参謀・戦略コンサルティングサービス</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
            <p style={{ fontSize: 12, color: C.textMuted }}>運営：株式会社カノエ</p>
            <a href="https://kanoe.biz" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: C.gold, textDecoration: "none" }}>
              kanoe.biz →
            </a>
          </div>
        </div>
        <div style={{ maxWidth: 1100, margin: "24px auto 0", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20, textAlign: "center" }}>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>© 2025 株式会社カノエ. All rights reserved.</p>
        </div>
      </footer>

      <style>{`
        @keyframes scrollLine {
          0% { top: -40%; }
          100% { top: 100%; }
        }
        @media (max-width: 768px) {
          .grid-cols-1 { grid-template-columns: 1fr !important; }
          .hidden { display: none !important; }
          .md\\:flex { display: flex !important; }
          .md\\:hidden { display: flex !important; }
        }
        @media (min-width: 769px) {
          .md\\:hidden { display: none !important; }
          .grid-cols-profile { grid-template-columns: 280px 1fr !important; }
          .grid-cols-contact { grid-template-columns: 1fr 2fr !important; }
        }
      `}</style>
    </div>
  );
}
