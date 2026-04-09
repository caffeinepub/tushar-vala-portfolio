import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  BarChart3,
  ExternalLink,
  Github,
  MapPin,
  ShoppingCart,
  TrendingUp,
  Zap,
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

export default function CarSalesPage() {
  const images = [
    {
      src: "/assets/car-019d5bf6-dbe0-726e-89d3-81a57344b359.png",
      label: "Overview Dashboard",
      desc: "High-level KPIs: Total Sales ₹129M, 216 cars sold, Top 5 cities, Gender distribution.",
    },
    {
      src: "/assets/dealer-019d5bf6-dc07-74f8-9016-4f9ff49fde91.png",
      label: "Brand & Dealer Analysis",
      desc: "Brand-wise sales, top-selling models: Altroz, Venue, Nexon. Fuel type distribution.",
    },
    {
      src: "/assets/customer_performance-019d5bf6-dd37-71d9-ae89-2fc64877a994.png",
      label: "Customer & Regional Performance",
      desc: "Top 5 customers, state-wise sales, monthly trends for peak/low periods.",
    },
    {
      src: "/assets/carservices-019d5bf6-de48-72bd-a7f0-1e132efc20b4.gif",
      label: "Car Services Animation",
      desc: "Visual showcase of the dashboard's interactive capabilities.",
      isGif: true,
    },
  ];

  const kpis = [
    {
      label: "Total Sales",
      value: "₹129M",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "text-primary",
    },
    {
      label: "Cars Sold",
      value: "216",
      icon: <ShoppingCart className="w-6 h-6" />,
      color: "text-accent",
    },
    {
      label: "Top Cities",
      value: "5 Cities",
      icon: <MapPin className="w-6 h-6" />,
      color: "text-yellow-400",
    },
    {
      label: "Fuel Types",
      value: "4 Types",
      icon: <Zap className="w-6 h-6" />,
      color: "text-pink-400",
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.08 0.025 255)" }}
    >
      <ProjectPageHeader
        title="Car Sales Analysis Dashboard"
        subtitle="Interactive Power BI dashboard — sales performance, customer behavior & regional trends"
        githubUrl="https://github.com/tushar123851/powerbicardashboard"
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
                🚗 Car Sales Analysis Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                Interactive Power BI dashboard — sales performance, customer
                behavior & regional trends
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              "Power BI",
              "DAX",
              "Power Query",
              "Data Modeling",
              "Data Cleaning",
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
              This project is an{" "}
              <strong className="text-foreground">
                interactive Car Sales Analysis Dashboard
              </strong>{" "}
              built using <strong className="text-primary">Power BI</strong>. It
              provides insights into{" "}
              <strong className="text-foreground">
                sales performance, customer behavior, brand-wise sales, fuel
                type distribution, and regional trends
              </strong>{" "}
              to support data-driven decision-making.
            </p>
          </div>
        </section>

        {/* KPI Cards */}
        <section>
          <SectionTitle>📌 Key Business KPIs</SectionTitle>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
        </section>

        {/* Dashboard Views */}
        <section>
          <SectionTitle>📊 Dashboard Views</SectionTitle>
          <div className="space-y-4">
            {[
              {
                num: "01",
                title: "Overview Dashboard",
                desc: "High-level overview of overall car sales performance. Highlights key KPIs: Total Sales, Total Customers, Average Monthly Sales, and Total Quantity Sold.",
                insights: [
                  "Total sales reached ₹129M — strong overall performance",
                  "216 cars sold across multiple cities",
                  "Top 5 cities contribute majority of total revenue",
                  "Gender-wise customer distribution for buyer demographics",
                ],
              },
              {
                num: "02",
                title: "Brand & Fuel Type Analysis",
                desc: "Focuses on brand, model, and fuel-type analysis to understand product-level performance and customer preferences.",
                insights: [
                  "Top-selling car models: Altroz, Venue, and Nexon",
                  "Brand-wise contribution to total sales",
                  "Fuel type demand: Diesel, Petrol, CNG, and Electric",
                  "Helps optimize inventory and brand-level strategies",
                ],
              },
              {
                num: "03",
                title: "Customer & Regional Performance",
                desc: "Analyzes customer behavior and regional sales performance to identify high-value customers and profitable regions.",
                insights: [
                  "Top 5 customers by revenue highlighted",
                  "State-wise sales: Rajasthan, Punjab, Telangana, etc.",
                  "Monthly sales trends for peak and low-performing months",
                  "Supports targeted marketing and retention strategies",
                ],
              },
            ].map((tab) => (
              <div
                key={tab.num}
                className="rounded-xl border border-border/60 p-5"
                style={{ background: "oklch(0.12 0.03 255)" }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md shrink-0 mt-0.5">
                    {tab.num}
                  </span>
                  <div className="flex-1 space-y-2">
                    <p className="font-semibold text-foreground text-sm">
                      {tab.title}
                    </p>
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

        {/* Dashboard Insights */}
        <section>
          <SectionTitle>📈 Dashboard Insights</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                num: "1️⃣",
                title: "Top Cities by Sales",
                desc: "Identifies top 5 cities contributing highest revenue for focused sales & marketing.",
              },
              {
                num: "2️⃣",
                title: "Brand-wise Sales",
                desc: "Contribution of Maruti, Hyundai, Toyota, Tata, Mahindra to total sales.",
              },
              {
                num: "3️⃣",
                title: "Fuel Type Distribution",
                desc: "Customer preference across Diesel, Petrol, CNG, and Electric vehicles.",
              },
              {
                num: "4️⃣",
                title: "Customer Demographics",
                desc: "Breakdown by gender for deeper buyer behavior insights.",
              },
              {
                num: "5️⃣",
                title: "Monthly Sales Trend",
                desc: "Tracks sales variation across months to identify peak and low sales periods.",
              },
              {
                num: "6️⃣",
                title: "Top Models by Quantity",
                desc: "High-demand models: Altroz, Venue, Nexon, Sonet, Baleno.",
              },
            ].map((ins) => (
              <div
                key={ins.num}
                className="rounded-xl border border-border/60 p-4 flex items-start gap-3"
                style={{ background: "oklch(0.12 0.03 255)" }}
              >
                <span className="text-lg shrink-0">{ins.num}</span>
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {ins.title}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                    {ins.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Business Value */}
        <section>
          <SectionTitle>🎯 Business Value</SectionTitle>
          <div
            className="rounded-xl border border-primary/20 p-5"
            style={{ background: "oklch(0.12 0.05 245)" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Identifies top-performing brands and cities",
                "Supports inventory planning based on demand",
                "Improves customer targeting strategies",
                "Enables sales trend forecasting",
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

      <PageFooter githubUrl="https://github.com/tushar123851/powerbicardashboard" />
    </div>
  );
}
