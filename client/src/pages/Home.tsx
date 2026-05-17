import { useEffect, useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  ChevronRight,
  Hammer,
  MessageCircle,
  MapPin,
  Menu,
  MonitorSmartphone,
  Phone,
  Recycle,
  Sparkles,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";

const HERO_IMAGE = "/assets/kanoe-hero.png";
const LOGO_MARK = "/assets/kanoe-mark.png";

const navLinks = [
  { label: "新着情報", href: "#news" },
  { label: "事業紹介", href: "#business" },
  { label: "会社情報", href: "#company" },
  { label: "採用情報", href: "#recruit" },
  { label: "お問い合わせ", href: "#contact" },
];

const newsItems = [
  {
    date: "2026.05.18",
    category: "お知らせ",
    title: "コーポレートサイトの構成をリニューアルしました。",
  },
  {
    date: "2026.05.18",
    category: "事業情報",
    title: "主な事業紹介を更新しました。",
  },
  {
    date: "2026.05.18",
    category: "採用情報",
    title: "採用情報・お問い合わせ導線を追加しました。",
  },
];

type BusinessItem = {
  title: string;
  subtitle: string;
  status: string;
  description: string;
  icon: LucideIcon;
  href?: string;
  external?: boolean;
  accent: string;
};

const businesses: BusinessItem[] = [
  {
    title: "ハウスクリーニング事業",
    subtitle: "おそうじ本舗加盟店",
    status: "展開中",
    description:
      "おそうじ本舗の加盟店として、住まいの清掃サービスを中心に、地域のお客様に寄り添った現場品質を磨き続けています。",
    icon: Sparkles,
    href: "https://osouji-oimachi.com/",
    external: true,
    accent: "#0f75d6",
  },
  {
    title: "不用品回収",
    subtitle: "整理・回収領域",
    status: "準備中",
    description:
      "清掃と相性の高い不用品回収領域を準備中です。暮らしや現場を整えるサービスとして、提供体制を構築しています。",
    icon: Recycle,
    accent: "#2f8f6f",
  },
  {
    title: "リペア事業",
    subtitle: "住まいの補修領域",
    status: "準備中",
    description:
      "住宅設備や内装の補修ニーズに応えるリペア事業を準備中です。清掃後の住環境をさらに整える領域として展開予定です。",
    icon: Hammer,
    accent: "#b46b2b",
  },
  {
    title: "ブルーカラー特化組織化コンサルティング",
    subtitle: "現場事業者向け支援",
    status: "相談受付中",
    description:
      "現場仕事の採用、教育、店長育成、仕組み化を支援します。一人親方から組織運営へ移行するための実践知を提供します。",
    icon: Users,
    href: "/gunshi",
    accent: "#1f3c68",
  },
  {
    title: "自社システム販売",
    subtitle: "SaaS",
    status: "展開予定",
    description:
      "自社の現場運営で必要だった予約、報告、管理の仕組みをプロダクト化し、現場型事業者向けSaaSとして提供していきます。",
    icon: MonitorSmartphone,
    accent: "#126b8f",
  },
];

const companyRows = [
  ["会社名", "株式会社カノエ"],
  ["代表者", "代表取締役社長　勅使河原 将"],
  [
    "主な事業",
    "ハウスクリーニング事業、組織化コンサルティング、自社システム販売ほか",
  ],
  ["展開エリア", "東京・神奈川・大阪"],
  ["本社", "東京都品川区大井3-18-18 REX Oimachi 1F"],
];

const offices = [
  "大森事務所：東京都品川区南大井6-21-3 シェトワ大森101",
  "川崎事務所：神奈川県横浜市矢向5-7-32 1F",
  "大阪事務所：大阪府大阪市中央区農人橋2丁目3-12 大伸センタービル2F",
];

const recruitItems = [
  {
    title: "現場スタッフ",
    text: "ハウスクリーニングを中心に、地域のお客様へ直接価値を届ける仕事です。",
  },
  {
    title: "店長候補・マネージャー",
    text: "店舗運営、品質管理、人材育成を担い、現場組織をつくる役割です。",
  },
  {
    title: "本部・事業推進",
    text: "採用、企画、システム、バックオフィスなど、成長基盤を支える役割です。",
  },
];

function scrollToAnchor(href: string) {
  const target = document.querySelector(href);
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";

  return (
    <div
      className={
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"
      }
    >
      <p
        className={`mb-3 text-xs font-bold uppercase tracking-[0.22em] ${isDark ? "text-sky-300" : "text-sky-700"}`}
      >
        {eyebrow}
      </p>
      <h2
        className={`text-3xl font-bold leading-tight md:text-5xl ${isDark ? "text-white" : "text-slate-950"}`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-5 text-base leading-8 md:text-lg ${isDark ? "text-slate-300" : "text-slate-600"}`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur"
          : "bg-white/90 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
        <a
          href="/"
          className="flex items-center gap-3"
          aria-label="株式会社カノエ トップへ"
        >
          <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded bg-white shadow-sm ring-1 ring-sky-100">
            <img
              src={LOGO_MARK}
              alt=""
              className="h-10 w-10 object-cover object-center"
            />
          </span>
          <span className="leading-none">
            <span className="block text-sm font-bold tracking-[0.18em] text-slate-950 md:text-base">
              株式会社カノエ
            </span>
            <span className="mt-1 block text-[10px] font-bold tracking-[0.32em] text-sky-700">
              KANOE INC.
            </span>
          </span>
        </a>

        <nav
          className="hidden items-center gap-7 md:flex"
          aria-label="グローバルナビゲーション"
        >
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-sky-700"
              onClick={event => {
                event.preventDefault();
                scrollToAnchor(link.href);
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded border border-slate-200 bg-white text-slate-900 md:hidden"
          onClick={() => setMenuOpen(open => !open)}
          aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-slate-200 bg-white transition-all duration-300 md:hidden ${menuOpen ? "max-h-96" : "max-h-0"}`}
      >
        <nav
          className="mx-auto flex w-full max-w-7xl flex-col px-5 py-3"
          aria-label="モバイルナビゲーション"
        >
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="flex items-center justify-between border-b border-slate-100 py-4 text-sm font-bold text-slate-800"
              onClick={event => {
                event.preventDefault();
                setMenuOpen(false);
                scrollToAnchor(link.href);
              }}
            >
              {link.label}
              <ChevronRight size={16} className="text-sky-700" />
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-sky-50 pt-16 md:pt-20">
      <div
        className="relative min-h-[520px] bg-cover bg-center md:min-h-[calc(100vh-5rem)]"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        aria-label="株式会社カノエ KANOE INC. 地域に寄り添い、成長し続ける。"
      />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white" />
    </section>
  );
}

function NewsSection() {
  return (
    <section id="news" className="scroll-mt-24 bg-white py-16 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeader
            eyebrow="News"
            title="新着情報"
            lead="株式会社カノエからのお知らせ、事業情報、採用情報を掲載します。"
          />
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {newsItems.map(item => (
              <article
                key={`${item.date}-${item.title}`}
                className="grid gap-3 py-6 md:grid-cols-[11rem_1fr] md:gap-6"
              >
                <div className="flex items-center gap-3">
                  <time className="text-sm font-bold text-slate-500">
                    {item.date}
                  </time>
                  <span className="rounded-sm bg-sky-50 px-2.5 py-1 text-xs font-bold text-sky-700">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-base font-bold leading-7 text-slate-950">
                  {item.title}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BusinessCard({
  business,
  index,
}: {
  business: BusinessItem;
  index: number;
}) {
  const Icon = business.icon;
  const content = (
    <>
      <div className="flex items-start justify-between gap-5">
        <div className="flex items-center gap-4">
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-slate-50"
            style={{ color: business.accent }}
          >
            <Icon size={24} strokeWidth={1.8} />
          </span>
          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-slate-400">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-1 text-xl font-bold leading-tight text-slate-950 md:text-2xl">
              {business.title}
            </h3>
          </div>
        </div>
        <span
          className="shrink-0 rounded-sm border px-3 py-1 text-xs font-bold"
          style={{ borderColor: business.accent, color: business.accent }}
        >
          {business.status}
        </span>
      </div>
      <p className="mt-4 text-sm font-bold text-slate-500">
        {business.subtitle}
      </p>
      <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base md:leading-8">
        {business.description}
      </p>
      {business.href && (
        <span
          className="mt-6 inline-flex items-center gap-2 text-sm font-bold"
          style={{ color: business.accent }}
        >
          詳細を見る
          <ArrowRight size={16} />
        </span>
      )}
    </>
  );

  const className =
    "group block h-full rounded border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_18px_50px_rgba(15,23,42,0.08)] md:p-8";

  if (business.href) {
    return (
      <a
        href={business.href}
        target={business.external ? "_blank" : undefined}
        rel={business.external ? "noopener noreferrer" : undefined}
        className={className}
      >
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
}

function BusinessSection() {
  return (
    <section id="business" className="scroll-mt-24 bg-[#f6fbff] py-16 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <SectionHeader
          eyebrow="Business"
          title="主な事業紹介"
          lead="地域密着の現場事業を軸に、周辺領域と自社システムへ事業を広げています。"
          align="center"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {businesses.map((business, index) => (
            <BusinessCard
              key={business.title}
              business={business}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CompanySection() {
  return (
    <section id="company" className="scroll-mt-24 bg-white py-16 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeader
            eyebrow="Company"
            title="会社情報"
            lead="地域に寄り添い、現場品質と組織力を高めながら、必要とされる事業を一つずつ育てています。"
          />

          <div>
            <dl className="divide-y divide-slate-200 border-y border-slate-200">
              {companyRows.map(([label, value]) => (
                <div
                  key={label}
                  className="grid gap-2 py-5 md:grid-cols-[9rem_1fr] md:gap-8"
                >
                  <dt className="text-sm font-bold text-slate-500">{label}</dt>
                  <dd className="text-sm leading-7 text-slate-900 md:text-base">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 border-l-2 border-sky-600 pl-5">
              <p className="text-sm font-bold text-slate-950">その他拠点</p>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
                {offices.map(office => (
                  <li key={office} className="flex gap-2">
                    <MapPin size={16} className="mt-1 shrink-0 text-sky-700" />
                    <span>{office}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RecruitSection() {
  return (
    <section
      id="recruit"
      className="scroll-mt-24 bg-slate-950 py-16 text-white md:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeader
            eyebrow="Recruit"
            title="採用情報"
            lead="清掃、店舗運営、事業づくりまで。現場から会社をつくる仲間を募集しています。"
            tone="dark"
          />

          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
            {recruitItems.map(item => (
              <div
                key={item.title}
                className="rounded border border-white/10 bg-white/[0.04] p-6"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded bg-sky-400/10 text-sky-300">
                  <BriefcaseBusiness size={22} strokeWidth={1.8} />
                </div>
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm leading-7 text-slate-300">
            募集状況や応募方法は、お問い合わせよりご連絡ください。
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-sky-50"
            onClick={event => {
              event.preventDefault();
              scrollToAnchor("#contact");
            }}
          >
            採用について問い合わせる
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 bg-white py-16 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <SectionHeader
          eyebrow="Contact"
          title="お問い合わせ"
          lead="サービス、採用、事業提携、コンサルティング、自社システムに関するご相談はこちらからお問い合わせください。"
          align="center"
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <a
            href="tel:0120197576"
            className="group rounded border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
          >
            <Phone className="text-sky-700" size={28} strokeWidth={1.8} />
            <h3 className="mt-5 text-lg font-bold text-slate-950">
              電話で問い合わせる
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              お急ぎのご相談や、清掃サービスに関するお問い合わせはこちら。
            </p>
            <p className="mt-5 text-xl font-bold text-sky-700">0120-19-7576</p>
          </a>

          <a
            href="https://lin.ee/lQfaoYR"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
          >
            <MessageCircle
              className="text-emerald-600"
              size={28}
              strokeWidth={1.8}
            />
            <h3 className="mt-5 text-lg font-bold text-slate-950">
              LINEで相談する
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              ハウスクリーニングのご予約やご相談はLINEからも受け付けています。
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-600">
              LINEを開く
              <ArrowRight size={16} />
            </span>
          </a>

          <div className="rounded border border-slate-200 bg-slate-50 p-6">
            <Building2 className="text-slate-700" size={28} strokeWidth={1.8} />
            <h3 className="mt-5 text-lg font-bold text-slate-950">
              法人・採用のご相談
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              組織化コンサルティング、SaaS、採用、事業提携については、電話またはLINEから内容をお知らせください。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#f6fbff] py-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 text-sm text-slate-500 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex items-center gap-3">
          <img
            src={LOGO_MARK}
            alt=""
            className="h-8 w-8 rounded object-cover"
          />
          <span className="font-bold tracking-[0.14em] text-slate-700">
            株式会社カノエ
          </span>
        </div>
        <p>© KANOE INC.</p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-950">
      <Header />
      <main>
        <Hero />
        <NewsSection />
        <BusinessSection />
        <CompanySection />
        <RecruitSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
