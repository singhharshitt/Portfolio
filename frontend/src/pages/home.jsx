import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  SiHtml5, SiCss3, SiNodedotjs, SiCplusplus, SiJavascript, SiC, SiOpenjdk, SiMongodb,
  SiExpress, SiPython, SiPhp, SiSolidity, SiGithub, SiDocker, SiThreedotjs,
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss
} from 'react-icons/si';

import bgImage from "../assets/bg1.png";
import bgImage2 from "../assets/bg2.png";

import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Footer from "../components/Footer.jsx";
import JourneyTimeline from "../components/TimeLine.jsx";

import HeroSection from "../Sections/HeroSection.jsx";
import Aboutme from "../Sections/Aboutme.jsx";
import TechStack from "../Sections/TechStack.jsx";
import ProjectsSection from "../Sections/ProjectsSection.jsx";
import BlogSection from "../Sections/BlogSection.jsx";
import ConnectSection from "../Sections/ConnectSection.jsx";

function Home() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Scroll to section handler
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsSidebarOpen(false); // Close sidebar on mobile after navigation
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
      <div
        className="fixed inset-0  -z-10"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
      <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      {/* Overlay for mobile */}
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} scrollToSection={scrollToSection} />
      <div className="relative z-10 pt-3">
        <section
          className="my-20 lg:my-28 mx-4 lg:mx-8 min-h-[500px] lg:min-h-[645px] text-[#111827]"
          
        >
          <HeroSection />

        </section>

        {/* ABOUT ME */}
        <Aboutme />



        <section id="techstack" className="my-20 lg:my-28 mx-4 lg:mx-10 backdrop-blur-md">
          <TechStack techLogos={techLogos} />
        </section>

        <section id="journey" className="my-20 lg:my-28 mx-4 lg:mx-8  min-h-[500px] lg:min-h-[650px]">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl lexend-exa-bold m-4 mt-10 ml-6 sm:ml-12 mb-8">
            MY JOURNEY<span className="text-orange-400">.</span>
          </h2>
          <JourneyTimeline />


        </section>

        <section id="projects" className="my-20 lg:my-28 mx-4 lg:mx-8  min-h-[500px] pb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl lexend-exa-bold m-4 mt-10 ml-6 sm:ml-12 mb-8">
            PROJECTS<span className="text-orange-400">.</span>
          </h2>
          <ProjectsSection />
        </section>

        <section id="blog" className="my-20 lg:my-28 mx-4 lg:mx-8  min-h-[500px] pb-0">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl lexend-exa-bold m-4 mt-10 ml-6 sm:ml-12 mb-8">
            BLOG<span className="text-orange-400">.</span>
          </h2>
          <BlogSection />
        </section>


        <section id="connect" className="my-20 lg:my-28 mx-4 lg:mx-8  min-h-[400px] pb-0">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl lexend-exa-bold m-4 mt-10 ml-6 sm:ml-12 mb-8">
            LET'S CONNECT<span className="text-orange-400">.</span>
          </h2>
          <ConnectSection />
        </section>
        <Footer />
      </div>
    </>
  );
}

export default Home;
