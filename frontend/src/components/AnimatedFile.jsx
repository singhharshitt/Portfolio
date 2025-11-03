import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiPython,
  SiPhp,
  SiDocker,
  SiSolidity,
  SiGithub,
} from "react-icons/si";

export default function FolderWithDocuments({ title = "Frontend", type = "frontend", cards = [] }) {
  const [open, setOpen] = useState(false);

  const folderColors = {
    frontend: {
      base: "bg-[#FFE8C5]",
      flap: "bg-[#FFD395]",
      spine: "bg-[#FFD395]",
      text: "text-[#3b2f2f]",
    },
    backend: {
      base: "bg-[#E1E4E8]",
      flap: "bg-[#C8CCD1]",
      spine: "bg-[#C8CCD1]",
      text: "text-[#1a1a1a]",
    },
    devops: {
      base: "bg-[#FFF7E6]",
      flap: "bg-[#FBE3B9]",
      spine: "bg-[#FBE3B9]",
      text: "text-[#2c2c2c]",
    },
    core: {
      base: "bg-[#E0F3F2]",
      flap: "bg-[#BFE4E1]",
      spine: "bg-[#BFE4E1]",
      text: "text-[#1a2e2e]",
    },
  };

  const colors = folderColors[type] || folderColors.frontend;

  // Folder animation
  const folderVariants = {
    closed: {
      rotateY: 0,
      scale: 1,
      boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
      transition: { type: "spring", stiffness: 200, damping: 18 },
    },
    open: {
      rotateY: -15,
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
      transition: { type: "spring", stiffness: 150, damping: 20 },
    },
  };

  // Cards container stagger
  const cardsContainer = {
    open: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
    closed: { transition: { staggerChildren: 0.07, staggerDirection: -1 } },
  };

  // Each document card
  const cardVariants = {
    closed: { opacity: 0, x: -20, y: 20, rotate: -5, scale: 0.9 },
    open: (i) => {
      // smaller positions on mobile
      if (window.innerWidth < 640) {
        return {
          opacity: 1,
          x: 30 + (i % 2) * 90,
          y: Math.floor(i / 2) * 110 - 20,
          rotate: (i % 2 - 1) * 4,
          scale: 1,
          transition: { type: "spring", stiffness: 260, damping: 20 },
        };
      } else {
        return {
          opacity: 1,
          x: 60 + (i % 3) * 110,
          y: Math.floor(i / 3) * 130 - 40,
          rotate: (i % 3 - 1) * 5,
          scale: 1,
          transition: { type: "spring", stiffness: 260, damping: 20 },
        };
      }
    },
  };
  return (
    <div className="mt-5 select-none flex justify-start sm:justify-start md:justify-start lg:ml-16 sm:ml-8 ml-4">
      <div className="relative flex items-center">
        {/* Folder Body */}
        <motion.div
          className={`relative w-28 sm:w-32 md:w-36 lg:w-40 h-32 sm:h-36 md:h-40 lg:h-44 ${colors.base} rounded-md shadow-lg cursor-pointer transition-all duration-300`}
          variants={folderVariants}
          animate={open ? "open" : "closed"}
          onClick={() => setOpen(!open)}
          style={{ transformStyle: "preserve-3d" }}
          whileHover={{ scale: 1.05 }}
        >
          {/* Folder Flap */}
          <motion.div
            className={`absolute top-0 left-0 w-full h-6 sm:h-7 md:h-8 ${colors.flap} rounded-t-md shadow-sm`}
            animate={{
              rotateX: open ? -25 : 0,
              transformOrigin: "top center",
              transition: { duration: 0.3 },
            }}
          />

          {/* Label */}
          <div
            className={`absolute inset-0 flex items-center justify-center text-xs sm:text-sm md:text-base font-semibold ${colors.text} space-grotesk-label`}
          >
            {title}
          </div>

          {/* Folder Spine */}
          <div className={`absolute right-0 top-0 w-1 sm:w-2 h-full ${colors.spine} rounded-r-md shadow-inner`} />
        </motion.div>

        {/* 📄 Animated Cards/Documents */}
        <AnimatePresence>
          {open && (
            <motion.div
              className="absolute left-[6.5rem] sm:left-[7.5rem] md:left-[9rem] lg:left-[10rem] flex flex-wrap w-[320px] sm:w-[360px] md:w-[400px] lg:w-[430px] h-[250px] sm:h-[270px] md:h-[280px]"
              variants={cardsContainer}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {cards.map((item, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={cardVariants}
                  className="absolute w-24 sm:w-28 h-28 sm:h-32 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-lg shadow-md flex flex-col items-center justify-center text-[0.75rem] sm:text-sm font-medium text-slate-700 cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-transform duration-300"
                  style={{ zIndex: cards.length - i }}
                  whileHover={{ scale: 1.05 }}
                >
                  {item.icon && (
                    <item.icon
                      size={30}
                      className="mb-2 text-slate-700 sm:mb-3 sm:size-[34px]"
                    />
                  )}
                  {item.name}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
