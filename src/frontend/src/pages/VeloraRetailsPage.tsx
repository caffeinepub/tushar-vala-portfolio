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

export default function VeloraRetailsPage() {
  const images = [
    {
      src: "https://raw.githubusercontent.com/tushar123851/velora_retails_analysis/main/Screenshots_pages/supermartretails.gif",
      label: "Dashboard Overview (Animated)",
      desc: "Full animated walkthrough — Sales, Returns, and Customer insights.",
      isGif: true,
    },
    {
      src: "https://raw.githubusercontent.com/tushar123851/velora_retails_analysis/main/sales_category.png",
      label: "Sales & Category Analysis",
      desc: "Net Sales: 309.99K | Total Orders: 397. Technology category leads.",
    },
    {
      src: "https://raw.githubusercontent.com/tushar123851/velora_retails_analysis/main/customer_overview.png",
      label: "Customer Overview & Returns",
      desc: "Total Sales: 844.02K | Avg Sales per Customer: 4.26K.",
    },
    {
      src: "https://raw.githubusercontent.com/tushar123851/velora_retails_analysis/main/return_analysis.png",
      label: "Return Analysis Dashboard",
      desc: "Total Returns: 50 | Return Rate (Orders): 5.00%.",
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.08 0.025 255)" }}
    >
      <ProjectPageHeader
        title="Velora Retails Analysis Dashboard"
        subtitle="Retail Sales & Return Analysis — Power BI"
        githubUrl="https://github.com/tushar123851/velora_retails_analysis"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto px-6 py-10 space-y-10"
      >
        {/* Hero */}
        <div
          className="rounded-2xl overflow-hidden border border-border/40 p-8"
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
                🛒 Velora Retails Analysis
              </h1>
              <p className="text-muted-foreground mt-1">
                Retail Sales & Return Analysis Dashboard
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Power BI", "Python", "Pandas", "DAX", "Retail Analytics"].map(
              (t) => (
                <Badge
                  key={t}
                  className="text-xs bg-primary/10 text-primary border-primary/20 border"
                >
                  {t}
                </Badge>
              ),
            )}
          </div>
        </div>

        {/* Live Dashboard Preview — GIF */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <SectionTitle>🎬 Live Dashboard Preview</SectionTitle>
          <div
            className="rounded-2xl border p-4 md:p-6 relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.10 0.032 260) 0%, oklch(0.14 0.042 248) 100%)",
              borderColor: "oklch(0.55 0.20 245 / 0.6)",
              boxShadow:
                "0 0 40px oklch(0.55 0.22 245 / 0.25), 0 0 80px oklch(0.55 0.22 245 / 0.10)",
            }}
          >
            {/* Glowing corner accents */}
            <div
              className="absolute top-0 left-0 w-32 h-32 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.6 0.22 245 / 0.18) 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute bottom-0 right-0 w-40 h-40 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.68 0.16 195 / 0.15) 0%, transparent 70%)",
              }}
            />

            {/* Label row */}
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span className="text-xs font-semibold text-primary tracking-wide uppercase">
                  Animated GIF
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                Dashboard Overview — Sales, Returns & Customer Insights
              </span>
            </div>

            {/* GIF image */}
            <div className="relative z-10 rounded-xl overflow-hidden border border-primary/20">
              <img
                src="https://raw.githubusercontent.com/tushar123851/velora_retails_analysis/main/Screenshots_pages/supermartretails.gif"
                alt="Velora Retails Analysis Dashboard — Animated Preview"
                className="w-full max-w-4xl mx-auto block"
                style={{ borderRadius: "0.75rem" }}
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = "flex";
                }}
              />
              {/* Fallback if GIF fails to load */}
              <div
                className="hidden w-full items-center justify-center py-16 text-muted-foreground flex-col gap-3"
                style={{ background: "oklch(0.10 0.03 255)" }}
              >
                <BarChart3 className="w-12 h-12 opacity-30" />
                <p className="text-sm">
                  GIF preview loading... ensure the GitHub repo is public.
                </p>
              </div>
            </div>

            {/* Bottom badge */}
            <div className="flex items-center justify-center gap-2 mt-3 relative z-10">
              <span className="text-xs text-muted-foreground">
                🛒 SuperMart Retail Sales & Return Dashboard · Power BI
              </span>
            </div>
          </div>
        </motion.section>

        {/* Carousel — additional screenshots */}
        <section>
          <SectionTitle>📸 Dashboard Screenshots</SectionTitle>
          <ImageCarousel
            images={images.filter(
              (img) =>
                !img.src.endsWith(".gif") &&
                !img.src.includes("supermartretails"),
            )}
          />
        </section>

        {/* Overview */}
        <section>
          <SectionTitle>📌 Project Overview</SectionTitle>
          <div
            className="rounded-xl border border-border/60 p-6"
            style={{ background: "oklch(0.12 0.03 255)" }}
          >
            <p className="text-muted-foreground leading-relaxed">
              This project is a{" "}
              <strong className="text-foreground">
                Retail Sales & Return Analysis Dashboard
              </strong>{" "}
              designed to analyze sales performance, order trends, return
              analysis, customer insights, and regional distribution. The
              dashboard is built with a{" "}
              <strong className="text-foreground">modern dark UI theme</strong>{" "}
              and focuses on delivering actionable business insights.
            </p>
          </div>
        </section>

        {/* KPI Cards */}
        <section>
          <SectionTitle>📌 Key Metrics (KPIs)</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: "Net Sales", value: "309.99K", icon: "💰" },
              { label: "Total Orders", value: "397", icon: "📦" },
              { label: "Total Sales", value: "844.02K", icon: "💰" },
              { label: "Avg Sales/Customer", value: "4.26K", icon: "📊" },
              { label: "Total Returns", value: "50", icon: "🔁" },
              { label: "Return Rate", value: "5.00%", icon: "📉" },
            ].map((kpi) => (
              <div
                key={kpi.label}
                className="bg-primary/10 rounded-xl p-5 text-center border border-primary/20"
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
                title: "🏠 Sales & Category Analysis",
                desc: "Overview of sales and order distribution. Technology category leads orders with balanced distribution across categories. Regional contribution varies significantly.",
                insights: [
                  "Technology category leads orders",
                  "Balanced distribution across categories",
                  "Regional contribution varies significantly",
                ],
              },
              {
                title: "👥 Customer Overview & Returns",
                desc: "Customer-level performance and return tracking with Total Sales 844.02K and Avg Sales per Customer 4.26K.",
                insights: [
                  "High-value customers drive majority revenue",
                  "Return contribution varies by customer",
                ],
              },
              {
                title: "🔁 Return Analysis Dashboard",
                desc: "Deep analysis of product returns and reasons. Total Returns: 50 | Return Rate (Orders): 5.00%.",
                insights: [
                  "Late delivery is the top return reason",
                  "Return rate decreasing over time",
                  "Customer issues impact returns significantly",
                ],
              },
            ].map((section) => (
              <div
                key={section.title}
                className="rounded-xl p-5 border border-border"
                style={{ background: "oklch(0.12 0.03 255)" }}
              >
                <h4 className="font-semibold text-foreground mb-2">
                  {section.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  {section.desc}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {section.insights.map((ins) => (
                    <div
                      key={ins}
                      className="bg-primary/5 rounded-lg p-3 text-xs text-muted-foreground border border-primary/10"
                    >
                      💡 {ins}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Objectives */}
        <section>
          <SectionTitle>🎯 Objectives</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "Analyze sales and return patterns",
              "Identify top-performing categories",
              "Understand customer contribution",
              "Track return reasons and trends",
              "Improve business decision-making",
            ].map((obj) => (
              <div
                key={obj}
                className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-xl border border-border/60"
                style={{ background: "oklch(0.12 0.03 255)" }}
              >
                <span className="text-primary mt-0.5">✔</span> {obj}
              </div>
            ))}
          </div>
        </section>

        {/* Key Insights */}
        <section>
          <SectionTitle>📊 Key Insights</SectionTitle>
          <div className="space-y-2">
            {[
              { icon: "🔥", text: "Technology category leads sales" },
              { icon: "📉", text: "Return rates show declining trend" },
              { icon: "👥", text: "High-value customers drive revenue" },
              { icon: "📦", text: "Orders are consistently distributed" },
              { icon: "⚠️", text: "Late delivery is the main return issue" },
            ].map((insight) => (
              <div
                key={insight.text}
                className="flex items-center gap-3 rounded-xl p-4 border border-border/60"
                style={{ background: "oklch(0.12 0.03 255)" }}
              >
                <span className="text-xl">{insight.icon}</span>
                <span className="text-sm text-muted-foreground">
                  {insight.text}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Design Highlights */}
        <section>
          <SectionTitle>🎨 Design & UI Highlights</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                label: "✨ Visual Design",
                items: [
                  "Dark purple gradient theme",
                  "Glowing KPI cards",
                  "Clean typography",
                ],
              },
              {
                label: "🧩 Layout Features",
                items: [
                  "Multi-panel dashboard",
                  "Interactive filters",
                  "Balanced visual hierarchy",
                ],
              },
              {
                label: "📊 Charts Used",
                items: [
                  "Line charts → Sales trends",
                  "Donut charts → Category dist.",
                  "Bar charts → Return reasons",
                ],
              },
            ].map((block) => (
              <div
                key={block.label}
                className="rounded-xl p-5 border border-border"
                style={{ background: "oklch(0.12 0.03 255)" }}
              >
                <p className="font-semibold text-foreground mb-2">
                  {block.label}
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {block.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section>
          <SectionTitle>🛠️ Tech Stack</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { tool: "Power BI 📊", purpose: "Dashboard Development" },
              { tool: "Python 🐍", purpose: "Data Preparation" },
              { tool: "Pandas 📈", purpose: "Data Analysis" },
              { tool: "DAX 📐", purpose: "Measures & KPIs" },
            ].map((t) => (
              <div
                key={t.tool}
                className="bg-primary/10 rounded-xl p-4 border border-primary/20 text-center"
              >
                <p className="font-semibold text-primary text-sm">{t.tool}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {t.purpose}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Business Value */}
        <section>
          <SectionTitle>📈 Business Value</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "Helps reduce return rates",
              "Identifies high-performing categories",
              "Improves customer targeting",
              "Supports data-driven decisions",
            ].map((v) => (
              <div
                key={v}
                className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-xl border border-border/60"
                style={{ background: "oklch(0.12 0.03 255)" }}
              >
                <span className="text-yellow-400 mt-0.5">★</span> {v}
              </div>
            ))}
          </div>
        </section>
      </motion.div>

      <PageFooter githubUrl="https://github.com/tushar123851/velora_retails_analysis" />
    </div>
  );
}
