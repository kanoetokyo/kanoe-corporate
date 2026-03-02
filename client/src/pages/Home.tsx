/**
 * 株式会社カノエ コーポレートサイト
 * Design: おそうじ本舗ブランドカラー踏襲
 * - メインブルー: #005bac / ダークブルー: #06408c
 * - アクセントオレンジ: #ff7b1c
 * - 白背景 × ブルーヘッダー × オレンジCTA
 * - Noto Serif JP（見出し）× Noto Sans JP（本文）
 */

import { useEffect, useRef, useState } from "react";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393929968/iYwBZn5CdVZAZNoSzLfUqs/kanoe-logo_b797e5af.png";

// おそうじ本舗ブランドカラー
const BRAND_BLUE = "#005bac";
const BRAND_BLUE_DARK = "#06408c";
const BRAND_ORANGE = "#ff7b1c";
const BRAND_LIGHT_BLUE = "#e3f1fc";

// ナビゲーションリンク
const navLinks = [
  { label: "おそうじ本舗", href: "https://osouji-oimachi.com/", external: true },
  { label: "ご予約", href: "https://miniapp.line.me/2008378005-2WA3vWn4", external: true },
  { label: "外壁洗浄", href: "https://www.osoujihonpo.com/campaign/outerwall/?utm_source=google&utm_medium=cpc&utm_campaign=gs_31&utm_content=gs_038&utm_term=%E3%81%8A%E3%81%9D%E3%81%86%E3%81%98%E6%9C%AC%E8%88%97%20%E5%A4%96%E5%A3%81%E6%B4%97%E6%B5%84_p_c_22377521737_175695704614_783378233018&argument=kXLBSm4y&dmai=a67e2539f72433&gad_source=1&gad_campaignid=22377521737&gbraid=0AAAAACnAqqzNGANzsg_SvMpYjsZfZNvuE&gclid=CjwKCAiAh5XNBhAAEiwA_Bu8FTyZ-bOM_b2hpXhQh89Y7IqvtAy7VF8dC7bbZROaJDnb2BN9070-4xoCeAAQAvD_BwE", external: true },
];

// 店舗一覧（大森南店追加済み）
const stores = [
  { name: "おそうじ本舗 大井町店", href: "https://osouji-oimachi.com/" },
  { name: "おそうじ本舗 大田中央店", href: "https://osouji-oimachi.com/" },
  { name: "おそうじ本舗 幸塚越店", href: "https://osouji-oimachi.com/" },
  { name: "おそうじ本舗 川崎新町店", href: "https://osouji-oimachi.com/" },
  { name: "おそうじ本舗 戸越銀座駅前店", href: "https://osouji-oimachi.com/" },
  { name: "おそうじ本舗 大森南店", href: "https://osouji-oimachi.com/" },
];

// 事務所情報
const offices = [
  {
    name: "本社",
    address: "〒140-0014\n東京都品川区大井3-18-18\nREX Oimachi 1F",
  },
  {
    name: "大森事務所",
    address: "〒140-0013\n東京都品川区南大井6-21-3\nシェトワ大森101",
  },
  {
    name: "川崎事務所",
    address: "〒230-0001\n神奈川県横浜市矢向5-7-32 1F",
  },
  {
    name: "大阪事務所",
    address: "〒540-0011\n大阪府大阪市中央区農人橋2丁目3-12\n大伸センタービル2F",
  },
];

// スクロールアニメーション用カスタムフック
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
    >
      {children}
    </div>
  );
}

// セクション見出しコンポーネント
function SectionHeading({ label, title, light = false }: { label: string; title: string; light?: boolean }) {
  return (
    <div className="mb-10">
      <p
        className="text-xs tracking-[0.2em] uppercase mb-3 font-medium"
        style={{ color: light ? "#93c5fd" : BRAND_ORANGE }}
      >
        {label}
      </p>
      <h2
        className={`text-2xl md:text-3xl font-bold ${light ? "text-white" : "text-[#1c1c1e]"}`}
        style={{ fontFamily: "'Noto Serif JP', serif" }}
      >
        {title}
      </h2>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#1c1c1e]">
      {/* ===== ヘッダー ===== */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? BRAND_BLUE_DARK : BRAND_BLUE,
          boxShadow: scrolled ? "0 2px 12px rgba(0,0,0,0.18)" : "none",
        }}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* ロゴ（白反転） */}
            <a href="/" className="flex items-center">
              <img
                src={LOGO_URL}
                alt="株式会社カノエ KANOE"
                className="h-8 md:h-10 w-auto brightness-0 invert"
              />
            </a>

            {/* デスクトップナビ */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="text-sm font-medium text-white/90 hover:text-white transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
              <a
                href="tel:0120197576"
                className="text-sm font-bold text-white border-2 border-white/60 px-4 py-2 hover:bg-white hover:text-[#005bac] transition-all duration-200"
              >
                0120-19-7576
              </a>
            </nav>

            {/* モバイルメニューボタン */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="メニュー"
            >
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>

        {/* モバイルメニュー */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: menuOpen ? "24rem" : "0",
            borderTop: menuOpen ? "1px solid rgba(255,255,255,0.2)" : "none",
            backgroundColor: BRAND_BLUE_DARK,
          }}
        >
          <nav className="container py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-sm font-medium text-white/90 py-2 border-b border-white/10"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href="tel:0120197576" className="text-sm font-bold text-white py-2">
              0120-19-7576
            </a>
          </nav>
        </div>
      </header>

      {/* ===== ヒーローセクション ===== */}
      <section
        className="pt-16 md:pt-20 min-h-[60vh] flex items-center"
        style={{ background: `linear-gradient(135deg, ${BRAND_LIGHT_BLUE} 0%, #ffffff 60%)` }}
      >
        <div className="container py-16 md:py-24">
          <div className="max-w-2xl">
            <p
              className="text-xs tracking-[0.2em] uppercase mb-6 font-medium"
              style={{ color: BRAND_BLUE }}
            >
              Cleaning Professional
            </p>
            <h1
              className="text-3xl md:text-5xl font-bold leading-tight mb-6"
              style={{ fontFamily: "'Noto Serif JP', serif", color: BRAND_BLUE_DARK }}
            >
              株式会社カノエ
            </h1>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-10 font-light">
              おそうじ本舗フランチャイズとして、<br className="hidden md:block" />
              東京・神奈川エリアで6店舗を展開。<br className="hidden md:block" />
              2年連続、全国最優秀賞を受賞しています。
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://osouji-oimachi.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white px-6 py-3 text-sm font-bold transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: BRAND_ORANGE }}
              >
                おそうじ本舗サイトへ
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 7H13M7 1L13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a
                href="https://miniapp.line.me/2008378005-2WA3vWn4"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold transition-all duration-200 hover:text-white"
                style={{ border: `2px solid ${BRAND_BLUE}`, color: BRAND_BLUE }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = BRAND_BLUE; (e.currentTarget as HTMLAnchorElement).style.color = "white"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent"; (e.currentTarget as HTMLAnchorElement).style.color = BRAND_BLUE; }}
              >
                LINEで予約する
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 受賞実績セクション ===== */}
      <RevealSection>
        <section className="text-white py-16 md:py-20" style={{ backgroundColor: BRAND_BLUE_DARK }}>
          <div className="container">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16">
              {/* 左：テキスト */}
              <div className="flex-1 text-center md:text-left">
                <SectionHeading label="Award" title={"2年連続\n最優秀賞受賞"} light />
                <p className="text-blue-200 text-sm leading-relaxed">
                  おそうじ本舗フランチャイズ<br />
                  2024年・2025年、2年連続で<br />
                  全国最優秀賞（1位）を受賞。
                </p>
              </div>

              {/* 右：数字 */}
              <div className="flex gap-8 md:gap-12">
                <div className="text-center">
                  <p
                    className="text-5xl md:text-7xl font-bold"
                    style={{ color: BRAND_ORANGE, fontFamily: "'Noto Serif JP', serif" }}
                  >
                    1<span className="text-2xl md:text-3xl">位</span>
                  </p>
                  <p className="text-xs text-blue-200 mt-2">全国ランキング</p>
                </div>
                <div className="w-px bg-white/20 hidden md:block" />
                <div className="text-center">
                  <p
                    className="text-5xl md:text-7xl font-bold"
                    style={{ color: BRAND_ORANGE, fontFamily: "'Noto Serif JP', serif" }}
                  >
                    2<span className="text-2xl md:text-3xl">年</span>
                  </p>
                  <p className="text-xs text-blue-200 mt-2">2024・2025年</p>
                </div>
                <div className="w-px bg-white/20 hidden md:block" />
                <div className="text-center">
                  <p
                    className="text-4xl md:text-5xl font-bold"
                    style={{ color: BRAND_ORANGE, fontFamily: "'Noto Serif JP', serif" }}
                  >
                    1,803
                  </p>
                  <p className="text-xs text-blue-200 mt-2">店舗中</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ===== 店舗一覧セクション ===== */}
      <RevealSection>
        <section className="py-16 md:py-24 bg-white">
          <div className="container">
            <SectionHeading label="Our Stores" title="運営店舗" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {stores.map((store, i) => (
                <a
                  key={i}
                  href={store.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 border transition-all duration-200 hover:shadow-sm"
                  style={{ borderColor: "#d1e4f5" }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = BRAND_BLUE;
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = BRAND_LIGHT_BLUE;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "#d1e4f5";
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
                  }}
                >
                  <span className="text-sm font-medium text-[#1c1c1e]">{store.name}</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0 ml-2 transition-colors duration-200"
                    style={{ color: "#93c5fd" }}
                  >
                    <path d="M1 7H13M7 1L13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ===== リンクセクション ===== */}
      <RevealSection>
        <section className="py-16 md:py-20" style={{ backgroundColor: BRAND_LIGHT_BLUE }}>
          <div className="container">
            <SectionHeading label="Services" title="サービス・リンク" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* おそうじ本舗 */}
              <a
                href="https://osouji-oimachi.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white p-6 transition-all duration-200 hover:shadow-md"
                style={{ border: `1px solid #d1e4f5` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 flex items-center justify-center" style={{ backgroundColor: BRAND_BLUE }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <polyline points="9 22 9 12 15 12 15 22" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-colors duration-200" style={{ color: "#93c5fd" }}>
                    <path d="M1 7H13M7 1L13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-[#1c1c1e] mb-1 text-sm">おそうじ本舗</h3>
                <p className="text-xs text-gray-500">公式サイトはこちら</p>
              </a>

              {/* LINEで予約 */}
              <a
                href="https://miniapp.line.me/2008378005-2WA3vWn4"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white p-6 transition-all duration-200 hover:shadow-md"
                style={{ border: `1px solid #d1e4f5` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-[#06C755] flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-colors duration-200" style={{ color: "#93c5fd" }}>
                    <path d="M1 7H13M7 1L13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-[#1c1c1e] mb-1 text-sm">LINEで予約</h3>
                <p className="text-xs text-gray-500">簡単オンライン予約</p>
              </a>

              {/* 外壁洗浄 */}
              <a
                href="https://www.osoujihonpo.com/campaign/outerwall/?utm_source=google&utm_medium=cpc&utm_campaign=gs_31&utm_content=gs_038&utm_term=%E3%81%8A%E3%81%9D%E3%81%86%E3%81%98%E6%9C%AC%E8%88%97%20%E5%A4%96%E5%A3%81%E6%B4%97%E6%B5%84_p_c_22377521737_175695704614_783378233018&argument=kXLBSm4y&dmai=a67e2539f72433&gad_source=1&gad_campaignid=22377521737&gbraid=0AAAAACnAqqzNGANzsg_SvMpYjsZfZNvuE&gclid=CjwKCAiAh5XNBhAAEiwA_Bu8FTyZ-bOM_b2hpXhQh89Y7IqvtAy7VF8dC7bbZROaJDnb2BN9070-4xoCeAAQAvD_BwE"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white p-6 transition-all duration-200 hover:shadow-md"
                style={{ border: `1px solid #d1e4f5` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 flex items-center justify-center" style={{ backgroundColor: BRAND_ORANGE }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="3" width="18" height="18" rx="2" stroke="white" strokeWidth="1.5"/>
                      <path d="M3 9h18" stroke="white" strokeWidth="1.5"/>
                      <path d="M9 21V9" stroke="white" strokeWidth="1.5"/>
                    </svg>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-colors duration-200" style={{ color: "#93c5fd" }}>
                    <path d="M1 7H13M7 1L13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-[#1c1c1e] mb-1 text-sm">外壁洗浄</h3>
                <p className="text-xs text-gray-500">キャンペーン情報</p>
              </a>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ===== 会社概要セクション ===== */}
      <RevealSection>
        <section className="py-16 md:py-24 bg-white">
          <div className="container">
            <SectionHeading label="Company" title="会社概要" />

            <div className="max-w-2xl">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-t border-gray-100">
                    <td className="py-4 pr-8 font-medium w-28 align-top" style={{ color: BRAND_BLUE }}>会社名</td>
                    <td className="py-4 text-[#1c1c1e]">株式会社カノエ</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="py-4 pr-8 font-medium align-top" style={{ color: BRAND_BLUE }}>主な事業</td>
                    <td className="py-4 text-[#1c1c1e]">
                      おそうじ本舗フランチャイズ運営<br />
                      <span className="text-xs text-gray-500">（大井町店・大田中央店・幸塚越店・川崎新町店・戸越銀座駅前店・大森南店）</span>
                    </td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="py-4 pr-8 font-medium align-top" style={{ color: BRAND_BLUE }}>受賞歴</td>
                    <td className="py-4 text-[#1c1c1e]">
                      おそうじ本舗フランチャイズ最優秀賞<br />
                      <span className="text-xs text-gray-500">2024年・2025年 2年連続受賞（1,803店舗中1位）</span>
                    </td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="py-4 pr-8 font-medium align-top" style={{ color: BRAND_BLUE }}>フリーダイヤル</td>
                    <td className="py-4 text-[#1c1c1e]">
                      <a href="tel:0120197576" className="font-bold transition-colors" style={{ color: BRAND_BLUE }}>0120-19-7576</a><br />
                      <span className="text-xs text-gray-500">受付時間：10:00〜18:00</span>
                    </td>
                  </tr>
                  <tr className="border-t border-gray-100 border-b border-gray-100">
                    <td className="py-4 pr-8 font-medium align-top" style={{ color: BRAND_BLUE }}>所在地</td>
                    <td className="py-4 text-[#1c1c1e]">
                      <div className="flex flex-col gap-3">
                        {offices.map((office) => (
                          <div key={office.name}>
                            <span className="text-xs font-bold block mb-0.5" style={{ color: BRAND_ORANGE }}>{office.name}</span>
                            <span className="text-sm whitespace-pre-line text-gray-700">{office.address}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ===== SNSセクション ===== */}
      <RevealSection>
        <section className="py-12 md:py-16" style={{ backgroundColor: BRAND_LIGHT_BLUE }}>
          <div className="container">
            <SectionHeading label="Follow Us" title="SNS" />

            <div className="flex flex-wrap gap-4">
              {/* YouTube */}
              <a
                href="https://www.youtube.com/@Kanoe_channel/featured"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-white px-5 py-3 transition-all duration-200 hover:shadow-md"
                style={{ border: "1px solid #d1e4f5" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z" fill="#FF0000"/>
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
                </svg>
                <span className="text-sm font-medium text-[#1c1c1e]">YouTubeチャンネル</span>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/osoujihonpo_oimachi/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-white px-5 py-3 transition-all duration-200 hover:shadow-md"
                style={{ border: "1px solid #d1e4f5" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="ig-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FFDC80"/>
                      <stop offset="25%" stopColor="#FCAF45"/>
                      <stop offset="50%" stopColor="#F77737"/>
                      <stop offset="75%" stopColor="#E1306C"/>
                      <stop offset="100%" stopColor="#833AB4"/>
                    </linearGradient>
                  </defs>
                  <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#ig-gradient)"/>
                  <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.5"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="white"/>
                </svg>
                <span className="text-sm font-medium text-[#1c1c1e]">Instagram</span>
              </a>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ===== フッター ===== */}
      <footer className="text-white py-10" style={{ backgroundColor: BRAND_BLUE_DARK }}>
        <div className="container">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <img
                src={LOGO_URL}
                alt="株式会社カノエ KANOE"
                className="h-8 w-auto mb-3 brightness-0 invert"
              />
              <p className="text-xs text-blue-200">
                フリーダイヤル：
                <a href="tel:0120197576" className="hover:text-white transition-colors font-bold">0120-19-7576</a>
                　受付 10:00〜18:00
              </p>
            </div>

            <div className="flex flex-wrap gap-6 text-xs text-blue-200">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}>
            <p className="text-xs text-blue-300">
              © {new Date().getFullYear()} 株式会社カノエ All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
