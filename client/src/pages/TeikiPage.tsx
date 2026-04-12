/**
 * 定期清掃サービス紹介ページ
 * Design: カノエコーポレートサイト準拠（ネイビー×オフホワイト×ゴールドアクセント）
 * リーフレット参考：法人・マンション＆アパートオーナー様向け、定期清掃のご案内
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393929968/iYwBZn5CdVZAZNoSzLfUqs/kanoe-logo_b797e5af.png";

const C = {
  bg: "#f8f8f7",
  bgWhite: "#ffffff",
  text: "#1a1a19",
  textMuted: "#858481",
  textLight: "#b0afac",
  border: "#e8e8e6",
  navy: "#1e3a5f",
  navyLight: "#2a5298",
  navyBg: "#eef2f8",
  accent: "#2a5298",
  blue: "#1976d2",
  blueBg: "#e3f2fd",
};

function ExternalIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 10L10 2M10 2H5M10 2V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// スクロールアニメーション
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

const services = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke={C.blue} strokeWidth="1.5"/>
        <path d="M3 9h18M9 21V9" stroke={C.blue} strokeWidth="1.5"/>
      </svg>
    ),
    title: "マンション定期清掃",
    frequency: "週1〜3回など",
    description: "エントランス・廊下の清掃、ゴミ回収",
    details: [
      "エントランス・廊下・階段の清掃",
      "エレベーター内の清掃",
      "ゴミ置き場の整理・清掃",
      "共用部の窓拭き",
      "管理組合・管理会社様からのご依頼も歓迎",
    ],
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 21V7l9-4 9 4v14" stroke={C.blue} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 21V13h6v8" stroke={C.blue} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "オフィス清掃",
    frequency: "週1〜3回など",
    description: "フロアの掃除機がけ、水拭き",
    details: [
      "フロア全体の掃除機がけ・水拭き",
      "デスク周りの拭き掃除",
      "トイレ・洗面所の清掃",
      "ゴミ回収・分別",
      "会議室・応接室の整備",
    ],
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" stroke={C.blue} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="8" y="2" width="8" height="4" rx="1" stroke={C.blue} strokeWidth="1.5"/>
        <path d="M9 12l2 2 4-4" stroke={C.blue} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "企業の日常清掃",
    frequency: "週5日（毎日）",
    description: "執務エリアの清掃、ゴミ回収、トイレ・共用部の衛生管理",
    details: [
      "執務エリアの毎日の清掃",
      "ゴミ回収・分別処理",
      "トイレ・共用部の衛生管理",
      "給湯室・休憩室の清掃",
      "消耗品の補充確認",
    ],
  },
];

export default function TeikiPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.title = "定期清掃サービス | 株式会社カノエ";
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ backgroundColor: C.bg, color: C.text, fontFamily: "'Noto Sans JP', sans-serif", minHeight: "100vh" }}>
      {/* ===== ヘッダー ===== */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
        }}
      >
        <div className="container flex items-center justify-between h-14">
          <Link href="/">
            <img src={LOGO_URL} alt="KANOE" style={{ height: "22px", objectFit: "contain" }} />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs transition-colors duration-200" style={{ color: C.textMuted }}>
              トップに戻る
            </Link>
            <a
              href="https://lin.ee/lQfaoYR"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium px-4 py-2 transition-opacity duration-200"
              style={{ backgroundColor: "#06C755", color: "#ffffff" }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85"}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "1"}
            >
              LINEでお問い合わせ
              <ExternalIcon />
            </a>
          </div>
        </div>
      </header>

      {/* ===== ヒーローセクション ===== */}
      <section
        className="pt-24 pb-14 md:pt-28 md:pb-20"
        style={{ backgroundColor: C.navy }}
      >
        <div className="container">
          <Reveal>
            <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>Regular Cleaning Service</p>
            <h1 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "#ffffff" }}>
              法人・マンション＆アパートオーナー様向け<br />
              定期清掃のご案内
            </h1>
            <p className="text-sm md:text-base leading-relaxed max-w-2xl" style={{ color: "rgba(255,255,255,0.75)" }}>
              お客様の施設に合わせた柔軟なプランをご提案いたします。<br />
              プロのスタッフが定期的に清掃を行い、清潔で快適な環境を維持します。
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== 参考事例セクション ===== */}
      <section className="py-14 md:py-20" style={{ backgroundColor: C.bgWhite, borderBottom: `1px solid ${C.border}` }}>
        <div className="container">
          <Reveal>
            <div className="mb-10">
              <p className="text-xs tracking-[0.15em] uppercase mb-2" style={{ color: C.textLight }}>Service Examples</p>
              <h2 className="text-xl font-bold" style={{ color: C.text }}>参考事例</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <Reveal key={i} delay={i * 100}>
                <div
                  className="flex flex-col h-full p-6 transition-all duration-200"
                  style={{ border: `1px solid ${C.border}`, backgroundColor: C.bgWhite }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = C.accent; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(30,58,95,0.08)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = C.border; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
                >
                  {/* アイコン */}
                  <div className="w-12 h-12 flex items-center justify-center mb-4" style={{ backgroundColor: C.blueBg, borderRadius: "8px" }}>
                    {svc.icon}
                  </div>

                  {/* タイトル */}
                  <h3 className="text-base font-bold mb-2" style={{ color: C.text }}>{svc.title}</h3>

                  {/* 頻度バッジ */}
                  <div className="inline-flex items-center gap-1.5 mb-3">
                    <span className="text-xs font-medium px-2.5 py-1" style={{ backgroundColor: C.navyBg, color: C.navy }}>
                      {svc.frequency}
                    </span>
                  </div>

                  {/* 概要 */}
                  <p className="text-sm mb-4" style={{ color: C.textMuted }}>{svc.description}</p>

                  {/* 詳細リスト */}
                  <ul className="flex flex-col gap-2 mt-auto">
                    {svc.details.map((detail, di) => (
                      <li key={di} className="flex items-start gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5">
                          <path d="M5 12l5 5L20 7" stroke={C.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-xs leading-relaxed" style={{ color: C.text }}>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 料金セクション ===== */}
      <Reveal>
        <section className="py-14 md:py-20" style={{ backgroundColor: C.bg }}>
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <div
                className="p-8 md:p-10"
                style={{ backgroundColor: C.navy }}
              >
                <p className="text-xs tracking-[0.15em] uppercase mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>Price</p>
                <p className="text-sm mb-2" style={{ color: "rgba(255,255,255,0.7)" }}>料金</p>
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-lg" style={{ color: "#ffffff" }}>1時間あたり</span>
                  <span className="text-3xl md:text-4xl font-bold" style={{ color: "#ffffff" }}>3,850</span>
                  <span className="text-lg" style={{ color: "#ffffff" }}>円（税込）〜</span>
                </div>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>＊2時間プランの場合</p>
              </div>
              <p className="text-sm mt-6" style={{ color: C.textMuted }}>
                ※清掃内容・頻度に応じてお見積りいたします。お気軽にご相談ください。
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ===== 対応エリア ===== */}
      <Reveal>
        <section className="py-14 md:py-20" style={{ backgroundColor: C.bgWhite, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
          <div className="container">
            <div className="mb-8">
              <p className="text-xs tracking-[0.15em] uppercase mb-2" style={{ color: C.textLight }}>Service Area</p>
              <h2 className="text-xl font-bold" style={{ color: C.text }}>対応エリア</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { region: "東京都", areas: "品川区・大田区・目黒区・港区・渋谷区・世田谷区 ほか" },
                { region: "神奈川県", areas: "川崎市・横浜市 ほか" },
                { region: "大阪府", areas: "大阪市・北区・中央区 ほか" },
              ].map((area, i) => (
                <div key={i} className="p-5" style={{ border: `1px solid ${C.border}`, backgroundColor: C.bg }}>
                  <p className="text-xs font-medium mb-2 px-2 py-1 inline-block" style={{ backgroundColor: C.navyBg, color: C.navy }}>{area.region}</p>
                  <p className="text-sm" style={{ color: C.textMuted }}>{area.areas}</p>
                </div>
              ))}
            </div>
            <p className="text-xs mt-4" style={{ color: C.textLight }}>
              ※上記以外のエリアもご相談ください。
            </p>
          </div>
        </section>
      </Reveal>

      {/* ===== CTAセクション ===== */}
      <Reveal>
        <section className="py-14 md:py-20" style={{ backgroundColor: C.bg }}>
          <div className="container">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="text-xl font-bold mb-3" style={{ color: C.text }}>お見積り・ご相談</h2>
              <p className="text-sm mb-8" style={{ color: C.textMuted }}>
                清掃内容・頻度・ご予算に合わせて最適なプランをご提案いたします。<br />
                まずはお気軽にお問い合わせください。
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://lin.ee/lQfaoYR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium px-8 py-3 transition-opacity duration-200"
                  style={{ backgroundColor: "#06C755", color: "#ffffff" }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85"}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "1"}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  LINEでお問い合わせ
                  <ExternalIcon />
                </a>
                <a
                  href="tel:0120197576"
                  className="inline-flex items-center gap-2 text-sm font-medium px-8 py-3 transition-all duration-200"
                  style={{ border: `1.5px solid ${C.navy}`, color: C.navy, backgroundColor: C.bgWhite }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = C.navy; (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = C.bgWhite; (e.currentTarget as HTMLAnchorElement).style.color = C.navy; }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor"/>
                  </svg>
                  0120-19-7576
                </a>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ===== フッター ===== */}
      <footer className="py-10" style={{ backgroundColor: C.navy }}>
        <div className="container text-center">
          <Link href="/">
            <img src={LOGO_URL} alt="KANOE" style={{ height: "18px", objectFit: "contain", filter: "brightness(0) invert(1)", margin: "0 auto 12px" }} />
          </Link>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            &copy; {new Date().getFullYear()} 株式会社カノエ All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
