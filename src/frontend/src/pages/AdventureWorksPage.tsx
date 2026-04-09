import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  BarChart3,
  ExternalLink,
  Github,
  ShoppingCart,
  Target,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ImageCarousel } from "./SalesReportPage";

function ProjectPageHeader({
  title,
  subtitle,
  githubUrl,
}: {
  title: string;
  subtitle: string;
  githubUrl?: string;
}) {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg"
          : "bg-card border-b border-border"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          data-ocid="project-page.back-button"
          onClick={() => {
            navigate({ to: "/" });
            setTimeout(() => {
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" });
            }, 80);
          }}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground shrink-0 font-semibold"
        >
          ← Back to Projects
        </Button>
        <div className="h-5 w-px bg-border shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="font-display font-bold text-foreground truncate text-sm md:text-base">
            {title}
          </p>
          <p className="text-xs text-muted-foreground truncate hidden sm:block">
            {subtitle}
          </p>
        </div>
        {githubUrl && (
          <Button asChild size="sm" variant="outline" className="shrink-0">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">View on GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </Button>
        )}
      </div>
    </header>
  );
}

function PageFooter({ githubUrl }: { githubUrl?: string }) {
  const year = new Date().getFullYear();
  return (
    <footer
      className="border-t border-border py-6 px-6 mt-12"
      style={{ background: "oklch(0.10 0.028 257)" }}
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex gap-3 flex-wrap">
          {githubUrl && (
            <Button asChild>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                View on GitHub
                <ExternalLink className="w-3 h-3 ml-auto" />
              </a>
            </Button>
          )}
          <Button variant="outline" asChild>
            <Link to="/">← Back to Portfolio</Link>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          © {year} Tushar Vala · Built with{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-semibold text-foreground text-lg mb-4">{children}</h3>
  );
}

export default function AdventureWorksPage() {
  const images = [
    {
      src: "/assets/overview_dashboard-019d611f-74bf-72b5-ab43-df1f8510d881.jpg",
      label: "Overview Dashboard",
      desc: "Revenue $9.71M, Profit $4.12M, Orders 12K, Return Rate 2.14%. Strong revenue with controlled return rate.",
    },
    {
      src: "/assets/customer_details-019d611f-7387-72e2-9e25-51ebb96b6a75.jpg",
      label: "Customer Analysis",
      desc: "17K total customers, avg revenue per customer $1.431K. Income-level & occupation-based purchasing trends.",
    },
    {
      src: "/assets/products_details-019d611f-7340-767b-81d2-37d5b3a17cc3.jpg",
      label: "Product & Profit Analysis",
      desc: "Top category: Accessories. Profit trend over time. Accessories generate highest order volume.",
    },
    {
      src: "/assets/adventureworkssales_1-019d611f-74b8-70b9-ad36-1e4b596c03b9.jpg",
      label: "Global Sales Analysis",
      desc: "Sales distribution across North America, Europe, and Pacific. North America and Europe dominate sales.",
    },
  ];

  const kpis = [
    {
      label: "Revenue",
      value: "$9.71M",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "text-primary",
    },
    {
      label: "Profit",
      value: "$4.12M",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "text-accent",
    },
    {
      label: "Orders",
      value: "12K",
      icon: <ShoppingCart className="w-6 h-6" />,
      color: "text-yellow-400",
    },
    {
      label: "Return Rate",
      value: "2.14%",
      icon: <Target className="w-6 h-6" />,
      color: "text-pink-400",
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.08 0.025 255)" }}
    >
      <ProjectPageHeader
        title="AdventureWorks Sales Analytics Dashboard"
        subtitle="Revenue performance, orders & profit trends, global sales & customer segmentation"
        githubUrl="https://github.com/tushar123851/AdventureWorks_Sales_Dashboard-"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto px-6 py-10 space-y-10"
      >
        {/* Hero */}
        <div
          className="rounded-2xl border border-border/40 p-8"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.13 0.035 255) 0%, oklch(0.18 0.045 245) 100%)",
          }}
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <BarChart3 className="w-8 h-8" />
            </div>
            <div>
              <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground">
                🏢 AdventureWorks Sales Analytics
              </h1>
              <p className="text-muted-foreground mt-1">
                Sales Analytics Dashboard using the AdventureWorks dataset
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              "Power BI",
              "Python",
              "Pandas",
              "DAX",
              "Data Modeling",
              "Business Analytics",
            ].map((t) => (
              <Badge
                key={t}
                className="text-xs bg-primary/10 text-primary border-primary/20 border"
              >
                {t}
              </Badge>
            ))}
          </div>
        </div>

        {/* Carousel */}
        <ImageCarousel images={images} />

        {/* Overview */}
        <section>
          <SectionTitle>📌 Project Overview</SectionTitle>
          <div
            className="rounded-xl border border-border/60 p-6"
            style={{ background: "oklch(0.12 0.03 255)" }}
          >
            <p className="text-muted-foreground leading-relaxed">
              Interactive{" "}
              <strong className="text-primary">Power BI dashboard</strong> built
              on the{" "}
              <strong className="text-foreground">
                AdventureWorks dataset
              </strong>{" "}
              to analyze{" "}
              <strong className="text-foreground">
                revenue performance, orders & profit trends, global sales
                distribution, product-level insights, and customer segmentation
              </strong>
              . Provides business-driven insights with a clean and modern UI.
            </p>
          </div>
        </section>

        {/* KPI Cards */}
        <section>
          <SectionTitle>📌 Key Business KPIs</SectionTitle>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            {kpis.map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-xl border border-border/60 p-5 text-center space-y-1"
                style={{ background: "oklch(0.12 0.03 255)" }}
              >
                <div className={`flex justify-center mb-2 ${kpi.color}`}>
                  {kpi.icon}
                </div>
                <p className={`font-bold text-xl font-display ${kpi.color}`}>
                  {kpi.value}
                </p>
                <p className="text-xs text-muted-foreground leading-tight">
                  {kpi.label}
                </p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Total Customers", value: "17K", icon: "👥" },
              { label: "Avg Revenue/Customer", value: "$1.431K", icon: "💰" },
            ].map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-xl border border-border/60 p-5 text-center"
                style={{ background: "oklch(0.12 0.03 255)" }}
              >
                <div className="text-2xl mb-2">{kpi.icon}</div>
                <div className="text-xl font-bold text-primary">
                  {kpi.value}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {kpi.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Dashboard Sections */}
        <section>
          <SectionTitle>📊 Dashboard Sections</SectionTitle>
          <div className="space-y-4">
            {[
              {
                emoji: "🏠",
                num: "01",
                title: "Overview Dashboard",
                desc: "Overall business performance overview highlighting Revenue $9.71M, Profit $4.12M, and 12K orders.",
                insights: [
                  "Strong revenue with controlled return rate",
                  "Profit $4.12M across all product lines",
                  "12K total orders processed",
                  "2.14% return rate — well within targets",
                ],
              },
              {
                emoji: "👥",
                num: "02",
                title: "Customer Analysis",
                desc: "Customer behavior and segmentation with 17K total customers and avg revenue per customer of $1.431K.",
                insights: [
                  "Income-level based order distribution",
                  "Occupation-based purchasing trends",
                  "Customer-level order tracking",
                  "Average-income customers contribute highest orders",
                ],
              },
              {
                emoji: "🌍",
                num: "03",
                title: "Global Sales Analysis",
                desc: "Sales distribution visualized across countries covering North America, Europe, and Pacific regions.",
                insights: [
                  "North America and Europe dominate sales",
                  "Pacific region shows growth potential",
                  "Regional filters for deep-dive analysis",
                  "Country-level revenue breakdown",
                ],
              },
              {
                emoji: "🛍️",
                num: "04",
                title: "Product & Profit Analysis",
                desc: "Deep dive into product performance and profitability. Top Category: Accessories.",
                insights: [
                  "Accessories generate highest order volume",
                  "Profit trend shows strong upward trajectory",
                  "Most ordered product type identified",
                  "Category-level profitability comparison",
                ],
              },
            ].map((tab) => (
              <div
                key={tab.num}
                className="rounded-xl border border-border/60 p-5"
                style={{ background: "oklch(0.12 0.03 255)" }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-lg shrink-0">{tab.emoji}</span>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md shrink-0">
                        {tab.num}
                      </span>
                      <p className="font-semibold text-foreground text-sm">
                        {tab.title}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {tab.desc}
                    </p>
                    <ul className="space-y-1 mt-2">
                      {tab.insights.map((ins) => (
                        <li
                          key={ins}
                          className="flex items-start gap-2 text-xs text-muted-foreground"
                        >
                          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          {ins}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Objectives */}
        <section>
          <SectionTitle>🎯 Objectives</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Analyze revenue and profit trends",
              "Identify top-performing products",
              "Understand customer segmentation",
              "Track global sales performance",
              "Provide actionable business insights",
            ].map((obj) => (
              <div
                key={obj}
                className="flex items-center gap-2 text-sm text-muted-foreground p-3 rounded-xl border border-border/60"
                style={{ background: "oklch(0.12 0.03 255)" }}
              >
                <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                  ✓
                </span>
                {obj}
              </div>
            ))}
          </div>
        </section>

        {/* Key Insights */}
        <section>
          <SectionTitle>📈 Key Insights</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: "🔥", text: "Revenue reached $9.71M" },
              { icon: "📦", text: "Accessories category leads sales" },
              { icon: "🌍", text: "North America dominates revenue" },
              {
                icon: "👥",
                text: "Average-income customers are key contributors",
              },
              { icon: "📈", text: "Profit shows strong upward trend" },
            ].map((ins) => (
              <div
                key={ins.text}
                className="rounded-xl border border-border/60 p-4 flex items-center gap-3"
                style={{ background: "oklch(0.12 0.03 255)" }}
              >
                <span className="text-xl shrink-0">{ins.icon}</span>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {ins.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Charts Used */}
        <section>
          <SectionTitle>📊 Charts Used</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { chart: "Line Charts", purpose: "Trend analysis" },
              { chart: "Bar Charts", purpose: "Category comparison" },
              { chart: "Donut Charts", purpose: "Distribution" },
              { chart: "Map", purpose: "Geographic analysis" },
              { chart: "Tables", purpose: "Detailed breakdown" },
            ].map((c) => (
              <div
                key={c.chart}
                className="rounded-xl border border-border/60 p-3 flex items-center gap-3"
                style={{ background: "oklch(0.12 0.03 255)" }}
              >
                <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                <p className="text-sm text-foreground font-medium">{c.chart}</p>
                <span className="text-muted-foreground text-xs">
                  → {c.purpose}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Business Value */}
        <section>
          <SectionTitle>💼 Business Value</SectionTitle>
          <div
            className="rounded-xl border border-primary/20 p-5"
            style={{ background: "oklch(0.12 0.05 245)" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Helps businesses track sales & profit performance",
                "Identifies top customers and products",
                "Supports data-driven decision making",
                "Improves market targeting strategies",
              ].map((v) => (
                <div
                  key={v}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                    ✓
                  </span>
                  {v}
                </div>
              ))}
            </div>
          </div>
        </section>
      </motion.div>

      <PageFooter githubUrl="https://github.com/tushar123851/AdventureWorks_Sales_Dashboard-" />
    </div>
  );
}
