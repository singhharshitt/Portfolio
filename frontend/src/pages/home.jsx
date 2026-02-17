
import { motion } from "framer-motion";
import {
  SiHtml5, SiCss3, SiNodedotjs, SiCplusplus, SiJavascript, SiC, SiOpenjdk, SiMongodb,
  SiExpress, SiPython, SiPhp, SiSolidity, SiGithub, SiDocker, SiThreedotjs,
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss
} from 'react-icons/si';

import { useNavigate } from 'react-router-dom';



import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import JourneyTimeline from "../components/TimeLine.jsx";
import BackgroundEffects from "../components/BackgroundEffects.jsx";
import PaperPlane from "../components/PaperPlane.jsx";

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
    subtitle: 'React · Next.js · Tailwind',
    description: 'Building responsive, performant UIs with modern frameworks. Component-driven architecture with a focus on accessibility and animation.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    id: 2,
    title: 'Backend Engineering',
    subtitle: 'Node.js · Express · MongoDB',
    description: 'Designing scalable APIs, real-time services with Socket.io, and robust database architectures with MongoDB and Mongoose.',
    technologies: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'Socket.io'],
  },
  {
    id: 3,
    title: 'DevOps & Tools',
    subtitle: 'Docker · Git · CI/CD',
    description: 'Containerized deployments, version control workflows, and automated pipelines for reliable and fast shipping.',
    technologies: ['Docker', 'GitHub Actions', 'Vercel', 'Linux', 'Nginx'],
  },
  {
    id: 4,
    title: 'UI/UX Design',
    subtitle: 'Figma · Motion Design',
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

function Home() {
  const navigate = useNavigate();

  // Scroll to section handler
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };
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

  return (
    <>
      {/* Background Effects Layer */}
      <BackgroundEffects />

      {/* Paper Plane Scroll Animation */}
      <PaperPlane sections={['hero', 'about', 'techstack', 'journey', 'projects', 'blog', 'connect']} />

      {/* Theme Wipe Overlay */}
      <ThemeWipe sectionIds={wipeConfig} />

      <Navbar onNavigate={scrollToSection} />

      <div className="relative z-10">

        <Hero />

        {/* ABOUT ME */}
        <div className="relative z-10">
          <Aboutme />
        </div>

        {/* SKILLS ACCORDION */}
        <section id="skills" className="my-20 lg:my-28 mx-4 lg:mx-8 min-h-[400px]">
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


        <section className="my-20 lg:my-28 mx-4 lg:mx-10 backdrop-blur-md">
          <TechStack techLogos={techLogos} />
        </section>

        {/* PARALLAX CODE SHOWCASE */}
        <section id="code-showcase" className="my-20 lg:my-28 mx-4 lg:mx-8">
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-6xl lexend-exa-bold m-4 mt-10 ml-6 sm:ml-12 mb-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            CODE<span className="text-orange-400">.</span>
          </motion.h2>
          <ParallaxShowcase />
        </section>

        <section id="journey" className="my-20 lg:my-28 mx-4 lg:mx-8  min-h-[500px] lg:min-h-[650px]">
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-6xl lexend-exa-bold m-4 mt-10 ml-6 sm:ml-12 mb-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            MY JOURNEY<span className="text-orange-400">.</span>
          </motion.h2>
          <JourneyTimeline />


        </section>

        {/* PROJECTS — Dark theme section */}
        <ThemeSection theme="dark" id="projects-showcase" className="py-20 lg:py-28 px-4 lg:px-8">
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-6xl lexend-exa-bold m-4 mt-10 ml-6 sm:ml-12 mb-2 text-[#F7F4F3]"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            PROJECTS<span className="text-orange-400">.</span>
          </motion.h2>
          <p className="text-[#C69C72] text-lg ml-6 sm:ml-12 mb-12 plus-jakarta-sans-medium">
            Scroll to explore my work
          </p>
          <HorizontalGallery items={galleryItems} />
        </ThemeSection>

        {/* Original projects grid */}
        <section id="projects" className="my-20 lg:my-28 mx-4 lg:mx-8  min-h-[500px] pb-8">
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-6xl lexend-exa-bold m-4 mt-10 ml-6 sm:ml-12 mb-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            ALL PROJECTS<span className="text-orange-400">.</span>
          </motion.h2>
          <ProjectsSection />
        </section>

        <section id="certificates" className="my-20 lg:my-28 mx-4 lg:mx-8 min-h-[400px]">
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-6xl lexend-exa-bold m-4 mt-10 ml-6 sm:ml-12 mb-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            CERTIFICATES<span className="text-orange-400">.</span>
          </motion.h2>
          <Certificates />
        </section>

        <section id="blog" className="my-20 lg:my-28 mx-4 lg:mx-8  min-h-[500px] pb-0">
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-6xl lexend-exa-bold m-4 mt-10 ml-6 sm:ml-12 mb-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            BLOG<span className="text-orange-400">.</span>
          </motion.h2>
          <BlogSection />
        </section>


        <section id="connect" className="my-20 lg:my-28 mx-4 lg:mx-8  min-h-[400px] pb-0">
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-6xl lexend-exa-bold m-4 mt-10 ml-6 sm:ml-12 mb-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            LET'S CONNECT<span className="text-orange-400">.</span>
          </motion.h2>
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
    </>
  );
}

export default Home;
