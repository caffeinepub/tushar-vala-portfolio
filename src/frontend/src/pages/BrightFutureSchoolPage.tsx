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

export default function BrightFutureSchoolPage() {
  const images = [
    {
      src: "/assets/student_dashboard-019d6234-36d7-76cb-b4a9-515e52b4b6e7.gif",
      label: "Student Dashboard Overview",
      desc: "Comprehensive student performance & attendance analytics dashboard. Avg Score: 49.87%, Avg Attendance: 90.05%.",
      isGif: true,
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.08 0.025 255)" }}
    >
      <ProjectPageHeader
        title="Bright Future School Analytics Dashboard"
        subtitle="Student Performance & Attendance Analytics — Power BI"
        githubUrl="https://github.com/tushar123851/Bright_future_school_analysis"
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
                🎓 Bright Future School Analytics
              </h1>
              <p className="text-muted-foreground mt-1">
                Student Performance & Attendance Analytics Dashboard
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Power BI", "Python", "Pandas", "DAX", "Education Analytics"].map(
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
              This project is a{" "}
              <strong className="text-foreground">
                Student Performance & Attendance Analytics Dashboard
              </strong>{" "}
              designed to analyze academic performance, attendance trends,
              student demographics, subject-wise scores, and section & class
              distribution. The dashboard provides{" "}
              <strong className="text-foreground">
                data-driven insights for schools
              </strong>{" "}
              to improve student outcomes and decision-making.
            </p>
          </div>
        </section>

        {/* KPI Cards */}
        <section>
          <SectionTitle>📌 Key Metrics (KPIs)</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Avg Score", value: "49.87%", icon: "📊" },
              { label: "Avg Attendance", value: "90.05%", icon: "📅" },
              { label: "Target Attendance", value: "95%", icon: "🎯" },
              { label: "Total Students", value: "1000+", icon: "👥" },
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
          <SectionTitle>📊 Dashboard Sections & Insights</SectionTitle>
          <div className="space-y-4">
            {[
              {
                icon: "📊",
                title: "Academic Performance Analysis",
                metrics:
                  "Avg Score: 49.87% | Balanced performance across subjects",
                insights: [
                  "Math shows highest performance",
                  "English and Science are consistent",
                  "Slight improvement needed in History & Geography",
                ],
              },
              {
                icon: "📅",
                title: "Attendance Performance",
                metrics: "Avg Attendance: 90.05% | Target: 95%",
                insights: [
                  "Attendance is stable but below target",
                  "Some fluctuations indicate irregular attendance periods",
                ],
              },
              {
                icon: "👥",
                title: "Student Overview",
                metrics:
                  "Total Students: 22 / 1000 (dataset variation) | Nearly balanced gender distribution",
                insights: [
                  "Male students slightly higher than female",
                  "Section distribution is evenly spread",
                ],
              },
              {
                icon: "📘",
                title: "Detailed Student Performance",
                metrics:
                  "Individual student-level insights including scores, attendance %, and section details",
                insights: [
                  "High-performing students identified",
                  "Attendance strongly correlates with performance",
                ],
              },
            ].map((section) => (
              <div
                key={section.title}
                className="rounded-xl p-5 border border-border"
                style={{ background: "oklch(0.12 0.03 255)" }}
              >
                <h4 className="font-semibold text-foreground flex items-center gap-2 mb-2">
                  <span>{section.icon}</span> {section.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  {section.metrics}
                </p>
                <ul className="space-y-1">
                  {section.insights.map((ins) => (
                    <li
                      key={ins}
                      className="text-sm text-muted-foreground flex items-start gap-2"
                    >
                      <span className="text-primary mt-0.5">💡</span> {ins}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Objectives */}
        <section>
          <SectionTitle>🎯 Objectives</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "Analyze student academic performance",
              "Track attendance trends",
              "Identify high and low performers",
              "Understand gender and section distribution",
              "Improve decision-making for educators",
            ].map((obj) => (
              <div
                key={obj}
                className="flex items-center gap-2 text-sm text-muted-foreground p-3 rounded-xl border border-border/60"
                style={{ background: "oklch(0.12 0.03 255)" }}
              >
                <span className="text-green-500">✔</span> {obj}
              </div>
            ))}
          </div>
        </section>

        {/* Key Insights */}
        <section>
          <SectionTitle>📊 Key Insights</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { icon: "📈", text: "Average score is around 50%" },
              { icon: "📅", text: "Attendance is high but below target" },
              { icon: "👥", text: "Gender distribution is balanced" },
              { icon: "📊", text: "Subject performance is consistent" },
              { icon: "🎯", text: "Attendance impacts academic performance" },
            ].map((ins) => (
              <div
                key={ins.text}
                className="flex items-start gap-2 text-sm text-muted-foreground rounded-xl p-4 border border-border/60"
                style={{ background: "oklch(0.12 0.03 255)" }}
              >
                <span>{ins.icon}</span> {ins.text}
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
                  "Clean academic theme",
                  "Light background with structured layout",
                  "Icon-based visuals",
                ],
              },
              {
                label: "🧩 Layout Features",
                items: [
                  "Multi-dashboard structure",
                  "KPI cards for quick insights",
                  "Filters (Class, Section)",
                ],
              },
              {
                label: "📊 Charts Used",
                items: [
                  "Bar charts → Subject analysis",
                  "Line charts → Attendance trends",
                  "Donut charts → Distribution",
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
              { tool: "Python 🐍", purpose: "Data Processing" },
              { tool: "Pandas 📈", purpose: "Data Analysis" },
              { tool: "DAX 📐", purpose: "Measures & KPIs" },
            ].map((t) => (
              <div
                key={t.tool}
                className="bg-primary/10 rounded-xl p-4 border border-primary/20 text-center"
              >
                <p className="font-semibold text-foreground text-sm">
                  {t.tool}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {t.purpose}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Business Value */}
        <section>
          <SectionTitle>📈 Business / Educational Value</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "Helps schools improve student performance",
              "Tracks attendance patterns",
              "Identifies at-risk students",
              "Supports data-driven teaching strategies",
            ].map((v) => (
              <div
                key={v}
                className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-xl border border-border/60"
                style={{ background: "oklch(0.12 0.03 255)" }}
              >
                <span className="text-primary">🏫</span> {v}
              </div>
            ))}
          </div>
        </section>
      </motion.div>

      <PageFooter githubUrl="https://github.com/tushar123851/Bright_future_school_analysis" />
    </div>
  );
}
