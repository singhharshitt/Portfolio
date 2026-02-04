import React from 'react';
import bgImage2 from '../assets/bg2.png';
import me1 from '../assets/me1.png';
import ProfileCard from '../components/ProfileCard.jsx';
import { motion } from 'framer-motion';

function HeroSection() {
  return (
    <>
      <div className="flex flex-col lg:flex-row w-full">
        <div className="w-full lg:w-1/2 h-full">
          <motion.div
            className="flex flex-col gap-4 w-full py-6 lg:py-10 px-4 lg:ml-12"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-snpro mt-16 lg:mt-28">
              Hey,
            </p>
            <p className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-snpro">
              I am <span className="text-orange-400">Harshit</span>
            </p>
            <h2 className="lexend-exa-bold text-2xl sm:text-3xl md:text-4xl lg:text-7xl max-w-full lg:max-w-[640px] mt-4">
              FULL STACK DEVELOPER
            </h2>
          </motion.div>
        </div>

        <motion.div
          className="w-full lg:w-1/2 flex justify-center lg:justify-end lg:mt-12 lg:relative lg:right-[10px]"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <div className="scale-[0.65] sm:scale-75 lg:scale-100 -mt-8 lg:mt-0">
            <ProfileCard
              name="Harshit Singh"
              title="Full Stack Developer"
              handle="singhharshitt"
              status="Online"
              contactText="Contact Me"
              avatarUrl={me1}
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => console.log("Contact clicked")}
            />
            {/* <div className="">
                <div className="">
                  <img/>
                </div>
                <div className="flex">
                  <div>
                    <img />
                    
                  </div>
                  <div>
                    <h3></h3>
                  </div>

                </div>
              </div> */}
          </div>
        </motion.div>
        <div className="flex justify-center lg:justify-start px-4 sm:px-8 lg:pl-32 lg:pr-0 mt-8 lg:mt-0 lg:relative lg:top-[150px]">
          <p className="font-bold font-snpro text-2xl sm:text-3xl text-center lg:text-left">
            <i>“Ideas to reality with code”</i>
          </p>
        </div>

        <div className="w-full flex justify-center px-4 mt-8 mb-4 lg:mt-0 lg:mb-0 lg:absolute lg:bottom-8 lg:right-16">
          <button className="px-6 lexend-exa-bold rounded-xl text-md border-2 w-auto flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
            <span className="flex items-center gap-2 py-2">Explore</span>
            <span className="border-l-2 border-dashed pl-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="#000000"
              >
                <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </>
  )
}
export default HeroSection