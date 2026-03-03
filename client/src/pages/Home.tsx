/**
 * 株式会社カノエ コーポレートサイト
 * Design: カノエグラム参考サイト準拠
 * - 背景: #f8f8f7（オフホワイト）
 * - テキスト: #1a1a19（ほぼ黒）
 * - ミュート: #858481
 * - アクセント: ネイビー #1e3a5f / ブルー #2a5298
 * - フォント: Noto Sans JP
 * - スタイル: ミニマル・フラット・余白重視・細ボーダーカード
 */

import { useEffect, useRef, useState } from "react";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393929968/iYwBZn5CdVZAZNoSzLfUqs/kanoe-logo_b797e5af.png";

// カラー定義（参考サイト準拠）
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
};

const navLinks = [
  { label: "おそうじ本舗", href: "https://osouji-oimachi.com/", external: true },
  { label: "ご予約", href: "https://miniapp.line.me/2008378005-2WA3vWn4", external: true },
  { label: "外壁洗浄", href: "https://www.osoujihonpo.com/campaign/outerwall/?utm_source=google&utm_medium=cpc&utm_campaign=gs_31&utm_content=gs_038&utm_term=%E3%81%8A%E3%81%9D%E3%81%86%E3%81%98%E6%9C%AC%E8%88%97%20%E5%A4%96%E5%A3%81%E6%B4%97%E6%B5%84_p_c_22377521737_175695704614_783378233018&argument=kXLBSm4y&dmai=a67e2539f72433&gad_source=1&gad_campaignid=22377521737&gbraid=0AAAAACnAqqzNGANzsg_SvMpYjsZfZNvuE&gclid=CjwKCAiAh5XNBhAAEiwA_Bu8FTyZ-bOM_b2hpXhQh89Y7IqvtAy7VF8dC7bbZROaJDnb2BN9070-4xoCeAAQAvD_BwE", external: true },
];

const storeGroups = [
  { region: "東京都", stores: ["大井町店", "戸越銀座駅前店", "大田中央店", "大森南店"] },
  { region: "神奈川県", stores: ["川崎新町店", "幸塚越店"] },
  { region: "大阪府", stores: ["天満店"] },
];

const offices = [
  { name: "本社", address: "東京都品川区大井3-18-18 REX Oimachi 1F" },
  { name: "大森事務所", address: "東京都品川区南大井6-21-3 シェトワ大森101" },
  { name: "川崎事務所", address: "神奈川県横浜市矢向5-7-32 1F" },
  { name: "大阪事務所", address: "大阪府大阪市中央区農人橋2丁目3-12 大伸センタービル2F" },
];

// スクロールアニメーション
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      style={{ transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms` }}
      className={visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
    >
      {children}
    </div>
  );
}

// 外部リンクアイコン
function ExternalIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 10L10 2M10 2H5M10 2V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ backgroundColor: C.bg, color: C.text, fontFamily: "'Noto Sans JP', sans-serif" }} className="min-h-screen">

      {/* ===== ヘッダー ===== */}
      <header
        style={{
          backgroundColor: C.bgWhite,
          borderBottom: `1px solid ${scrolled ? C.border : "transparent"}`,
          boxShadow: scrolled ? "0 1px 8px rgba(0,0,0,0.06)" : "none",
        }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      >
        <div className="container">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* ロゴ */}
            <a href="/" className="flex items-center gap-2">
              <img src={LOGO_URL} alt="株式会社カノエ KANOE" className="h-7 md:h-8 w-auto" />
            </a>

            {/* デスクトップナビ */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-1 text-sm transition-colors duration-200"
                  style={{ color: C.textMuted }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = C.navy}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = C.textMuted}
                >
                  {link.label}
                  <ExternalIcon />
                </a>
              ))}
              <a
                href="tel:0120197576"
                className="text-xs font-medium px-3 py-1.5 transition-all duration-200"
                style={{ border: `1px solid ${C.border}`, color: C.text, backgroundColor: C.bg }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = C.navy; (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; (e.currentTarget as HTMLAnchorElement).style.borderColor = C.navy; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = C.bg; (e.currentTarget as HTMLAnchorElement).style.color = C.text; (e.currentTarget as HTMLAnchorElement).style.borderColor = C.border; }}
              >
                0120-19-7576
              </a>
            </nav>

            {/* モバイルメニューボタン */}
            <button
              className="md:hidden p-2 flex flex-col gap-1.5"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="メニュー"
            >
              <span className={`block w-5 h-0.5 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} style={{ backgroundColor: C.text }} />
              <span className={`block w-5 h-0.5 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} style={{ backgroundColor: C.text }} />
              <span className={`block w-5 h-0.5 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} style={{ backgroundColor: C.text }} />
            </button>
          </div>
        </div>

        {/* モバイルメニュー */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: menuOpen ? "20rem" : "0",
            borderTop: menuOpen ? `1px solid ${C.border}` : "none",
            backgroundColor: C.bgWhite,
          }}
        >
          <nav className="container py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="flex items-center gap-1.5 text-sm py-2"
                style={{ color: C.textMuted, borderBottom: `1px solid ${C.border}` }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
                <ExternalIcon />
              </a>
            ))}
            <a href="tel:0120197576" className="text-sm font-medium py-2" style={{ color: C.text }}>
              0120-19-7576
            </a>
          </nav>
        </div>
      </header>

      {/* ===== ヒーローセクション ===== */}
      <section
        className="pt-14 md:pt-16"
        style={{ backgroundColor: C.navy }}
      >
        <div className="container py-16 md:py-24">
          <div className="max-w-xl">
            <p className="text-xs tracking-[0.18em] uppercase mb-5 font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
              Cleaning Professional
            </p>
            <h1
              className="text-3xl md:text-5xl font-bold leading-tight mb-5"
              style={{ color: "#ffffff", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 700 }}
            >
              株式会社カノエ
            </h1>
            <p className="text-sm md:text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.65)" }}>
              おそうじ本舗フランチャイズとして<br />
              関東・関西で7店舗を展開。<br />
              2年連続、全国最優秀賞を受賞。
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://osouji-oimachi.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 transition-all duration-200"
                style={{ backgroundColor: C.bgWhite, color: C.navy }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "0.9"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "1"}
              >
                おそうじ本舗サイトへ
                <ExternalIcon />
              </a>
              <a
                href="https://miniapp.line.me/2008378005-2WA3vWn4"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 transition-all duration-200"
                style={{ border: "1px solid rgba(255,255,255,0.35)", color: "rgba(255,255,255,0.85)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(255,255,255,0.1)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent"; }}
              >
                LINEで予約
                <ExternalIcon />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 受賞実績バナー（ゴールド） ===== */}
      <Reveal>
        <section
          style={{
            background: "linear-gradient(135deg, #1a2a40 0%, #1e3a5f 60%, #243550 100%)",
            borderBottom: "1px solid #c9a84c",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* 背景装飾ライン */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(201,168,76,0.03) 40px, rgba(201,168,76,0.03) 41px)",
          }} />
          <div className="container py-5 md:py-6" style={{ position: "relative" }}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10">
              {/* ラベル + タイトル */}
              <div className="flex items-center gap-3">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="#c9a84c" stroke="#c9a84c" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-xs tracking-[0.18em] uppercase font-medium" style={{ color: "#c9a84c" }}>Award</span>
                <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>おそうじ本舗フランチャイズ最優秀賞</span>
              </div>
              {/* 区切り */}
              <div style={{ width: "1px", height: "2rem", backgroundColor: "rgba(201,168,76,0.25)" }} className="hidden sm:block" />
              {/* 1位 */}
              <div className="flex items-baseline gap-1.5">
                <span
                  className="font-bold"
                  style={{
                    fontSize: "2.5rem",
                    lineHeight: 1,
                    background: "linear-gradient(135deg, #f5d67a 0%, #c9a84c 50%, #e8c96a 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >1</span>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>位 / 1,803店舗中</span>
              </div>
              {/* 区切り */}
              <div style={{ width: "1px", height: "2rem", backgroundColor: "rgba(201,168,76,0.25)" }} className="hidden sm:block" />
              {/* 2年連続 */}
              <div className="flex items-baseline gap-1.5">
                <span
                  className="font-bold"
                  style={{
                    fontSize: "2.5rem",
                    lineHeight: 1,
                    background: "linear-gradient(135deg, #f5d67a 0%, #c9a84c 50%, #e8c96a 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >2</span>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>年連続（2024・2025年）</span>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ===== チーム画像＋スローガンオーバーレイセクション ===== */}
      <Reveal>
        <section style={{ backgroundColor: C.bgWhite, borderBottom: `1px solid ${C.border}`, position: "relative", overflow: "hidden" }}>
          {/* 画像 */}
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663393929968/iYwBZn5CdVZAZNoSzLfUqs/kanoe-team_34dfcc30.jpeg"
            alt="株式会社カノエ チーム"
            className="w-full object-cover block"
            style={{ maxHeight: "420px", objectPosition: "center top" }}
          />
          {/* 画像上部にグラデーションオーバーレイ */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "55%",
              background: "linear-gradient(to bottom, rgba(248,248,247,0.92) 0%, rgba(248,248,247,0.7) 50%, rgba(248,248,247,0) 100%)",
              pointerEvents: "none",
            }}
          />
          {/* スローガン（画像上部に重ねる） */}
          <div
            className="container"
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
              paddingTop: "2rem",
            }}
          >
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
              <div className="flex-1">
                <p className="text-xs tracking-[0.15em] uppercase mb-2 font-medium" style={{ color: C.navyLight }}>Slogan</p>
                <p
                  className="text-lg md:text-2xl font-bold leading-snug"
                  style={{ color: C.navy, fontFamily: "'Noto Sans JP', sans-serif", textShadow: "0 1px 4px rgba(248,248,247,0.8)" }}
                >
                  おそうじで<br />キレイで豊かなくらしを
                </p>
              </div>
              <div style={{ width: "1px", height: "4rem", backgroundColor: "rgba(30,58,95,0.2)" }} className="hidden md:block mt-5" />
              <div className="flex-1">
                <p className="text-xs tracking-[0.15em] uppercase mb-2 font-medium" style={{ color: C.navyLight }}>Philosophy</p>
                <p
                  className="text-lg md:text-2xl font-bold leading-snug"
                  style={{ color: C.navy, fontFamily: "'Noto Sans JP', sans-serif", textShadow: "0 1px 4px rgba(248,248,247,0.8)" }}
                >
                  スタッフが明るいお店は<br />良いお店
                </p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ===== 運営店舗セクション ===== */}
      <Reveal>
        <section style={{ backgroundColor: C.bg }} className="py-14 md:py-20">
          <div className="container">
            <div className="mb-8">
              <p className="text-xs tracking-[0.15em] uppercase mb-2" style={{ color: C.textLight }}>Our Stores</p>
              <h2 className="text-xl font-bold" style={{ color: C.text }}>運営店舗</h2>
            </div>

            <div className="flex flex-col gap-4">
              {storeGroups.map((group, gi) => (
                <Reveal key={gi} delay={gi * 80}>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-0" style={{ border: `1px solid ${C.border}`, backgroundColor: C.bgWhite }}>
                    {/* 都道府県ラベル */}
                    <div
                      className="flex-shrink-0 flex items-center px-4 py-3 sm:w-28"
                      style={{ backgroundColor: C.navyBg, borderRight: `1px solid ${C.border}` }}
                    >
                      <span className="text-xs font-medium" style={{ color: C.navy }}>{group.region}</span>
                    </div>
                    {/* 店舗名リスト */}
                    <div className="flex flex-wrap items-center gap-x-0 px-4 py-3">
                      {group.stores.map((store, si) => (
                        <span key={si} className="flex items-center">
                          <span className="text-sm" style={{ color: C.text }}>{store}</span>
                          {si < group.stores.length - 1 && (
                            <span className="mx-2 text-xs" style={{ color: C.textLight }}>・</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ===== サービスリンクセクション ===== */}
      <Reveal>
        <section style={{ backgroundColor: C.bgWhite, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }} className="py-14 md:py-20">
          <div className="container">
            <div className="mb-8">
              <p className="text-xs tracking-[0.15em] uppercase mb-2" style={{ color: C.textLight }}>Services</p>
              <h2 className="text-xl font-bold" style={{ color: C.text }}>サービス・リンク</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* おそうじ本舗 */}
              <a
                href="https://osouji-oimachi.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-3 p-5 transition-all duration-200"
                style={{ border: `1px solid ${C.border}`, backgroundColor: C.bg }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = C.navyLight; (e.currentTarget as HTMLAnchorElement).style.backgroundColor = C.navyBg; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = C.border; (e.currentTarget as HTMLAnchorElement).style.backgroundColor = C.bg; }}
              >
                <div className="flex items-start justify-between">
                  <div className="w-8 h-8 flex items-center justify-center" style={{ backgroundColor: C.navyBg }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke={C.navy} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <polyline points="9 22 9 12 15 12 15 22" stroke={C.navy} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span style={{ color: C.textLight }}><ExternalIcon /></span>
                </div>
                <div>
                  <p className="text-sm font-medium mb-0.5" style={{ color: C.text }}>おそうじ本舗</p>
                  <p className="text-xs" style={{ color: C.textMuted }}>公式サイトはこちら</p>
                </div>
              </a>

              {/* LINEで予約 */}
              <a
                href="https://miniapp.line.me/2008378005-2WA3vWn4"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-3 p-5 transition-all duration-200"
                style={{ border: `1px solid ${C.border}`, backgroundColor: C.bg }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = C.navyLight; (e.currentTarget as HTMLAnchorElement).style.backgroundColor = C.navyBg; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = C.border; (e.currentTarget as HTMLAnchorElement).style.backgroundColor = C.bg; }}
              >
                <div className="flex items-start justify-between">
                  <div className="w-8 h-8 flex items-center justify-center bg-[#06C755]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span style={{ color: C.textLight }}><ExternalIcon /></span>
                </div>
                <div>
                  <p className="text-sm font-medium mb-0.5" style={{ color: C.text }}>LINEで予約</p>
                  <p className="text-xs" style={{ color: C.textMuted }}>簡単オンライン予約</p>
                </div>
              </a>

              {/* 外壁洗浄 */}
              <a
                href="https://www.osoujihonpo.com/campaign/outerwall/?utm_source=google&utm_medium=cpc&utm_campaign=gs_31&utm_content=gs_038&utm_term=%E3%81%8A%E3%81%9D%E3%81%86%E3%81%98%E6%9C%AC%E8%88%97%20%E5%A4%96%E5%A3%81%E6%B4%97%E6%B5%84_p_c_22377521737_175695704614_783378233018&argument=kXLBSm4y&dmai=a67e2539f72433&gad_source=1&gad_campaignid=22377521737&gbraid=0AAAAACnAqqzNGANzsg_SvMpYjsZfZNvuE&gclid=CjwKCAiAh5XNBhAAEiwA_Bu8FTyZ-bOM_b2hpXhQh89Y7IqvtAy7VF8dC7bbZROaJDnb2BN9070-4xoCeAAQAvD_BwE"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-3 p-5 transition-all duration-200"
                style={{ border: `1px solid ${C.border}`, backgroundColor: C.bg }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = C.navyLight; (e.currentTarget as HTMLAnchorElement).style.backgroundColor = C.navyBg; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = C.border; (e.currentTarget as HTMLAnchorElement).style.backgroundColor = C.bg; }}
              >
                <div className="flex items-start justify-between">
                  <div className="w-8 h-8 flex items-center justify-center" style={{ backgroundColor: C.navyBg }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="3" width="18" height="18" rx="1" stroke={C.navy} strokeWidth="1.5"/>
                      <path d="M3 9h18M9 21V9" stroke={C.navy} strokeWidth="1.5"/>
                    </svg>
                  </div>
                  <span style={{ color: C.textLight }}><ExternalIcon /></span>
                </div>
                <div>
                  <p className="text-sm font-medium mb-0.5" style={{ color: C.text }}>外壁洗浄</p>
                  <p className="text-xs" style={{ color: C.textMuted }}>キャンペーン情報</p>
                </div>
              </a>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ===== 会社概要セクション ===== */}
      <Reveal>
        <section style={{ backgroundColor: C.bg }} className="py-14 md:py-20">
          <div className="container">
            <div className="mb-8">
              <p className="text-xs tracking-[0.15em] uppercase mb-2" style={{ color: C.textLight }}>Company</p>
              <h2 className="text-xl font-bold" style={{ color: C.text }}>会社概要</h2>
            </div>

            <div className="max-w-2xl">
              {[
                { label: "会社名", value: "株式会社カノエ" },
                {
                  label: "主な事業",
                  value: "おそうじ本舗フランチャイズ運営",
                  sub: "大井町店・戸越銀座駅前店・大田中央店・大森南店・川崎新町店・幸塚越店・天満店",
                },
                {
                  label: "受賞歴",
                  value: "おそうじ本舗フランチャイズ最優秀賞",
                  sub: "2024年・2025年 2年連続受賞（1,803店舗中1位）",
                },
                {
                  label: "フリーダイヤル",
                  value: "0120-19-7576",
                  sub: "受付時間：10:00〜18:00",
                  isPhone: true,
                },
              ].map((row) => (
                <div key={row.label} className="flex gap-6 py-4" style={{ borderBottom: `1px solid ${C.border}` }}>
                  <div className="w-28 flex-shrink-0 text-xs pt-0.5" style={{ color: C.textMuted }}>{row.label}</div>
                  <div>
                    {row.isPhone ? (
                      <a href="tel:0120197576" className="text-sm font-medium transition-colors" style={{ color: C.navy }}>
                        {row.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium" style={{ color: C.text }}>{row.value}</p>
                    )}
                    {row.sub && <p className="text-xs mt-0.5" style={{ color: C.textMuted }}>{row.sub}</p>}
                  </div>
                </div>
              ))}

              {/* 所在地 */}
              <div className="flex gap-6 py-4" style={{ borderBottom: `1px solid ${C.border}` }}>
                <div className="w-28 flex-shrink-0 text-xs pt-0.5" style={{ color: C.textMuted }}>所在地</div>
                <div className="flex flex-col gap-3">
                  {offices.map((office) => (
                    <div key={office.name}>
                      <p className="text-xs font-medium mb-0.5" style={{ color: C.navy }}>{office.name}</p>
                      <p className="text-sm" style={{ color: C.text }}>{office.address}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ===== SNSセクション ===== */}
      <Reveal>
        <section style={{ backgroundColor: C.bgWhite, borderTop: `1px solid ${C.border}` }} className="py-12 md:py-16">
          <div className="container">
            <div className="mb-6">
              <p className="text-xs tracking-[0.15em] uppercase mb-2" style={{ color: C.textLight }}>Follow Us</p>
              <h2 className="text-xl font-bold" style={{ color: C.text }}>SNS</h2>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.youtube.com/@Kanoe_channel/featured"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-4 py-3 transition-all duration-200"
                style={{ border: `1px solid ${C.border}`, backgroundColor: C.bg }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = C.navyLight; (e.currentTarget as HTMLAnchorElement).style.backgroundColor = C.navyBg; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = C.border; (e.currentTarget as HTMLAnchorElement).style.backgroundColor = C.bg; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z" fill="#FF0000"/>
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
                </svg>
                <span className="text-sm" style={{ color: C.text }}>YouTubeチャンネル</span>
                <span style={{ color: C.textLight }}><ExternalIcon /></span>
              </a>

              <a
                href="https://www.instagram.com/osoujihonpo_oimachi/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-4 py-3 transition-all duration-200"
                style={{ border: `1px solid ${C.border}`, backgroundColor: C.bg }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = C.navyLight; (e.currentTarget as HTMLAnchorElement).style.backgroundColor = C.navyBg; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = C.border; (e.currentTarget as HTMLAnchorElement).style.backgroundColor = C.bg; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="ig-g" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FFDC80"/>
                      <stop offset="50%" stopColor="#E1306C"/>
                      <stop offset="100%" stopColor="#833AB4"/>
                    </linearGradient>
                  </defs>
                  <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#ig-g)"/>
                  <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.5"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="white"/>
                </svg>
                <span className="text-sm" style={{ color: C.text }}>Instagram</span>
                <span style={{ color: C.textLight }}><ExternalIcon /></span>
              </a>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ===== フッター ===== */}
      <footer style={{ backgroundColor: C.bg, borderTop: `1px solid ${C.border}` }} className="py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src={LOGO_URL} alt="株式会社カノエ" className="h-6 w-auto" />
              <span className="text-xs" style={{ color: C.textMuted }}>株式会社カノエ</span>
            </div>
            <div className="flex flex-wrap gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="text-xs transition-colors duration-200"
                  style={{ color: C.textMuted }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = C.text}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = C.textMuted}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-6 pt-4" style={{ borderTop: `1px solid ${C.border}` }}>
            <p className="text-xs" style={{ color: C.textLight }}>
              © {new Date().getFullYear()} 株式会社カノエ All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
