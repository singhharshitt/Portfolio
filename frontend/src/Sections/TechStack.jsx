import React from 'react';
import { motion } from 'framer-motion';
import LogoLoop from '../components/LogoLoop.jsx';
import AnimatedFile from '../components/AnimatedFile.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import {
  SiHtml5, SiCss3, SiNodedotjs, SiCplusplus, SiJavascript, SiC, SiOpenjdk, SiMongodb,
  SiExpress, SiPython, SiPhp, SiDocker, SiGithub, SiReact, SiNextdotjs, SiTypescript, SiTailwindcss
} from 'react-icons/si';

export default function TechStack({ techLogos }) {
  const categoryHeadingClass = 'text-xl sm:text-2xl font-semibold mb-4 text-charcoal tracking-wide';
  const categoryBodyClass = 'flex justify-center md:justify-start';

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
    <section id="techstack" className="my-20 lg:my-28 mx-4 lg:mx-8 backdrop-blur-md overflow-x-hidden">
      <SectionHeading text="TECH STACK" />

      {/* Scrolling Logos */}
      <motion.div
        className="mt-6 mx-4 sm:mx-8 lg:mx-12 h-[160px] sm:h-[185px] relative overflow-hidden rounded-2xl border border-sand-200/75 bg-sand-100/55 px-2 sm:px-4"
        variants={logoContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <LogoLoop
          logos={techLogos}
          speed={30}
          direction="left"
          logoHeight={88}
          gap={34}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="var(--theme-bg-current, #F0E7D5)"
          ariaLabel="Technology partners"
        />
      </motion.div>

      {/* Tech Folders Grid */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-10 gap-y-14 px-4 sm:px-8 lg:px-12 pb-12">
        {/* Left Column */}
        <div className="flex flex-col gap-14">
          <motion.div
            variants={folderContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.h3
              className={categoryHeadingClass}
              variants={sectionHeaderVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              FRONTEND
            </motion.h3>

            <div className={categoryBodyClass}>
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
              className={categoryHeadingClass}
              variants={sectionHeaderVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              BACKEND
            </motion.h3>

            <div className={categoryBodyClass}>
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
        <div className="flex flex-col gap-14">
          <motion.div
            variants={folderContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.h3
              className={categoryHeadingClass}
              variants={sectionHeaderVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              DEVOPS & TOOLS
            </motion.h3>

            <div className={categoryBodyClass}>
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
              className={categoryHeadingClass}
              variants={sectionHeaderVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              CORE LANGUAGES
            </motion.h3>

            <div className={categoryBodyClass}>
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
