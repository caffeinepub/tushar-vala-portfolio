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
import {
  BarChart3,
  Brain,
  ChevronDown,
  Clock,
  Code2,
  Database,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Lightbulb,
  Mail,
  Menu,
  MessageSquare,
  Phone,
  Users,
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
    skills: ["Microsoft Excel (Advanced)", "Power BI", "Tableau"],
  },
  {
    category: "Programming & Query Languages",
    icon: <Code2 className="w-4 h-4" />,
    skills: ["Python", "NumPy", "Pandas", "Matplotlib", "SQL"],
  },
  {
    category: "Web & Core Programming",
    icon: <Code2 className="w-4 h-4" />,
    skills: ["C", "C++", "HTML", "CSS", "JavaScript"],
  },
  {
    category: "Database Skills",
    icon: <Database className="w-4 h-4" />,
    skills: ["MySQL", "Database Design", "ER Diagrams"],
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
  },
];

const SOFT_SKILLS = [
  { label: "Critical Thinking", icon: Brain },
  { label: "Problem-Solving", icon: Lightbulb },
  { label: "Time Management", icon: Clock },
  { label: "Strong Communication", icon: MessageSquare },
  { label: "Team Collaboration", icon: Users },
];

const EXCEL_PROJECTS = [
  {
    title: "Sales Report Dashboard",
    description:
      "A comprehensive Excel dashboard analyzing sales data with dynamic charts, KPIs, pivot tables, and automated reporting. Provides actionable insights into revenue trends and performance metrics.",
    github: "https://github.com/tushar123851/finalprojectexcal",
    tags: ["Excel", "Pivot Tables", "Charts", "KPI"],
  },
  {
    title: "Zomato Sales Dashboard",
    description:
      "An in-depth Excel dashboard analyzing Zomato restaurant sales trends, cuisine performance, city-wise insights, and customer ordering patterns with interactive filters.",
    github: "https://github.com/tushar123851/Main-project-",
    tags: ["Excel", "Data Analysis", "Visualization", "Trends"],
  },
];

const POWERBI_PROJECTS = [
  {
    title: "Car Sales Dashboard",
    description:
      "Interactive Power BI dashboard tracking car sales metrics across models, dealerships, and regions. Features revenue analysis, YoY comparisons, and performance KPIs with drill-through capabilities.",
    github: "https://github.com/tushar123851/powerbicardashboard",
    tags: ["Power BI", "DAX", "Sales Analytics", "KPI"],
  },
  {
    title: "Customer Dashboard",
    description:
      "Power BI dashboard delivering deep customer analytics and segmentation insights. Visualizes demographics, purchase behavior, retention rates, and customer lifetime value.",
    github: "https://github.com/tushar123851/powerbicuatomerdashboard",
    tags: ["Power BI", "DAX", "Segmentation", "Analytics"],
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
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const { ripples, trigger } = useRipple();

  const handleClick = (e: React.MouseEvent) => {
    trigger(e.clientX, e.clientY);
  };

  return (
    <section
      id={id}
      className={className}
      onClick={handleClick}
      onKeyUp={() => {}}
    >
      <RippleLayer ripples={ripples} />
      {children}
    </section>
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
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-display font-bold text-xl text-primary"
        >
          TV
          <span className="text-foreground">.</span>
        </motion.div>

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
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted/50 active:bg-primary/20"
              >
                {link.label}
              </motion.button>
            </li>
          ))}
        </motion.ul>

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
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="mailto:tusharvala707@gmail.com"
            data-ocid="nav.link"
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href="tel:+918320808750"
            data-ocid="nav.link"
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
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
                    className="w-full text-left px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors active:bg-primary/20"
                  >
                    {link.label}
                  </motion.button>
                </li>
              ))}
            </ul>
            <div className="px-6 pb-4 flex items-center gap-3">
              <a
                href="https://github.com/tushar123851"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:tusharvala707@gmail.com"
                className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="tel:+918320808750"
                className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
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

// ── Hero ─────────────────────────────────────────────────────────────────────
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

      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/uploads/image-1.png')" }}
      />
      <div className="absolute inset-0 bg-background/70" />
      <div className="absolute inset-0 grid-bg opacity-40" />

      <div
        className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-15"
        style={{ background: "oklch(0.62 0.2 240)" }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full blur-[100px] opacity-10"
        style={{ background: "oklch(0.72 0.18 200)" }}
      />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-accent text-sm font-semibold tracking-[0.25em] uppercase mb-4">
            Welcome to my portfolio
          </p>
          <p className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl text-primary mb-3 tracking-tight">
            Data Analyst
          </p>
          <h1
            className="font-display font-bold text-4xl md:text-6xl lg:text-7xl mb-6"
            style={{ color: "#ffffff" }}
          >
            Tushar <span style={{ color: "#ffffff" }}>Vala</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium mb-10">
            Python <span className="text-border mx-2">·</span> Power BI{" "}
            <span className="text-border mx-2">·</span> Excel
          </p>
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
              data-ocid="hero.resume_button"
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <RippleSection id="about" className="py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={fadeUp} className="mb-8">
            <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">
              About Me
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-6">
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

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div variants={fadeUp}>
              <Card className="h-full border-border hover:border-primary/40 transition-colors glow-sm group">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
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
                  <div className="flex items-center gap-2">
                    <Badge className="bg-primary/15 text-primary hover:bg-primary/25 border-0">
                      Average: 85.13%
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Card className="h-full border-border hover:border-accent/40 transition-colors group">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-accent/10 text-accent group-hover:bg-accent/20 transition-colors">
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
                  <div className="flex items-center gap-2">
                    <Badge className="bg-accent/15 text-accent hover:bg-accent/25 border-0">
                      Score: 93.71%
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
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
                    "0 0 0px oklch(0.62 0.2 240 / 0)",
                    "0 0 32px 8px oklch(0.62 0.2 240 / 0.7)",
                    "0 0 16px 4px oklch(0.62 0.2 240 / 0.3)",
                  ],
                }
              : { scale: 1 }
          }
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative z-10 w-16 h-16 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/25 hover:border-primary/60 transition-colors"
          style={{
            boxShadow: active
              ? "0 0 24px 6px oklch(0.62 0.2 240 / 0.45)"
              : "0 0 12px 2px oklch(0.62 0.2 240 / 0.15)",
          }}
        >
          <Icon className="w-7 h-7" />
        </motion.div>
      </div>

      <motion.span
        animate={
          active
            ? { color: "oklch(0.62 0.2 240)", fontWeight: 700 }
            : { color: "oklch(0.6 0.04 250)" }
        }
        transition={{ duration: 0.3 }}
        className="text-sm font-medium text-center leading-tight"
      >
        {skill.label}
      </motion.span>
    </motion.div>
  );
}

// ── Skills ────────────────────────────────────────────────────────────────────
function SkillsSection() {
  return (
    <RippleSection id="skills" className="py-12 px-6 bg-muted/20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={fadeUp} className="mb-8">
            <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">
              What I Know
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl">
              Technical <span className="text-primary">Skills</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {TECHNICAL_SKILLS.map((group) => (
              <motion.div key={group.category} variants={fadeUp}>
                <Card className="h-full border-border hover:border-primary/30 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 text-primary">
                      {group.icon}
                      <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        {group.category}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="text-xs font-medium hover:bg-primary/20 hover:text-primary transition-colors cursor-default"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp}>
            <Card className="border-border overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-accent" />
                  <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Soft Skills
                  </CardTitle>
                  <span className="text-xs text-muted-foreground/60 ml-1">
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
}: {
  project: (typeof EXCEL_PROJECTS)[0];
  index: number;
}) {
  return (
    <Card
      data-ocid={`projects.item.${index}`}
      className="flex flex-col h-full border-border hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 group"
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="font-display text-xl group-hover:text-primary transition-colors">
            {project.title}
          </CardTitle>
          <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
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
      <CardFooter>
        <Button
          data-ocid="projects.github.button"
          asChild
          className="w-full"
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
      </CardFooter>
    </Card>
  );
}

// ── Projects ──────────────────────────────────────────────────────────────────
function ProjectsSection() {
  return (
    <RippleSection id="projects" className="py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={fadeUp} className="mb-8">
            <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">
              My Work
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl">
              Featured <span className="text-primary">Projects</span>
            </h2>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Tabs defaultValue="excel">
              <TabsList className="mb-8 bg-muted/50 border border-border p-1 h-auto flex-wrap">
                <TabsTrigger
                  data-ocid="projects.tab"
                  value="excel"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold px-6 py-2"
                >
                  📊 Excel Projects
                </TabsTrigger>
                <TabsTrigger
                  data-ocid="projects.tab"
                  value="powerbi"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold px-6 py-2"
                >
                  📈 Power BI Projects
                </TabsTrigger>
                <TabsTrigger
                  data-ocid="projects.tab"
                  value="dataprep"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold px-6 py-2"
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
                    <ProjectCard key={p.title} project={p} index={i + 1} />
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
                    <ProjectCard key={p.title} project={p} index={i + 1} />
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
                    <ProjectCard key={p.title} project={p} index={i + 1} />
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

// ── Contact ───────────────────────────────────────────────────────────────────
function ContactSection() {
  return (
    <RippleSection id="contact" className="py-12 px-6 bg-muted/20">
      <div className="max-w-3xl mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={fadeUp} className="mb-8">
            <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">
              Get In Touch
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl">
              Contact <span className="text-primary">Me</span>
            </h2>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-8">
            <p className="text-muted-foreground text-lg leading-relaxed">
              I&apos;m always open to new opportunities, collaborations, and
              interesting data projects. Feel free to reach out!
            </p>

            <div className="space-y-4">
              <a
                href="mailto:tusharvala707@gmail.com"
                className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-muted/30 transition-all group"
              >
                <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                    Email
                  </p>
                  <p className="font-medium">tusharvala707@gmail.com</p>
                </div>
              </a>

              <a
                href="tel:+918320808750"
                className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-muted/30 transition-all group"
              >
                <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                    Phone
                  </p>
                  <p className="font-medium">+91 8320808750</p>
                </div>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </RippleSection>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>
          © {year} <span className="text-white font-semibold">Tushar Vala</span>
          . All rights reserved.
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

// ── App ───────────────────────────────────────────────────────────────────────
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
