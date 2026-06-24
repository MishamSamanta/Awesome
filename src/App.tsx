import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GRAPHIC_PROJECTS,
  SHORT_VIDEO_PROJECTS,
  LONG_VIDEO_PROJECTS,
  TIMELINE,
  SKILLS
} from './data';
import { Project } from './types';
import ProjectCard from './components/ProjectCard';
import SectionQuote from './components/SectionQuote';
import ProjectLightbox from './components/ProjectLightbox';
import Beams from './components/Beams';
import RotatingText from './components/RotatingText';
import {
  Mail,
  Instagram,
  Youtube,
  Linkedin,
  Send,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  ArrowDown
} from 'lucide-react';

export default function App() {
  // Lightbox State
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [lightboxProjects, setLightboxProjects] = useState<Project[]>([]);

  // Contact Form State
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formType, setFormType] = useState('Branding & Graphics');
  const [formMessage, setFormMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Smooth scroll helper
  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Lightbox Navigation helpers
  const openLightbox = (project: Project, categoryList: Project[]) => {
    setSelectedProject(project);
    setLightboxProjects(categoryList);
  };

  const handlePrevProject = () => {
    if (!selectedProject || lightboxProjects.length <= 1) return;
    const currentIndex = lightboxProjects.findIndex(p => p.id === selectedProject.id);
    const prevIndex = (currentIndex - 1 + lightboxProjects.length) % lightboxProjects.length;
    setSelectedProject(lightboxProjects[prevIndex]);
  };

  const handleNextProject = () => {
    if (!selectedProject || lightboxProjects.length <= 1) return;
    const currentIndex = lightboxProjects.findIndex(p => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % lightboxProjects.length;
    setSelectedProject(lightboxProjects[nextIndex]);
  };

  // Mock Form Submit Handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      setFormName('');
      setFormEmail('');
      setFormMessage('');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#f4f4f6] selection:bg-accent selection:text-[#0a0a0c] flex flex-col font-sans antialiased">
      
      {/* 1. TOP STICKY NAVIGATION (ULTRALIGHT, CLUTTER-FREE) */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#0a0a0c]/40 backdrop-blur-md border-b border-zinc-900/10">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          
          {/* Logo / Brand Name */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 font-display text-sm font-bold tracking-[0.25em] text-white hover:text-accent transition-colors cursor-pointer"
          >
            <span>MISHAM SAMANTA ARCHIVE</span>
            <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
          </button>

          {/* Single Clutter-free Navigation Element */}
          <nav className="flex items-center gap-6">
            <button
              onClick={() => scrollToId('projects')}
              className="text-[10px] font-mono tracking-[0.2em] text-zinc-400 hover:text-accent transition-colors cursor-pointer border border-zinc-800/80 hover:border-accent/40 rounded-xs px-4 py-2 bg-zinc-950/40"
            >
              PROJECTS
            </button>
          </nav>
        </div>
      </header>

      {/* MAIN VIEWPORT LAYOUT CONTAINER */}
      <main className="flex-grow">
        
        {/* A. HERO VIEW (CENTRALIZED, DRAMATIC, HIGH-CONTRAST) */}
        <section className="relative h-screen flex flex-col justify-center items-center px-6 overflow-hidden border-b border-zinc-900/30">
          
          {/* Subtle geometric glowing background grids */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.03] rounded-full filter blur-[120px] pointer-events-none" />
          
          {/* Beams Background Effect */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40">
            <Beams
              beamWidth={3}
              beamHeight={30}
              beamNumber={20}
              lightColor="#ffffff"
              speed={2}
              noiseIntensity={1.75}
              scale={0.2}
              rotation={30}
            />
          </div>
          
          {/* Floating Manifesto Badge (Top Right Concept from Screenshot) */}
          <div className="hidden lg:flex absolute top-28 right-12 items-start gap-4 max-w-xs text-left font-mono">
            <span className="text-xl text-accent font-bold leading-none select-none">⊩</span>
            <div className="space-y-0.5">
              <p className="text-[10px] tracking-widest text-zinc-300 uppercase font-medium">
                CRAFTING VISUAL ARCHIVES
              </p>
              <p className="text-[9px] tracking-widest text-zinc-500 uppercase leading-snug">
                THROUGH BOLD GRAPHICS & EDITORIAL MOTION.
              </p>
            </div>
          </div>

          {/* Centralized Bold Typography Block */}
          <div className="z-10 flex flex-col items-center justify-center text-center max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-1"
            >
              <span className="block font-shadows font-bold text-5xl md:text-7xl lg:text-8xl text-white tracking-wide">
                Make
              </span>
              
              <h1 
                className="font-blackops font-normal leading-[0.9] tracking-normal text-white uppercase select-none"
                style={{ fontSize: 'clamp(3.5rem, 12vw, 10rem)' }}
              >
                AWESOME.
              </h1>
            </motion.div>

            {/* Concise subtitle statement with RotatingText effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1.2 }}
              className="max-w-xl mt-8 leading-relaxed flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5"
            >
              <span className="font-bebas text-xl sm:text-2xl tracking-wider text-zinc-400">Misham Samanta —</span>
              <RotatingText
                texts={['Graphic Designer', 'Video Editor']}
                mainClassName="px-3 bg-accent text-black overflow-hidden py-0.5 justify-center rounded-xs font-bebas text-xl sm:text-2xl tracking-wider"
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2500}
                splitBy="characters"
                auto
                loop
              />
            </motion.div>

            {/* Quick interactive call to actions */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="flex items-center gap-4 mt-8"
            >
              <button
                onClick={() => scrollToId('projects')}
                className="px-5 py-3 bg-accent text-[#0a0a0c] font-mono text-[10px] tracking-widest uppercase font-semibold hover:bg-white transition-all duration-300 rounded-xs cursor-pointer"
              >
                ENTER ARCHIVE
              </button>
              <button
                onClick={() => scrollToId('contact')}
                className="px-5 py-3 border border-zinc-800 hover:border-accent hover:text-accent font-mono text-[10px] tracking-widest uppercase transition-all duration-300 rounded-xs cursor-pointer bg-zinc-950/20"
              >
                GET IN TOUCH
              </button>
            </motion.div>
          </div>

          {/* Stats Bar (Sleek layout at bottom) */}
          <div className="absolute bottom-12 left-6 md:left-12 flex gap-8 z-10">
            <div>
              <div className="font-display text-lg font-bold text-white tracking-tight">120+</div>
              <div className="font-mono text-[8px] text-zinc-600 uppercase tracking-widest">PROJECTS COMPLETED</div>
            </div>
            <div className="w-[1px] bg-zinc-900/60" />
            <div>
              <div className="font-display text-lg font-bold text-white tracking-tight">40M+</div>
              <div className="font-mono text-[8px] text-zinc-600 uppercase tracking-widest">ORGANIC VIEWS</div>
            </div>
          </div>

          {/* Vertical scroll animation on the right side (from screenshot inspiration) */}
          <div 
            onClick={() => scrollToId('projects')}
            className="absolute right-8 bottom-12 flex flex-col items-center gap-4 text-zinc-500 hover:text-accent transition-colors duration-300 cursor-pointer select-none"
          >
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase [writing-mode:vertical-lr] font-semibold">
              SCROLL
            </span>
            <div className="w-[1px] h-14 bg-zinc-900 relative overflow-hidden">
              <motion.div
                animate={{ y: [-56, 56] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-full h-1/2 bg-accent"
              />
            </div>
          </div>

        </section>

        {/* B. CENTRAL QUOTE TRANSITION */}
        <SectionQuote quote="Design is the quiet conversation between an idea and the eye that finds it." />

        {/* C. CONTINUOUS SCROLL PROJECTS SECTIONS */}
        <div id="projects" className="scroll-mt-24 space-y-0">
          
          {/* I. GRAPHIC DESIGN PROJECTS BLOCK */}
          <motion.section 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="px-6 py-20 max-w-7xl mx-auto space-y-12"
          >
            
            {/* Header layout */}
            <div className="border-b border-zinc-900 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1.5">
                <span className="font-mono text-[9px] text-accent tracking-[0.25em] uppercase font-bold">
                  ARCHIVE VOLUME I
                </span>
                <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight text-white uppercase">
                  Graphic Design & Layout
                </h2>
              </div>
              <p className="text-zinc-500 text-xs max-w-xs font-mono uppercase tracking-wider">
                Brutalist editorial books, typography posters, & packaging design.
              </p>
            </div>

            {/* Graphic Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {GRAPHIC_PROJECTS.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => openLightbox(project, GRAPHIC_PROJECTS)}
                />
              ))}
            </div>

            {/* Subsection transition quote */}
            <SectionQuote quote="A poster has one second to be noticed and a lifetime to be remembered." />
          </motion.section>

          {/* II. SHORT-FORM VIDEOS BLOCK */}
          <motion.section 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="px-6 py-20 max-w-7xl mx-auto space-y-12"
          >
            
            {/* Header layout */}
            <div className="border-b border-zinc-900 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1.5">
                <span className="font-mono text-[9px] text-accent tracking-[0.25em] uppercase font-bold">
                  ARCHIVE VOLUME II
                </span>
                <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight text-white uppercase">
                  Short-Form Vertical Videos
                </h2>
              </div>
              <p className="text-zinc-500 text-xs max-w-xs font-mono uppercase tracking-wider">
                9:16 high-retention cinematic edits for reels, shorts, & tiktok.
              </p>
            </div>

            {/* Short-Form Vertical Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {SHORT_VIDEO_PROJECTS.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => openLightbox(project, SHORT_VIDEO_PROJECTS)}
                />
              ))}
            </div>

            {/* Subsection transition quote */}
            <SectionQuote quote="Attention is the rarest currency — short form spends it wisely." />
          </motion.section>

          {/* III. LONG-FORM VIDEOS BLOCK */}
          <motion.section 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="px-6 py-20 max-w-7xl mx-auto space-y-12"
          >
            
            {/* Header layout */}
            <div className="border-b border-zinc-900 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1.5">
                <span className="font-mono text-[9px] text-accent tracking-[0.25em] uppercase font-bold">
                  ARCHIVE VOLUME III
                </span>
                <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight text-white uppercase">
                  Long-Form Cinematic Cuts
                </h2>
              </div>
              <p className="text-zinc-500 text-xs max-w-xs font-mono uppercase tracking-wider">
                16:9 documentary pieces, official music films, & commercials.
              </p>
            </div>

            {/* Long-Form Horizontal Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {LONG_VIDEO_PROJECTS.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => openLightbox(project, LONG_VIDEO_PROJECTS)}
                />
              ))}
            </div>

            {/* Subsection transition quote */}
            <SectionQuote quote="A long edit is a promise kept scene after scene." />
          </motion.section>

        </div>

        {/* D. ABOUT SECTION (INTEGRATED SINGLE PAGE SCROLL) */}
        <motion.section 
          id="about" 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="scroll-mt-24 px-6 py-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 border-t border-zinc-900/60"
        >
          
          {/* Left Column: Bio & Core Capabilities */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <span className="font-mono text-[9px] text-accent tracking-[0.25em] uppercase font-bold">
                BIOGRAPHY ARCHIVE
              </span>
              <h2 className="font-display text-3xl font-bold tracking-tight text-white uppercase">
                The Story Behind the cuts & grids
              </h2>
              <div className="space-y-4 text-zinc-400 text-sm leading-relaxed font-sans">
                <p>
                  My name is Misham Samanta. Over the last eight years, I have navigated the intersection where static graphic layout collides with rhythmic cinematic timelines. For me, design is not an ornamentation—it is a functional blueprint. A video is not a container for footage—it is an exploration of pace, sequence, and sonic texture.
                </p>
                <p>
                  Whether designing a brutalist limited-edition print poster or editing a vertical video campaign that reaches millions, my execution remains unified: extreme structural integrity, high-contrast aesthetics, and meticulous attention to user engagement.
                </p>
              </div>
            </div>

            {/* Capabilities toolkit */}
            <div className="space-y-8">
              <div className="border-b border-zinc-900 pb-3">
                <h4 className="font-mono text-xs tracking-widest text-accent uppercase">TOOLKIT & CORE CAPABILITIES</h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {SKILLS.map((cat, i) => (
                  <div key={i} className="space-y-3">
                    <h5 className="font-display text-xs font-semibold text-white tracking-widest uppercase">
                      {cat.name}
                    </h5>
                    <ul className="space-y-1.5">
                      {cat.skills.map((skill, si) => (
                        <li key={si} className="text-zinc-400 text-xs flex items-center gap-2">
                          <span className="w-1 h-1 bg-accent rounded-full" />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Experience Chronology timeline */}
          <div className="lg:col-span-7 space-y-10">
            <div className="border-b border-zinc-900 pb-3">
              <h4 className="font-mono text-xs tracking-widest text-accent uppercase">SELECTED CHRONOLOGY</h4>
            </div>

            <div className="space-y-10">
              {TIMELINE.map((item) => (
                <div key={item.id} className="relative pl-6 md:pl-8 border-l border-zinc-800/80 space-y-3 group">
                  <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full border-2 border-zinc-900 bg-zinc-800 group-hover:bg-accent group-hover:border-accent transition-colors duration-300" />
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                    <h4 className="font-display text-lg font-bold text-white tracking-tight group-hover:text-accent transition-colors duration-300">
                      {item.role}
                    </h4>
                    <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider bg-zinc-900/60 border border-zinc-800 px-2 py-0.5 rounded-xs w-fit">
                      {item.period}
                    </span>
                  </div>

                  <div className="font-mono text-xs text-zinc-400 font-medium">
                    {item.company}
                  </div>

                  <p className="text-zinc-400 text-xs leading-relaxed font-sans">
                    {item.description}
                  </p>

                  {item.achievements && (
                    <ul className="space-y-1.5 pt-2">
                      {item.achievements.map((ach, ai) => (
                        <li key={ai} className="text-zinc-500 text-xs flex items-start gap-2 leading-relaxed">
                          <span className="text-accent font-semibold mt-0.5">•</span>
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

        </motion.section>

        {/* E. ABOUT TRANSITION QUOTE */}
        <SectionQuote quote="Every cut, every layer, is a small act of storytelling." />

        {/* F. CONTACT SECTION (INTEGRATED SINGLE PAGE SCROLL) */}
        <motion.section 
          id="contact" 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="scroll-mt-24 px-6 py-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 border-t border-zinc-900/60"
        >
          
          {/* Left Side: Contact details */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <span className="font-mono text-[9px] text-accent tracking-[0.25em] uppercase font-bold">
                CONNECTION PORTAL
              </span>
              <h2 className="font-display text-3xl font-bold text-white tracking-tight uppercase">
                Let's Build Something Worth Eye
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed font-sans max-w-md">
                Whether you have a full project specification, a general branding query, or an editorial cut request, drop a message. Let's design or compile.
              </p>
            </div>

            <div className="space-y-6">
              <div className="border-t border-zinc-900/60 pt-6 space-y-4">
                <p className="font-mono text-[9px] text-zinc-500 tracking-widest uppercase">DIRECT CONTACT</p>
                <a
                  href="mailto:aiden@vancearchive.com"
                  className="group text-base font-sans text-white hover:text-accent transition-colors flex items-center gap-2 w-fit"
                >
                  <Mail className="w-5 h-5 text-accent" />
                  <span>aiden@vancearchive.com</span>
                </a>
              </div>

              <div className="border-t border-zinc-900/60 pt-6 space-y-4">
                <p className="font-mono text-[9px] text-zinc-500 tracking-widest uppercase">ONLINE ARCHIVES</p>
                <div className="flex flex-wrap gap-6 text-zinc-400">
                  <a
                    href="https://instagram.com/placeholder"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-accent transition-colors flex items-center gap-1.5 text-xs font-mono"
                  >
                    <Instagram className="w-4 h-4" /> INSTAGRAM
                  </a>
                  <a
                    href="https://youtube.com/placeholder"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-accent transition-colors flex items-center gap-1.5 text-xs font-mono"
                  >
                    <Youtube className="w-4 h-4" /> YOUTUBE
                  </a>
                  <a
                    href="https://linkedin.com/placeholder"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-accent transition-colors flex items-center gap-1.5 text-xs font-mono"
                  >
                    <Linkedin className="w-4 h-4" /> LINKEDIN
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Form */}
          <div className="lg:col-span-7 bg-[#121215] border border-[#27272a]/60 rounded-xs p-6 md:p-10 relative overflow-hidden">
            <div className="absolute -right-24 -bottom-24 w-48 h-48 bg-accent/5 rounded-full filter blur-[50px] pointer-events-none" />

            <AnimatePresence mode="wait">
              {formSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-12 space-y-6 flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/35 flex items-center justify-center text-accent">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-display text-xl font-bold text-white tracking-tight">Transmission Received</h4>
                    <p className="text-zinc-400 text-sm max-w-sm mx-auto leading-relaxed font-sans">
                      Thank you. Your project brief has landed in the inbox. Misham will review and establish communication within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-mono text-[10px] tracking-widest uppercase transition-colors rounded-xs cursor-pointer"
                  >
                    SUBMIT ANOTHER BRIEF
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleFormSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g. Liam Vance"
                        className="w-full bg-[#0a0a0c] border border-zinc-800/80 rounded-xs px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-hidden focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300 font-sans"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="e.g. liam@company.com"
                        className="w-full bg-[#0a0a0c] border border-zinc-800/80 rounded-xs px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-hidden focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300 font-sans"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                      Service / Project Type
                    </label>
                    <select
                      value={formType}
                      onChange={(e) => setFormType(e.target.value)}
                      className="w-full bg-[#0a0a0c] border border-zinc-800/80 rounded-xs px-4 py-3 text-sm text-white focus:outline-hidden focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300 font-sans appearance-none cursor-pointer"
                    >
                      <option>Branding & Visual Identity</option>
                      <option>Editorial Print & Layout</option>
                      <option>Short-Form Vertical Videos (TikTok/Reels)</option>
                      <option>Long-Form Cinematic Cuts (Widescreen/Commercial)</option>
                      <option>VFX / Kinetic Typography Motion</option>
                      <option>Full Media Package</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                      Brief Project Description
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="Describe your vision, timeline, and deliverables..."
                      className="w-full bg-[#0a0a0c] border border-zinc-800/80 rounded-xs px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-hidden focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300 font-sans resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-accent hover:bg-white text-[#0a0a0c] font-mono text-xs font-semibold tracking-widest uppercase transition-colors duration-300 flex items-center justify-center gap-2 rounded-xs cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>INITIATING TRANSMISSION...</span>
                    ) : (
                      <>
                        <span>TRANSMIT BRIEF</span>
                        <Send className="w-4.5 h-4.5" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.section>

        {/* Closing Transition quote */}
        <SectionQuote quote="Good work finds the right eyes — let's make something worth noticing." />

      </main>

      {/* 5. MINIMAL ARCHIVE FOOTER */}
      <footer className="bg-[#060608] border-t border-zinc-900/40 py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-zinc-500 font-mono text-[10px] tracking-widest">
          <div>
            © {new Date().getFullYear()} MISHAM SAMANTA ARCHIVE. ALL RIGHTS RESERVED.
          </div>

          <div className="flex gap-6">
            <a href="https://instagram.com/placeholder" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
              INSTAGRAM
            </a>
            <a href="https://youtube.com/placeholder" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
              YOUTUBE
            </a>
            <a href="https://linkedin.com/placeholder" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
              LINKEDIN
            </a>
          </div>

          <a href="mailto:misham.samanta@gmail.com" className="hover:text-accent text-[#f4f4f6]/70 transition-colors uppercase">
            misham.samanta@gmail.com
          </a>
        </div>
      </footer>

      {/* 6. INTEGRATED PROJECT LIGHTBOX */}
      <ProjectLightbox
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onPrev={handlePrevProject}
        onNext={handleNextProject}
      />

    </div>
  );
}
