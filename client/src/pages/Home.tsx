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
  { label: "現場DX支援", href: "#dx", external: false },
  { label: "おそうじ本舗", href: "https://osouji-oimachi.com/", external: true },
  { label: "ご予約", href: "https://lin.ee/lQfaoYR", external: true },
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

// 清掃事例ギャラリーデータ
const galleryItems = [
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663393929968/iYwBZn5CdVZAZNoSzLfUqs/IMG_4315_e3d0afca.JPG",
    label: "エアコンクリーニング（作業中）",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663393929968/iYwBZn5CdVZAZNoSzLfUqs/IMG_4375_788696dc.JPG",
    label: "お客様へのご説明",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663393929968/iYwBZn5CdVZAZNoSzLfUqs/IMG_4310_5eb5210b.JPG",
    label: "エアコン分解クリーニング",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663393929968/iYwBZn5CdVZAZNoSzLfUqs/0215_240110_40da0969.JPG",
    label: "私たちの想い",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663393929968/iYwBZn5CdVZAZNoSzLfUqs/0086_240110_1043276f.JPG",
    label: "おそうじ本舗 大井町店",
  },
];

// お客様の声（ダミーデータ）
const reviews = [
  {
    name: "T. Yamamoto",
    stars: 5,
    date: "2025年11月",
    text: "エアコンクリーニングをお願いしました。購入から数年たったエアコンが新品同様になり、冷気の効きも明らかに向上しました。スタッフの方も丁寧で作業も丁寧で、またお願いしたいです。",
  },
  {
    name: "K. Sato",
    stars: 5,
    date: "2025年10月",
    text: "浴室クリーニングを依頼しました。カビや水垂れがひどくて気になっていたのですが、こんなにキレイになると思わなかったです。作業前後の写真を見せてもらえて、安心してお願いできました。",
  },
  {
    name: "M. Tanaka",
    stars: 5,
    date: "2025年9月",
    text: "キッチンクリーニングをお願いしました。コンロの五徳やレンジ周りの決して落とせなかった汚れもぴかぴかに。LINEで簡単に予約できて、当日のスタッフさんも明るくて気持よく作業してくれました。",
  },
];

// その他のおそうじ（アコーディオン）
const otherServices = [
  {
    title: "オフィス定期清掃",
    description: "オフィス・事務所の定期清掃サービスです。床・トイレ・共用部など、プロのスタッフが定期的に清掃いたします。清潔な職場環境を維持することで、従業員の生産性向上にもつながります。",
    detail: "対応エリア：東京・神奈川・大阪\n頻度：週1回〜月1回など柔軟に対応\nお見積もり・ご相談はLINEまたはお電話にて承ります。",
  },
  {
    title: "マンション定期清掃",
    description: "マンション・アパートの共用部（エントランス・廊下・階段・エレベーター等）の定期清掃サービスです。入居者様が快適に過ごせる環境づくりをサポートします。",
    detail: "対応エリア：東京・神奈川・大阪\n頻度：週1回〜月1回など柔軟に対応\n管理組合・管理会社様からのご依頼も歓迎いたします。",
  },
  {
    title: "マンスリーマンション入れ替え清掃",
    description: "マンスリーマンション・ウィークリーマンションの退去・入居時の清掃サービスです。短期間での対応も可能で、次の入居者様に気持ちよく使っていただける状態に仕上げます。",
    detail: "対応エリア：東京・神奈川・大阪\n短期対応・急ぎの依頼もご相談ください\nまとめて複数室のご依頼も承ります。",
  },
  {
    title: "排水管洗浄",
    description: "キッチン・浴室・洗面台・トイレなどの排水管の高圧洗浄サービスです。詰まりの予防・解消、臭いの改善に効果的です。定期的なメンテナンスで排水トラブルを未然に防ぎます。",
    detail: "対応エリア：東京・神奈川・大阪\n戸建て・マンション・オフィスいずれも対応\nご予約・お見積もりはLINEまたはお電話にて。",
  },
];

function OtherServices() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="mt-8">
      <div className="mb-4">
        <p className="text-xs tracking-[0.15em] uppercase mb-1" style={{ color: C.textLight }}>Other Cleaning</p>
        <h3 className="text-base font-bold" style={{ color: C.text }}>その他のおそうじ</h3>
      </div>
      <div className="flex flex-col gap-2">
        {otherServices.map((svc, i) => (
          <div key={i} style={{ border: `1px solid ${C.border}`, backgroundColor: C.bgWhite }}>
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors duration-200"
              style={{ backgroundColor: openIndex === i ? C.navyBg : C.bgWhite }}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              onMouseEnter={e => { if (openIndex !== i) (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.bg; }}
              onMouseLeave={e => { if (openIndex !== i) (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.bgWhite; }}
            >
              <span className="text-sm font-medium" style={{ color: C.text }}>{svc.title}</span>
              <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none"
                style={{ color: C.textMuted, transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease", flexShrink: 0 }}
              >
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {openIndex === i && (
              <div className="px-5 pb-5" style={{ borderTop: `1px solid ${C.border}` }}>
                <p className="text-sm leading-relaxed mt-4 mb-3" style={{ color: C.textMuted }}>{svc.description}</p>
                <pre className="text-xs leading-relaxed whitespace-pre-wrap" style={{ color: C.textLight, fontFamily: "'Noto Sans JP', sans-serif" }}>{svc.detail}</pre>
                <div className="mt-4">
                  <a
                    href="https://lin.ee/lQfaoYR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-4 py-2 transition-opacity duration-200"
                    style={{ backgroundColor: "#06C755", color: "#ffffff" }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85"}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "1"}
                  >
                    LINEでお問い合わせ・予約
                    <ExternalIcon />
                  </a>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
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

function ConsultingSection() {
  const [open, setOpen] = useState(false);
  return (
    <Reveal>
      <section
        style={{
          background: `linear-gradient(135deg, ${C.navy} 0%, #0f2540 100%)`,
          position: "relative",
          overflow: "hidden",
        }}
        className="py-16 md:py-20"
      >
        {/* 背景装飾 */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(255,255,255,0.015) 60px, rgba(255,255,255,0.015) 61px)",
        }} />

        <div className="container" style={{ position: "relative" }}>
          <div className="max-w-3xl">
            {/* ラベル */}
            <p className="text-xs tracking-[0.18em] uppercase mb-4 font-medium" style={{ color: "rgba(255,255,255,0.45)" }}>Consulting Service</p>

            {/* タイトル + リード文（常時表示） */}
            <h2
              className="text-2xl md:text-4xl font-bold leading-tight mb-3"
              style={{ color: "#ffffff", fontFamily: "'Noto Sans JP', sans-serif", letterSpacing: "0.08em" }}
            >
              <span style={{ color: "#f5d67a" }}>ブルーカラー軍師</span>
            </h2>
            <p className="text-sm md:text-base font-medium mb-5" style={{ color: "rgba(255,255,255,0.85)" }}>
              大将（一人親方）の隣に、軍師を。<br />ブルーカラー経営者の戦略参謀・コンサルティングサービス
            </p>
            <p className="text-sm md:text-base leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.65)" }}>
              現場叩き上げの経営参謀が、ブルーカラーの大将（一人親方）を経営という戦場でも勝たせるために伴走します。一人親方から組織化・拡大まで、成長ステージに合わせて戦略を共に描きます。
            </p>

            {/* 展開トグルボタン */}
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 text-sm font-bold transition-all duration-200 mb-2"
              style={{ color: "#f5d67a", background: "none", border: "none", padding: 0, cursor: "pointer" }}
            >
              <span>{open ? "詳細を閉じる" : "詳細を見る"}</span>
              <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none"
                style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}
              >
                <path d="M6 9l6 6 6-6" stroke="#f5d67a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* 展開コンテンツ */}
            <div
              style={{
                maxHeight: open ? "800px" : "0",
                overflow: "hidden",
                transition: "max-height 0.5s ease",
              }}
            >
              <div className="pt-6">
                {/* 実績バッジ */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {[
                    "一人から始めて開業6年で売上2億円以上",
                    "40名以上の組織に成長",
                    "おそうじ本舗全国最優秀賞2年連続受賞",
                  ].map((badge, i) => (
                    <span
                      key={i}
                      className="inline-block text-xs font-medium px-3 py-1.5"
                      style={{
                        border: "1px solid rgba(245,214,122,0.4)",
                        color: "#f5d67a",
                        backgroundColor: "rgba(245,214,122,0.08)",
                      }}
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* 支援内容カード */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {[
                    { title: "脱一人親方塾", desc: "一人親方から組織化へ。採用・定着・評価制度を一気通貫で構築" },
                    { title: "営業強化・集客改善", desc: "Web・SNS・口コミを活用した集客戦略の構築" },
                    { title: "業務フロー最適化", desc: "無駄な作業・管理工数を削減し、利益改善を実現" },
                    { title: "DX導入支援", desc: "デジタルツール・システム導入で業務を自動化" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="p-4"
                      style={{
                        border: "1px solid rgba(255,255,255,0.1)",
                        backgroundColor: "rgba(255,255,255,0.04)",
                      }}
                    >
                      <p className="text-sm font-bold mb-1" style={{ color: "#ffffff" }}>{item.title}</p>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{item.desc}</p>
                    </div>
                  ))}
                </div>

                {/* 導線エリア */}
                <div
                  className="flex flex-col sm:flex-row sm:items-center gap-4 p-5"
                  style={{ border: "1px solid rgba(245,214,122,0.25)", backgroundColor: "rgba(245,214,122,0.05)" }}
                >
                  <div className="flex-1">
                    <p className="text-sm font-bold mb-0.5" style={{ color: "#f5d67a" }}>ブルーカラー軍師の詳細はこちら</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>大将を支える軍師・経営参謀サービスの専用ページへ</p>
                  </div>
                  <a
                    href="/gunshi"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold transition-all duration-200 flex-shrink-0"
                    style={{ backgroundColor: "#f5d67a", color: "#1a1a19" }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "0.9"}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "1"}
                  >
                    ブルーカラー軍師を見る
                    <ExternalIcon />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </Reveal>
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
                  onClick={!link.external ? (e) => {
                    e.preventDefault();
                    const target = document.querySelector(link.href);
                    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
                  } : undefined}
                >
                  {link.label}
                  {link.external && <ExternalIcon />}
                </a>
              ))}
              <a
                href="tel:0120197576"
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 transition-all duration-200"
                style={{ border: `1.5px solid ${C.navy}`, color: C.navy, backgroundColor: C.bg, borderRadius: "4px" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = C.navy; (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = C.bg; (e.currentTarget as HTMLAnchorElement).style.color = C.navy; }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor"/>
                </svg>
                <span>0120-19-7576</span>
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
                onClick={(e) => {
                  setMenuOpen(false);
                  if (!link.external) {
                    e.preventDefault();
                    const target = document.querySelector(link.href);
                    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
              >
                {link.label}
                {link.external && <ExternalIcon />}
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
        style={{
          position: "relative",
          backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663393929968/iYwBZn5CdVZAZNoSzLfUqs/0086_240110_1043276f.JPG')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* グレー半透明オーバーレイ */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(30, 35, 45, 0.62)",
            zIndex: 0,
          }}
        />
        <div className="container py-16 md:py-24" style={{ position: "relative", zIndex: 1 }}>
          <div className="max-w-xl">
            <p className="text-xs tracking-[0.18em] uppercase mb-5 font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>
              Cleaning Professional
            </p>
            <h1
              className="text-3xl md:text-5xl font-bold leading-tight mb-5"
              style={{ color: "#ffffff", fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 700, textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
            >
              株式会社カノエ
            </h1>
            <p className="text-sm md:text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.85)", textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>
              おそうじ本舗フランチャイズとして<br />
              関東・関西で7店舗を展開。<br />
              2年連続、全国最優秀賞を受賞。
            </p>

          </div>
        </div>
      </section>

      {/* ===== LINE誘導バナー ===== */}
      <section
        style={{
          background: "linear-gradient(135deg, #06C755 0%, #04a847 60%, #038a3b 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 装飾円 */}
        <div style={{
          position: "absolute", top: "-60px", right: "-60px",
          width: "220px", height: "220px", borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.06)", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "-40px", left: "30%",
          width: "140px", height: "140px", borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.04)", pointerEvents: "none",
        }} />

        <div className="container py-7 md:py-8" style={{ position: "relative" }}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">

            {/* 左：メッセージ */}
            <div className="flex-1">
              <p className="text-xs font-bold tracking-[0.12em] uppercase mb-1.5" style={{ color: "rgba(255,255,255,0.7)" }}>LINEお友達追加特典</p>
              <h3 className="text-lg md:text-xl font-bold" style={{ color: "#ffffff" }}>
                LINE登録で、おそうじがもっと便利に。
              </h3>
            </div>

            {/* 中：メリットリスト */}
            <div className="flex flex-col gap-1.5 md:flex-shrink-0">
              {[
                "24時間予約・空き確認",
                "電話なしで予約完結",
                "おそうじカレンダープレゼント",
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)", userSelect: "none" }}>—</span>
                  <span className="text-sm" style={{ color: "rgba(255,255,255,0.9)" }}>{text}</span>
                </div>
              ))}
            </div>

            {/* 右：CTAボタン */}
            <div className="flex-shrink-0">
              <a
                href="https://lin.ee/lQfaoYR"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 font-bold text-sm transition-all duration-200"
                style={{
                  backgroundColor: "#ffffff",
                  color: "#06C755",
                  boxShadow: "0 3px 12px rgba(0,0,0,0.12)",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"}
              >
                LINEで無料登録
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ===== 受賞実績バナー（ゴールド） ===== */}
      <Reveal>
        <section
          style={{
            background: "linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)",
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
            <div className="flex flex-row gap-6 md:gap-12 items-start">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3" id="service-links">
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
                href="https://lin.ee/lQfaoYR"
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

            {/* その他のおそうじ */}
            <OtherServices />
          </div>
        </section>
      </Reveal>

      {/* ===== 清掃事例ギャラリーセクション ===== */}
      <Reveal>
        <section style={{ backgroundColor: C.bg, borderTop: `1px solid ${C.border}` }} className="py-14 md:py-20">
          <div className="container">
            <div className="mb-8">
              <p className="text-xs tracking-[0.15em] uppercase mb-2" style={{ color: C.textLight }}>Gallery</p>
              <h2 className="text-xl font-bold" style={{ color: C.text }}>清掃事例</h2>
              <p className="text-sm mt-2" style={{ color: C.textMuted }}>プロの技術で、ここまでキレイになります。</p>
            </div>

            {/* メイングリッド */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
              {galleryItems.map((item, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div
                    className="group relative overflow-hidden"
                    style={{ aspectRatio: "4/3", cursor: "default" }}
                  >
                    <img
                      src={item.src}
                      alt={item.label}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* オーバーレイ */}
                    <div
                      className="absolute inset-0 flex items-end transition-opacity duration-300"
                      style={{
                        background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)",
                      }}
                    >
                      <span className="px-3 pb-3 text-xs font-medium" style={{ color: "#ffffff" }}>{item.label}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <p className="text-xs mt-4" style={{ color: C.textLight }}>実際の作業・店舗の様子です。</p>
          </div>
        </section>
      </Reveal>

      {/* ===== お客様の声セクション ===== */}
      <Reveal>
        <section style={{ backgroundColor: C.bgWhite, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }} className="py-14 md:py-20">
          <div className="container">
            <div className="mb-10">
              <p className="text-xs tracking-[0.15em] uppercase mb-2" style={{ color: C.textLight }}>Reviews</p>
              <h2 className="text-xl font-bold" style={{ color: C.text }}>お客様の声</h2>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="#f5a623">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-medium" style={{ color: C.text }}>4.9</span>
                <span className="text-xs" style={{ color: C.textMuted }}>Googleビジネスプロフィール平均（サンプル）</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reviews.map((review, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div
                    className="flex flex-col gap-3 p-5 h-full"
                    style={{ border: `1px solid ${C.border}`, backgroundColor: C.bg }}
                  >
                    {/* 星評価 */}
                    <div className="flex gap-0.5">
                      {Array.from({ length: review.stars }).map((_, s) => (
                        <svg key={s} width="13" height="13" viewBox="0 0 24 24" fill="#f5a623">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                      ))}
                    </div>
                    {/* レビュー本文 */}
                    <p className="text-sm leading-relaxed flex-1" style={{ color: C.textMuted }}>「{review.text}」</p>
                    {/* 投稿者 */}
                    <div className="flex items-center gap-2 pt-2" style={{ borderTop: `1px solid ${C.border}` }}>
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{ backgroundColor: C.navyBg, color: C.navy }}
                      >
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-medium" style={{ color: C.text }}>{review.name}</p>
                        <p className="text-xs" style={{ color: C.textLight }}>{review.date}</p>
                      </div>
                      <div className="ml-auto">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M21.35 11.1h-9.17v2.73h5.51c-.33 1.81-1.92 4.56-5.51 4.56-3.31 0-6.01-2.74-6.01-6.12s2.7-6.12 6.01-6.12c1.88 0 3.14.8 3.86 1.49l2.63-2.54C17.07 3.99 14.9 3 12.18 3 7.13 3 3 7.13 3 12.18s4.13 9.18 9.18 9.18c5.3 0 8.82-3.72 8.82-8.96 0-.6-.07-1.06-.15-1.3z" fill="#4285F4"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <p className="text-xs mt-6" style={{ color: C.textLight }}>※上記はサンプルのレビューです。実際のGoogleレビューは各店舗のGoogleビジネスプロフィールでご確認いただけます。</p>
          </div>
        </section>
      </Reveal>

      {/* ===== コンサルティングサービスセクション ===== */}
      {/* <ConsultingSection /> */}{/* ブルーカラー軍師セクション（一時非表示） */}

      {/* ===== 現場DX支援セクション ===== */}
      <Reveal>
        <section id="dx" style={{ backgroundColor: C.navy }} className="py-14 md:py-20">
          <div className="container">
            {/* セクションヘッダー */}
            <div className="mb-10">
              <p className="text-xs tracking-[0.15em] uppercase mb-2" style={{ color: "rgba(255,255,255,0.45)" }}>DX Support</p>
              <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "#ffffff" }}>現場DX支援</h2>
              <div style={{ width: 40, height: 2, backgroundColor: "#c9a84c", marginTop: 12 }} />
            </div>

            {/* 背景ストーリー */}
            <div style={{ maxWidth: 720, marginBottom: 48 }}>
              <p style={{ color: "rgba(255,255,255,0.85)", lineHeight: 1.9, fontSize: 15 }}>
                カノエは、おそうじ本舗フランチャイズの現場運営を通じて、スタッフへの連絡周知・シフト管理・業務フローの非効率さを自ら体験してきました。
                「現場で本当に使えるシステムを、現場目線でつくりたい」という思いから、自社の課題解決のために開発したプロダクトを、同じ悩みを持つ中小企業・小規模事業者向けに提供しています。
                実際に自社で運用し、改善を重ねたシステムだからこそ、現場の実態に即した使いやすさを実現しています。
              </p>
            </div>

            {/* 伝わるくんカード */}
            <div style={{ marginBottom: 12 }}>
              <p className="text-xs tracking-[0.15em] uppercase mb-4" style={{ color: "rgba(255,255,255,0.45)" }}>参考プロダクト</p>
            </div>
            <a
              href="https://tsutawarukun.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", display: "block" }}
            >
              <div
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 4,
                  padding: "32px 36px",
                  maxWidth: 680,
                  transition: "background 0.2s, border-color 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.backgroundColor = "rgba(255,255,255,0.1)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,168,76,0.5)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.backgroundColor = "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.15)";
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 24, flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                      <h3 style={{ color: "#ffffff", fontSize: 20, fontWeight: 700, margin: 0 }}>伝わるくん</h3>
                      <span style={{
                        fontSize: 10, fontWeight: 600, letterSpacing: "0.1em",
                        color: "#c9a84c", border: "1px solid #c9a84c",
                        padding: "2px 8px", borderRadius: 2,
                      }}>自社開発</span>
                    </div>
                    <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, marginBottom: 12 }}>オンライン掲示板アプリ</p>
                    <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, lineHeight: 1.8, margin: 0 }}>
                      LINEに流れがちな大切な連絡を、全員にちゃんと届ける。既読チェック・期限設定・業務リンク集など、10〜50人規模の現場チームに必要な機能をシンプルに搭載。アプリ不要・スマホ対応。10人以下はずっと無料。
                    </p>

                    {/* 特徴タグ */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
                      {["既読チェック機能", "期限設定・リマインド", "業務リンク集", "スマホ対応", "10人以下無料"].map(tag => (
                        <span key={tag} style={{
                          fontSize: 11, color: "rgba(255,255,255,0.6)",
                          border: "1px solid rgba(255,255,255,0.2)",
                          padding: "3px 10px", borderRadius: 2,
                        }}>{tag}</span>
                      ))}
                    </div>

                    <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ color: "#c9a84c", fontSize: 13, fontWeight: 600 }}>tsutawarukun.com</span>
                      <span style={{ color: "#c9a84c", fontSize: 12 }}>↗</span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
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

      {/* ===== 採用情報セクション ===== */}
      <Reveal>
        <section style={{ backgroundColor: C.bg, borderTop: `1px solid ${C.border}` }} className="py-14 md:py-20">
          <div className="container">
            <div className="mb-8">
              <p className="text-xs tracking-[0.15em] uppercase mb-2" style={{ color: C.textLight }}>Recruit</p>
              <h2 className="text-xl font-bold" style={{ color: C.text }}>採用情報</h2>
            </div>

            <div
              style={{ border: `1px solid ${C.border}`, backgroundColor: C.bgWhite }}
              className="max-w-2xl"
            >
              <div className="p-6 md:p-8">
                <p className="text-sm leading-relaxed mb-6" style={{ color: C.textMuted }}>
                  株式会社カノエでは、一緒に働く仲間を募集しています。<br />
                  「おそうじでキレイで豊かなくらしを」という理念のもと、<br />
                  明るく元気なスタッフが活躍しています。
                </p>
                <a
                  href="https://recruit.kanoe.biz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium px-6 py-3 transition-all duration-200"
                  style={{ backgroundColor: C.navy, color: "#ffffff" }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85"}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "1"}
                >
                  採用情報を見る
                  <ExternalIcon />
                </a>
              </div>
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
          <div className="mt-6 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3" style={{ borderTop: `1px solid ${C.border}` }}>
            <p className="text-xs" style={{ color: C.textLight }}>
              © {new Date().getFullYear()} 株式会社カノエ All Rights Reserved.
            </p>
            <a
              href="/legal"
              className="text-xs transition-colors duration-200"
              style={{ color: C.textMuted }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = C.text}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = C.textMuted}
            >
              特定商取引法に基づく表記
            </a>
          </div>
        </div>
      </footer>

      {/* ===== フローティング電話ボタン ===== */}
      <a
        href="tel:0120197576"
        className="transition-all duration-300"
        style={{
          position: "fixed",
          bottom: "6rem",
          right: "1.5rem",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          backgroundColor: C.navy,
          color: "#ffffff",
          padding: "0.75rem 1.25rem",
          borderRadius: "9999px",
          boxShadow: "0 4px 20px rgba(0,91,172,0.4), 0 2px 8px rgba(0,0,0,0.15)",
          fontWeight: 700,
          fontSize: "0.875rem",
          textDecoration: "none",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px) scale(1.04)";
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 28px rgba(0,91,172,0.55), 0 4px 12px rgba(0,0,0,0.18)";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0) scale(1)";
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(0,91,172,0.4), 0 2px 8px rgba(0,0,0,0.15)";
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="white"/>
        </svg>
        <span>0120-19-7576</span>
      </a>

      {/* ===== フローティングLINEボタン ===== */}
      <a
        href="https://lin.ee/lQfaoYR"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-all duration-300"
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          backgroundColor: "#06C755",
          color: "#ffffff",
          padding: "0.75rem 1.25rem",
          borderRadius: "9999px",
          boxShadow: "0 4px 20px rgba(6,199,85,0.45), 0 2px 8px rgba(0,0,0,0.15)",
          fontWeight: 700,
          fontSize: "0.875rem",
          textDecoration: "none",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px) scale(1.04)";
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 28px rgba(6,199,85,0.55), 0 4px 12px rgba(0,0,0,0.18)";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0) scale(1)";
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(6,199,85,0.45), 0 2px 8px rgba(0,0,0,0.15)";
        }}
      >
        {/* LINEアイコン */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3C7.03 3 3 6.58 3 11c0 2.77 1.58 5.22 4 6.77-.17.62-.64 2.23-.73 2.58-.11.44.16.43.34.31.14-.09 2.27-1.5 3.19-2.12.77.11 1.57.17 2.2.17 4.97 0 9-3.58 9-8s-4.03-8-9-8z" fill="white"/>
        </svg>
        <span>LINEで無料登録</span>
      </a>
    </div>
  );
}
