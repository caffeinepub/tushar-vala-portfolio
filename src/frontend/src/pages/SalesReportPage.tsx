import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  BarChart3,
  ExternalLink,
  Filter,
  Github,
  MapPin,
  ShoppingCart,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ── Shared page shell ─────────────────────────────────────────────────────────
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
        <div className="flex gap-3">
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

function KpiCard({
  icon,
  value,
  label,
  color,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
}) {
  return (
    <div
      className="rounded-xl border border-border/60 p-5 text-center space-y-1"
      style={{ background: "oklch(0.12 0.03 255)" }}
    >
      <div className={`flex justify-center mb-2 ${color}`}>{icon}</div>
      <p className={`font-bold text-xl font-display ${color}`}>{value}</p>
      <p className="text-xs text-muted-foreground leading-tight">{label}</p>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-semibold text-foreground flex items-center gap-2 text-lg mb-4">
      {children}
    </h3>
  );
}

function InsightBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex items-start gap-1.5 p-2.5 rounded-lg"
      style={{ background: "oklch(0.16 0.04 245)" }}
    >
      <Zap className="w-3.5 h-3.5 text-yellow-400 shrink-0 mt-0.5" />
      <p className="text-xs text-yellow-300/90">{children}</p>
    </div>
  );
}

// ── Animated image carousel ───────────────────────────────────────────────────
export function ImageCarousel({
  images,
}: {
  images: { src: string; label: string; desc: string; isGif?: boolean }[];
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!autoPlay) return;
    const delay = images[activeIdx]?.isGif ? 6000 : 3000;
    timerRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % images.length);
    }, delay);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoPlay, activeIdx, images]);

  const goTo = (idx: number) => {
    setAutoPlay(false);
    setActiveIdx(idx);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-border/50 shadow-xl">
      <div className="relative" style={{ height: "360px" }}>
        <AnimatePresence mode="wait">
          {imgErrors[activeIdx] ? (
            <motion.div
              key={`err-${activeIdx}`}
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ background: "oklch(0.12 0.03 255)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <BarChart3 className="w-16 h-16 text-primary/30 mb-3" />
              <p className="text-muted-foreground text-sm">
                {images[activeIdx].label}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, scale: 1.04, rotateY: 6 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.96, rotateY: -6 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img
                src={images[activeIdx].src}
                alt={images[activeIdx].label}
                className="w-full h-full object-cover object-top"
                style={
                  images[activeIdx].isGif
                    ? {
                        objectFit: "contain",
                        background: "oklch(0.10 0.02 255)",
                      }
                    : {}
                }
                onError={() =>
                  setImgErrors((prev) => ({ ...prev, [activeIdx]: true }))
                }
              />
              <div
                className="absolute bottom-0 left-0 right-0 px-5 py-4"
                style={{
                  background:
                    "linear-gradient(transparent, oklch(0.08 0.02 255 / 0.93))",
                }}
              >
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-xs font-bold text-primary uppercase tracking-widest">
                    {images[activeIdx].label}
                  </p>
                  {images[activeIdx].isGif && (
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                      GIF
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground leading-snug">
                  {images[activeIdx].desc}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {autoPlay && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs font-medium backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping inline-block" />
            Auto
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div
          className="flex gap-2 p-3 justify-center flex-wrap"
          style={{ background: "oklch(0.10 0.02 255)" }}
        >
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={img.label}
              className={`relative rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                activeIdx === i
                  ? "border-primary scale-105 shadow-lg shadow-primary/30"
                  : "border-border/40 opacity-60 hover:opacity-90"
              }`}
              style={{ width: 72, height: 48 }}
            >
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-full object-cover object-top"
                style={
                  img.isGif
                    ? {
                        objectFit: "contain",
                        background: "oklch(0.10 0.02 255)",
                      }
                    : {}
                }
              />
              {activeIdx === i && (
                <div className="absolute inset-0 bg-primary/10" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SALES REPORT PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function SalesReportPage() {
  const kpis = [
    {
      label: "Total Revenue",
      value: "₹2,29,192.47",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "text-primary",
    },
    {
      label: "Total Transactions",
      value: "250",
      icon: <ShoppingCart className="w-6 h-6" />,
      color: "text-accent",
    },
    {
      label: "Total Customers",
      value: "50",
      icon: <Users className="w-6 h-6" />,
      color: "text-yellow-400",
    },
    {
      label: "Top Customer",
      value: "Mark Carter",
      icon: <Star className="w-6 h-6" />,
      color: "text-pink-400",
    },
  ];

  const components = [
    {
      num: "01",
      title: "Top 5 Customers by Revenue",
      icon: <Star className="w-4 h-4 text-primary shrink-0" />,
      desc: "Displays highest revenue-generating customers. Mark Carter is the top contributor. Helps identify high-value customers for targeting.",
      insight: "Focus on retention strategies for top customers.",
    },
    {
      num: "02",
      title: "Product Quantity Analysis",
      icon: <BarChart3 className="w-4 h-4 text-primary shrink-0" />,
      desc: "Shows quantity sold per product. High-demand products: BookShelf, Smartphone, Keyboard.",
      insight: "Optimize inventory for fast-moving products.",
    },
    {
      num: "03",
      title: "Customer Distribution by Region",
      icon: <MapPin className="w-4 h-4 text-primary shrink-0" />,
      desc: "Pie chart covering: North (59), Central (54), East (48), West (47), South (42).",
      insight: "North region has the highest customer base.",
    },
    {
      num: "04",
      title: "Sales by Product",
      icon: <TrendingUp className="w-4 h-4 text-primary shrink-0" />,
      desc: "Top performing: Laptop (~₹67K), Smartphone (~₹67K), Desk (~₹23K).",
      insight: "Electronics category drives major revenue.",
    },
    {
      num: "05",
      title: "Monthly Sales Trend",
      icon: <Target className="w-4 h-4 text-primary shrink-0" />,
      desc: "Tracks sales over 2024–2025. Peak months: Jan 2025 (~₹25K), Dec 2024 (~₹23K).",
      insight: "Seasonal trends can guide marketing campaigns.",
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.08 0.025 255)" }}
    >
      <ProjectPageHeader
        title="Sales Report Dashboard"
        subtitle="Interactive Excel data visualization — business performance analysis"
        githubUrl="https://github.com/tushar123851/finalprojectexcal"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto px-6 py-10 space-y-10"
      >
        {/* Hero banner */}
        <div
          className="rounded-2xl overflow-hidden border border-border/40 relative"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.13 0.035 255) 0%, oklch(0.18 0.045 245) 100%)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 30% 50%, oklch(0.60 0.22 245 / 0.15) 0%, transparent 60%)",
            }}
          />
          <div className="relative p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <BarChart3 className="w-8 h-8" />
              </div>
              <div>
                <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground">
                  🧾 Sales Report Dashboard
                </h1>
                <p className="text-muted-foreground mt-1">
                  Interactive Excel data visualization project — business
                  performance analysis
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "Microsoft Excel",
                "Power BI",
                "DAX",
                "Data Modeling",
                "Pivot Tables",
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
          <img
            src="/assets/sales.png-019d5bed-b30f-719c-b0c3-2804ecb5ec30.png"
            alt="Sales Report Dashboard"
            className="w-full border-t border-border/30"
            style={{
              maxHeight: "340px",
              objectFit: "cover",
              objectPosition: "top",
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>

        {/* Project Overview */}
        <section>
          <SectionTitle>🧾 Project Overview</SectionTitle>
          <div
            className="rounded-xl border border-border/60 p-6 space-y-3"
            style={{ background: "oklch(0.12 0.03 255)" }}
          >
            <p className="text-muted-foreground leading-relaxed">
              The Sales Report Dashboard is an interactive data visualization
              project designed to analyze and monitor business performance
              across multiple dimensions such as revenue, customers, products,
              and regions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This dashboard helps stakeholders make data-driven decisions by
              providing a clear and dynamic view of sales trends and customer
              behavior.
            </p>
          </div>
        </section>

        {/* Objectives */}
        <section>
          <SectionTitle>
            <Target className="w-5 h-5 text-primary" /> Objectives
          </SectionTitle>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Track overall business performance 📈",
              "Identify top customers and products 🏆",
              "Analyze sales trends over time 📅",
              "Understand regional customer distribution 🌍",
              "Enable interactive filtering for deeper insights 🔍",
            ].map((obj) => (
              <li
                key={obj}
                className="flex items-start gap-3 p-3 rounded-xl border border-border/60 text-sm text-muted-foreground"
                style={{ background: "oklch(0.12 0.03 255)" }}
              >
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                {obj}
              </li>
            ))}
          </ul>
        </section>

        {/* KPI Cards */}
        <section>
          <SectionTitle>📌 Key Metrics (KPIs)</SectionTitle>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {kpis.map((kpi) => (
              <KpiCard
                key={kpi.label}
                icon={kpi.icon}
                value={kpi.value}
                label={kpi.label}
                color={kpi.color}
              />
            ))}
          </div>
        </section>

        {/* Dashboard Components */}
        <section>
          <SectionTitle>📊 Dashboard Components & Insights</SectionTitle>
          <div className="space-y-4">
            {components.map((comp) => (
              <div
                key={comp.num}
                className="rounded-xl border border-border/60 p-5"
                style={{ background: "oklch(0.12 0.03 255)" }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md shrink-0 mt-0.5">
                    {comp.num}
                  </span>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      {comp.icon}
                      <p className="font-semibold text-foreground text-sm">
                        {comp.title}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {comp.desc}
                    </p>
                    <InsightBox>
                      <strong>Business Insight:</strong> {comp.insight}
                    </InsightBox>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Filters */}
        <section>
          <SectionTitle>
            <Filter className="w-5 h-5 text-accent" /> Interactive Filters
          </SectionTitle>
          <div
            className="rounded-xl border border-border/60 p-5 space-y-3"
            style={{ background: "oklch(0.12 0.03 255)" }}
          >
            <div className="flex flex-wrap gap-2">
              {[
                "Customer Name Filter",
                "Region Filter",
                "Cash",
                "Credit Card",
                "Debit Card",
                "PayPal",
              ].map((f) => (
                <Badge
                  key={f}
                  variant="outline"
                  className="text-xs border-accent/40 text-accent bg-accent/5"
                >
                  {f}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Users can dynamically explore the data based on their needs.
            </p>
          </div>
        </section>

        {/* Key Features */}
        <section>
          <SectionTitle>🚀 Key Features</SectionTitle>
          <div
            className="rounded-xl border border-primary/20 p-5"
            style={{ background: "oklch(0.12 0.05 245)" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Interactive Dashboard",
                "Clean & Professional UI (Blue Theme)",
                "Drill-down Analysis",
                "Real-time Filtering",
                "Business-focused Insights",
              ].map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                    ✓
                  </span>
                  {f}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section>
          <SectionTitle>🧠 Conclusion</SectionTitle>
          <div
            className="rounded-xl border border-border/60 p-5"
            style={{ background: "oklch(0.12 0.03 255)" }}
          >
            <p className="text-muted-foreground leading-relaxed">
              This dashboard provides a comprehensive view of sales performance,
              enabling businesses to improve customer targeting, optimize
              product strategy, identify sales trends, and make informed
              decisions.
            </p>
          </div>
        </section>
      </motion.div>

      <PageFooter githubUrl="https://github.com/tushar123851/finalprojectexcal" />
    </div>
  );
}
