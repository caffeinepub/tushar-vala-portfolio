import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { BarChart3, ExternalLink, Github } from "lucide-react";
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

export default function ZomatoPage() {
  const githubBase =
    "https://raw.githubusercontent.com/tushar123851/Zomato_sales_analysis/main/";

  const images = [
    {
      src: `${githubBase}Screenshots_pages/main_dashboard.png`,
      label: "Main Dashboard",
      desc: "Complete business performance snapshot — KPI cards, category insights, and trends.",
    },
    {
      src: `${githubBase}Screenshots_pages/area_analysis.png`,
      label: "Area Analysis",
      desc: "Geographic and city-level performance. Top City: Electronic City (Bangalore).",
    },
    {
      src: `${githubBase}Screenshots_pages/user_analysis.png`,
      label: "User Analysis",
      desc: "User demographics and behavior. Male: 57%, Female: 43%, Age Group: 22–26 dominant.",
    },
    {
      src: `${githubBase}zomato.gif`,
      label: "Dashboard Preview",
      desc: "Animated walkthrough of the complete Zomato Analytics Dashboard.",
      isGif: true,
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.08 0.025 255)" }}
    >
      <ProjectPageHeader
        title="Zomato Data Analytics Dashboard"
        subtitle="Food delivery performance, area trends, and user insights — Power BI"
        githubUrl="https://github.com/tushar123851/Zomato_sales_analysis"
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
                🍽️ Zomato Data Analytics Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                Power BI dashboard analyzing food delivery performance, area
                trends, and user insights
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              "Power BI",
              "DAX",
              "Data Cleaning",
              "Data Transformation",
              "Data Visualization",
              "Business Intelligence",
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

        {/* KPI Cards */}
        <section>
          <SectionTitle>📌 Key Metrics (KPIs)</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "💰", label: "Total Sales", value: "989M" },
              { icon: "📦", label: "Total Orders", value: "150K" },
              { icon: "⭐", label: "Ratings", value: "148K" },
              { icon: "📊", label: "Quantity Sold", value: "2M" },
            ].map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-xl border border-border hover:border-primary/40 transition-colors p-5 text-center"
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

        {/* Overview */}
        <section>
          <SectionTitle>📌 Project Overview</SectionTitle>
          <div
            className="rounded-xl border border-border/60 p-6"
            style={{ background: "oklch(0.12 0.03 255)" }}
          >
            <p className="text-muted-foreground leading-relaxed">
              This project presents a Zomato Data Analytics Dashboard built to
              analyze food delivery data across multiple dimensions such as
              Sales Performance, Area Analysis, User Insights, and Food Category
              Trends. The dashboard provides actionable insights for business
              decision-making using interactive visualizations in Power BI.
            </p>
          </div>
        </section>

        {/* Objectives */}
        <section>
          <SectionTitle>🎯 Objectives</SectionTitle>
          <ul className="space-y-2">
            {[
              "Analyze sales trends over time",
              "Identify top-performing cities & locations",
              "Understand customer behavior",
              "Compare food category performance (Veg / Non-Veg / Others)",
              "Evaluate user demographics",
            ].map((obj) => (
              <li
                key={obj}
                className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-xl border border-border/60"
                style={{ background: "oklch(0.12 0.03 255)" }}
              >
                <span className="text-primary mt-0.5">✔</span> {obj}
              </li>
            ))}
          </ul>
        </section>

        {/* Dashboard Sections */}
        <section>
          <SectionTitle>📊 Dashboard Sections</SectionTitle>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: "🔹",
                title: "Main Dashboard",
                overview:
                  "Complete business performance snapshot — KPI cards, category insights, and trends.",
                highlights: [
                  "💰 Sales: 989M",
                  "🧾 Orders: 150K",
                  "⭐ Ratings: 148K",
                ],
              },
              {
                icon: "🌍",
                title: "Area Analysis",
                overview: "Focuses on geographic and city-level performance.",
                highlights: [
                  "🏆 Top City: Electronic City (Bangalore)",
                  "📍 Strong metro performance",
                ],
              },
              {
                icon: "👤",
                title: "User Analysis",
                overview: "Analyzes user demographics and behavior.",
                highlights: [
                  "👨 Male: 57%",
                  "👩 Female: 43%",
                  "🎯 Age Group: 22–26 dominant",
                ],
              },
            ].map((section) => (
              <div
                key={section.title}
                className="rounded-xl border border-border hover:border-primary/40 transition-colors p-5"
                style={{ background: "oklch(0.12 0.03 255)" }}
              >
                <div className="text-2xl mb-2">{section.icon}</div>
                <h4 className="font-semibold text-foreground mb-2">
                  {section.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  {section.overview}
                </p>
                <ul className="space-y-1">
                  {section.highlights.map((h) => (
                    <li key={h} className="text-xs text-primary font-medium">
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Top Cities */}
        <section>
          <SectionTitle>🏙️ Top Performing Cities</SectionTitle>
          <div className="grid grid-cols-3 gap-4">
            {[
              { medal: "🥇", city: "Tirupati" },
              { medal: "🥈", city: "Bangalore" },
              { medal: "🥉", city: "Pune" },
            ].map((c) => (
              <div
                key={c.city}
                className="rounded-xl border border-border hover:border-primary/40 transition-colors p-5 text-center"
                style={{ background: "oklch(0.12 0.03 255)" }}
              >
                <div className="text-3xl mb-2">{c.medal}</div>
                <div className="font-semibold text-foreground">{c.city}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Category Performance */}
        <section>
          <SectionTitle>🍴 Category Performance</SectionTitle>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: "🥗",
                category: "Veg",
                sales: "122M",
                ratings: "12K",
                best: true,
              },
              {
                icon: "🍗",
                category: "Non-Veg",
                sales: "106M",
                ratings: "11K",
                best: false,
              },
              {
                icon: "🍰",
                category: "Others",
                sales: "24M",
                ratings: "927",
                best: false,
              },
            ].map((cat) => (
              <div
                key={cat.category}
                className={`rounded-xl border p-5 text-center transition-colors ${
                  cat.best
                    ? "border-primary/60"
                    : "border-border hover:border-primary/30"
                }`}
                style={{
                  background: cat.best
                    ? "oklch(0.14 0.05 245)"
                    : "oklch(0.12 0.03 255)",
                }}
              >
                <div className="text-3xl mb-2">{cat.icon}</div>
                <div className="font-bold text-lg text-foreground">
                  {cat.category}
                </div>
                {cat.best && (
                  <div className="text-xs text-primary font-semibold mb-2">
                    ⭐ Best Performer
                  </div>
                )}
                <div className="text-sm text-muted-foreground">
                  Sales:{" "}
                  <span className="text-foreground font-medium">
                    {cat.sales}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Ratings:{" "}
                  <span className="text-foreground font-medium">
                    {cat.ratings}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* User Insights */}
        <section>
          <SectionTitle>👤 User Insights</SectionTitle>
          <div className="grid md:grid-cols-2 gap-6">
            <div
              className="rounded-xl border border-border p-5"
              style={{ background: "oklch(0.12 0.03 255)" }}
            >
              <div className="grid grid-cols-3 gap-4 mb-4">
                {[
                  { label: "Total Users", value: "100K", icon: "👥" },
                  { label: "Female Users", value: "57.22%", icon: "👩" },
                  { label: "Male Users", value: "42.78%", icon: "👨" },
                ].map((u) => (
                  <div key={u.label} className="text-center">
                    <div className="text-2xl">{u.icon}</div>
                    <div className="font-bold text-primary text-lg">
                      {u.value}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {u.label}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground italic">
                👉 Female users dominate the platform.
              </p>
            </div>
            <div
              className="rounded-xl border border-border p-5"
              style={{ background: "oklch(0.12 0.03 255)" }}
            >
              <h4 className="font-semibold text-foreground mb-3">
                📈 Age Distribution
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Majority users fall between{" "}
                <span className="text-primary font-medium">20–25 years</span>.
                Younger audience is highly active.
              </p>
              <div className="space-y-2">
                {[
                  { range: "20–22", pct: 85 },
                  { range: "23–25", pct: 90 },
                  { range: "26–30", pct: 60 },
                  { range: "31+", pct: 30 },
                ].map((age) => (
                  <div key={age.range} className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-14">
                      {age.range}
                    </span>
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div
                        className="bg-primary rounded-full h-2 transition-all duration-700"
                        style={{ width: `${age.pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-primary w-8 text-right">
                      {age.pct}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Yearly Trend */}
        <section>
          <SectionTitle>📈 Yearly Sales Trend</SectionTitle>
          <div
            className="rounded-xl border border-border p-5"
            style={{ background: "oklch(0.12 0.03 255)" }}
          >
            <div className="flex items-end gap-4 h-32 mb-3">
              {[
                { year: "2017", height: 45 },
                { year: "2018", height: 100, peak: true },
                { year: "2019", height: 75 },
                { year: "2020", height: 40 },
              ].map((y) => (
                <div
                  key={y.year}
                  className="flex flex-col items-center gap-1 flex-1"
                >
                  <div
                    className={`w-full rounded-t-md transition-all duration-500 ${
                      y.peak ? "bg-primary" : "bg-primary/40"
                    }`}
                    style={{ height: `${y.height}%` }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {y.year}
                  </span>
                  {y.peak && (
                    <span className="text-xs text-primary font-semibold">
                      0.41bn
                    </span>
                  )}
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground italic">
              📈 Peak in 2018 (0.41bn) — Decline after 2019
            </p>
          </div>
        </section>

        {/* Business Recommendations */}
        <section>
          <SectionTitle>🧠 Business Recommendations</SectionTitle>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              "Focus marketing on top-performing cities",
              "Improve performance in low-sales areas",
              "Target young users (20–25 age group)",
              "Expand Veg category offerings",
              "Address post-2019 sales decline",
            ].map((rec) => (
              <div
                key={rec}
                className="rounded-xl border border-border hover:border-primary/40 transition-colors p-4 flex items-start gap-3"
                style={{ background: "oklch(0.12 0.03 255)" }}
              >
                <span className="text-primary text-lg shrink-0">💡</span>
                <span className="text-sm text-muted-foreground">{rec}</span>
              </div>
            ))}
          </div>
        </section>
      </motion.div>

      <PageFooter githubUrl="https://github.com/tushar123851/Zomato_sales_analysis" />
    </div>
  );
}
