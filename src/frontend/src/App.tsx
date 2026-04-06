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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Filter,
  Github,
  GraduationCap,
  Lightbulb,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Phone,
  ShoppingCart,
  Star,
  Target,
  TrendingUp,
  Users,
  Wrench,
  X,
  Zap,
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
  },
];

const POWERBI_PROJECTS = [
  {
    title: "Bright Future School Analysis",
    description:
      "Power BI dashboard analyzing school performance data including student results, attendance trends, subject-wise scores, and institutional KPIs to support data-driven education management.",
    github: "https://github.com/tushar123851/Bright_future_school_analysis",
    tags: ["Power BI", "Education Analytics", "DAX", "KPI"],
  },
  {
    title: "Velora Retails Analysis",
    description:
      "Power BI retail analytics dashboard providing insights into sales performance, product trends, customer behavior, and revenue metrics to drive smarter business decisions.",
    github: "https://github.com/tushar123851/velora_retails_analys",
    tags: ["Power BI", "Retail Analytics", "DAX", "Sales"],
  },
  {
    title: "Car Sales Dashboard",
    description:
      "Interactive Power BI dashboard tracking car sales metrics across models, dealerships, and regions. Features revenue analysis, YoY comparisons, and performance KPIs with drill-through capabilities.",
    github: "https://github.com/tushar123851/powerbicardashboard",
    tags: ["Power BI", "DAX", "Sales Analytics", "KPI"],
    hasDetail: true,
    isCarSales: true,
  },
  {
    title: "AdventureWorks Sales Dashboard",
    description:
      "Power BI dashboard built on the AdventureWorks dataset, visualizing sales performance, product trends, regional breakdowns, and executive KPIs with interactive drill-through capabilities.",
    github: "https://github.com/tushar123851/AdventureWorks_Sales_Dashboard-",
    tags: ["Power BI", "DAX", "AdventureWorks", "Sales Analytics"],
    hasDetail: true,
    isAdventureWorks: true,
  },
  {
    title: "Zomato Sales Analysis",
    description:
      "Power BI report analyzing Zomato restaurant sales data with insights into cuisine performance, city-wise trends, order patterns, and revenue metrics through interactive visualizations.",
    github: "https://github.com/tushar123851/Zomato_sales_analysis",
    tags: ["Power BI", "DAX", "Food Analytics", "Trends"],
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

          {/* Technical skill cards with left-accent borders */}
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

// ── Sales Report Detail Modal ─────────────────────────────────────────────────
function SalesReportModal({
  open,
  onClose,
}: { open: boolean; onClose: () => void }) {
  const kpis = [
    {
      label: "Total Revenue",
      value: "₹2,29,192.47",
      icon: TrendingUp,
      color: "text-primary",
    },
    {
      label: "Total Transactions",
      value: "250",
      icon: ShoppingCart,
      color: "text-accent",
    },
    {
      label: "Total Customers",
      value: "50",
      icon: Users,
      color: "text-yellow-400",
    },
    {
      label: "Top Customer",
      value: "Mark Carter",
      icon: Star,
      color: "text-pink-400",
    },
  ];

  const components = [
    {
      num: "01",
      title: "Top 5 Customers by Revenue",
      icon: Star,
      desc: "Displays highest revenue-generating customers. Mark Carter is the top contributor. Helps identify high-value customers for targeting.",
      insight: "Focus on retention strategies for top customers.",
    },
    {
      num: "02",
      title: "Product Quantity Analysis",
      icon: BarChart3,
      desc: "Shows quantity sold per product. High-demand products: BookShelf, Smartphone, Keyboard.",
      insight: "Optimize inventory for fast-moving products.",
    },
    {
      num: "03",
      title: "Customer Distribution by Region",
      icon: MapPin,
      desc: "Pie chart covering: North (59), Central (54), East (48), West (47), South (42).",
      insight: "North region has the highest customer base.",
    },
    {
      num: "04",
      title: "Sales by Product",
      icon: TrendingUp,
      desc: "Top performing: Laptop (~₹67K), Smartphone (~₹67K), Desk (~₹23K).",
      insight: "Electronics category drives major revenue.",
    },
    {
      num: "05",
      title: "Monthly Sales Trend",
      icon: Target,
      desc: "Tracks sales over 2024–2025. Peak months: Jan 2025 (~₹25K), Dec 2024 (~₹23K).",
      insight: "Seasonal trends can guide marketing campaigns.",
    },
  ];

  const features = [
    "Interactive Dashboard",
    "Clean & Professional UI (Blue Theme)",
    "Drill-down Analysis",
    "Real-time Filtering",
    "Business-focused Insights",
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 gap-0 border-border bg-card">
        {/* Hero Banner */}
        <div
          className="relative overflow-hidden rounded-t-xl"
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

          {/* Dashboard Screenshot */}
          <div className="relative px-6 pt-6 pb-0">
            <img
              src="/assets/sales.png-019d5bed-b30f-719c-b0c3-2804ecb5ec30.png"
              alt="Sales Report Dashboard Screenshot"
              className="w-full rounded-t-xl object-cover shadow-2xl border border-border/40"
              style={{
                maxHeight: "280px",
                objectFit: "cover",
                objectPosition: "top",
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        </div>

        <div className="p-6 space-y-8">
          <DialogHeader>
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary mt-0.5">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <DialogTitle className="font-display text-2xl font-bold text-foreground">
                  Sales Report Dashboard
                </DialogTitle>
                <p className="text-muted-foreground mt-1 text-sm">
                  Interactive Excel data visualization project — business
                  performance analysis
                </p>
              </div>
            </div>
          </DialogHeader>

          {/* Project Overview */}
          <div
            className="rounded-xl border border-border/60 p-5 space-y-3"
            style={{ background: "oklch(0.12 0.03 255)" }}
          >
            <h3 className="font-semibold text-foreground flex items-center gap-2 text-base">
              🧾 Project Overview
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The Sales Report Dashboard is an interactive data visualization
              project designed to analyze and monitor business performance
              across multiple dimensions such as revenue, customers, products,
              and regions.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              This dashboard helps stakeholders make data-driven decisions by
              providing a clear and dynamic view of sales trends and customer
              behavior.
            </p>
          </div>

          {/* Objectives */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2 text-base">
              <Target className="w-4 h-4 text-primary" /> Objectives
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                "Track overall business performance 📈",
                "Identify top customers and products 🏆",
                "Analyze sales trends over time 📅",
                "Understand regional customer distribution 🌍",
                "Enable interactive filtering for deeper insights 🔍",
              ].map((obj) => (
                <li
                  key={obj}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                  {obj}
                </li>
              ))}
            </ul>
          </div>

          {/* KPI Cards */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2 text-base">
              📌 Key Metrics (KPIs)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {kpis.map((kpi) => (
                <div
                  key={kpi.label}
                  className="rounded-xl border border-border/60 p-4 text-center space-y-1"
                  style={{ background: "oklch(0.12 0.03 255)" }}
                >
                  <kpi.icon className={`w-5 h-5 mx-auto mb-2 ${kpi.color}`} />
                  <p className={`font-bold text-lg font-display ${kpi.color}`}>
                    {kpi.value}
                  </p>
                  <p className="text-xs text-muted-foreground leading-tight">
                    {kpi.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard Components */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2 text-base">
              📊 Dashboard Components & Insights
            </h3>
            <div className="space-y-3">
              {components.map((comp) => (
                <div
                  key={comp.num}
                  className="rounded-xl border border-border/60 p-4"
                  style={{ background: "oklch(0.12 0.03 255)" }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md shrink-0 mt-0.5">
                      {comp.num}
                    </span>
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <comp.icon className="w-4 h-4 text-primary shrink-0" />
                        <p className="font-semibold text-foreground text-sm">
                          {comp.title}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {comp.desc}
                      </p>
                      <div
                        className="flex items-start gap-1.5 mt-2 p-2.5 rounded-lg"
                        style={{ background: "oklch(0.16 0.04 245)" }}
                      >
                        <Zap className="w-3.5 h-3.5 text-yellow-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-yellow-300/90">
                          <span className="font-semibold">
                            Business Insight:
                          </span>{" "}
                          {comp.insight}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div
            className="rounded-xl border border-border/60 p-5 space-y-3"
            style={{ background: "oklch(0.12 0.03 255)" }}
          >
            <h3 className="font-semibold text-foreground flex items-center gap-2 text-base">
              <Filter className="w-4 h-4 text-accent" /> Interactive Filters
            </h3>
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

          {/* Tools & Technologies */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2 text-base">
              🛠 Tools & Technologies
            </h3>
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

          {/* Key Features */}
          <div
            className="rounded-xl border border-primary/20 p-5 space-y-3"
            style={{ background: "oklch(0.12 0.05 245)" }}
          >
            <h3 className="font-semibold text-foreground flex items-center gap-2 text-base">
              🚀 Key Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {features.map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <span className="w-4 h-4 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                    ✓
                  </span>
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Conclusion */}
          <div
            className="rounded-xl border border-border/60 p-5 space-y-2"
            style={{ background: "oklch(0.12 0.03 255)" }}
          >
            <h3 className="font-semibold text-foreground flex items-center gap-2 text-base">
              🧠 Conclusion
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This dashboard provides a comprehensive view of sales performance,
              enabling businesses to improve customer targeting, optimize
              product strategy, identify sales trends, and make informed
              decisions.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button asChild className="flex-1">
              <a
                href="https://github.com/tushar123851/finalprojectexcal"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                View on GitHub
                <ExternalLink className="w-3 h-3 ml-auto" />
              </a>
            </Button>
            <Button variant="outline" onClick={onClose} className="px-6">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── Car Sales Dashboard Detail Modal ─────────────────────────────────────────
function CarSalesDashboardModal({
  open,
  onClose,
}: { open: boolean; onClose: () => void }) {
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

  const [activeIdx, setActiveIdx] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const IMAGE_COUNT = 4;
  useEffect(() => {
    if (!open) return;
    if (autoPlay) {
      timerRef.current = setInterval(() => {
        setActiveIdx((prev) => (prev + 1) % IMAGE_COUNT);
      }, 3000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, autoPlay]);

  const goTo = (idx: number) => {
    setAutoPlay(false);
    setActiveIdx(idx);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 gap-0 border-border bg-card">
        {/* Header Banner */}
        <div
          className="relative overflow-hidden rounded-t-xl"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.13 0.035 255) 0%, oklch(0.18 0.045 245) 100%)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 30% 50%, oklch(0.60 0.22 245 / 0.18) 0%, transparent 60%)",
            }}
          />

          {/* Animated Image Carousel */}
          <div className="relative px-6 pt-6 pb-4">
            <div
              className="relative rounded-xl overflow-hidden border border-border/40 shadow-2xl"
              style={{ height: "280px" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, scale: 1.04, rotateY: 8 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.96, rotateY: -8 }}
                  transition={{ duration: 0.55, ease: "easeInOut" }}
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
                  />
                  {/* Overlay label */}
                  <div
                    className="absolute bottom-0 left-0 right-0 px-4 py-3"
                    style={{
                      background:
                        "linear-gradient(transparent, oklch(0.08 0.02 255 / 0.92))",
                    }}
                  >
                    <p className="text-xs font-semibold text-primary uppercase tracking-widest">
                      {images[activeIdx].label}
                    </p>
                    <p className="text-xs text-muted-foreground leading-snug mt-0.5">
                      {images[activeIdx].desc}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Auto-rotate badge */}
              {autoPlay && (
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs font-medium backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping inline-block" />
                  Auto
                </div>
              )}
            </div>

            {/* Thumbnail nav */}
            <div className="flex gap-2 mt-3 justify-center">
              {images.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => goTo(i)}
                  className={`relative rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    activeIdx === i
                      ? "border-primary scale-105 shadow-lg shadow-primary/30"
                      : "border-border/40 opacity-60 hover:opacity-90 hover:border-border"
                  }`}
                  style={{ width: 72, height: 48 }}
                  aria-label={img.label}
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
                    <div className="absolute inset-0 bg-primary/10 rounded-lg" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 space-y-7">
          <DialogHeader>
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary mt-0.5">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <DialogTitle className="font-display text-2xl font-bold text-foreground">
                  🚗 Car Sales Analysis Dashboard
                </DialogTitle>
                <p className="text-muted-foreground mt-1 text-sm">
                  Interactive Power BI dashboard — sales performance, customer
                  behavior & regional trends
                </p>
              </div>
            </div>
          </DialogHeader>

          {/* Project Overview */}
          <div
            className="rounded-xl border border-border/60 p-5 space-y-3"
            style={{ background: "oklch(0.12 0.03 255)" }}
          >
            <h3 className="font-semibold text-foreground flex items-center gap-2 text-base">
              📌 Project Overview
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
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

          {/* KPI Cards */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2 text-base">
              📌 Key Business KPIs
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                {
                  label: "Total Sales",
                  value: "₹129M",
                  icon: TrendingUp,
                  color: "text-primary",
                },
                {
                  label: "Cars Sold",
                  value: "216",
                  icon: ShoppingCart,
                  color: "text-accent",
                },
                {
                  label: "Top Cities",
                  value: "5 Cities",
                  icon: MapPin,
                  color: "text-yellow-400",
                },
                {
                  label: "Fuel Types",
                  value: "4 Types",
                  icon: Zap,
                  color: "text-pink-400",
                },
              ].map((kpi) => (
                <div
                  key={kpi.label}
                  className="rounded-xl border border-border/60 p-4 text-center space-y-1"
                  style={{ background: "oklch(0.12 0.03 255)" }}
                >
                  <kpi.icon className={`w-5 h-5 mx-auto mb-2 ${kpi.color}`} />
                  <p className={`font-bold text-lg font-display ${kpi.color}`}>
                    {kpi.value}
                  </p>
                  <p className="text-xs text-muted-foreground leading-tight">
                    {kpi.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard Tabs Overview */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2 text-base">
              📊 Dashboard Views
            </h3>
            <div className="space-y-3">
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
                  className="rounded-xl border border-border/60 p-4"
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
          </div>

          {/* Dashboard Insights */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2 text-base">
              📈 Dashboard Insights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                  className="rounded-xl border border-border/60 p-3 flex items-start gap-3"
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
          </div>

          {/* Tools */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2 text-base">
              🛠 Tools & Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Power BI",
                "DAX",
                "Power Query",
                "Data Modeling",
                "Data Cleaning",
                "Data Visualization",
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

          {/* Business Value */}
          <div
            className="rounded-xl border border-primary/20 p-5 space-y-3"
            style={{ background: "oklch(0.12 0.05 245)" }}
          >
            <h3 className="font-semibold text-foreground flex items-center gap-2 text-base">
              🎯 Business Value
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                  <span className="w-4 h-4 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                    ✓
                  </span>
                  {v}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button asChild className="flex-1">
              <a
                href="https://github.com/tushar123851/powerbicardashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                View on GitHub
                <ExternalLink className="w-3 h-3 ml-auto" />
              </a>
            </Button>
            <Button variant="outline" onClick={onClose} className="px-6">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── AdventureWorks Sales Dashboard Detail Modal ──────────────────────────────
function AdventureWorksDashboardModal({
  open,
  onClose,
}: { open: boolean; onClose: () => void }) {
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

  const [activeIdx, setActiveIdx] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const IMAGE_COUNT = 4;
  useEffect(() => {
    if (!open) return;
    if (autoPlay) {
      timerRef.current = setInterval(() => {
        setActiveIdx((prev) => (prev + 1) % IMAGE_COUNT);
      }, 3000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, autoPlay]);

  const goTo = (idx: number) => {
    setAutoPlay(false);
    setActiveIdx(idx);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 gap-0 border-border bg-card">
        {/* Header Banner */}
        <div
          className="relative overflow-hidden rounded-t-xl"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.13 0.035 255) 0%, oklch(0.18 0.045 245) 100%)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 30% 50%, oklch(0.60 0.22 245 / 0.18) 0%, transparent 60%)",
            }}
          />

          {/* Animated Image Carousel */}
          <div className="relative px-6 pt-6 pb-4">
            <div
              className="relative rounded-xl overflow-hidden border border-border/40 shadow-2xl"
              style={{ height: "280px" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, scale: 1.04, rotateY: 8 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.96, rotateY: -8 }}
                  transition={{ duration: 0.55, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <img
                    src={images[activeIdx].src}
                    alt={images[activeIdx].label}
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Overlay label */}
                  <div
                    className="absolute bottom-0 left-0 right-0 px-4 py-3"
                    style={{
                      background:
                        "linear-gradient(transparent, oklch(0.08 0.02 255 / 0.92))",
                    }}
                  >
                    <p className="text-xs font-semibold text-primary uppercase tracking-widest">
                      {images[activeIdx].label}
                    </p>
                    <p className="text-xs text-muted-foreground leading-snug mt-0.5">
                      {images[activeIdx].desc}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Auto-rotate badge */}
              {autoPlay && (
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs font-medium backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping inline-block" />
                  Auto
                </div>
              )}
            </div>

            {/* Thumbnail nav */}
            <div className="flex gap-2 mt-3 justify-center">
              {images.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => goTo(i)}
                  className={`relative rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    activeIdx === i
                      ? "border-primary scale-105 shadow-lg shadow-primary/30"
                      : "border-border/40 opacity-60 hover:opacity-90 hover:border-border"
                  }`}
                  style={{ width: 72, height: 48 }}
                  aria-label={img.label}
                >
                  <img
                    src={img.src}
                    alt={img.label}
                    className="w-full h-full object-cover object-top"
                  />
                  {activeIdx === i && (
                    <div className="absolute inset-0 bg-primary/10 rounded-lg" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 space-y-7">
          <DialogHeader>
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary mt-0.5">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <DialogTitle className="font-display text-2xl font-bold text-foreground">
                  🏢 AdventureWorks Sales Analytics Dashboard
                </DialogTitle>
                <p className="text-muted-foreground mt-1 text-sm">
                  Interactive Power BI dashboard — revenue performance, orders &
                  profit trends, global sales & customer segmentation
                </p>
              </div>
            </div>
          </DialogHeader>

          {/* Project Overview */}
          <div
            className="rounded-xl border border-border/60 p-5 space-y-3"
            style={{ background: "oklch(0.12 0.03 255)" }}
          >
            <h3 className="font-semibold text-foreground flex items-center gap-2 text-base">
              📌 Project Overview
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
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

          {/* KPI Cards */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2 text-base">
              📌 Key Business KPIs
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                {
                  label: "Revenue",
                  value: "$9.71M",
                  icon: TrendingUp,
                  color: "text-primary",
                },
                {
                  label: "Profit",
                  value: "$4.12M",
                  icon: BarChart3,
                  color: "text-accent",
                },
                {
                  label: "Orders",
                  value: "12K",
                  icon: ShoppingCart,
                  color: "text-yellow-400",
                },
                {
                  label: "Return Rate",
                  value: "2.14%",
                  icon: Target,
                  color: "text-pink-400",
                },
              ].map((kpi) => (
                <div
                  key={kpi.label}
                  className="rounded-xl border border-border/60 p-4 text-center space-y-1"
                  style={{ background: "oklch(0.12 0.03 255)" }}
                >
                  <kpi.icon className={`w-5 h-5 mx-auto mb-2 ${kpi.color}`} />
                  <p className={`font-bold text-lg font-display ${kpi.color}`}>
                    {kpi.value}
                  </p>
                  <p className="text-xs text-muted-foreground leading-tight">
                    {kpi.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard Sections */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2 text-base">
              📊 Dashboard Sections
            </h3>
            <div className="space-y-3">
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
                  className="rounded-xl border border-border/60 p-4"
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
          </div>

          {/* Objectives */}
          <div
            className="rounded-xl border border-border/60 p-5 space-y-3"
            style={{ background: "oklch(0.12 0.03 255)" }}
          >
            <h3 className="font-semibold text-foreground flex items-center gap-2 text-base">
              🎯 Objectives
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                "Analyze revenue and profit trends",
                "Identify top-performing products",
                "Understand customer segmentation",
                "Track global sales performance",
                "Provide actionable business insights",
              ].map((obj) => (
                <div
                  key={obj}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <span className="w-4 h-4 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                    ✓
                  </span>
                  {obj}
                </div>
              ))}
            </div>
          </div>

          {/* Key Insights */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2 text-base">
              📈 Key Insights
            </h3>
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
                  className="rounded-xl border border-border/60 p-3 flex items-center gap-3"
                  style={{ background: "oklch(0.12 0.03 255)" }}
                >
                  <span className="text-lg shrink-0">{ins.icon}</span>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {ins.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Charts Used */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2 text-base">
              📊 Charts Used
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                  <p className="text-sm text-foreground font-medium">
                    {c.chart}
                  </p>
                  <span className="text-muted-foreground text-xs">
                    → {c.purpose}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2 text-base">
              🛠 Tools & Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Power BI",
                "DAX",
                "Python",
                "Pandas",
                "Data Modeling",
                "Data Visualization",
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

          {/* Business Value */}
          <div
            className="rounded-xl border border-primary/20 p-5 space-y-3"
            style={{ background: "oklch(0.12 0.05 245)" }}
          >
            <h3 className="font-semibold text-foreground flex items-center gap-2 text-base">
              💼 Business Value
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                  <span className="w-4 h-4 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                    ✓
                  </span>
                  {v}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button asChild className="flex-1">
              <a
                href="https://github.com/tushar123851/AdventureWorks_Sales_Dashboard-"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                View on GitHub
                <ExternalLink className="w-3 h-3 ml-auto" />
              </a>
            </Button>
            <Button variant="outline" onClick={onClose} className="px-6">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
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
    isCarSales?: boolean;
    isAdventureWorks?: boolean;
  };
  index: number;
  accent: "primary" | "teal" | "amber";
}) {
  const [modalOpen, setModalOpen] = useState(false);

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
    <>
      {project.hasDetail &&
        !project.isCarSales &&
        !project.isAdventureWorks && (
          <SalesReportModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
          />
        )}
      {project.isCarSales && (
        <CarSalesDashboardModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
      {project.isAdventureWorks && (
        <AdventureWorksDashboardModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
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
          {project.hasDetail && (
            <Button
              data-ocid="projects.detail.button"
              className="flex-1"
              onClick={() => setModalOpen(true)}
            >
              <Eye className="w-4 h-4 mr-2" />
              View Project
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
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
                  style={{}}
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
