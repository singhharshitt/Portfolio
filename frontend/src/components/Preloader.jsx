import React from "react";
import { motion } from "motion/react";
import Ink from "./Inksplash";
import Hand from "./HandWriting";

const PreLoader = () => {
  return (
    <motion.div className="min-h-screen bg-blend-color-burn bg-black relative">
      
     
      <motion.h1
        className="text-sm md:text-xl text-white absolute p-5 font-departure"
        animate={{ x: "calc(100vw - 100%)", y: 0 }}
        transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
      >
        Loading
      </motion.h1>

      {/* Center Content */}
      <div className="flex justify-center items-center text-white min-h-screen">
        <motion.h2 className="text-5xl md:text-7xl font-fliege font-bold">
          HARSHIT
          <motion.span
            className="font-snpro text-5xl md:text-9xl"
            animate={{ rotate: 360 }}
            transition={{ delay: 2, duration: 1 }}
          >
            .
          </motion.span>
        </motion.h2>
      </div>
    </motion.div>
  );
};

export default PreLoader;
