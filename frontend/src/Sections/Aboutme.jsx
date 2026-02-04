import React from 'react';
import bgImage2 from '../assets/bg2.png';
import { motion } from 'framer-motion';

function Aboutme() {
  return (
    <>
      <section
        id="about"
        className="my-20 lg:my-28 mx-4 lg:mx-8  min-h-[500px] lg:min-h-[655px] text-[#111827] bg-cover bg-center"
        
      >
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-6xl lexend-exa-bold m-4 mt-10 ml-6 sm:ml-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          ABOUT ME<span className="text-orange-400">.</span>
        </motion.h2>

        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 px-4 sm:px-6 lg:px-10">
          {/* Left side boxes */}
          <div className="flex flex-col gap-8 w-full lg:w-[50%]">
            <motion.div
              className="plus-jakarta-sans-medium bg-[#f8f8f6] shadow-md rounded-xl overflow-hidden border-b-4 border-r-4 border-orange-400 group p-6 transition-all duration-500 ease-in-out hover:scale-105 hover:rounded-none hover:shadow-xl relative lg:min-h-[280px]"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="absolute inset-0 border-2 border-orange-400 opacity-0 rotate-6 transition-all duration-500 ease-in-out group-hover:inset-4 group-hover:opacity-100 group-hover:rotate-0"></div>

              <div className="relative z-10 text-[#111827]">
                <p className="text-base sm:text-lg leading-relaxed text-justify lg:p-4">
                  I'm{" "}
                  <span className="text-orange-400 font-semibold">
                    Harshit Singh
                  </span>
                  , a third-year Computer Science student at Lovely
                  Professional University. I specialize in Full Stack
                  Development using the MERN stack and building dynamic web
                  applications with Firebase. Proficient in PHP, Java, C, and
                  C++, I'm a creative problem-solver passionate about
                  designing clean, user-friendly, and visually appealing
                  websites that balance functionality and aesthetics.
                </p>
              </div>

              <span className="absolute left-1/2 -translate-x-1/2 bottom-2 text-[9px] uppercase tracking-[0.5em] text-orange-400 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out bg-[#f8f8f6] px-2">
                Portfolio
              </span>
            </motion.div>

            <motion.div
              className="plus-jakarta-sans-medium bg-[#f8f8f6] shadow-md rounded-xl overflow-hidden border-b-4 border-r-4 border-orange-400 group p-6 transition-all duration-500 ease-in-out hover:scale-105 hover:rounded-none hover:shadow-xl relative lg:mt-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="absolute inset-0 border-2 border-orange-400 opacity-0 rotate-6 transition-all duration-500 ease-in-out group-hover:inset-4 group-hover:opacity-100 group-hover:rotate-0"></div>

              <div className="flex flex-col p-3 space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                  <p className="font-bold">
                    <span className="text-orange-400 font-extrabold">
                      Born In:
                    </span>{" "}
                    Varanasi, India
                  </p>
                 <p className="font-bold">
                  <span className="text-orange-400 font-extrabold">
                    Date Of Birth:
                  </span>{" "}
                  24 Oct, 2004
                </p>
                </div>
                
              </div>
            </motion.div>
          </div>

          {/* Right side boxes */}
          <div className="flex flex-col w-full lg:w-[50%] gap-8">
            <motion.div
              className="plus-jakarta-sans-medium bg-[#f8f8f6] shadow-md rounded-xl overflow-hidden border-b-4 border-r-4 border-orange-400 group p-6 transition-all duration-500 ease-in-out hover:scale-105 hover:rounded-none hover:shadow-xl relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="absolute inset-0 border-2 border-orange-400 opacity-0 rotate-6 transition-all duration-500 ease-in-out group-hover:inset-4 group-hover:opacity-100 group-hover:rotate-0"></div>

              <div className="relative z-10 text-[#111827]">
                <h3 className="text-center font-extrabold text-orange-400 text-xl mb-2">
                  Academics
                </h3>
                <p className="font-bold mx-2 mb-1">
                  <span className="text-orange-400 font-extrabold">
                    2022-2023:{" "}
                  </span>
                  Higher Secondary
                </p>
                <p className="text-sm mx-2 mb-2">Jeevandeep Public School</p>
                <p className="font-bold mx-2 mb-1">
                  <span className="text-orange-400 font-extrabold">
                    2023-2027:
                  </span>{" "}
                  B. Tech in Computer Science and Engineering
                </p>
                <p className="text-sm mx-2 mb-2">
                  Lovely Professional University
                </p>
              </div>

              <span className="absolute left-1/2 -translate-x-1/2 bottom-2 text-[9px] uppercase tracking-[0.5em] text-orange-400 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out bg-[#f8f8f6] px-2">
                Education
              </span>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-6">
              
              

              {/* Interests */}
              <div className="flex flex-col lg:h-[240px] gap-3 shrink-0">
                <motion.div
                  className="plus-jakarta-sans-medium bg-[#f8f8f6] shadow-md rounded-xl overflow-hidden border-b-4 border-r-4 border-orange-400 group p-6 transition-all duration-500 ease-in-out hover:scale-105 hover:rounded-none hover:shadow-xl relative flex-1 "
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="absolute inset-0 border-2 border-orange-400 opacity-0 rotate-6 transition-all duration-500 ease-in-out group-hover:inset-4 group-hover:opacity-100 group-hover:rotate-0"></div>

                  <div className="relative z-10 text-[#111827]">
                    <h3 className="text-center font-extrabold text-orange-400 text-xl mb-2">
                      Interests
                    </h3>
                    <ul className="list-disc px-3 list-inside marker:text-orange-400 space-y-1">
                      <li>Hackathons & Coding Challenges</li>
                      <li>Exploring Income Streams</li>
                      <li>Exploring Next-Gen Tech</li>
                    </ul>
                  </div>
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-2 text-[9px] uppercase tracking-[0.5em] text-orange-400 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out bg-[#f8f8f6] px-2">
                    Beyond Coding
                  </span>
                </motion.div>
                <div className="text-center relative lg:ml-22 lg:mt-2">
                  <button
                    className="relative overflow-hidden border-2 border-orange-400 
                                  p-3 rounded-xl plus-jakarta-sans-bold
                                  flex items-center justify-center cursor-pointer
                                  group">
                    <span className="relative z-10">Let's Connect</span>

                    {/* Top wave */}
                    <span
                      className=" absolute w-full h-[10%] top-0 rotate-180 bg-orange-400 z-0 transition-all duration-300 ease-in-out group-hover:h-[80%] 
                        clip-wave group-hover:clip-wave-hover"></span>

                    {/* Bottom wave */}
                    <span
                      className="absolute w-full h-[10%] bottom-0 bg-orange-400 z-0 transition-all duration-300 ease-in-out
                        group-hover:h-[80%] clip-wave group-hover:clip-wave-hover"
                    >
                    </span>
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>


    </>


  )
}

export default Aboutme;