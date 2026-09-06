import { Router, type IRouter } from "express";
import {
  GetDashboardSummaryResponse,
  GetNewsParams,
  GetNewsResponse,
  ListNewsQueryParams,
  ListNewsResponse,
} from "@workspace/api-zod";

type NewsArticle = {
  id: string;
  title: string;
  sourceName: string;
  sourceUrl: string;
  publishedAt: Date;
  municipality: string;
  prefecture: string;
  region: "kyoto" | "national";
  category: string;
  importance: number;
  salesOpportunity: number;
  summary: string;
  whatHappened: string;
  action: string;
  background: string;
  timing: string;
  salesPoint: string;
  isDuplicate: boolean;
};

const hoursAgo = (hours: number) => new Date(Date.now() - hours * 60 * 60 * 1000);

const articles: NewsArticle[] = [
  {
    id: "kyoto-001",
    title: "京都市、窓口業務のオンライン化に向けた新しいDX計画を公表",
    sourceName: "京都市",
    sourceUrl: "https://www.city.kyoto.lg.jp/",
    publishedAt: hoursAgo(1),
    municipality: "京都市",
    prefecture: "京都府",
    region: "kyoto",
    category: "自治体DX",
    importance: 5,
    salesOpportunity: 5,
    summary: "京都市が窓口手続きのオンライン化と庁内データ連携を柱にしたDX計画を公表。複数年度での基盤整備を進める方針です。",
    whatHappened: "自治体DXを推進する新たな計画が公表されました。",
    action: "オンライン申請、データ連携、庁内業務の見直しを段階的に実施します。",
    background: "住民の利便性向上と職員の業務負担軽減が背景です。",
    timing: "2026年度から順次",
    salesPoint: "申請基盤、認証、ネットワーク、業務改善支援の提案機会につながる可能性があります。",
    isDuplicate: false,
  },
  {
    id: "kyoto-002",
    title: "宇治市、基幹業務システム標準化対応の事業者選定を開始",
    sourceName: "宇治市",
    sourceUrl: "https://www.city.uji.kyoto.jp/",
    publishedAt: hoursAgo(3),
    municipality: "宇治市",
    prefecture: "京都府",
    region: "kyoto",
    category: "情報システム",
    importance: 5,
    salesOpportunity: 5,
    summary: "宇治市が基幹業務システムの標準化対応に向け、事業者からの提案を受け付ける準備を進めています。",
    whatHappened: "標準化対応を含む基幹システム更新の事業者選定が始まりました。",
    action: "現行環境の整理、移行計画の策定、システム導入を進めます。",
    background: "国の標準化方針への対応と業務継続性の確保が目的です。",
    timing: "2026年度中の選定を予定",
    salesPoint: "基幹系、移行、端末、ネットワーク、セキュリティの提案余地が大きいテーマです。",
    isDuplicate: false,
  },
  {
    id: "kyoto-003",
    title: "京都府、自治体向け生成AI活用ガイドラインの実証を開始",
    sourceName: "京都府",
    sourceUrl: "https://www.pref.kyoto.jp/",
    publishedAt: hoursAgo(6),
    municipality: "京都府",
    prefecture: "京都府",
    region: "kyoto",
    category: "生成AI",
    importance: 4,
    salesOpportunity: 4,
    summary: "京都府が庁内業務での生成AI活用に向け、情報管理と職員教育を含む実証を始めます。",
    whatHappened: "生成AIを安全に利用するための実証事業が始まりました。",
    action: "文書作成や問い合わせ対応などの業務で効果とリスクを検証します。",
    background: "業務効率化と情報漏えい対策を両立する必要があります。",
    timing: "2026年秋から実証",
    salesPoint: "生成AI環境、ガバナンス、研修、セキュリティ評価の提案につながります。",
    isDuplicate: false,
  },
  {
    id: "kyoto-004",
    title: "舞鶴市、防災情報の一元配信基盤を更新へ",
    sourceName: "舞鶴市",
    sourceUrl: "https://www.city.maizuru.kyoto.jp/",
    publishedAt: hoursAgo(12),
    municipality: "舞鶴市",
    prefecture: "京都府",
    region: "kyoto",
    category: "防災",
    importance: 4,
    salesOpportunity: 4,
    summary: "舞鶴市が防災情報を複数の住民向けチャネルへ一元配信する基盤の更新方針を示しました。",
    whatHappened: "防災情報配信システムの更新計画が示されました。",
    action: "防災無線、Web、メール等への情報配信を統合します。",
    background: "災害時の確実な情報到達と職員の発信負荷軽減が狙いです。",
    timing: "2027年度の本稼働を目標",
    salesPoint: "防災SaaS、ネットワーク冗長化、運用支援の商談候補です。",
    isDuplicate: false,
  },
  {
    id: "national-001",
    title: "総務省、自治体情報システムのセキュリティ対策強化方針を公表",
    sourceName: "総務省",
    sourceUrl: "https://www.soumu.go.jp/",
    publishedAt: hoursAgo(2),
    municipality: "全国自治体",
    prefecture: "全国",
    region: "national",
    category: "情報システム",
    importance: 5,
    salesOpportunity: 5,
    summary: "自治体の情報資産管理、認証、監視運用に関する対策強化の方向性が示されました。",
    whatHappened: "自治体向けセキュリティ対策の強化方針が公表されました。",
    action: "各自治体が自庁の運用状況を確認し、必要な対策を検討します。",
    background: "サイバー攻撃の高度化と業務継続性の確保が背景です。",
    timing: "今後ガイドラインを順次更新",
    salesPoint: "認証強化、監視、端末管理、ネットワーク分離、訓練の提案機会です。",
    isDuplicate: false,
  },
  {
    id: "national-002",
    title: "複数自治体が職員向け生成AIの試行導入を発表",
    sourceName: "自治体通信",
    sourceUrl: "https://www.jt-tsushin.jp/",
    publishedAt: hoursAgo(5),
    municipality: "複数自治体",
    prefecture: "全国",
    region: "national",
    category: "生成AI",
    importance: 4,
    salesOpportunity: 4,
    summary: "複数の自治体で、庁内文書の下書きや要約を中心に生成AIの試行導入が進んでいます。",
    whatHappened: "自治体職員向けの生成AI試行導入事例が増えています。",
    action: "対象業務を限定し、利用ルールと効果測定を整備します。",
    background: "人手不足への対応と文書作成時間の短縮が目的です。",
    timing: "2026年度に試行、次年度以降に評価",
    salesPoint: "閉域環境、アカウント管理、研修、効果測定の相談につながります。",
    isDuplicate: false,
  },
  {
    id: "national-003",
    title: "自治体の窓口混雑対策、予約・申請一体型サービスの導入広がる",
    sourceName: "日経クロステック",
    sourceUrl: "https://xtech.nikkei.com/",
    publishedAt: hoursAgo(10),
    municipality: "全国自治体",
    prefecture: "全国",
    region: "national",
    category: "行政サービス",
    importance: 3,
    salesOpportunity: 4,
    summary: "窓口予約とオンライン申請を組み合わせ、来庁回数を減らすサービスの導入自治体が増えています。",
    whatHappened: "窓口業務の予約・申請一体化が進んでいます。",
    action: "住民向け予約、本人確認、申請受付のオンライン化を進めます。",
    background: "窓口の混雑緩和と住民の待ち時間削減が背景です。",
    timing: "自治体ごとに段階導入",
    salesPoint: "フロント端末、予約システム、本人確認、運用設計の需要が見込まれます。",
    isDuplicate: false,
  },
  {
    id: "national-004",
    title: "自治体向け地域交通支援の公募開始、デジタル活用を重点評価",
    sourceName: "国土交通省",
    sourceUrl: "https://www.mlit.go.jp/",
    publishedAt: hoursAgo(18),
    municipality: "全国自治体",
    prefecture: "全国",
    region: "national",
    category: "補助金",
    importance: 4,
    salesOpportunity: 3,
    summary: "地域交通の維持・改善を支援する公募で、予約・配車などのデジタル活用が評価対象になっています。",
    whatHappened: "地域交通支援の公募が開始されました。",
    action: "自治体や地域事業者が計画を作成し、支援を申請します。",
    background: "交通空白地の解消と持続可能な移動手段の確保が目的です。",
    timing: "申請期間は公募要領を確認",
    salesPoint: "予約配車、データ連携、住民アプリの提案機会になります。",
    isDuplicate: false,
  },
  {
    id: "national-005",
    title: "自治体の業務端末更新、調達時にゼロトラスト対応を求める動き",
    sourceName: "総務省",
    sourceUrl: "https://www.soumu.go.jp/",
    publishedAt: hoursAgo(28),
    municipality: "全国自治体",
    prefecture: "全国",
    region: "national",
    category: "情報システム",
    importance: 4,
    salesOpportunity: 5,
    summary: "業務端末の更新にあわせ、端末管理やアクセス制御を含めて調達する自治体が増えています。",
    whatHappened: "端末更新とセキュリティ対策を一体で調達する動きが広がっています。",
    action: "端末、認証、資産管理、監視の要件を整理して調達します。",
    background: "テレワークやクラウド利用の拡大に対応する必要があります。",
    timing: "各自治体の更新計画に応じて実施",
    salesPoint: "PC、MDM、認証、EDR、運用サービスを組み合わせた提案に向きます。",
    isDuplicate: false,
  },
  {
    id: "national-006",
    title: "自治体職員の業務効率化を支援する補助事業の採択結果を公表",
    sourceName: "デジタル庁",
    sourceUrl: "https://www.digital.go.jp/",
    publishedAt: hoursAgo(36),
    municipality: "全国自治体",
    prefecture: "全国",
    region: "national",
    category: "地方創生",
    importance: 3,
    salesOpportunity: 3,
    summary: "自治体職員の業務効率化を支援する事業で、採択自治体と取組概要が公表されました。",
    whatHappened: "業務効率化支援事業の採択結果が公表されました。",
    action: "採択自治体が業務分析やデジタルツール導入を進めます。",
    background: "限られた職員数で行政サービスを維持することが目的です。",
    timing: "採択後から年度末まで",
    salesPoint: "業務可視化、RPA、ワークフロー、研修の提案候補です。",
    isDuplicate: false,
  },
];

const sortByPriority = (items: NewsArticle[]) =>
  [...items].sort(
    (a, b) =>
      b.importance + b.salesOpportunity - (a.importance + a.salesOpportunity) ||
      b.publishedAt.getTime() - a.publishedAt.getTime(),
  );

const router: IRouter = Router();

router.get("/news", (req, res): void => {
  const parsed = ListNewsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { q, date, region, category, minImportance, minSalesOpportunity, limit } =
    parsed.data;
  const query = q?.trim().toLowerCase();
  const filtered = articles.filter((article) => {
    const matchesQuery =
      !query ||
      [article.title, article.summary, article.municipality, article.category]
        .join(" ")
        .toLowerCase()
        .includes(query);
    const matchesDate =
      !date || article.publishedAt.toISOString().slice(0, 10) === date.toISOString().slice(0, 10);
    const matchesRegion = !region || region === "all" || article.region === region;
    const matchesCategory = !category || article.category === category;
    const matchesImportance = !minImportance || article.importance >= minImportance;
    const matchesOpportunity =
      !minSalesOpportunity || article.salesOpportunity >= minSalesOpportunity;
    return (
      matchesQuery &&
      matchesDate &&
      matchesRegion &&
      matchesCategory &&
      matchesImportance &&
      matchesOpportunity
    );
  });

  res.json(ListNewsResponse.parse(sortByPriority(filtered).slice(0, limit)));
});

router.get("/news/:id", (req, res): void => {
  const parsed = GetNewsParams.safeParse(req.params);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const article = articles.find((item) => item.id === parsed.data.id);
  if (!article) {
    res.status(404).json({ error: "News article not found" });
    return;
  }

  res.json(GetNewsResponse.parse(article));
});

router.get("/dashboard-summary", (_req, res): void => {
  const todayKey = new Date().toISOString().slice(0, 10);
  const today = articles.filter(
    (article) => article.publishedAt.toISOString().slice(0, 10) === todayKey,
  );
  const summary = {
    updatedAt: new Date(),
    todayCount: today.length,
    highImportanceCount: articles.filter((article) => article.importance >= 4).length,
    highOpportunityCount: articles.filter((article) => article.salesOpportunity >= 4).length,
    kyotoCount: articles.filter((article) => article.region === "kyoto").length,
    nationalCount: articles.filter((article) => article.region === "national").length,
    todayHighlights: sortByPriority(today).slice(0, 4),
    opportunityHighlights: sortByPriority(
      articles.filter((article) => article.salesOpportunity >= 4),
    ).slice(0, 4),
    kyotoHighlights: sortByPriority(
      articles.filter((article) => article.region === "kyoto"),
    ).slice(0, 4),
  };

  res.json(GetDashboardSummaryResponse.parse(summary));
});

export default router;