/**
 * 特定商取引法に基づく表記
 * Design: カノエコーポレートサイトと同一デザインシステム
 * - 背景: #f8f8f7（オフホワイト）
 * - テキスト: #1a1a19
 * - アクセント: ネイビー #1e3a5f
 * - ゴールド: #c9a84c（セクションラベル）
 * - フォント: Noto Sans JP
 * Stripe要件準拠: 全必須項目掲載
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
  gold: "#c9a84c",
};

// スクロールアニメーション
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.06 }
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

const items: {
  label: string;
  value?: string;
  note?: string;
  multiline?: boolean;
  sections?: { title: string; content: string }[];
}[] = [
  {
    label: "販売業者名",
    value: "株式会社カノエ",
  },
  {
    label: "代表責任者",
    value: "勅使河原 将（テシガハラ ショウ）",
  },
  {
    label: "所在地",
    value: "〒140-0011 東京都品川区大井3-18-18 REX Oimachi 1F",
  },
  {
    label: "電話番号",
    value: "0120-19-7576",
    note: "受付時間：10:00〜18:00（土日祝除く）。営業時間外はメールにてご連絡ください。",
  },
  {
    label: "メールアドレス",
    value: "info@kanoe.biz",
  },
  {
    label: "ウェブサイト",
    value: "https://kanoe.biz",
  },
  {
    label: "販売価格",
    value: "各サービスページに記載の金額（税込）",
    note: "ハウスクリーニング：各メニューページに記載の金額。ブルーカラー軍師（脱一人親方塾）：月額5,500円（税込）。",
  },
  {
    label: "商品・サービス代金以外の必要料金",
    value: "なし",
    note: "出張費・キャンセル料等が発生する場合は、事前にご案内いたします。",
  },
  {
    label: "支払方法",
    value: "クレジットカード（VISA / Mastercard / American Express / JCB）、LINEPay、その他電子決済",
  },
  {
    label: "支払時期",
    value: "クレジットカード：ご注文確定時に即時決済。各カード会社の規定に従い引き落とし。\nサブスクリプション（ブルーカラー軍師）：毎月自動更新。初回は登録日に課金。",
  },
  {
    label: "サービス提供時期",
    value: "ハウスクリーニング：ご予約日時に現地にてサービスを提供。\nブルーカラー軍師（オンラインサロン）：お申し込み・決済完了後、即時アクセス可能。",
  },
  {
    label: "返品・交換・キャンセルについて",
    multiline: true,
    sections: [
      {
        title: "ハウスクリーニング",
        content: "サービス実施前のキャンセルは、前日18:00までにご連絡いただいた場合は無料です。当日キャンセルまたは無断キャンセルの場合、キャンセル料（サービス料金の50%）が発生する場合があります。\nサービス実施後に不備・不満がある場合は、サービス完了日より7日以内にご連絡ください。内容を確認の上、再施工または一部返金にて対応いたします。",
      },
      {
        title: "ブルーカラー軍師（サブスクリプション）",
        content: "マイページよりいつでも解約可能です。解約後は次回更新日以降の課金は発生しません。当月分の返金は原則行いませんが、サービス上の重大な不具合があった場合はご連絡ください。",
      },
    ],
  },
  {
    label: "特記事項",
    value: "本サービスはStripeを通じて決済処理を行っています。ご利用にあたっては、Stripeの利用規約にも同意いただく必要があります。",
  },
];

export default function LegalPage() {
  // ヘッダーのスクロール制御
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        fontFamily: "'Noto Sans JP', sans-serif",
        backgroundColor: C.bg,
        color: C.text,
        minHeight: "100vh",
      }}
    >
      {/* ===== ヘッダー（Home.tsxと同一スタイル） ===== */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 64,
          backgroundColor: scrolled ? "rgba(248,248,247,0.96)" : C.bg,
          borderBottom: `1px solid ${scrolled ? C.border : "transparent"}`,
          backdropFilter: scrolled ? "blur(8px)" : "none",
          transition: "all 0.3s ease",
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          justifyContent: "space-between",
        }}
      >
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <img src={LOGO_URL} alt="株式会社カノエ" style={{ height: 28, width: "auto" }} />
        </Link>
        <Link
          href="/"
          style={{
            fontSize: 13,
            color: C.textMuted,
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 6,
            transition: "color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = C.text}
          onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = C.textMuted}
        >
          ← トップページへ戻る
        </Link>
      </header>

      {/* ===== ページヘッダー ===== */}
      <div
        style={{
          backgroundColor: C.navy,
          paddingTop: 64,
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            padding: "64px 24px 56px",
          }}
        >
          <Reveal>
            <p
              style={{
                fontSize: 11,
                letterSpacing: "0.22em",
                color: C.gold,
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Legal
            </p>
            <h1
              style={{
                fontSize: "clamp(22px, 3vw, 36px)",
                fontWeight: 700,
                color: "#ffffff",
                marginBottom: 16,
                lineHeight: 1.4,
                letterSpacing: "0.04em",
              }}
            >
              特定商取引法に基づく表記
            </h1>
            <p
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.8,
                maxWidth: 560,
              }}
            >
              特定商取引に関する法律（特定商取引法）第11条に基づき、以下の事項を表示いたします。
              本ページはStripe決済をご利用いただくにあたり、割賦販売法に基づく開示情報としても機能します。
            </p>
          </Reveal>
        </div>
      </div>

      {/* ===== メインコンテンツ ===== */}
      <main
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "64px 24px 96px",
        }}
      >
        <Reveal>
          {/* テーブル */}
          <div
            style={{
              backgroundColor: C.bgWhite,
              border: `1px solid ${C.border}`,
              overflow: "hidden",
            }}
          >
            {items.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "clamp(140px, 22%, 220px) 1fr",
                  borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : "none",
                }}
              >
                {/* ラベル列 */}
                <div
                  style={{
                    backgroundColor: "#f0f4f8",
                    padding: "20px 20px",
                    borderRight: `1px solid ${C.border}`,
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: C.navy,
                      lineHeight: 1.6,
                    }}
                  >
                    {item.label}
                  </span>
                </div>

                {/* 値列 */}
                <div style={{ padding: "20px 28px" }}>
                  {item.multiline && item.sections ? (
                    <div>
                      {item.sections.map((sec, j) => (
                        <div
                          key={j}
                          style={{
                            marginBottom: j < item.sections!.length - 1 ? 24 : 0,
                          }}
                        >
                          <div
                            style={{
                              borderLeft: `3px solid ${C.gold}`,
                              paddingLeft: 12,
                              marginBottom: 8,
                            }}
                          >
                            <p
                              style={{
                                fontSize: 12,
                                fontWeight: 700,
                                color: C.navy,
                                letterSpacing: "0.04em",
                              }}
                            >
                              ＜{sec.title}＞
                            </p>
                          </div>
                          <p
                            style={{
                              fontSize: 13,
                              color: C.text,
                              lineHeight: 1.9,
                              whiteSpace: "pre-line",
                            }}
                          >
                            {sec.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <p
                        style={{
                          fontSize: 13,
                          color: C.text,
                          lineHeight: 1.9,
                          whiteSpace: "pre-line",
                          marginBottom: item.note ? 10 : 0,
                        }}
                      >
                        {item.value}
                      </p>
                      {item.note && (
                        <p
                          style={{
                            fontSize: 12,
                            color: C.textMuted,
                            lineHeight: 1.7,
                            borderTop: `1px dashed ${C.border}`,
                            paddingTop: 8,
                          }}
                        >
                          ※ {item.note}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* 更新日 */}
        <Reveal delay={100}>
          <p
            style={{
              marginTop: 40,
              fontSize: 12,
              color: C.textLight,
              lineHeight: 1.8,
              textAlign: "right",
            }}
          >
            最終更新日：2026年3月
          </p>
        </Reveal>

        {/* トップへ戻るリンク */}
        <Reveal delay={150}>
          <div style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${C.border}` }}>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                color: C.navy,
                textDecoration: "none",
                fontWeight: 600,
                letterSpacing: "0.04em",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "0.7"}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "1"}
            >
              ← トップページへ戻る
            </Link>
          </div>
        </Reveal>
      </main>

      {/* ===== フッター（Home.tsxと同一スタイル） ===== */}
      <footer
        style={{ backgroundColor: C.navy }}
        className="py-8"
      >
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <img src={LOGO_URL} alt="株式会社カノエ" style={{ height: 22, width: "auto", opacity: 0.85 }} />
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>株式会社カノエ</span>
            </div>
          </div>
          <div
            style={{
              marginTop: 24,
              paddingTop: 16,
              borderTop: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
              © {new Date().getFullYear()} 株式会社カノエ All Rights Reserved.
            </p>
            <span
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.4)",
              }}
            >
              特定商取引法に基づく表記
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
