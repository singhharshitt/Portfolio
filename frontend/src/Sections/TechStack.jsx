import React from 'react';
import { motion } from 'framer-motion';
import LogoLoop from '../components/LogoLoop.jsx';
import AnimatedFile from '../components/AnimatedFile.jsx';
import {
  SiHtml5, SiCss3, SiNodedotjs, SiCplusplus, SiJavascript, SiC, SiOpenjdk, SiMongodb,
  SiExpress, SiPython, SiPhp, SiDocker, SiGithub, SiReact, SiNextdotjs, SiTypescript, SiTailwindcss
} from 'react-icons/si';

export default function TechStack({ techLogos }) {
  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const logoContainerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.2 }
    }
  };

  const sectionHeaderVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  const folderContainerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section id="techstack" className="my-20 lg:my-28 mx-4 lg:mx-10  backdrop-blur-md">
      <motion.h2
        className="text-3xl sm:text-4xl lg:text-6xl lexend-exa-bold m-6 mt-10 ml-6 sm:ml-12 mb-8"
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        TECH STACK<span className="text-orange-400">.</span>
      </motion.h2>

      {/* Scrolling Logos */}
      <motion.div
        className="mt-4 mx-6 sm:mx-10 overflow-hidden"
        style={{ height: "200px", position: "relative" }}
        variants={logoContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <LogoLoop
          logos={techLogos}
          speed={30}
          direction="left"
          logoHeight={110}
          gap={40}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="#ffffff"
          ariaLabel="Technology partners"
        />
      </motion.div>

      {/* Tech Folders Grid */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16 px-4 sm:px-8 lg:px-12 pb-12">
        {/* Left Column */}
        <div className="flex flex-col gap-16">
          <motion.div
            variants={folderContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.h3
              className="text-xl sm:text-2xl font-semibold mb-3 text-slate-800 tracking-wide"
              variants={sectionHeaderVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              FRONTEND
            </motion.h3>

            <div className="flex justify-start">
              <AnimatedFile
                title="Frontend"
                type="frontend"
                cards={[
                  { name: "React", icon: SiReact },
                  { name: "Next.js", icon: SiNextdotjs },
                  { name: "TypeScript", icon: SiTypescript },
                  { name: "Tailwind", icon: SiTailwindcss },
                  { name: "HTML5", icon: SiHtml5 },
                  { name: "CSS3", icon: SiCss3 },
                ]}
              />
            </div>
          </motion.div>

          <motion.div
            variants={folderContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.h3
              className="text-xl sm:text-2xl font-semibold mb-3 text-slate-800 tracking-wide"
              variants={sectionHeaderVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              BACKEND
            </motion.h3>

            <div className="flex justify-start">
              <AnimatedFile
                title="Backend"
                type="backend"
                cards={[
                  { name: "Node.js", icon: SiNodedotjs },
                  { name: "Express", icon: SiExpress },
                  { name: "MongoDB", icon: SiMongodb },
                  { name: "PHP", icon: SiPhp },
                  { name: "Python", icon: SiPython },
                ]}
              />
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-16">
          <motion.div
            variants={folderContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.h3
              className="text-xl sm:text-2xl font-semibold mb-3 text-slate-800 tracking-wide"
              variants={sectionHeaderVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              DEVOPS & TOOLS
            </motion.h3>

            <div className="flex justify-start">
              <AnimatedFile
                title="DevOps"
                type="devops"
                cards={[
                  { name: "Docker", icon: SiDocker },
                  { name: "GitHub", icon: SiGithub },
                ]}
              />
            </div>
          </motion.div>

          <motion.div
            variants={folderContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.h3
              className="text-xl sm:text-2xl font-semibold mb-3 text-slate-800 tracking-wide"
              variants={sectionHeaderVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              CORE LANGUAGES
            </motion.h3>

            <div className="flex justify-start">
              <AnimatedFile
                title="Languages"
                type="core"
                cards={[
                  { name: "JavaScript", icon: SiJavascript },
                  { name: "Java", icon: SiOpenjdk },
                  { name: "C++", icon: SiCplusplus },
                  { name: "C", icon: SiC },
                ]}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}