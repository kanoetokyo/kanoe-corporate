// 特定商取引法に基づく表記ページ
// Design: カノエコーポレートサイトと同一のネイビー×オフホワイトテーマ
// Stripe要件準拠: 販売業者名・住所・電話番号・メール・代表者・追加費用・返品/交換・納期・支払方法・支払期間・価格 を全て掲載

import { Link } from "wouter";

const items = [
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
    value: "〒140-0014 東京都品川区大井1-49-8 大井町センタービル4F",
  },
  {
    label: "電話番号",
    value: "0120-19-7576\n受付時間：10:00〜18:00（土日祝除く）",
    note: "お電話でのお問い合わせは上記番号へ。営業時間外はメールにてご連絡ください。",
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
    value: "",
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
  return (
    <div
      style={{
        fontFamily: "'Noto Sans JP', sans-serif",
        backgroundColor: "#f8f7f4",
        minHeight: "100vh",
        color: "#1a2a3a",
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: "#0d1f3c",
          padding: "0 24px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link href="/" style={{ textDecoration: "none" }}>
          <span
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "0.08em",
            }}
          >
            KANOE
          </span>
        </Link>
        <Link
          href="/"
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.7)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          ← トップページへ戻る
        </Link>
      </header>

      {/* Main */}
      <main style={{ maxWidth: 800, margin: "0 auto", padding: "64px 24px 96px" }}>
        {/* Page Title */}
        <div style={{ marginBottom: 48 }}>
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.22em",
              color: "#c9a84c",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Legal
          </p>
          <h1
            style={{
              fontSize: "clamp(22px, 3vw, 32px)",
              fontWeight: 700,
              color: "#0d1f3c",
              marginBottom: 16,
              lineHeight: 1.4,
            }}
          >
            特定商取引法に基づく表記
          </h1>
          <p style={{ fontSize: 14, color: "#666", lineHeight: 1.8 }}>
            特定商取引に関する法律（特定商取引法）第11条に基づき、以下の事項を表示いたします。
          </p>
          <div
            style={{
              marginTop: 24,
              padding: "12px 16px",
              backgroundColor: "#fff8e1",
              borderLeft: "3px solid #c9a84c",
              fontSize: 13,
              color: "#7a6000",
              lineHeight: 1.7,
            }}
          >
            本ページはStripe決済をご利用いただくにあたり、割賦販売法に基づく開示情報としても機能します。
          </div>
        </div>

        {/* Table */}
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #e0e0e0",
            overflow: "hidden",
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "200px 1fr",
                borderBottom: i < items.length - 1 ? "1px solid #e8e8e8" : "none",
              }}
            >
              {/* Label */}
              <div
                style={{
                  backgroundColor: "#f0f4f8",
                  padding: "20px 20px",
                  borderRight: "1px solid #e0e0e0",
                  display: "flex",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#0d1f3c",
                    lineHeight: 1.6,
                  }}
                >
                  {item.label}
                </span>
              </div>

              {/* Value */}
              <div style={{ padding: "20px 24px" }}>
                {item.multiline && item.sections ? (
                  <div>
                    {item.sections.map((sec, j) => (
                      <div key={j} style={{ marginBottom: j < item.sections!.length - 1 ? 20 : 0 }}>
                        <p
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#0d1f3c",
                            marginBottom: 8,
                          }}
                        >
                          ＜{sec.title}＞
                        </p>
                        <p
                          style={{
                            fontSize: 13,
                            color: "#444",
                            lineHeight: 1.8,
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
                        color: "#333",
                        lineHeight: 1.8,
                        whiteSpace: "pre-line",
                        marginBottom: item.note ? 8 : 0,
                      }}
                    >
                      {item.value}
                    </p>
                    {item.note && (
                      <p
                        style={{
                          fontSize: 12,
                          color: "#888",
                          lineHeight: 1.7,
                          borderTop: "1px dashed #e0e0e0",
                          paddingTop: 8,
                          marginTop: 4,
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

        {/* Footer note */}
        <p
          style={{
            marginTop: 40,
            fontSize: 12,
            color: "#999",
            lineHeight: 1.8,
            textAlign: "center",
          }}
        >
          本表記は予告なく変更される場合があります。最新の情報は本ページをご確認ください。<br />
          最終更新日：2026年3月
        </p>
      </main>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#0d1f3c",
          padding: "32px 24px",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
          © 2024 株式会社カノエ All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
