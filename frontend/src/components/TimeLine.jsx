import React from 'react';
import { motion } from 'framer-motion';

const Timeline = () => {
  const timelineEvents = [
    {
      year: "2023",
      title: "Foundation Year",
      description: "Completed 12th (Intermediate), Started learning coding, Learned Python fundamentals, Built basic logic & problem-solving skills",
      type: "type1",
      icon: "🎓"
    },
    {
      year: "2024",
      title: "Exploring Technology",
      description: "Learned C and C++, Started frontend basics: HTML, CSS, JavaScript, Explored UI/UX design principles, Developed interest in AI and automation, Built small practice projects to strengthen concepts",
      type: "type2",
      icon: "🔍"
    },
    {
      year: "2025",
      title: "Becoming a Developer",
      description: "Learned Java, Created chatbots & automation scripts, Built my first real, functional projects, Completed 2 major projects (full-stack + UI/UX focused), Started working on multiple ongoing projects, Learned MERN Stack (MongoDB, Express, React, Node.js), Improved UI/UX design skills, Started building complete full-stack applications, Practicing clean code, API structures, and component-based UI",
      type: "type3",
      icon: "💻"
    },
    {
      year: "Present",
      title: "Full-Stack + Security Focus",
      description: "Developing modern, scalable web applications, Exploring cloud deployment, optimization, and performance",
      type: "type1",
      icon: "🚀"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const lineVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "100%",
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

  const eventVariants = {
    hidden: (index) => ({
      opacity: 0,
      x: index % 2 === 0 ? 100 : -100,
      scale: 0.8
    }),
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  };

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl font-extralight text-center text-gray-800 mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          My Coding Journey Timeline
        </motion.h2>

        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Vertical line with animation */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-purple-400 via-purple-500 to-purple-600 z-0 top-0"
            variants={lineVariants}
          />

          {timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={eventVariants}
              className={`relative flex flex-col md:flex-row mb-12 z-10 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
            >
              {/* Content Card */}
              <motion.div
                className={`w-full md:w-5/12 p-6 rounded-lg shadow-lg bg-white ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                  } hover:shadow-2xl transition-shadow duration-300`}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
              >
                <div className="flex items-center mb-4">
                  <motion.span
                    className="text-2xl mr-3"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    {event.icon}
                  </motion.span>
                  <h3 className="text-xl font-semibold text-purple-600 uppercase tracking-wide">
                    {event.title}
                  </h3>
                </div>
                <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                  {event.description}
                </p>
              </motion.div>

              {/* Year Badge */}
              <div className="w-full md:w-2/12 flex justify-center py-4 md:py-0">
                <motion.div
                  className="bg-gradient-to-br from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg shadow-md font-semibold"
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 10px 20px rgba(147, 51, 234, 0.3)"
                  }}
                >
                  {event.year}
                </motion.div>
              </div>

              {/* Center Dot Icon */}
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-lg z-10 border-4 border-purple-300"
                variants={dotVariants}
                whileHover={{
                  scale: 1.2,
                  borderColor: "#9333ea",
                  boxShadow: "0 0 20px rgba(147, 51, 234, 0.5)"
                }}
              >
                <span className="text-lg">{event.icon}</span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Timeline;