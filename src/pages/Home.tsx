import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  Github, Linkedin, Mail, Phone, ExternalLink, Download, 
  ArrowRight, Code2, MapPin, ChevronRight, Terminal, 
  BrainCircuit, Database, Award, BookOpen, GraduationCap,
  Briefcase, ShieldCheck, Star, ZoomIn, X
} from 'lucide-react';

// --- DATA ---
const projects = [
  {
    title: "BFPME AI Credit Agent",
    repo: "aribi-ahmed/BFPME-AI",
    link: "https://github.com/aribi-ahmed/BFPME-AI",
    description: "Production-ready AI platform for the Tunisian national SME bank (BFPME). Automates credit risk analysis of French-language business plans. Built in 3 days.",
    bullets: [
      "Dual-engine: OpenAI GPT-4o for live extraction + fully offline deterministic fallback (never crashes)",
      "Extracts 17 structured financial KPIs from unstructured PDFs (TRI, VAN, payback, EBE)",
      "Interactive Streamlit dashboard: 4 Plotly charts, AI chatbot, risk scoring badge",
      "Designed for real credit officers at BFPME regional offices · Deployed on Streamlit Cloud"
    ],
    tech: ["Python", "Streamlit", "OpenAI GPT-4o", "Plotly", "pypdf", "Pandas"],
    icon: <Database className="w-6 h-6" />,
    screenshot: "/media/bfpme_dashboard.png",
    screenshotAlt: "BFPME AI dashboard showing financial analysis charts"
  },
  {
    title: "DocuAgent",
    repo: "aribi-ahmed/DocuAgent-v1.1",
    link: "https://github.com/aribi-ahmed/DocuAgent-v1.1",
    description: "AI agent that turns closed Jira Service Management tickets into clean, grounded Confluence FAQ articles. Eliminates knowledge loss from resolved tickets.",
    bullets: [
      "Google Gemini with Pydantic-typed structured outputs for reproducible extraction",
      "Deterministic grounding evaluator: verifies every cited claim against source, computes auditable confidence score — catches LLM hallucinations without a second model call",
      "Latency dashboard with matplotlib evaluation charts"
    ],
    tech: ["Python", "Google GenAI", "Pydantic", "Matplotlib"],
    icon: <BrainCircuit className="w-6 h-6" />,
    screenshot: "/media/docuagent_dashboard.png",
    screenshotAlt: "DocuAgent dashboard showing a generated FAQ article with 100% grounding score"
  },
  {
    title: "Project SENTINEL",
    repo: "July 2026 – In Progress",
    link: "#",
    description: "Enterprise Multi-Agent AI Platform for Autonomous Risk Analysis and Decision Support.",
    bullets: [
      "Multi-LLM gateway with agent orchestration via LangChain",
      "Retrieval-Augmented Generation (RAG) pipeline for context-aware risk analysis",
      "REST API backend with PostgreSQL for structured decision data",
      "Designed for autonomous, auditable decision support workflows"
    ],
    tech: ["LangChain", "AI Agent Orchestration", "Multi LLM Gateway", "RAG", "REST API", "PostgreSQL"],
    icon: <ShieldCheck className="w-6 h-6" />,
    screenshot: null,
    screenshotAlt: ""
  },
  {
    title: "MarketForge",
    repo: "aribi-ahmed/Marketforge-ABM",
    link: "https://github.com/aribi-ahmed/Marketforge-ABM",
    description: "Agent-based stock market simulation modeling emergent wealth inequality from 4 trader archetypes on a Barabási–Albert social network.",
    bullets: [
      "Engineered OOP agent/simulation classes",
      "Analyzed Big-O complexity of the decision loop"
    ],
    tech: ["Python", "NetworkX", "Pandas", "Plotly"],
    icon: <Terminal className="w-6 h-6" />,
    screenshot: null,
    screenshotAlt: ""
  }
];

const education = [
  {
    school: "INSAT",
    degree: "Pre-Engineering cycle, Software Engineering (GL2)",
    details: "Completed MPI (Math-Physics-CS) preparatory program.",
    location: "Tunis, Tunisia",
    date: "Current"
  },
  {
    school: "Tunisian Baccalaureate",
    degree: "Mathematics",
    details: "Score: 18.89/20 — Math 20/20, Physics 19/20, CS 19/20",
    location: "Sidi Bouzid, Tunisia",
    date: "2025"
  }
];

const scores = [
  { label: "IELTS 7.5 (C1)", details: "Listening 7.5 / Reading 8.0 / Writing 7.0 / Speaking 7.5" },
  { label: "SAT 1420", details: "94th percentile — Math 780 (98th percentile)" }
];

const languages = ["French (B2–C1)", "Arabic (Native)", "English (C1)"];

const skills = {
  "AI / LLM": ["LLM Agent Design", "Prompt Engineering", "Google GenAI", "Pydantic Structured Outputs", "LangChain", "PyTorch (learning)"],
  "Languages": ["Python", "C/C++", "Kotlin"],
  "Data & Viz": ["Pandas", "Plotly", "Matplotlib", "Streamlit"],
  "Tools & Core": ["Git/GitHub", "Data Structures & Algorithms", "Networks Fundamentals"]
};

const achievements = [
  { title: "National 1st", event: "« Sixième » national exam", year: "2018", details: "Awarded the Presidential Prize", photo: "/media/presidential_prize.jpg", photoAlt: "Ahmed receiving the Presidential Prize from President Béji Caïd Essebsi", position: "object-[center_35%]" },
  { title: "Organizing Member", event: "TOP programming competition", year: "2023", details: "", photo: "/media/top23.jpg", photoAlt: "TOP2023", position: "object-[center_18%]" },
  { title: "10th Place", event: "TOP programming competition", year: "2024", details: "", photo: "/media/top24.jpg", photoAlt: "TOP2024", position: "object-[center_25%]" },
  { title: "Participant", event: "Py'Cathlon 2025", year: "2025", details: "Python Competition hosted by PSL - Paris Dauphine @ Tunis", photo: "/media/dauphine.jpg", photoAlt: "Py'Cathlon 2025 PSL Paris Dauphine at Tunis", position: "object-[center_28%]" },
  { title: "Member", event: "ACM INSAT student chapter", year: "2025–present", details: "", photo: null, photoAlt: ""},
  { title: "Participant", event: "TCPC 2K26", year: "April 2026", details: "", photo: "/media/tcpc.jpg", photoAlt: "Ahmed and teammate at TCPC2026", position: "object-[center_30%]" },
  { title: "14th Place", event: "Taktik 1.1 competitive programming", year: "2026", details: "", photo: null, photoAlt: "" },
];

const certifications = [
  "IELTS Academic 7.5 (April 2024)",
  "SAT 1420 (August 2024)",
  "LangChain for LLM Application Development (DeepLearning.AI)",
  "Learn AI Agents",
  "Schoolhouse.world Algebra 1 Tutor Certification (100% mastery)"
];

// --- COMPONENTS ---
const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const SectionHeading = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <FadeIn className="mb-12">
    <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-gradient mb-2">{title}</h2>
    {subtitle && <p className="text-primary font-mono text-sm uppercase tracking-wider">{subtitle}</p>}
  </FadeIn>
);

const GridBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
  </div>
);

// Lightbox for full-size images
const Lightbox = ({ src, alt, onClose }: { src: string, alt: string, onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
    onClick={onClose}
  >
    <button
      onClick={onClose}
      className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
    >
      <X className="w-6 h-6" />
    </button>
    <motion.img
      initial={{ scale: 0.92, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.92, opacity: 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      src={src}
      alt={alt}
      className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    />
  </motion.div>
);

// Screenshot reveal panel for projects
const ProjectScreenshot = ({ src, alt }: { src: string, alt: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [lightbox, setLightbox] = useState(false);

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-6 rounded-md overflow-hidden border border-primary/20 group cursor-pointer shadow-[0_0_30px_rgba(0,240,255,0.06)] hover:shadow-[0_0_40px_rgba(0,240,255,0.12)] transition-shadow"
        onClick={() => setLightbox(true)}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-48 md:h-64 object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {/* Hover hint */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-primary/30 text-primary text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
          <ZoomIn className="w-3 h-3" /> expand
        </div>
        {/* Scan line animation */}
        <motion.div
          initial={{ top: "-10%" }}
          animate={isInView ? { top: "110%" } : { top: "-10%" }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent pointer-events-none"
          style={{ position: "absolute" }}
        />
      </motion.div>

      <AnimatePresence>
        {lightbox && <Lightbox src={src} alt={alt} onClose={() => setLightbox(false)} />}
      </AnimatePresence>
    </>
  );
};

// Achievement photo card
const AchievementPhoto = ({ src, alt, position = "object-center" }: { src: string, alt: string, position?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [lightbox, setLightbox] = useState(false);

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.95, rotateY: -8 }}
        animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-3 rounded overflow-hidden border border-primary/20 cursor-pointer group shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_4px_30px_rgba(0,240,255,0.15)] transition-shadow"
        onClick={() => setLightbox(true)}
        style={{ perspective: "800px" }}
      >
        <img
          src={src}
          alt={alt}
          // Change "object-center" to the template literal {position} below:
          className={`w-full h-36 object-cover ${position} transition-transform duration-700 group-hover:scale-[1.04]`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-2 right-2 p-1.5 rounded-full bg-black/50 border border-primary/30 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          <ZoomIn className="w-3 h-3" />
        </div>
      </motion.div>

      <AnimatePresence>
        {lightbox && <Lightbox src={src} alt={alt} onClose={() => setLightbox(false)} />}
      </AnimatePresence>
    </>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen relative selection:bg-primary/30 selection:text-primary">
      <div className="noise-overlay" />

      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-display font-bold text-xl tracking-tighter text-primary">A.ARIBI</div>
          <nav className="hidden md:flex items-center gap-6 font-mono text-sm text-muted-foreground">
            <a href="#work" className="hover:text-primary transition-colors">Work</a>
            <a href="#academic" className="hover:text-primary transition-colors">Academic</a>
            <a href="#skills" className="hover:text-primary transition-colors">Skills</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-[100dvh] flex flex-col justify-center pt-20 pb-10 overflow-hidden">
        <GridBackground />
        <div className="container mx-auto px-6 relative z-10">
          <FadeIn delay={0.2}>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter mb-4 text-gradient">
              Ahmed Aribi
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-wrap items-center gap-4 text-lg md:text-2xl font-mono text-muted-foreground mb-8">
              <span className="text-foreground">Engineering Student</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary/50 hidden md:block" />
              <span className="text-primary">AI Engineer Intern @ Welyne</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="max-w-2xl text-lg md:text-xl leading-relaxed text-muted-foreground/90 mb-12 border-l-2 border-primary/50 pl-6 py-1">
              I build real AI systems — from LLM agents to financial risk platforms — while still in my second year.
            </p>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#work" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-mono font-medium hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:shadow-[0_0_25px_rgba(0,240,255,0.4)]">
                See my work <ArrowRight className="w-4 h-4" />
              </a>
              <a href="/CV_AHMED_ARIBI.pdf" download="/CV_AHMED_ARIBI.pdf" className="inline-flex items-center gap-2 px-6 py-3 border border-border bg-card text-foreground font-mono font-medium hover:border-primary/50 hover:bg-primary/5 transition-colors">
                Download CV <Download className="w-4 h-4" />
              </a> 
            </div>
          </FadeIn>
        </div>
      </section>

      <main className="container mx-auto px-6 space-y-32 pb-32">
        
        {/* WORK / PROJECTS */}
        <section id="work" className="pt-10 scroll-mt-20">
          <SectionHeading title="Selected Work" subtitle="Systems built for impact" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <FadeIn key={idx} delay={idx * 0.1} className={idx === 0 ? "lg:col-span-2" : "col-span-1"}>
                <div className="card-hover-effect h-full p-6 md:p-8 flex flex-col group">
                  <div className="card-content flex flex-col h-full">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-md text-primary ring-1 ring-primary/20 group-hover:bg-primary/20 transition-colors">
                          {project.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-display font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                          <p className="font-mono text-sm text-muted-foreground mt-1">{project.repo}</p>
                        </div>
                      </div>
                      <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} on GitHub`} className="p-2 hover:bg-primary/10 rounded-full transition-colors text-muted-foreground hover:text-primary">
                        <ExternalLink className="w-5 h-5" aria-hidden="true" />
                      </a>
                    </div>
                    
                    <p className="text-foreground/80 text-lg mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <ul className="space-y-3 mb-6 flex-grow">
                      {project.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{b}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Screenshot reveal */}
                    {project.screenshot && (
                      <ProjectScreenshot src={project.screenshot} alt={project.screenshotAlt} />
                    )}
                    
                    <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-border/50">
                      {project.tech.map((t, i) => (
                        <span key={i} className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-mono rounded-sm">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ACADEMICS & TEST SCORES */}
        <section id="academic" className="scroll-mt-20">
          <SectionHeading title="Academics & Tests" subtitle="Foundation and metrics" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <FadeIn>
              <h3 className="text-2xl font-display font-bold mb-6 flex items-center gap-3">
                <GraduationCap className="text-primary w-6 h-6" /> Education
              </h3>
              <div className="space-y-8">
                {education.map((edu, idx) => (
                  <div key={idx} className="relative pl-6 border-l border-border/50 group">
                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_rgba(0,240,255,0.3)] group-hover:shadow-[0_0_15px_rgba(0,240,255,0.8)] transition-shadow" />
                    <h4 className="text-xl font-bold font-display">{edu.school}</h4>
                    <p className="text-primary font-mono text-sm my-1">{edu.degree}</p>
                    <p className="text-muted-foreground text-sm">{edu.details}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-3 font-mono">
                      <span className="bg-secondary px-2 py-0.5 rounded-sm">{edu.date}</span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span>{edu.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <h3 className="text-2xl font-display font-bold mb-6 flex items-center gap-3">
                <Award className="text-primary w-6 h-6" /> Test Scores & Languages
              </h3>
              <div className="space-y-4">
                {scores.map((score, idx) => (
                  <div key={idx} className="card-hover-effect p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="card-content flex items-center justify-between w-full">
                      <span className="font-bold font-display text-lg">{score.label}</span>
                      <span className="text-sm text-muted-foreground font-mono text-right">{score.details}</span>
                    </div>
                  </div>
                ))}
                <div className="flex flex-wrap gap-2 mt-6">
                  {languages.map((lang, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 text-sm font-mono rounded-sm">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="scroll-mt-20">
          <SectionHeading title="Technical Arsenal" subtitle="Tools of the trade" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(skills).map(([category, items], idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="card-hover-effect p-6 h-full">
                  <div className="card-content">
                    <h4 className="text-lg font-mono text-primary mb-5 flex items-center gap-2">
                      <Code2 className="w-4 h-4" /> {category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {items.map((skill, i) => (
                        <span key={i} className="px-3 py-1.5 bg-secondary text-secondary-foreground text-sm rounded-sm border border-border/50 hover:border-primary/30 transition-colors">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* EXPERIENCE, ACHIEVEMENTS & CERTIFICATIONS */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            <FadeIn>
              <h3 className="text-2xl font-display font-bold mb-6 flex items-center gap-3">
                <BookOpen className="text-primary w-6 h-6" /> Experience
              </h3>
              <div className="card-hover-effect p-6 mb-6">
                <div className="card-content">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xl font-bold font-display text-primary">Welyne</h4>
                    <span className="font-mono text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-sm">July 2026 – present</span>
                  </div>
                  <p className="font-mono text-sm text-foreground/80 mb-2">AI Engineer Intern · Hybrid</p>
                </div>
              </div>
              <div className="card-hover-effect p-6 mb-8">
                <div className="card-content">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-bold font-display text-primary">Schoolhouse.world</h4>
                  </div>
                  <p className="font-mono text-sm text-foreground/80 mb-4">International Online Tutor (Math & CS)</p>
                  <div className="grid grid-cols-2 gap-4 mb-4 font-mono text-xs text-muted-foreground bg-background p-3 rounded border border-border/50">
                    <div><strong className="text-primary">40+</strong> hours taught</div>
                    <div><strong className="text-primary">37</strong> learners</div>
                    <div><strong className="text-primary">15</strong> countries reached</div>
                    <div><strong className="text-primary">70</strong> positive ratings</div>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0" /> Top 10% hours tutored; Top 5% countries reached</li>
                    <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0" /> Subjects: Computer Science, Middle School Math</li>
                    <li className="flex gap-2"><ChevronRight className="w-4 h-4 text-primary shrink-0" /> Certified Algebra 1 Tutor (100% mastery)</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-display font-bold mb-6 mt-12 flex items-center gap-3">
                <ShieldCheck className="text-primary w-6 h-6" /> Certifications
              </h3>
              <div className="space-y-3">
                {certifications.map((cert, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 border border-border/50 rounded-sm bg-card/50 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors hover:border-primary/30">
                    <Star className="w-4 h-4 text-primary shrink-0" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h3 className="text-2xl font-display font-bold mb-6 flex items-center gap-3">
                <Star className="text-primary w-6 h-6" /> Timeline & Achievements
              </h3>
              <div className="space-y-6 border-l border-border/50 ml-3 pl-8 relative">
                {achievements.map((item, i) => (
                <div key={i} className="relative group">
                    <div className="absolute -left-[41px] top-1 w-3 h-3 bg-background border-2 border-primary rounded-full ring-4 ring-background group-hover:scale-125 transition-transform" />
                    <div className="font-mono text-xs text-primary mb-1 bg-primary/10 inline-block px-2 py-0.5 rounded-sm">{item.year}</div>
                    <h4 className="text-lg font-bold font-display mt-1">{item.title}</h4>
                    <p className="text-foreground/80">{item.event}</p>
                    {item.details && <p className="text-sm text-muted-foreground mt-1 font-mono">{item.details}</p>}
                    
                    {/* Pass the item's custom position here if it exists */}
                    {item.photo && (
                    <AchievementPhoto 
                        src={item.photo} 
                        alt={item.photoAlt} 
                        position={item.position} 
                    />
                    )}
                </div>
                ))}
              </div>
            </FadeIn>
            
          </div>
        </section>

      </main>

      {/* CONTACT CTA */}
      <section id="contact" className="py-24 border-t border-border/40 relative overflow-hidden bg-card/30">
        <div className="absolute inset-0 bg-primary/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none" />
        <FadeIn className="text-center max-w-3xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-10 text-gradient">Ready to build?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="mailto:ahmed.aribi@insat.ucar.tn" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-mono font-medium hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]">
              <Mail className="w-5 h-5" /> Let's Talk
            </a>
            <a href="https://github.com/aribi-ahmed" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border border-border bg-card text-foreground font-mono font-medium hover:border-primary/50 hover:bg-primary/5 transition-colors">
              <Github className="w-5 h-5" /> GitHub Profile
            </a>
          </div>
          
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-muted-foreground font-mono text-sm">
            <span className="flex items-center gap-2 hover:text-foreground transition-colors">
              <Phone className="w-4 h-4 text-primary" /> +216 99 705 504
            </span>
            <span className="flex items-center gap-2 hover:text-foreground transition-colors">
              <MapPin className="w-4 h-4 text-primary" /> Tunis, Tunisia
            </span>
            <a href="https://linkedin.com/in/ahmed-aribi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Linkedin className="w-4 h-4 text-primary" /> LinkedIn
            </a>
          </div>
        </FadeIn>
      </section>
      
      {/* MINIMAL FOOTER */}
      <footer className="py-6 border-t border-border/40 text-center text-xs font-mono text-muted-foreground bg-background">
        <p>© {new Date().getFullYear()} Ahmed Aribi. All systems operational.</p>
      </footer>
      
    </div>
  );
}
