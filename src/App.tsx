import { useCallback, useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Award,
  BarChart3,
  Check,
  Code2,
  Copy,
  Cpu,
  Database,
  ExternalLink,
  FileText,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  RotateCw,
  Terminal,
  Wrench,
  X,
} from 'lucide-react';
import AmbientTopographyBackdrop from './components/AmbientTopographyBackdrop';
import SpatialSection3D from './components/SpatialSection3D';
import TiltCard3D from './components/TiltCard3D';
import ProjectAnimatedPreview from './components/ProjectAnimatedPreview';
import {
  CERTIFICATIONS_AND_ACTIVITIES,
  EDUCATION,
  FEATURED_PROJECTS,
  INTERNSHIPS,
  PROFILE,
  TECH_STACK_ITEMS,
} from './data/portfolioData';

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'stack', label: 'Stack' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'connect', label: 'Contact' },
];

const TECH_ICONS: Record<string, typeof Code2> = {
  Programming: Code2,
  'Data Analysis': Database,
  'Machine Learning': Cpu,
  Visualization: BarChart3,
  'Tools & System': Wrench,
};

export default function App() {
  const [activeNav, setActiveNav] = useState<string>('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portraitFlipped, setPortraitFlipped] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  useEffect(() => {
    const sectionIds = ['about', 'stack', 'projects', 'experience', 'certifications', 'connect'];
    const handleScroll = () => {
      const offset = window.scrollY + 180;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= offset) {
          setActiveNav(sectionIds[i] === 'certifications' ? 'experience' : sectionIds[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToSection = useCallback(
    (sectionId: string, e?: React.MouseEvent<HTMLElement>) => {
      e?.preventDefault();
      setMobileMenuOpen(false);
      setActiveNav(sectionId);

      const targetEl = document.getElementById(sectionId);
      if (!targetEl) return;

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      if (!prefersReducedMotion) {
        const targetY = Math.max(0, targetEl.offsetTop - 76);
        const startY = window.scrollY;
        const distance = targetY - startY;
        const duration = Math.min(780, Math.max(380, Math.abs(distance) * 0.42));
        const startTime = performance.now();

        const easeOut = (t: number) =>
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        const step = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(1, elapsed / duration);
          window.scrollTo(0, startY + distance * easeOut(progress));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      } else {
        targetEl.scrollIntoView({ behavior: 'auto' });
      }
    },
    [],
  );

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#141033] text-slate-100 overflow-x-clip">
      {/* 3D Spider-Verse Multiverse Silk-Contour & Halftone Shader Surface */}
      <AmbientTopographyBackdrop />

      {/* Top Navigation Bar — Clean 3-Zone Contract */}
      <header className="sticky top-0 z-40 border-b-2 border-cyan-400/50 bg-[#120e2e]/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-4">
          <a
            href="#about"
            onClick={(e) => navigateToSection('about', e)}
            className="font-display text-lg font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-sm"
          >
            dharaneeshj.me
          </a>

          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-300"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => navigateToSection(item.id, e)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-sm ${
                    isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-0.5 h-[2.5px] bg-rose-500 transition-transform duration-200 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={(e) => navigateToSection('connect', e)}
              className="hidden sm:inline-flex items-center gap-2 rounded-lg border-2 border-slate-950 bg-rose-500 px-4 py-2 text-xs font-bold text-white shadow-[3px_3px_0px_#22d3ee] transition-colors duration-150 hover:bg-rose-400 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              Let&apos;s Connect
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>

            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="inline-flex md:hidden h-10 w-10 items-center justify-center rounded-lg border-2 border-cyan-400 bg-[#1b1544] text-white"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav
            aria-label="Mobile navigation"
            className="border-t-2 border-cyan-400/40 bg-[#120e2e] px-6 py-4 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => navigateToSection(item.id, e)}
                  className="flex min-h-[44px] items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-[#231b57] hover:text-white"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                </a>
              ))}
              <button
                type="button"
                onClick={(e) => navigateToSection('connect', e)}
                className="mt-2 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border-2 border-slate-950 bg-rose-500 px-4 py-2.5 text-sm font-bold text-white shadow-[3px_3px_0px_#22d3ee]"
              >
                Let&apos;s Connect
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </nav>
        )}
      </header>

      <main className="relative z-10">
        {/* 1. ABOUT / HOME — BROOKLYN WALL-STICKER 3D FLIPPABLE PORTRAIT & HERO */}
        <section
          id="about"
          className="mx-auto max-w-6xl px-6 pt-12 pb-16 md:pt-16 md:pb-20"
        >
          <SpatialSection3D>
            <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12">
              <div className="flex flex-col justify-between gap-8 lg:col-span-7">
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-bold tracking-wide text-slate-300">
                    <span className="text-cyan-400">
                      AI &amp; Data Science
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-rose-400" aria-hidden="true" />
                      Tiruppur, India
                    </span>
                  </div>

                  <h1
                    className="font-display font-extrabold tracking-tight text-white leading-[1.06]"
                    style={{
                      fontSize: 'clamp(2.5rem, 4.6vw, 4rem)',
                      textWrap: 'balance',
                    }}
                  >
                    Hey, I&apos;m Dharaneesh
                  </h1>

                  <p className="max-w-2xl text-base leading-relaxed text-slate-200 md:text-[17px]">
                    {PROFILE.objective}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-1">
                    <button
                      type="button"
                      onClick={(e) => navigateToSection('projects', e)}
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border-2 border-slate-950 bg-rose-500 px-5 py-2.5 text-sm font-bold text-white shadow-[4px_4px_0px_#22d3ee] transition-colors duration-150 hover:bg-rose-400 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                    >
                      Explore Projects
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </button>

                    <a
                      href={PROFILE.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border-2 border-cyan-400 bg-[#17123a]/95 px-5 py-2.5 text-sm font-bold text-white shadow-[4px_4px_0px_#f43f5e] transition-colors duration-150 hover:bg-[#221b54] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                    >
                      <FileText className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                      View Resume
                    </a>
                  </div>
                </div>

                {/* Social Accounts on About */}
                <div className="border-t border-cyan-400/25 pt-6">
                  <p className="mb-3 text-xs font-bold text-slate-300">
                    Find me online
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={PROFILE.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border-2 border-slate-950 bg-[#18123b]/95 px-4 py-2 text-sm font-bold text-white shadow-[3px_3px_0px_#22d3ee] transition-colors duration-150 hover:bg-[#251d59] whitespace-nowrap shrink-0"
                    >
                      <Github className="h-4 w-4 text-white" aria-hidden="true" />
                      GitHub
                      <ExternalLink className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" />
                    </a>

                    <a
                      href={PROFILE.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border-2 border-slate-950 bg-[#18123b]/95 px-4 py-2 text-sm font-bold text-white shadow-[3px_3px_0px_#f43f5e] transition-colors duration-150 hover:bg-[#251d59] whitespace-nowrap shrink-0"
                    >
                      <Linkedin className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                      LinkedIn
                      <ExternalLink className="h-3.5 w-3.5 text-rose-300" aria-hidden="true" />
                    </a>

                    <a
                      href={PROFILE.socials.leetcode}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border-2 border-slate-950 bg-[#18123b]/95 px-4 py-2 text-sm font-bold text-white shadow-[3px_3px_0px_#facc15] transition-colors duration-150 hover:bg-[#251d59] whitespace-nowrap shrink-0"
                    >
                      <Code2 className="h-4 w-4 text-yellow-400" aria-hidden="true" />
                      LeetCode
                      <ExternalLink className="h-3.5 w-3.5 text-yellow-300" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Wall-Stuck Sticker Portrait Card on Comic Brick Backdrop */}
              <div className="lg:col-span-5 flex flex-col">
                <div className="comic-wall-bg relative flex-1 rounded-2xl border-2 border-slate-950 p-6 sm:p-7 shadow-[8px_8px_0px_#22d3ee]">
                  {/* Subtle graffiti-wall spray corner accents */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-3 left-3 h-3 w-3 rounded-full border border-slate-950 bg-cyan-400/70"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 rounded-full border border-slate-950 bg-rose-500/75"
                  />

                  <div className="perspective-stage h-full">
                    <div
                      onClick={() => setPortraitFlipped((f) => !f)}
                      style={{
                        transform: portraitFlipped
                          ? 'rotateY(180deg) rotateZ(0deg)'
                          : 'rotateY(0deg) rotateZ(-2.2deg)',
                        transition: 'transform 680ms cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                      className="relative h-full min-h-[370px] lg:min-h-[410px] w-full preserve-3d cursor-pointer hover:scale-[1.01]"
                    >
                      {/* Front Face: Die-Cut Wall Sticker / Wheatpaste Poster */}
                      <div className="backface-hidden absolute inset-0 rounded-xl border-[5px] border-white bg-white p-1.5 shadow-[8px_10px_0px_#f43f5e,-4px_-3px_0px_#22d3ee] ring-2 ring-slate-950">
                        {/* Corner Masking-Tape Strips Sticking Photo onto Wall */}
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute -top-4 left-5 z-20 h-6 w-16 -rotate-12 border-2 border-slate-950 bg-yellow-400/95 shadow-sm"
                        />
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute -top-4 right-5 z-20 h-6 w-16 rotate-12 border-2 border-slate-950 bg-rose-500/95 shadow-sm"
                        />
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute -bottom-3 right-8 z-20 h-5 w-14 -rotate-6 border-2 border-slate-950 bg-cyan-400/95 shadow-sm"
                        />

                        <div className="relative h-full w-full overflow-hidden rounded-lg border-2 border-slate-950 bg-[#0f0b26]">
                          {!avatarError ? (
                            <img
                              src={PROFILE.photoUrl}
                              alt="Portrait of Dharaneesh J stuck on Brooklyn comic wall"
                              referrerPolicy="no-referrer"
                              onError={() => setAvatarError(true)}
                              className="h-full w-full object-cover object-top"
                            />
                          ) : (
                            <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[#0f0b26] p-8 text-center">
                              <Terminal className="h-10 w-10 text-cyan-400" aria-hidden="true" />
                              <span className="font-display text-xl font-bold text-white">
                                {PROFILE.name}
                              </span>
                            </div>
                          )}

                          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-[#0d0924]/92 via-[#0d0924]/45 to-transparent px-4 pb-4 pt-12">
                            <p className="font-display text-lg font-extrabold text-white">
                              {PROFILE.name}
                            </p>
                            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-300">
                              <RotateCw className="h-3.5 w-3.5" aria-hidden="true" />
                              Flip Card
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Back Face (3D Reverse): dharaneeshj.me Direct Summary */}
                      <div
                        style={{ transform: 'rotateY(180deg)' }}
                        className="backface-hidden absolute inset-0 flex flex-col justify-between rounded-xl border-[5px] border-white bg-[#17123a] p-7 shadow-[8px_10px_0px_#22d3ee,-4px_-3px_0px_#f43f5e] ring-2 ring-slate-950"
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-xs font-mono font-bold text-cyan-400">
                            <span>dharaneeshj.me</span>
                            <span className="inline-flex items-center gap-1 text-slate-300">
                              <RotateCw className="h-3.5 w-3.5" aria-hidden="true" />
                              Tap to flip back
                            </span>
                          </div>
                          <h2 className="font-display text-2xl font-extrabold text-white">
                            {PROFILE.name}
                          </h2>
                          <p className="text-sm leading-relaxed text-slate-200">
                            Building predictive machine learning pipelines, real-time monitoring dashboards, and automated computer vision tools.
                          </p>
                        </div>

                        <div className="space-y-3 border-t border-cyan-400/20 pt-5 text-sm">
                          <div className="flex items-center justify-between text-slate-200">
                            <span className="text-slate-400">Location</span>
                            <span>{PROFILE.location}</span>
                          </div>
                          <div className="flex items-center justify-between text-slate-200">
                            <span className="text-slate-400">Email</span>
                            <span className="font-mono text-xs font-bold text-cyan-400">
                              {PROFILE.email}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-slate-200">
                            <span className="text-slate-400">Phone</span>
                            <span className="font-mono text-xs font-semibold tabular-nums">
                              {PROFILE.phone}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SpatialSection3D>
        </section>

        {/* 2. TECH STACK — SINGLE-BY-SINGLE FLOW LOOP (NO CATEGORY HEADINGS) */}
        <section
          id="stack"
          aria-label="Technical Skills"
          className="border-y-2 border-cyan-400/35 bg-[#120e2e]/62 py-12 md:py-14"
        >
          <div className="mx-auto mb-7 max-w-6xl px-6">
            <div>
              <p className="text-xs font-bold tracking-wide text-rose-400">
                Core Toolkit
              </p>
              <h2 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-white md:text-3xl">
                Tech Stack
              </h2>
            </div>
          </div>

          <div
            className="stack-flow-container overflow-hidden py-4"
            style={{ perspective: '1100px' }}
          >
            <div
              className="flex w-max animate-stack-flow"
              style={{ transform: 'rotateX(10deg)' }}
            >
              {[0, 1].map((dup) => (
                <div
                  key={`stack-loop-${dup}`}
                  aria-hidden={dup === 1}
                  className="flex items-stretch gap-4 pr-4"
                >
                  {TECH_STACK_ITEMS.map((item) => {
                    const Icon = TECH_ICONS[item.role] ?? Code2;
                    return (
                      <TiltCard3D
                        key={`${dup}-${item.name}`}
                        intensity={7}
                        className="flex shrink-0 items-center gap-3 rounded-xl border-2 border-slate-950 bg-[#1c1646] px-5 py-4 shadow-[4px_4px_0px_#22d3ee]"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-rose-400/40 bg-rose-500/20 text-cyan-300">
                          <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                        </div>
                        <p className="font-display text-base font-bold text-white whitespace-nowrap">
                          {item.name}
                        </p>
                      </TiltCard3D>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. FEATURED PROJECTS — 3-COLUMN 3D TILT SHOWCASE */}
        <section
          id="projects"
          className="mx-auto max-w-6xl px-6 py-16 md:py-20"
        >
          <SpatialSection3D>
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-bold tracking-wide text-cyan-400">
                  Selected Work
                </p>
                <h2
                  className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl"
                  style={{ textWrap: 'balance' }}
                >
                  Featured Projects
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-slate-300">
                Production-minded AI, telemetry forecasting, and computer vision builds with live interactive previews.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-7 lg:grid-cols-3">
              {FEATURED_PROJECTS.map((project, idx) => (
                <TiltCard3D
                  key={project.id}
                  intensity={5}
                  className="flex flex-col rounded-2xl border-2 border-cyan-400/75 bg-[#17123a]/95 shadow-[6px_6px_0px_#f43f5e]"
                >
                  <div className="relative z-10 aspect-[16/10] w-full overflow-hidden rounded-t-[14px] border-b-2 border-cyan-400/40 bg-[#120e30]">
                    <ProjectAnimatedPreview projectId={project.id} />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-[#17123a] via-[#17123a]/65 to-transparent px-5 pb-3 pt-8">
                      <span className="text-xs font-bold text-slate-100">
                        {project.accentLabel}
                      </span>
                      <span className="text-xs font-mono font-bold text-yellow-400 tabular-nums">
                        0{idx + 1}
                      </span>
                    </div>
                  </div>

                  <div className="relative z-10 flex flex-1 flex-col justify-between gap-5 p-6">
                    <div className="space-y-3.5">
                      <p className="text-xs font-semibold text-cyan-300">
                        {project.stack.join(' · ')}
                      </p>

                      <h3 className="font-display text-xl font-extrabold leading-snug tracking-tight text-white">
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-cyan-300 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-sm"
                        >
                          {project.title}
                        </a>
                      </h3>

                      <ul className="space-y-2 text-sm leading-relaxed text-slate-300">
                        {project.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2.5">
                            <span
                              aria-hidden="true"
                              className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-rose-500"
                            />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t border-cyan-400/20 pt-4">
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-20 inline-flex min-h-[42px] w-full items-center justify-center gap-2 rounded-lg border-2 border-slate-950 bg-cyan-400 px-4 py-2 text-xs font-extrabold text-slate-950 shadow-[3px_3px_0px_#f43f5e] transition-colors duration-150 hover:bg-yellow-400 whitespace-nowrap"
                      >
                        <Github className="h-4 w-4" aria-hidden="true" />
                        Open GitHub Repo
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </TiltCard3D>
              ))}
            </div>
          </SpatialSection3D>
        </section>

        {/* 4. EXPERIENCE & EDUCATION */}
        <section
          id="experience"
          className="border-y-2 border-cyan-400/35 bg-[#120e2e]/62 py-16 md:py-20"
        >
          <div className="mx-auto max-w-6xl px-6">
            <SpatialSection3D>
              <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div>
                  <p className="text-xs font-bold tracking-wide text-rose-400">
                    Internships
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                    Experience &amp; Education
                  </h2>
                </div>
                <p className="max-w-md text-sm leading-relaxed text-slate-300">
                  Industry training across machine learning, computer vision workflows, and Power BI business analytics.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {INTERNSHIPS.map((exp, idx) => (
                  <TiltCard3D
                    key={exp.id}
                    intensity={6}
                    className="rounded-2xl border-2 border-rose-500/70 bg-[#17123a]/95 p-7 shadow-[6px_6px_0px_#22d3ee]"
                  >
                    <div className="relative z-10">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-300">
                        <span>
                          0{idx + 1}. {exp.mode}
                        </span>
                        <span className="font-mono font-bold tabular-nums text-cyan-400">
                          {exp.period}
                        </span>
                      </div>

                      <h3 className="mt-3 font-display text-xl font-extrabold text-white">
                        {exp.organization}
                      </h3>
                      <p className="mt-0.5 text-sm font-bold text-rose-400">
                        {exp.role}
                      </p>

                      <ul className="mt-5 space-y-2.5 border-t border-cyan-400/20 pt-5 text-sm leading-relaxed text-slate-200">
                        {exp.highlights.map((point) => (
                          <li key={point} className="flex items-start gap-2.5">
                            <span
                              aria-hidden="true"
                              className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-cyan-400"
                            />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TiltCard3D>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border-2 border-cyan-400/60 bg-[#17123a]/95 p-6 shadow-[6px_6px_0px_#facc15] md:p-7">
                <div className="mb-5 flex items-center gap-2.5">
                  <GraduationCap className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                  <h3 className="font-display text-lg font-extrabold text-white">
                    Education
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {EDUCATION.map((edu) => (
                    <div
                      key={edu.degree}
                      className="flex flex-col justify-between gap-2 rounded-xl border border-cyan-400/30 bg-[#1e174b]/90 p-5"
                    >
                      <div>
                        <p className="font-display text-base font-bold text-white">
                          {edu.degree}
                        </p>
                        <p className="mt-1 text-sm text-slate-300">
                          {edu.institution}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-xs font-mono tabular-nums text-slate-300">
                        <span>{edu.period}</span>
                        <span className="font-bold text-cyan-400">
                          {edu.score}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SpatialSection3D>
          </div>
        </section>

        {/* 5. CERTIFICATIONS & ACTIVITIES — GRID STRUCTURE */}
        <section
          id="certifications"
          className="mx-auto max-w-6xl px-6 py-16 md:py-20"
        >
          <SpatialSection3D>
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-bold tracking-wide text-cyan-400">
                  Milestones
                </p>
                <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                  Certifications &amp; Activities
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-slate-300">
                Hackathons, SQL credentials, AI club leadership, paper presentations, workshops, and certified NPTEL coursework.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {CERTIFICATIONS_AND_ACTIVITIES.map((item) => (
                <TiltCard3D
                  key={item.id}
                  intensity={6}
                  className="flex flex-col justify-between gap-4 rounded-2xl border-2 border-cyan-400/65 bg-[#17123a]/95 p-6 shadow-[6px_6px_0px_#f43f5e]"
                >
                  <div className="relative z-10 space-y-3">
                    <div className="flex items-center justify-between gap-3 text-xs text-slate-300">
                      <span className="font-bold text-rose-400">
                        {item.category}
                      </span>
                      <span className="font-medium">{item.yearOrScope}</span>
                    </div>

                    <h3 className="font-display text-xl font-extrabold text-white">
                      {item.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-slate-300">
                      {item.details}
                    </p>

                    {item.courses && (
                      <ul className="space-y-2 pt-1 text-sm font-medium text-slate-100">
                        {item.courses.map((course, idx) => (
                          <li key={course} className="flex items-start gap-2.5">
                            <span className="font-mono text-xs font-bold text-cyan-400 mt-0.5 tabular-nums">
                              0{idx + 1}.
                            </span>
                            <span>{course}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="relative z-10 flex items-center gap-2 border-t border-cyan-400/20 pt-4 text-xs font-medium text-slate-300">
                    <Award className="h-4 w-4 text-yellow-400 shrink-0" aria-hidden="true" />
                    <span>{item.issuer}</span>
                  </div>
                </TiltCard3D>
              ))}
            </div>
          </SpatialSection3D>
        </section>

        {/* 6. LET'S CONNECT & COLLABORATE */}
        <section
          id="connect"
          className="border-t-2 border-cyan-400/35 bg-[#120e2e]/65 py-16 md:py-20"
        >
          <div className="mx-auto max-w-6xl px-6">
            <SpatialSection3D>
              <TiltCard3D
                intensity={4}
                className="rounded-2xl border-2 border-cyan-400 bg-[#17123a]/95 p-8 shadow-[8px_8px_0px_#f43f5e] md:p-12"
              >
                <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
                  <div className="space-y-5 lg:col-span-7">
                    <p className="text-xs font-bold tracking-wide text-rose-400">
                      Say Hello
                    </p>
                    <h2
                      className="font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl"
                      style={{ textWrap: 'balance' }}
                    >
                      Let&apos;s Connect &amp; Collaborate
                    </h2>
                    <p className="max-w-xl text-sm leading-relaxed text-slate-200 md:text-base">
                      Always open to discussing AI projects, data science ideas, hackathons, or internships. Drop a message or catch me on my profiles.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <a
                        href={`mailto:${PROFILE.email}`}
                        className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border-2 border-slate-950 bg-rose-500 px-5 py-2.5 text-sm font-bold text-white shadow-[3px_3px_0px_#22d3ee] transition-colors duration-150 hover:bg-rose-400 whitespace-nowrap shrink-0"
                      >
                        <Mail className="h-4 w-4" aria-hidden="true" />
                        Send Email
                      </a>

                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border-2 border-slate-950 bg-yellow-400 px-4 py-2.5 text-sm font-bold text-slate-950 shadow-[3px_3px_0px_#22d3ee] transition-colors duration-150 hover:bg-yellow-300 whitespace-nowrap shrink-0"
                      >
                        {copiedEmail ? (
                          <>
                            <Check className="h-4 w-4 text-slate-950" aria-hidden="true" />
                            Copied {PROFILE.email}
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 text-slate-900" aria-hidden="true" />
                            {PROFILE.email}
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-5 pt-2 text-xs font-medium text-slate-300">
                      <span className="inline-flex items-center gap-1.5 font-mono tabular-nums">
                        <Phone className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
                        {PROFILE.phone}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-rose-400" aria-hidden="true" />
                        {PROFILE.location}
                      </span>
                    </div>
                  </div>

                  {/* Direct Social Links: LeetCode, GitHub, LinkedIn */}
                  <div className="grid grid-cols-1 gap-3 lg:col-span-5">
                    <a
                      href={PROFILE.socials.leetcode}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-[56px] items-center justify-between rounded-xl border-2 border-slate-950 bg-[#1e174b] px-5 py-3.5 shadow-[3px_3px_0px_#facc15] transition-colors duration-150 hover:bg-[#2a2066]"
                    >
                      <div className="flex items-center gap-3">
                        <Code2 className="h-5 w-5 text-yellow-400 shrink-0" aria-hidden="true" />
                        <div>
                          <p className="text-sm font-bold text-white">LeetCode</p>
                          <p className="text-xs text-slate-300">leetcode.com/u/dharaneesh_8</p>
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-yellow-300" aria-hidden="true" />
                    </a>

                    <a
                      href={PROFILE.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-[56px] items-center justify-between rounded-xl border-2 border-slate-950 bg-[#1e174b] px-5 py-3.5 shadow-[3px_3px_0px_#22d3ee] transition-colors duration-150 hover:bg-[#2a2066]"
                    >
                      <div className="flex items-center gap-3">
                        <Github className="h-5 w-5 text-white shrink-0" aria-hidden="true" />
                        <div>
                          <p className="text-sm font-bold text-white">GitHub</p>
                          <p className="text-xs text-slate-300">github.com/Dharaneesh8</p>
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-cyan-300" aria-hidden="true" />
                    </a>

                    <a
                      href={PROFILE.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-[56px] items-center justify-between rounded-xl border-2 border-slate-950 bg-[#1e174b] px-5 py-3.5 shadow-[3px_3px_0px_#f43f5e] transition-colors duration-150 hover:bg-[#2a2066]"
                    >
                      <div className="flex items-center gap-3">
                        <Linkedin className="h-5 w-5 text-cyan-400 shrink-0" aria-hidden="true" />
                        <div>
                          <p className="text-sm font-bold text-white">LinkedIn</p>
                          <p className="text-xs text-slate-300">linkedin.com/in/dharaneesh-j-226601290</p>
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-rose-300" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </TiltCard3D>
            </SpatialSection3D>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t-2 border-cyan-400/40 bg-[#120e2e]/95 py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-xs font-medium text-slate-300 sm:flex-row">
          <p>© {new Date().getFullYear()} {PROFILE.name} · dharaneeshj.me</p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={(e) => navigateToSection('about', e)}
              className="font-bold text-cyan-300 hover:text-white transition-colors whitespace-nowrap"
            >
              Back to Top
            </button>
            <a
              href={PROFILE.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-rose-300 hover:text-white transition-colors whitespace-nowrap"
            >
              Resume PDF
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
