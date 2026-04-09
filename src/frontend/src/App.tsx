import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@tanstack/react-router";
import {
  BarChart3,
  Brain,
  ChevronDown,
  Clock,
  Code2,
  Database,
  Download,
  ExternalLink,
  Eye,
  Github,
  GraduationCap,
  Lightbulb,
  Mail,
  Menu,
  MessageSquare,
  Phone,
  TrendingUp,
  Users,
  Wrench,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const TECHNICAL_SKILLS = [
  {
    category: "Data Analytics Tools",
    icon: <BarChart3 className="w-4 h-4" />,
    skills: ["Microsoft Excel (Advanced)", "Power BI"],
    accent: "primary" as const,
  },
  {
    category: "Programming & Query Languages",
    icon: <Code2 className="w-4 h-4" />,
    skills: ["Python (NumPy, Pandas, Matplotlib)", "SQL"],
    accent: "primary" as const,
  },
  {
    category: "Web & Core Programming",
    icon: <Wrench className="w-4 h-4" />,
    skills: ["C", "C++", "HTML", "CSS", "JavaScript"],
    accent: "primary" as const,
  },
  {
    category: "Database Skills",
    icon: <Database className="w-4 h-4" />,
    skills: ["MySQL", "Database Design", "ER Diagrams"],
    accent: "primary" as const,
  },
  {
    category: "Other Skills",
    icon: <BarChart3 className="w-4 h-4" />,
    skills: [
      "Data Cleaning",
      "Data Visualization",
      "Statistical Analysis",
      "Reporting",
    ],
    accent: "amber" as const,
  },
];

const SOFT_SKILLS = [
  { label: "Critical Thinking", icon: Brain },
  { label: "Problem-Solving", icon: Lightbulb },
  { label: "Time Management", icon: Clock },
  { label: "Strong Communication", icon: MessageSquare },
  { label: "Team Collaboration", icon: Users },
];

const STATS = [
  { stat: "85%+", label: "Academic Score" },
  { stat: "6+", label: "Projects Built" },
  { stat: "5+", label: "Tools Mastered" },
];

const EXCEL_PROJECTS = [
  {
    title: "Sales Report Dashboard",
    description:
      "A comprehensive Excel dashboard analyzing sales data with dynamic charts, KPIs, pivot tables, and automated reporting. Provides actionable insights into revenue trends and performance metrics.",
    github: "https://github.com/tushar123851/finalprojectexcal",
    tags: ["Excel", "Pivot Tables", "Charts", "KPI"],
    hasDetail: true,
    detailRoute: "/project/sales-report" as const,
  },
];

const POWERBI_PROJECTS = [
  {
    title: "Bright Future School Analysis",
    description:
      "Power BI dashboard analyzing school performance data including student results, attendance trends, subject-wise scores, and institutional KPIs to support data-driven education management.",
    github: "https://github.com/tushar123851/Bright_future_school_analysis",
    tags: ["Power BI", "Education Analytics", "DAX", "KPI"],
    hasDetail: true,
    detailRoute: "/project/bright-future-school" as const,
  },
  {
    title: "Velora Retails Analysis",
    description:
      "Power BI retail analytics dashboard providing insights into sales performance, product trends, customer behavior, and revenue metrics to drive smarter business decisions.",
    github: "https://github.com/tushar123851/velora_retails_analysis",
    tags: ["Power BI", "Retail Analytics", "DAX", "Sales"],
    hasDetail: true,
    detailRoute: "/project/velora-retails" as const,
  },
  {
    title: "Car Sales Dashboard",
    description:
      "Interactive Power BI dashboard tracking car sales metrics across models, dealerships, and regions. Features revenue analysis, YoY comparisons, and performance KPIs with drill-through capabilities.",
    github: "https://github.com/tushar123851/powerbicardashboard",
    tags: ["Power BI", "DAX", "Sales Analytics", "KPI"],
    hasDetail: true,
    detailRoute: "/project/car-sales" as const,
  },
  {
    title: "AdventureWorks Sales Dashboard",
    description:
      "Power BI dashboard built on the AdventureWorks dataset, visualizing sales performance, product trends, regional breakdowns, and executive KPIs with interactive drill-through capabilities.",
    github: "https://github.com/tushar123851/AdventureWorks_Sales_Dashboard-",
    tags: ["Power BI", "DAX", "AdventureWorks", "Sales Analytics"],
    hasDetail: true,
    detailRoute: "/project/adventureworks" as const,
  },
  {
    title: "Zomato Sales Analysis",
    description:
      "Power BI report analyzing Zomato restaurant sales data with insights into cuisine performance, city-wise trends, order patterns, and revenue metrics through interactive visualizations.",
    github: "https://github.com/tushar123851/Zomato_sales_analysis",
    tags: ["Power BI", "DAX", "Food Analytics", "Trends"],
    hasDetail: true,
    detailRoute: "/project/zomato" as const,
  },
];

const DATAPREP_PROJECTS = [
  {
    title: "Holistic Data Preparer",
    description:
      "A comprehensive data preprocessing project focused on end-to-end data preparation workflows. Covers data cleaning, handling missing values, feature engineering, normalization, and transformation techniques using Python.",
    github:
      "https://github.com/tushar123851/Holistic-Data-Preparer-Final-Project-",
    tags: ["Python", "Data Cleaning", "Feature Engineering", "Preprocessing"],
  },
  {
    title: "Customer Purchase Propensity",
    description:
      "Data preprocessing and analysis project for predicting customer purchase propensity. Includes data wrangling, encoding categorical variables, outlier detection, and preparing datasets for machine learning models.",
    github:
      "https://github.com/tushar123851/customer-purchase-propensity-set-A",
    tags: ["Python", "Data Wrangling", "Encoding", "ML Preparation"],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// ── Ripple burst on click ─────────────────────────────────────────────────────
interface RippleDot {
  id: number;
  x: number;
  y: number;
}

function useRipple() {
  const [ripples, setRipples] = useState<RippleDot[]>([]);
  const counter = useRef(0);

  const trigger = useCallback((x: number, y: number) => {
    const id = ++counter.current;
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 950);
  }, []);

  return { ripples, trigger };
}

function RippleLayer({ ripples }: { ripples: RippleDot[] }) {
  return (
    <>
      {ripples.map((r) => (
        <span key={r.id}>
          <span
            className="section-ripple-glow"
            style={{ left: r.x, top: r.y }}
          />
          <span
            className="section-ripple-ring"
            style={{ left: r.x, top: r.y }}
          />
          <span
            className="section-ripple-ring2"
            style={{ left: r.x, top: r.y }}
          />
        </span>
      ))}
    </>
  );
}

function RippleSection({
  children,
  className,
  id,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}) {
  const { ripples, trigger } = useRipple();

  const handleClick = (e: React.MouseEvent) => {
    trigger(e.clientX, e.clientY);
  };

  return (
    <section
      id={id}
      className={className}
      style={style}
      onClick={handleClick}
      onKeyUp={() => {}}
    >
      <RippleLayer ripples={ripples} />
      {children}
    </section>
  );
}

// ── Section Label ─────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground mb-4">
      {children}
    </span>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-display font-extrabold text-2xl tracking-tight"
        >
          <span className="text-primary">TV</span>
          <span className="text-foreground">.</span>
        </motion.div>

        {/* Desktop nav */}
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="hidden md:flex items-center gap-1"
        >
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <motion.button
                type="button"
                data-ocid="nav.link"
                whileTap={{ scale: 0.93 }}
                onClick={() => handleNav(link.href)}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted/40 active:bg-primary/15"
              >
                {link.label}
              </motion.button>
            </li>
          ))}
        </motion.ul>

        {/* Right icons */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="hidden md:flex items-center gap-1"
        >
          <a
            href="https://github.com/tushar123851"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="nav.link"
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-all"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="mailto:tusharvala707@gmail.com"
            data-ocid="nav.link"
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-all"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href="tel:+918320808750"
            data-ocid="nav.link"
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-all"
            aria-label="Phone"
          >
            <Phone className="w-5 h-5" />
          </a>
        </motion.div>

        <button
          type="button"
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-border"
          >
            <ul className="px-6 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <motion.button
                    type="button"
                    data-ocid="nav.link"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleNav(link.href)}
                    className="w-full text-left px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 rounded-full transition-colors active:bg-primary/15"
                  >
                    {link.label}
                  </motion.button>
                </li>
              ))}
            </ul>
            <div className="px-6 pb-4 flex items-center gap-2">
              <a
                href="https://github.com/tushar123851"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-all"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:tusharvala707@gmail.com"
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-all"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="tel:+918320808750"
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-all"
                aria-label="Phone"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function HeroSection() {
  const { ripples, trigger } = useRipple();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onClick={(e) => trigger(e.clientX, e.clientY)}
      onKeyUp={() => {}}
    >
      <RippleLayer ripples={ripples} />

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/uploads/image-1.png')" }}
      />
      <div className="absolute inset-0 bg-background/75" />
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Ambient glow blobs */}
      <div
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[130px] opacity-[0.12] pointer-events-none"
        style={{ background: "oklch(0.60 0.22 245)" }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-[380px] h-[380px] rounded-full blur-[110px] opacity-[0.09] pointer-events-none"
        style={{ background: "oklch(0.68 0.16 195)" }}
      />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* DATA ANALYST pill badge */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="flex justify-center mb-6"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/40 bg-primary/10 text-primary font-bold text-sm tracking-[0.22em] uppercase backdrop-blur-sm">
              <TrendingUp className="w-4 h-4" />
              Data Analyst
            </span>
          </motion.div>

          {/* Name */}
          <h1
            className="font-display font-extrabold text-6xl md:text-7xl lg:text-8xl mb-4 leading-none tracking-tight"
            style={{ color: "#ffffff" }}
          >
            Tushar <span style={{ color: "#ffffff" }}>Vala</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground font-medium mb-10 tracking-wide">
            Python <span className="text-border mx-2">·</span>
            Power BI <span className="text-border mx-2">·</span>
            Excel
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              data-ocid="hero.primary_button"
              size="lg"
              className="font-semibold px-8 glow-blue"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View Projects
              <ExternalLink className="ml-2 w-4 h-4" />
            </Button>
            <Button
              data-ocid="hero.secondary_button"
              size="lg"
              variant="outline"
              className="font-semibold px-8 border-primary/50 text-primary hover:bg-primary/10"
              asChild
            >
              <a
                href="/assets/uploads/resume-3--2.pdf"
                download="Tushar_Vala_Resume.pdf"
              >
                Download Resume
                <Download className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}

// ── About ──────────────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <RippleSection id="about" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.div variants={fadeUp} className="mb-10">
            <SectionLabel>About Me</SectionLabel>
            <h2
              className="font-display font-bold text-4xl md:text-5xl mb-5"
              style={{ color: "#ffffff" }}
            >
              Education & <span className="text-primary">Background</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              I&apos;m a passionate Data Analyst with a strong foundation in
              computer science and information technology. I specialize in
              transforming complex datasets into meaningful insights using tools
              like Power BI, Excel, Python, and SQL. I love building dashboards
              that tell data-driven stories.
            </p>
          </motion.div>

          {/* Education cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <motion.div variants={fadeUp}>
              <Card className="h-full border-border hover:border-primary/50 transition-colors group overflow-hidden">
                <div className="h-1 w-full bg-primary/80" />
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors shrink-0">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="font-display text-lg leading-snug">
                        Bachelor of Computer Science (IT)
                      </CardTitle>
                      <CardDescription className="mt-1">
                        Veer Narmad South Gujarat University — Surat
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Badge className="bg-primary/15 text-primary hover:bg-primary/25 border-0 rounded-full font-semibold">
                    Average: 85.13%
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Card className="h-full border-border hover:border-accent/50 transition-colors group overflow-hidden">
                <div className="h-1 w-full bg-accent/80" />
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-accent/10 text-accent group-hover:bg-accent/20 transition-colors shrink-0">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="font-display text-lg leading-snug">
                        Higher Secondary Education (12th Grade)
                      </CardTitle>
                      <CardDescription className="mt-1">
                        Ashadeep Vidhyalay — Surat
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Badge className="bg-accent/15 text-accent hover:bg-accent/25 border-0 rounded-full font-semibold">
                    Average: 93.86%
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Stats strip */}
          <motion.div variants={fadeUp}>
            <div className="grid grid-cols-3 divide-x divide-border border border-border rounded-xl overflow-hidden">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  data-ocid={`about.stat.item.${i + 1}`}
                  className="flex flex-col items-center justify-center py-6 px-4 bg-card hover:bg-muted/20 transition-colors"
                >
                  <span
                    className="font-display font-extrabold text-3xl md:text-4xl"
                    style={{ color: "oklch(0.75 0.17 70)" }}
                  >
                    {s.stat}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest mt-1 text-center">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </RippleSection>
  );
}

// ── Soft Skill Card ───────────────────────────────────────────────────────────
function SoftSkillCard({
  skill,
  index,
}: { skill: (typeof SOFT_SKILLS)[0]; index: number }) {
  const [active, setActive] = useState(false);
  const Icon = skill.icon;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActive(true);
    setTimeout(() => setActive(false), 700);
  };

  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col items-center gap-3 cursor-pointer select-none"
      onClick={handleClick}
      data-ocid={`skills.soft.item.${index}`}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="relative">
        {active && (
          <span className="absolute inset-0 rounded-full skill-ripple" />
        )}
        <motion.div
          animate={
            active
              ? {
                  scale: [1, 1.22, 1],
                  boxShadow: [
                    "0 0 0px oklch(0.60 0.22 245 / 0)",
                    "0 0 32px 8px oklch(0.60 0.22 245 / 0.7)",
                    "0 0 16px 4px oklch(0.60 0.22 245 / 0.3)",
                  ],
                }
              : { scale: 1 }
          }
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative z-10 w-16 h-16 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/25 hover:border-primary/60 transition-colors"
          style={{
            boxShadow: active
              ? "0 0 24px 6px oklch(0.60 0.22 245 / 0.45)"
              : "0 0 12px 2px oklch(0.60 0.22 245 / 0.15)",
          }}
        >
          <Icon className="w-7 h-7" />
        </motion.div>
      </div>

      <motion.span
        animate={
          active
            ? { color: "oklch(0.60 0.22 245)", fontWeight: 700 }
            : { color: "oklch(0.55 0.05 250)" }
        }
        transition={{ duration: 0.3 }}
        className="text-sm font-medium text-center leading-tight"
      >
        {skill.label}
      </motion.span>
    </motion.div>
  );
}

// ── Tech Skill Card ───────────────────────────────────────────────────────────
type AccentKey = "primary" | "teal" | "amber";

function TechSkillCard({
  group,
  index,
  accentClass,
  badgeHover,
  separatorLabel,
}: {
  group: (typeof TECHNICAL_SKILLS)[0];
  index: number;
  accentClass: Record<AccentKey, string>;
  badgeHover: Record<AccentKey, string>;
  separatorLabel: Record<AccentKey, string>;
}) {
  const [active, setActive] = useState(false);

  const glowColor: Record<AccentKey, string> = {
    primary: "oklch(0.60 0.22 245 / 0.55)",
    teal: "oklch(0.68 0.16 195 / 0.55)",
    amber: "oklch(0.75 0.17 70 / 0.55)",
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActive(true);
    setTimeout(() => setActive(false), 700);
  };

  return (
    <motion.div
      variants={fadeUp}
      onClick={handleClick}
      className="cursor-pointer select-none"
      animate={
        active
          ? {
              scale: [1, 1.03, 1],
              boxShadow: [
                "0 0 0px transparent",
                `0 0 32px 8px ${glowColor[group.accent]}`,
                `0 0 16px 4px ${glowColor[group.accent].replace("0.55", "0.2")}`,
              ],
            }
          : { scale: 1, boxShadow: "0 0 0px transparent" }
      }
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ borderRadius: "0.75rem" }}
    >
      <Card
        data-ocid={`skills.tech.item.${index}`}
        className={`h-full border-border hover:border-primary/30 transition-colors rounded-xl ${
          accentClass[group.accent]
        } rounded-l-none`}
      >
        <CardHeader className="pb-3">
          <div
            className={`flex items-center gap-2 ${{ primary: "text-primary", teal: "text-accent", amber: "text-yellow-400" }[group.accent as AccentKey] ?? "text-primary"}`}
          >
            {group.icon}
            <CardTitle className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {group.category}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {group.skills.map((skill) =>
              skill.startsWith("—") ? (
                <div key={skill} className="w-full mt-1 mb-0.5">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                      separatorLabel[group.accent]
                    }`}
                  >
                    {skill.replace(/^— | —$/g, "")}
                  </span>
                </div>
              ) : (
                <Badge
                  key={skill}
                  variant="outline"
                  className={`text-xs font-medium cursor-default transition-colors ${badgeHover[group.accent]}`}
                >
                  {skill}
                </Badge>
              ),
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ── Skills ─────────────────────────────────────────────────────────────────────
function SkillsSection() {
  const accentClass: Record<AccentKey, string> = {
    primary: "card-accent-primary",
    teal: "card-accent-teal",
    amber: "card-accent-amber",
  };

  const badgeHover: Record<AccentKey, string> = {
    primary:
      "hover:bg-primary/20 hover:text-primary border-primary/20 text-primary/80",
    teal: "hover:bg-accent/20 hover:text-accent border-accent/20 text-accent/80",
    amber:
      "hover:bg-yellow-500/20 hover:text-yellow-400 border-yellow-500/20 text-yellow-400/80",
  };

  const separatorLabel: Record<AccentKey, string> = {
    teal: "bg-accent/10 text-accent border-accent/30",
    primary: "bg-primary/10 text-primary border-primary/30",
    amber: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  };

  return (
    <RippleSection
      id="skills"
      className="py-20 px-6"
      style={{ background: "oklch(0.10 0.028 257)" } as React.CSSProperties}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={fadeUp} className="mb-10">
            <SectionLabel>What I Know</SectionLabel>
            <h2
              className="font-display font-bold text-4xl md:text-5xl"
              style={{ color: "#ffffff" }}
            >
              Technical <span className="text-primary">Skills</span>
            </h2>
          </motion.div>

          {/* Technical skill cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-5 mb-10">
            {TECHNICAL_SKILLS.map((group, i) => (
              <TechSkillCard
                key={group.category}
                group={group}
                index={i + 1}
                accentClass={accentClass}
                badgeHover={badgeHover}
                separatorLabel={separatorLabel}
              />
            ))}
          </div>

          {/* Soft skills */}
          <motion.div variants={fadeUp}>
            <Card className="border-border overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-accent" />
                  <CardTitle className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Soft Skills
                  </CardTitle>
                  <span className="text-xs text-muted-foreground/50 ml-1">
                    — click to interact
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-6 py-2">
                  {SOFT_SKILLS.map((skill, i) => (
                    <SoftSkillCard
                      key={skill.label}
                      skill={skill}
                      index={i + 1}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </RippleSection>
  );
}

// ── Project Card ──────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  index,
  accent,
}: {
  project: {
    title: string;
    description: string;
    github: string;
    tags: string[];
    hasDetail?: boolean;
    detailRoute?: string;
  };
  index: number;
  accent: "primary" | "teal" | "amber";
}) {
  const topBorder = {
    primary: "card-top-primary",
    teal: "card-top-teal",
    amber: "card-top-amber",
  };
  const iconBg = {
    primary: "bg-primary/10 text-primary",
    teal: "bg-accent/10 text-accent",
    amber: "bg-yellow-500/10 text-yellow-400",
  };
  const titleHover = {
    primary: "group-hover:text-primary",
    teal: "group-hover:text-accent",
    amber: "group-hover:text-yellow-400",
  };

  return (
    <Card
      data-ocid={`projects.item.${index}`}
      className={`flex flex-col h-full border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 group overflow-hidden ${topBorder[accent]}`}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle
            className={`font-display text-xl transition-colors ${titleHover[accent]}`}
          >
            {project.title}
          </CardTitle>
          <div className={`p-2 rounded-lg shrink-0 ${iconBg[accent]}`}>
            <BarChart3 className="w-5 h-5" />
          </div>
        </div>
        <CardDescription className="text-base leading-relaxed">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-xs border-border text-muted-foreground"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button
          data-ocid="projects.github.button"
          asChild
          className="flex-1"
          variant="outline"
        >
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <Github className="w-4 h-4" />
            View on GitHub
            <ExternalLink className="w-3 h-3 ml-auto" />
          </a>
        </Button>
        {project.hasDetail && project.detailRoute && (
          <Button data-ocid="projects.detail.button" asChild className="flex-1">
            <Link to={project.detailRoute}>
              <Eye className="w-4 h-4 mr-2" />
              View Project
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

// ── Projects ──────────────────────────────────────────────────────────────────
function ProjectsSection() {
  return (
    <RippleSection id="projects" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={fadeUp} className="mb-10">
            <SectionLabel>My Work</SectionLabel>
            <h2
              className="font-display font-bold text-4xl md:text-5xl"
              style={{ color: "#ffffff" }}
            >
              Featured <span className="text-primary">Projects</span>
            </h2>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Tabs defaultValue="excel">
              <TabsList className="mb-8 bg-card border border-border p-1 h-auto gap-1 rounded-xl">
                <TabsTrigger
                  data-ocid="projects.tab"
                  value="excel"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none font-semibold px-5 py-2 rounded-lg transition-all"
                >
                  📊 Excel
                </TabsTrigger>
                <TabsTrigger
                  data-ocid="projects.tab"
                  value="powerbi"
                  className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-none font-semibold px-5 py-2 rounded-lg transition-all"
                >
                  📈 Power BI
                </TabsTrigger>
                <TabsTrigger
                  data-ocid="projects.tab"
                  value="dataprep"
                  className="data-[state=active]:shadow-none font-semibold px-5 py-2 rounded-lg transition-all"
                >
                  🔧 Data Preprocessing
                </TabsTrigger>
              </TabsList>

              <TabsContent value="excel">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid md:grid-cols-2 gap-6"
                >
                  {EXCEL_PROJECTS.map((p, i) => (
                    <ProjectCard
                      key={p.title}
                      project={p}
                      index={i + 1}
                      accent="primary"
                    />
                  ))}
                </motion.div>
              </TabsContent>

              <TabsContent value="powerbi">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid md:grid-cols-2 gap-6"
                >
                  {POWERBI_PROJECTS.map((p, i) => (
                    <ProjectCard
                      key={p.title}
                      project={p}
                      index={i + 1}
                      accent="teal"
                    />
                  ))}
                </motion.div>
              </TabsContent>

              <TabsContent value="dataprep">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid md:grid-cols-2 gap-6"
                >
                  {DATAPREP_PROJECTS.map((p, i) => (
                    <ProjectCard
                      key={p.title}
                      project={p}
                      index={i + 1}
                      accent="amber"
                    />
                  ))}
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </RippleSection>
  );
}

// ── Contact Card ──────────────────────────────────────────────────────────────
function ContactCard({
  href,
  icon: Icon,
  label,
  value,
  description,
  accentColor,
  ocid,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  value: string;
  description: string;
  accentColor: "primary" | "accent";
  ocid: string;
}) {
  const [hovered, setHovered] = useState(false);

  const glowColor =
    accentColor === "primary"
      ? "oklch(0.60 0.22 245 / 0.3)"
      : "oklch(0.68 0.16 195 / 0.3)";

  const borderColor =
    accentColor === "primary"
      ? "oklch(0.60 0.22 245 / 0.6)"
      : "oklch(0.68 0.16 195 / 0.6)";

  const iconBg =
    accentColor === "primary"
      ? "bg-primary/15 text-primary"
      : "bg-accent/15 text-accent";

  return (
    <motion.a
      href={href}
      data-ocid={ocid}
      whileHover={{ scale: 1.03, y: -6 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative flex flex-col items-center text-center p-10 rounded-2xl border bg-card cursor-pointer no-underline block"
      style={{
        borderColor: hovered ? borderColor : "oklch(0.22 0.045 255)",
        boxShadow: hovered
          ? `0 0 40px 8px ${glowColor}, 0 8px 32px 0 oklch(0 0 0 / 0.3)`
          : "0 2px 16px 0 oklch(0 0 0 / 0.15)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          opacity: hovered ? 1 : 0,
          background:
            accentColor === "primary"
              ? "radial-gradient(ellipse at 50% 0%, oklch(0.60 0.22 245 / 0.07) 0%, transparent 70%)"
              : "radial-gradient(ellipse at 50% 0%, oklch(0.68 0.16 195 / 0.07) 0%, transparent 70%)",
        }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        animate={{ scale: hovered ? 1.1 : 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`relative z-10 w-16 h-16 rounded-xl ${iconBg} flex items-center justify-center mb-5`}
        style={{
          boxShadow: hovered
            ? `0 0 24px 6px ${glowColor}`
            : `0 0 12px 2px ${glowColor.replace("0.3", "0.12")}`,
        }}
      >
        <Icon className="w-8 h-8" />
      </motion.div>

      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-2 relative z-10">
        {label}
      </p>

      <motion.p
        animate={{
          color: hovered
            ? accentColor === "primary"
              ? "oklch(0.60 0.22 245)"
              : "oklch(0.68 0.16 195)"
            : "oklch(0.95 0.01 250)",
        }}
        transition={{ duration: 0.25 }}
        className="font-display font-bold text-xl md:text-2xl break-all relative z-10 mb-3"
      >
        {value}
      </motion.p>

      <p className="text-sm text-muted-foreground relative z-10 leading-relaxed max-w-xs">
        {description}
      </p>

      <motion.div
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
        transition={{ duration: 0.2 }}
        className="mt-5 relative z-10"
      >
        <span
          className={`text-xs font-semibold uppercase tracking-widest ${
            accentColor === "primary" ? "text-primary" : "text-accent"
          }`}
        >
          Tap to connect →
        </span>
      </motion.div>
    </motion.a>
  );
}

// ── Contact ────────────────────────────────────────────────────────────────────
function ContactSection() {
  return (
    <RippleSection
      id="contact"
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: "oklch(0.10 0.028 257)" } as React.CSSProperties}
    >
      <div
        className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[150px] opacity-[0.06] pointer-events-none"
        style={{ background: "oklch(0.60 0.22 245)" }}
      />
      <div
        className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full blur-[120px] opacity-[0.05] pointer-events-none"
        style={{ background: "oklch(0.68 0.16 195)" }}
      />
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

      <div className="relative max-w-3xl mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.div variants={fadeUp} className="mb-4 text-center">
            <SectionLabel>Get In Touch</SectionLabel>
            <h2
              className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-5"
              style={{ color: "#ffffff" }}
            >
              Let&apos;s <span className="text-primary">Connect</span>
            </h2>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="text-muted-foreground text-lg leading-relaxed text-center max-w-xl mx-auto mb-14"
          >
            I&apos;m always open to new opportunities, collaborations, and
            interesting data projects. Feel free to reach out — I&apos;d love to
            hear from you!
          </motion.p>

          <motion.div
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <motion.div variants={fadeUp}>
              <ContactCard
                href="mailto:tusharvala707@gmail.com"
                icon={Mail}
                label="Email"
                value="tusharvala707@gmail.com"
                description="Drop me a message anytime. I usually respond within 24 hours."
                accentColor="primary"
                ocid="contact.email.button"
              />
            </motion.div>

            <motion.div variants={fadeUp}>
              <ContactCard
                href="tel:+918320808750"
                icon={Phone}
                label="Phone"
                value="+91 83208 08750"
                description="Available for calls on weekdays. Leave a message if I miss you."
                accentColor="accent"
                ocid="contact.phone.button"
              />
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-16 flex items-center justify-center gap-4"
          >
            <div className="h-px flex-1 max-w-28 bg-gradient-to-r from-transparent to-border" />
            <p className="text-xs text-muted-foreground/60 tracking-[0.18em] uppercase">
              Open to opportunities
            </p>
            <div className="h-px flex-1 max-w-28 bg-gradient-to-l from-transparent to-border" />
          </motion.div>
        </motion.div>
      </div>
    </RippleSection>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border py-6 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
        <p>
          © {year}{" "}
          <span className="text-foreground font-semibold">Tushar Vala</span>.
          All rights reserved.
        </p>
        <p>
          Built with ❤️ using{" "}
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

// ── App ────────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
      <Toaster position="bottom-right" />
    </>
  );
}
