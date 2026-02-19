import { useEffect, useState, useRef } from 'react';
import {
  SiHtml5, SiCss3, SiNodedotjs, SiCplusplus, SiJavascript, SiC, SiOpenjdk, SiMongodb,
  SiExpress, SiPython, SiPhp, SiSolidity, SiGithub, SiDocker, SiThreedotjs,
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss
} from 'react-icons/si';
import { motion, useScroll, useTransform } from 'framer-motion';

import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import JourneyTimeline from "../components/TimeLine.jsx";
import BackgroundEffects from "../components/BackgroundEffects.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import SectionBackground from "../components/SectionBackground.jsx";
import ScrollProgress from "../components/ScrollProgress.jsx";

// Premium components

import StaggeredText from "../components/StaggeredText.jsx";
import HorizontalGallery from "../components/HorizontalGallery.jsx";
import SkillsAccordion from "../components/SkillsAccordion.jsx";
import MagneticButton from "../components/MagneticButton.jsx";
import ParallaxShowcase from "../components/ParallaxShowcase.jsx";


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
  // Hero shutter scroll animation
  const heroWrapperRef = useRef(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroWrapperRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroScrollProgress, [0, 1], ['0%', '-30%']);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.8, 1], [1, 0.6, 0]);
  const heroScale = useTransform(heroScrollProgress, [0, 1], [1, 0.97]);

  // Respect prefers-reduced-motion
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Scroll to section handler
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Scroll Progress Bar */}

      <ScrollProgress />


      {/* Background Effects Layer */}
      <BackgroundEffects />

      <Navbar onNavigate={scrollToSection} />

      <div className="relative z-10">

        {/* Hero with shutter scroll animation */}
        <div
          ref={heroWrapperRef}
          className="relative overflow-hidden"
          style={{ minHeight: '100vh' }}
        >
          <motion.div
            style={reducedMotion ? {} : {
              y: heroY,
              opacity: heroOpacity,
              scale: heroScale,
            }}
            className="will-change-transform origin-top"
          >
            <Hero />
          </motion.div>
        </div>

        <div className="section-theme relative">

          {/* Animated background pattern for all non-Hero sections */}
          <SectionBackground />
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
          <section id="projects-showcase" className="py-20 lg:py-28 px-4 lg:px-8">
            <SectionHeading text="PROJECTS" className="mb-2" />
            <p className="text-[#C8553D] text-lg ml-6 sm:ml-12 mb-12 plus-jakarta-sans-medium">
              Scroll to explore my work
            </p>
            <HorizontalGallery items={galleryItems} />
          </section>

          {/* Original projects grid */}
          {/* <section id="projects" className={`${BASE_SECTION_CLASS} min-h-[500px] pb-8`}>
          <SectionHeading text="ALL PROJECTS" />
          <ProjectsSection />
        </section> */}

          <section id="certificates-section" className="py-20 lg:py-28 px-4 lg:px-8">
            <SectionHeading text="CERTIFICATES" />
            <Certificates />
          </section>

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
