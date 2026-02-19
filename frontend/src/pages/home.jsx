import { useEffect, useState } from 'react';
import {
  SiHtml5, SiCss3, SiNodedotjs, SiCplusplus, SiJavascript, SiC, SiOpenjdk, SiMongodb,
  SiExpress, SiPython, SiPhp, SiSolidity, SiGithub, SiDocker, SiThreedotjs,
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss
} from 'react-icons/si';

import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import JourneyTimeline from "../components/TimeLine.jsx";
import BackgroundEffects from "../components/BackgroundEffects.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import ScrollThemeMorph from "../components/ScrollThemeMorph.jsx";
import ScrollProgress from "../components/ScrollProgress.jsx";
import ThemeStateIndicator from "../components/ThemeStateIndicator.jsx";

// Premium components
import ThemeSection from "../components/ThemeSection.jsx";
import StaggeredText from "../components/StaggeredText.jsx";
import HorizontalGallery from "../components/HorizontalGallery.jsx";
import SkillsAccordion from "../components/SkillsAccordion.jsx";
import MagneticButton from "../components/MagneticButton.jsx";
import ParallaxShowcase from "../components/ParallaxShowcase.jsx";
import ThemeWipe from "../components/ThemeWipe.jsx";

import Hero from "../Sections/Hero.jsx";
import Aboutme from "../Sections/Aboutme.jsx";
import TechStack from "../Sections/TechStack.jsx";
import ProjectsSection from "../Sections/ProjectsSection.jsx";
import BlogSection from "../Sections/BlogSection.jsx";
import ConnectSection from "../Sections/ConnectSection.jsx";
import Certificates from "../Sections/Certificates.jsx";

// Skills data for the accordion
const skillsData = [
  {
    id: 1,
    title: 'Frontend Development',
    subtitle: 'React - Next.js - Tailwind',
    description: 'Building responsive, performant UIs with modern frameworks. Component-driven architecture with a focus on accessibility and animation.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    id: 2,
    title: 'Backend Engineering',
    subtitle: 'Node.js - Express - MongoDB',
    description: 'Designing scalable APIs, real-time services with Socket.io, and robust database architectures with MongoDB and Mongoose.',
    technologies: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'Socket.io'],
  },
  {
    id: 3,
    title: 'DevOps & Tools',
    subtitle: 'Docker - Git - CI/CD',
    description: 'Containerized deployments, version control workflows, and automated pipelines for reliable and fast shipping.',
    technologies: ['Docker', 'GitHub Actions', 'Vercel', 'Linux', 'Nginx'],
  },
  {
    id: 4,
    title: 'UI/UX Design',
    subtitle: 'Figma - Motion Design',
    description: 'Crafting intuitive interfaces with attention to micro-interactions, typography, and visual hierarchy. Design systems and prototyping.',
    technologies: ['Figma', 'Framer', 'Design Systems', 'Motion Design'],
  },
];

// Gallery items for horizontal scroll
const galleryItems = [
  { id: 1, title: 'GRABDESK', category: 'E-Commerce', description: 'Full-stack e-commerce platform with admin dashboard' },
  { id: 2, title: 'Portfolio v2', category: 'Personal', description: 'Premium developer portfolio with scroll animations' },
  { id: 3, title: 'Crypto Tracker', category: 'Web3', description: 'Real-time cryptocurrency tracking dashboard' },
  { id: 4, title: 'Task Manager', category: 'SaaS', description: 'Collaborative project management tool' },
  { id: 5, title: 'Blog Platform', category: 'CMS', description: 'Headless CMS with markdown editing' },
];

// Theme wipe section config
const wipeConfig = [
  { id: 'about', theme: 'light' },
  { id: 'projects-showcase', theme: 'dark' },
  { id: 'blog', theme: 'light' },
];

// Tech logos (static, outside component to avoid re-creation)
const techLogos = [
  { node: <SiHtml5 />, title: "HTML 5", href: "https://html5.org/" },
  { node: <SiCss3 />, title: "CSS", href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { node: <SiJavascript />, title: "JavaScript", href: "https://www.javascripttutorial.net/" },
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiNodedotjs />, title: "Node Js", href: "https://nodejs.org/en" },
  { node: <SiExpress />, title: "Express JS", href: "https://expressjs.com/" },
  { node: <SiThreedotjs />, title: "Three Js", href: "https://threejs.org/" },
  { node: <SiPhp />, title: "Php", href: "https://www.php.net/" },
  { node: <SiPython />, title: "Python", href: "https://www.python.org/" },
  { node: <SiCplusplus />, title: "C++", href: "https://isocpp.org/" },
  { node: <SiSolidity />, title: "Solidity", href: "https://www.soliditylang.org/" },
  { node: <SiDocker />, title: "Docker", href: "https://www.docker.com/" },
  { node: <SiMongodb />, title: "Mongo DB", href: "https://www.mongodb.com/" },
  { node: <SiOpenjdk />, title: "Java", href: "https://www.java.com/" },
  { node: <SiC />, title: "C", href: "https://www.c-language.org/" },
  { node: <SiGithub />, title: "Github", href: "https://www.github.com/" }
];

const BASE_SECTION_CLASS = 'my-20 lg:my-28 mx-4 lg:mx-8';

function Home() {
  const [currentTheme, setCurrentTheme] = useState('light');

  // Scroll to section handler
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const rootEl = document.documentElement;
    const bodyEl = document.body;
    
    // Get target sections
    const journeySection = document.getElementById('journey');
    const certificatesSection = document.getElementById('certificates-section');
    
    console.log('Theme sections found:', { journeySection, certificatesSection });
    
    if (!journeySection || !certificatesSection) {
      console.error('Missing sections for theme switching');
      return undefined;
    }

    // Performance optimization: Track current theme to avoid unnecessary DOM updates
    let currentAppliedTheme = 'light';
    
    // Optimized theme application with debouncing and deduplication
    let themeTimeout;
    const applyTheme = (theme) => {
      if (currentAppliedTheme === theme) {
        console.log('Theme already applied:', theme);
        return; // Skip if already applied
      }
      
      console.log('Applying theme:', theme);
      clearTimeout(themeTimeout);
      themeTimeout = setTimeout(() => {
        rootEl.setAttribute('data-theme-mode', theme);
        bodyEl.setAttribute('data-theme-mode', theme);
        currentAppliedTheme = theme;
        setCurrentTheme(theme);
      }, 50); // Small debounce to prevent rapid switching
    };

    // High-performance Intersection Observer with minimal callbacks
    const observerOptions = {
      threshold: [0.5], // Only trigger at exactly 50% visibility
      rootMargin: '0px'
    };

    const handleIntersection = (entries) => {
      // Use requestAnimationFrame for smooth performance
      requestAnimationFrame(() => {
        entries.forEach(entry => {
          console.log('Intersection:', entry.target.id, entry.intersectionRatio);
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const sectionId = entry.target.id;
            
            // Journey section triggers DARK theme
            if (sectionId === 'journey') {
              console.log('Journey section visible - applying dark theme');
              applyTheme('dark');
            }
            // Certificates section triggers LIGHT theme
            else if (sectionId === 'certificates-section') {
              console.log('Certificates section visible - applying light theme');
              applyTheme('light');
            }
          }
        });
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Observe both sections
    observer.observe(journeySection);
    observer.observe(certificatesSection);

    // Set initial theme based on current scroll position
    const checkInitialTheme = () => {
      const viewportHeight = window.innerHeight;
      const journeyRect = journeySection.getBoundingClientRect();
      const certificatesRect = certificatesSection.getBoundingClientRect();
      
      // Calculate visibility percentages
      const journeyVisible = Math.max(0, Math.min(journeyRect.bottom, viewportHeight) - Math.max(journeyRect.top, 0)) / viewportHeight;
      const certificatesVisible = Math.max(0, Math.min(certificatesRect.bottom, viewportHeight) - Math.max(certificatesRect.top, 0)) / viewportHeight;
      
      console.log('Initial visibility:', { journeyVisible, certificatesVisible });
      
      // Apply theme based on most visible section at 50%+ visibility
      if (journeyVisible >= 0.5) {
        applyTheme('dark');
      } else if (certificatesVisible >= 0.5) {
        applyTheme('light');
      } else {
        applyTheme('light'); // Default to light
      }
    };

    // Use requestAnimationFrame for initial check
    requestAnimationFrame(checkInitialTheme);

    return () => {
      observer.disconnect();
      clearTimeout(themeTimeout);
      // Reset to light theme on cleanup
      rootEl.setAttribute('data-theme-mode', 'light');
      bodyEl.setAttribute('data-theme-mode', 'light');
    };
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <ScrollProgress />
      

      {/* Background Effects Layer */}
      <BackgroundEffects />

      {/* Scroll theme morph: terracotta → cream */}
      <ScrollThemeMorph />


      {/* Theme Wipe Overlay */}
      <ThemeWipe sectionIds={wipeConfig} />

      <Navbar onNavigate={scrollToSection} />

      <div className="relative z-10">

        <Hero />

        <div className="section-theme theme-transition-scope">

        {/* ABOUT ME */}
        <div className="relative z-10">
          <Aboutme />
        </div>

        {/* SKILLS ACCORDION */}
        <section id="skills" className={`${BASE_SECTION_CLASS} min-h-[400px]`}>
          <StaggeredText
            text={"MY SKILLS"}
            as="span"
            className="text-3xl sm:text-4xl lg:text-6xl lexend-exa-bold m-4 mt-10 ml-6 sm:ml-12 mb-8"
            splitBy="word"
          />
          <div className="px-4 sm:px-6 lg:px-12 mt-8">
            <SkillsAccordion skills={skillsData} />
          </div>
        </section>
        <TechStack techLogos={techLogos} />

        {/* PARALLAX CODE SHOWCASE */}
        <section id="code-showcase" className={BASE_SECTION_CLASS}>
          <SectionHeading text="CODE" />
          <ParallaxShowcase />
        </section>

        <section id="journey" className={`${BASE_SECTION_CLASS} min-h-[500px] lg:min-h-[650px]`}>
          <SectionHeading text="MY JOURNEY" />
          <JourneyTimeline />
        </section>

        {/* PROJECTS — Dark theme section */}
        <ThemeSection theme="dark" id="projects-showcase" className="py-20 lg:py-28 px-4 lg:px-8">
          <SectionHeading text="PROJECTS" light className="mb-2" />
          <p className="text-[var(--theme-accent-secondary)] text-lg ml-6 sm:ml-12 mb-12 plus-jakarta-sans-medium">
            Scroll to explore my work
          </p>
          <HorizontalGallery items={galleryItems} />
        </ThemeSection>

        {/* Original projects grid */}
        {/* <section id="projects" className={`${BASE_SECTION_CLASS} min-h-[500px] pb-8`}>
          <SectionHeading text="ALL PROJECTS" />
          <ProjectsSection />
        </section> */}

        <ThemeSection theme="dark" id="certificates-section" className="py-20 lg:py-28 px-4 lg:px-8">
          <SectionHeading text="CERTIFICATES" light />
          <Certificates />
        </ThemeSection>

        <section id="blog" className={`${BASE_SECTION_CLASS} min-h-[500px] pb-0`}>
          <SectionHeading text="BLOG" />
          <BlogSection />
        </section>


        <section id="connect" className={`${BASE_SECTION_CLASS} min-h-[400px] pb-0`}>
          <SectionHeading text="LET'S CONNECT" />
          <ConnectSection />
        </section>

        {/* Magnetic CTA before footer */}
        <section className="flex items-center justify-center py-20">
          <MagneticButton
            onClick={() => window.location.href = 'mailto:singhharshit2410@gmail.com'}
          >
            <span className="font-playfair text-lg">Get in Touch</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </MagneticButton>
        </section>

        <Footer />
        </div>
      </div>
    </>
  );
}

export default Home;
