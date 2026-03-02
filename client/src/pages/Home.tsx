/**
 * 株式会社カノエ コーポレートサイト
 * Design: クリーン・プロフェッショナル（スカンジナビアン・コーポレート）
 * - 白背景 × 炭色テキスト × 金色アクセント
 * - Noto Serif JP（見出し）× Noto Sans JP（本文）
 * - シングルページ縦スクロール
 */

import { useEffect, useRef, useState } from "react";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663393929968/iYwBZn5CdVZAZNoSzLfUqs/kanoe-logo_b797e5af.png";

// ナビゲーションリンク
const navLinks = [
  { label: "おそうじ本舗", href: "https://osouji-oimachi.com/", external: true },
  { label: "ご予約", href: "https://miniapp.line.me/2008378005-2WA3vWn4", external: true },
  { label: "外壁洗浄", href: "https://www.osoujihonpo.com/campaign/outerwall/?utm_source=google&utm_medium=cpc&utm_campaign=gs_31&utm_content=gs_038&utm_term=%E3%81%8A%E3%81%9D%E3%81%86%E3%81%98%E6%9C%AC%E8%88%97%20%E5%A4%96%E5%A3%81%E6%B4%97%E6%B5%84_p_c_22377521737_175695704614_783378233018&argument=kXLBSm4y&dmai=a67e2539f72433&gad_source=1&gad_campaignid=22377521737&gbraid=0AAAAACnAqqzNGANzsg_SvMpYjsZfZNvuE&gclid=CjwKCAiAh5XNBhAAEiwA_Bu8FTyZ-bOM_b2hpXhQh89Y7IqvtAy7VF8dC7bbZROaJDnb2BN9070-4xoCeAAQAvD_BwE", external: true },
];

// 店舗一覧
const stores = [
  "おそうじ本舗 大井町店",
  "おそうじ本舗 大田中央店",
  "おそうじ本舗 幸塚越店",
  "おそうじ本舗 川崎新町店",
  "おそうじ本舗 戸越銀座駅前店",
  "おそうじ本舗 大森南店",
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-white"
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* ロゴ */}
            <a href="/" className="flex items-center">
              <img
                src={LOGO_URL}
                alt="株式会社カノエ KANOE"
                className="h-8 md:h-10 w-auto"
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
                  className="text-sm font-medium text-[#1c1c1e] hover:text-[#b8960c] transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#b8960c] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
              <a
                href="tel:0120197576"
                className="text-sm font-medium text-[#1c1c1e] border border-[#1c1c1e] px-4 py-2 hover:bg-[#1c1c1e] hover:text-white transition-all duration-200"
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
              <span className={`block w-6 h-0.5 bg-[#1c1c1e] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 bg-[#1c1c1e] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-[#1c1c1e] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>

        {/* モバイルメニュー */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? "max-h-96 border-t border-gray-100" : "max-h-0"
          }`}
        >
          <nav className="container py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-sm font-medium text-[#1c1c1e] py-2 border-b border-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:0120197576"
              className="text-sm font-medium text-[#1c1c1e] py-2"
            >
              0120-19-7576
            </a>
          </nav>
        </div>
      </header>

      {/* ===== ヒーローセクション ===== */}
      <section className="pt-16 md:pt-20 min-h-[60vh] flex items-center bg-white">
        <div className="container py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.2em] text-[#b8960c] uppercase mb-6 font-medium">
              Cleaning Professional
            </p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6 text-[#1c1c1e]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
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
                className="inline-flex items-center gap-2 bg-[#1c1c1e] text-white px-6 py-3 text-sm font-medium hover:bg-[#333] transition-colors duration-200"
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
                className="inline-flex items-center gap-2 border border-[#1c1c1e] text-[#1c1c1e] px-6 py-3 text-sm font-medium hover:bg-[#1c1c1e] hover:text-white transition-all duration-200"
              >
                LINEで予約する
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 受賞実績セクション ===== */}
      <RevealSection>
        <section className="bg-[#1c1c1e] text-white py-16 md:py-20">
          <div className="container">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16">
              {/* 左：テキスト */}
              <div className="flex-1 text-center md:text-left">
                <p className="text-xs tracking-[0.2em] text-[#b8960c] uppercase mb-4 font-medium">
                  Award
                </p>
                <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                  2年連続<br />最優秀賞受賞
                </h2>
                <p className="text-gray-300 text-sm leading-relaxed">
                  おそうじ本舗フランチャイズ<br />
                  2024年・2025年、2年連続で<br />
                  全国最優秀賞（1位）を受賞。
                </p>
              </div>

              {/* 右：数字 */}
              <div className="flex gap-8 md:gap-12">
                <div className="text-center">
                  <p className="text-5xl md:text-7xl font-bold text-[#b8960c]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                    1
                    <span className="text-2xl md:text-3xl">位</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-2">全国ランキング</p>
                </div>
                <div className="w-px bg-gray-700 hidden md:block" />
                <div className="text-center">
                  <p className="text-5xl md:text-7xl font-bold text-[#b8960c]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                    2
                    <span className="text-2xl md:text-3xl">年</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-2">2024・2025年</p>
                </div>
                <div className="w-px bg-gray-700 hidden md:block" />
                <div className="text-center">
                  <p className="text-4xl md:text-5xl font-bold text-[#b8960c]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                    1,803
                  </p>
                  <p className="text-xs text-gray-400 mt-2">店舗中</p>
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
            <div className="mb-10">
              <p className="text-xs tracking-[0.2em] text-[#b8960c] uppercase mb-3 font-medium">
                Our Stores
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1c1c1e]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                運営店舗
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {stores.map((store, i) => (
                <a
                  key={i}
                  href="https://osouji-oimachi.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-5 border border-gray-200 hover:border-[#1c1c1e] transition-all duration-200 hover:shadow-sm"
                >
                  <span className="text-sm font-medium text-[#1c1c1e]">{store}</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-400 group-hover:text-[#1c1c1e] transition-colors duration-200 flex-shrink-0 ml-2"
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
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container">
            <div className="mb-10">
              <p className="text-xs tracking-[0.2em] text-[#b8960c] uppercase mb-3 font-medium">
                Services
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1c1c1e]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                サービス・リンク
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* おそうじ本舗 */}
              <a
                href="https://osouji-oimachi.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white border border-gray-200 p-6 hover:border-[#1c1c1e] hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-[#1c1c1e] flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <polyline points="9 22 9 12 15 12 15 22" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-300 group-hover:text-[#1c1c1e] transition-colors">
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
                className="group bg-white border border-gray-200 p-6 hover:border-[#1c1c1e] hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-[#06C755] flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-300 group-hover:text-[#1c1c1e] transition-colors">
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
                className="group bg-white border border-gray-200 p-6 hover:border-[#1c1c1e] hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-[#2563eb] flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="3" width="18" height="18" rx="2" stroke="white" strokeWidth="1.5"/>
                      <path d="M3 9h18" stroke="white" strokeWidth="1.5"/>
                      <path d="M9 21V9" stroke="white" strokeWidth="1.5"/>
                    </svg>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-300 group-hover:text-[#1c1c1e] transition-colors">
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
            <div className="mb-10">
              <p className="text-xs tracking-[0.2em] text-[#b8960c] uppercase mb-3 font-medium">
                Company
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1c1c1e]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                会社概要
              </h2>
            </div>

            <div className="max-w-2xl">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-t border-gray-100">
                    <td className="py-4 pr-8 text-gray-500 font-medium w-28 align-top">会社名</td>
                    <td className="py-4 text-[#1c1c1e]">株式会社カノエ</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="py-4 pr-8 text-gray-500 font-medium align-top">主な事業</td>
                    <td className="py-4 text-[#1c1c1e]">
                      おそうじ本舗フランチャイズ運営<br />
                      <span className="text-xs text-gray-500">（大井町店・大田中央店・幸塚越店・川崎新町店・戸越銀座駅前店・大森南店）</span>
                    </td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="py-4 pr-8 text-gray-500 font-medium align-top">受賞歴</td>
                    <td className="py-4 text-[#1c1c1e]">
                      おそうじ本舗フランチャイズ最優秀賞<br />
                      <span className="text-xs text-gray-500">2024年・2025年 2年連続受賞（1,803店舗中1位）</span>
                    </td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="py-4 pr-8 text-gray-500 font-medium align-top">フリーダイヤル</td>
                    <td className="py-4 text-[#1c1c1e]">
                      <a href="tel:0120197576" className="hover:text-[#b8960c] transition-colors">0120-19-7576</a><br />
                      <span className="text-xs text-gray-500">受付時間：10:00〜18:00</span>
                    </td>
                  </tr>
                  <tr className="border-t border-gray-100 border-b border-gray-100">
                    <td className="py-4 pr-8 text-gray-500 font-medium align-top">所在地</td>
                    <td className="py-4 text-[#1c1c1e]">
                      <div className="flex flex-col gap-3">
                        {offices.map((office) => (
                          <div key={office.name}>
                            <span className="text-xs font-medium text-[#b8960c] block mb-0.5">{office.name}</span>
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
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container">
            <div className="mb-8">
              <p className="text-xs tracking-[0.2em] text-[#b8960c] uppercase mb-3 font-medium">
                Follow Us
              </p>
              <h2 className="text-xl md:text-2xl font-bold text-[#1c1c1e]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                SNS
              </h2>
            </div>

            <div className="flex flex-wrap gap-4">
              {/* YouTube */}
              <a
                href="https://www.youtube.com/@Kanoe_channel/featured"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-white border border-gray-200 px-5 py-3 hover:border-[#FF0000] hover:shadow-sm transition-all duration-200"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z" fill="#FF0000"/>
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
                </svg>
                <span className="text-sm font-medium text-[#1c1c1e] group-hover:text-[#FF0000] transition-colors">YouTubeチャンネル</span>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/osoujihonpo_oimachi/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-white border border-gray-200 px-5 py-3 hover:border-[#E1306C] hover:shadow-sm transition-all duration-200"
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
                <span className="text-sm font-medium text-[#1c1c1e] group-hover:text-[#E1306C] transition-colors">Instagram</span>
              </a>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ===== フッター ===== */}
      <footer className="bg-[#1c1c1e] text-white py-10">
        <div className="container">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <img
                src={LOGO_URL}
                alt="株式会社カノエ KANOE"
                className="h-8 w-auto mb-3 brightness-0 invert"
              />
              <p className="text-xs text-gray-400">
                フリーダイヤル：
                <a href="tel:0120197576" className="hover:text-white transition-colors">0120-19-7576</a>
                　受付 10:00〜18:00
              </p>
            </div>

            <div className="flex flex-wrap gap-6 text-xs text-gray-400">
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

          <div className="border-t border-gray-700 mt-8 pt-6 text-center">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} 株式会社カノエ All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
