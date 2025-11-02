import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';
import {
  SiHtml5, SiCss3, SiNodedotjs, SiCplusplus, SiJavascript, SiC, SiOpenjdk, SiMongodb,
  SiExpress, SiPython,
  SiPhp,
  SiSolidity,
  SiGithub,
  SiDocker,
  SiThreedotjs,
} from "react-icons/si";
export default function FolderWithDocuments() {
  const [open, setOpen] = useState(false);

  const cards = [
    

  ];

  // Folder motion variants with realistic open/close motion
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

  // Cards container controlling stagger timing
  const cardsContainer = {
    open: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.25,
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.07,
        staggerDirection: -1,
      },
    },
  };

  // Each document card animation
  const cardVariants = {
    closed: {
      opacity: 0,
      x: -20,
      y: 20,
      rotate: -5,
      scale: 0.9,
    },
    open: (i) => ({
      opacity: 1,
      x: 60 + (i % 3) * 110,
      y: Math.floor(i / 3) * 130 - 40,
      rotate: (i % 3 - 1) * 5,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    }),
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative flex items-center">
        {/* Folder element */}
        <motion.div
          className="relative w-36 h-44 bg-amber-200 border border-amber-300 rounded-md shadow-lg cursor-pointer"
          variants={folderVariants}
          animate={open ? "open" : "closed"}
          onClick={() => setOpen(!open)}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Folder flap */}
          <motion.div
            className="absolute top-0 left-0 w-full h-8 bg-amber-300 rounded-t-md shadow-sm"
            animate={{
              rotateX: open ? -25 : 0,
              transformOrigin: "top center",
              transition: { duration: 0.3 },
            }}
          />

          {/* Label */}
          <div className="absolute inset-0 flex items-center justify-center font-semibold text-amber-900 text-lg select-none">
            Frontend
          </div>

          {/* Folder spine (for realism) */}
          <div className="absolute right-0 top-0 w-2 h-full bg-amber-400 rounded-r-md shadow-inner" />
        </motion.div>

        {/* Animated documents/cards */}
        <AnimatePresence>
          {open && (
            <motion.div
              className="absolute left-40 flex flex-wrap w-[380px] h-[280px]"
              variants={cardsContainer}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {cards.map((item, i) => (
                <motion.div
                  key={item}
                  custom={i}
                  variants={cardVariants}
                  className="absolute w-28 h-36 bg-white border border-slate-200 rounded-lg shadow-md flex items-center justify-center text-sm font-medium text-slate-700 cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-transform duration-300"
                  style={{ zIndex: cards.length - i }}
                >
                  {item}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
