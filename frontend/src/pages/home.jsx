import React from "react";
import { href, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faAddressCard } from "@fortawesome/free-solid-svg-icons";
import Dock from "../components/Dock.jsx";
import { VscHome, VscAccount } from "react-icons/vsc";
import me from "../assets/me.jpg";
import me1 from "../assets/me1.png";
import { useState } from "react";

import ProfileCard from "../components/ProfileCard.jsx";
import { motion, time } from "framer-motion";
import github from "../assets/github.jpg";
import bgImage from "../assets/bg1.png";
import bgImage2 from "../assets/bg2.png";
import LogoLoop from "../components/LogoLoop.jsx";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';
import clogo from "../assets/Clogo.svg";
import AnimatedFile from "../components/AnimatedFile.jsx";
import {
  SiHtml5, SiCss3, SiNodedotjs, SiCplusplus, SiJavascript, SiC, SiOpenjdk, SiMongodb,
  SiExpress, SiPython,
  SiPhp,
  SiSolidity,
  SiGithub,
  SiDocker,
  SiThreedotjs,
} from "react-icons/si";

function Home() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
  const imageLogos = [
    { src: { clogo }, alt: "Company 1", href: "https://company1.com" },
    { src: "/logos/company2.png", alt: "Company 2", href: "https://company2.com" },
    { src: "/logos/company3.png", alt: "Company 3", href: "https://company3.com" },
  ];

  return (
    <>
      <div
        className="fixed inset-0  -z-10"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
      <nav className=" flex justify-between fixed min-w-full p-4 lg:p-7 md:p-7 z-50 backdrop-blur-xl text-[#111827]">
        <div className="flex flex-col justify-center items-center">
          <h1 className=" font-fliege text-4xl lg:text-[40px] font-extrabold">
            HARSHIT
            <span className="font-snpro text-orange-400 text-5xl">.</span>
          </h1>
        </div>
        <div className="flex gap-6 lg:gap-10 mr-5 p-0.5">
          <div className="flex flex-col justify-center items-center">
            <Link to="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="32px"
                viewBox="0 -960 960 960"
                width="32px"
                fill="#000000"
              >
                <path d="M185-80q-16.33 0-29.17-12.83Q143-105.67 143-122v-105q0-90 56-159t144-88q-40 28-62 70.5T259-312v190q0 11 3 22t10 20h-87Zm147 0q-17 0-29.5-12.5T290-122v-190q0-70 49.5-119T459-480h189q70 0 119 49t49 119v64q0 70-49 119T648-80H332Zm148-484q-66 0-112-46t-46-112q0-66 46-112t112-46q66 0 112 46t46 112q0 66-46 112t-112 46Z" />
              </svg>
            </Link>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="cursor-pointer"
            >
              <svg
                className={`${isSidebarOpen ? "hidden" : "block"
                  } w-6 h-6 lg:w-8 lg:h-8`}
                xmlns="http://www.w3.org/2000/svg"
                height="28px"
                width="28px"
                viewBox="0 -960 960 960"
                fill="#000000"
              >
                <path d="M120-240v-80h520v80H120Zm664-40L584-480l200-200 56 56-144 144 144 144-56 56ZM120-440v-80h400v80H120Zm0-200v-80h520v80H120Z" />
              </svg>

              <svg
                className={`${isSidebarOpen ? "block" : "hidden"
                  } w-6 h-6 lg:w-8 lg:h-8`}
                xmlns="http://www.w3.org/2000/svg"
                height="28px"
                width="28px"
                viewBox="0 -960 960 960"
                fill="#000000"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      {/* sidebar */}
      <div
        className={`
  flex-col border-2 border-black h-[360px] w-[260px] absolute right-4 lg:right-[30px] top-[110px] 
  gap-4 font-snpro p-2 z-40 flex bg-white
  transition-all duration-300 ease-in-out transform
  ${isSidebarOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0 pointer-events-none"
          }
`}
      >
        <div className="border-b-4 border-dotted text-[30px] font-bold text-center min-w-full py-8 px-2 Neu">
          CODE CRAFTED
        </div>
        <div className="text-[28px] text-center border-b border-dashed">
          <Link to="#">Work</Link>
        </div>
        <div className="text-[28px] text-center border-b border-dashed">
          <Link to="#">About</Link>
        </div>
        <div className="text-[28px] text-center border-b border-dashed">
          <Link to="#">Testimonial</Link>
        </div>
        <div className="flex gap-3 py-2 justify-around">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-[28px] h-[28px]"
          >
            <path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-[28px] h-[28px]"
          >
            <path d="M10.4883 14.651L15.25 21H22.25L14.3917 10.5223L20.9308 3H18.2808L13.1643 8.88578L8.75 3H1.75L9.26086 13.0145L2.31915 21H4.96917L10.4883 14.651ZM16.25 19L5.75 5H7.75L18.25 19H16.25Z"></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            class="bi bi-linkedin"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
          </svg>
        </div>
      </div>
      <div className="relative z-10 pt-3">
        <section
          className="my-20 lg:my-28 mx-4 lg:mx-8 rounded-3xl border-2 min-h-[500px] lg:min-h-[645px] text-[#111827]"
          style={{ backgroundImage: `url(${bgImage2})` }}
        >
          <div className="flex flex-col lg:flex-row w-full">
            <div className="w-full lg:w-1/2 h-full">
              <div className="flex flex-col gap-4 w-full py-6 lg:py-10 px-4 lg:ml-12">
                <p className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-snpro mt-16 lg:mt-28">
                  Hey,
                </p>
                <p className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-snpro">
                  I am <span className="text-orange-400">Harshit</span>
                </p>
                <h2 className="lexend-exa-bold text-2xl sm:text-3xl md:text-4xl lg:text-7xl max-w-full lg:max-w-[640px] mt-4">
                  FULL STACK DEVELOPER
                </h2>
              </div>
            </div>

            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end lg:mt-12 lg:relative lg:right-[10px]">
              <div className="scale-75 lg:scale-100 -mt-8 lg:mt-0">
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
            </div>
            <div className=" flex relative left-[110px]  lg:top-[150px] ">
              <p className="font-bold font-snpro text-3xl">
                <i>“Ideas to reality with code”</i>
              </p>
            </div>

            <div className="w-full lg:w-auto flex justify-center lg:block lg:relative lg:right-[80px] lg:top-[500px] mt-8 lg:mt-0 -mb-4 lg:mb-0">
              <button className="px-4 lexend-exa-bold rounded-xl text-md border-2 w-[150px] flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
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
        </section>

        {/* ABOUT ME */}

        <section
          className="my-20 lg:my-28 mx-4 lg:mx-8 rounded-3xl border-2 min-h-[500px] lg:min-h-[655px] text-[#111827] bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage2})` }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-6xl lexend-exa-bold m-4 mt-10 ml-6 sm:ml-12">
            ABOUT ME<span className="text-orange-400">.</span>
          </h2>

          <div className="flex flex-col lg:flex-row justify-between items-start gap-10 px-4 sm:px-6 lg:px-10">
            {/* Left side boxes */}
            <div className="flex flex-col gap-8 w-full lg:w-[50%]">
              <div className="plus-jakarta-sans-medium bg-[#f8f8f6] shadow-md rounded-xl overflow-hidden border-b-4 border-r-4 border-orange-400 group p-6 transition-all duration-500 ease-in-out hover:scale-105 hover:rounded-none hover:shadow-xl relative lg:h-[300px]">
                <div className="absolute inset-0 border-2 border-orange-400 opacity-0 rotate-6 transition-all duration-500 ease-in-out group-hover:inset-4 group-hover:opacity-100 group-hover:rotate-0"></div>

                <div className="relative z-10 text-[#111827]">
                  <p className="text-base sm:text-lg leading-relaxed text-justify lg:p-4">
                    I’m{" "}
                    <span className="text-orange-400 font-semibold">
                      Harshit Singh
                    </span>
                    , a third-year Computer Science student at Lovely
                    Professional University. I specialize in Full Stack
                    Development using the MERN stack and building dynamic web
                    applications with Firebase. Proficient in PHP, Java, C, and
                    C++, I’m a creative problem-solver passionate about
                    designing clean, user-friendly, and visually appealing
                    websites that balance functionality and aesthetics.
                  </p>
                </div>

                <span className="absolute left-1/2 -translate-x-1/2 bottom-2 text-[9px] uppercase tracking-[0.5em] text-orange-400 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out bg-[#f8f8f6] px-2">
                  Portfolio
                </span>
              </div>

              <div className="plus-jakarta-sans-medium bg-[#f8f8f6] shadow-md rounded-xl overflow-hidden border-b-4 border-r-4 border-orange-400 group p-6 transition-all duration-500 ease-in-out hover:scale-105 hover:rounded-none hover:shadow-xl relative lg:mt-8">
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
                        Experience:
                      </span>{" "}
                      1 Year
                    </p>
                  </div>
                  <p className="font-bold">
                    <span className="text-orange-400 font-extrabold">
                      Date Of Birth:
                    </span>{" "}
                    24 Oct, 2004
                  </p>
                </div>
              </div>
            </div>

            {/* Right side boxes */}
            <div className="flex flex-col w-full lg:w-[50%] gap-8">
              <div className="plus-jakarta-sans-medium bg-[#f8f8f6] shadow-md rounded-xl overflow-hidden border-b-4 border-r-4 border-orange-400 group p-6 transition-all duration-500 ease-in-out hover:scale-105 hover:rounded-none hover:shadow-xl relative">
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
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                {/* What’s Cooking */}
                <div className="plus-jakarta-sans-medium bg-[#f8f8f6] shadow-md rounded-xl overflow-hidden border-b-4 border-r-4 border-orange-400 group p-6 transition-all duration-500 ease-in-out hover:scale-105 hover:rounded-none hover:shadow-xl relative flex-1">
                  <div className="absolute inset-0 border-2 border-orange-400 opacity-0 rotate-6 transition-all duration-500 ease-in-out group-hover:inset-4 group-hover:opacity-100 group-hover:rotate-0"></div>

                  <div className="relative z-10 text-[#111827]">
                    <h3 className="text-center font-extrabold text-orange-400 text-xl mb-2">
                      What’s Cooking
                    </h3>
                    <ul className="list-disc px-4 list-inside marker:text-orange-400">
                      <li className="font-bold mb-1 text-lg">Zolv</li>
                      <p className="text-sm mb-2">Get Tech News & Insights</p>
                      <li className="font-bold mb-1 text-lg">SKY-X</li>
                      <p className="text-sm mb-2">Smart Currency Exchange</p>
                      <li className="font-bold mb-1 text-lg">Certify</li>
                      <p className="text-sm">
                        Your Next Certificate, Simplified
                      </p>
                    </ul>
                  </div>

                  <span className="absolute left-1/2 -translate-x-1/2 bottom-2 text-[9px] uppercase tracking-[0.5em] text-orange-400 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out bg-[#f8f8f6] px-2">
                    Ongoing
                  </span>
                </div>

                {/* Interests */}
                <div className="flex flex-col lg:h-[240px] gap-3 shrink-0">
                  <div className="plus-jakarta-sans-medium bg-[#f8f8f6] shadow-md rounded-xl overflow-hidden border-b-4 border-r-4 border-orange-400 group p-6 transition-all duration-500 ease-in-out hover:scale-105 hover:rounded-none hover:shadow-xl relative flex-1 ">
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
                  </div>
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
                      ></span>
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>


        <section className="my-20 lg:my-28 mx-4 lg:mx-8 rounded-3xl border-2 min-h-[500px] lg:min-h-[650px]">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl lexend-exa-bold m-4 mt-10 ml-6 sm:ml-12 mb-8">
            TECH STACK<span className="text-orange-400">.</span>
          </h2>
          <div style={{ height: '200px', position: 'relative', overflow: 'hidden' }} className="mt-4 mx-6 ">
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
          </div>

          <div className="grid grid-cols-2">
            <div className="">
              <div className="">
                <h3>FRONTEND</h3>
                <AnimatedFile />
              </div>
              <div className="">
                <h3>BACKEND</h3>
                <AnimatedFile />
              </div> 
            </div>
            <div>
                <div>
                  <h3>Core Langs</h3>
                  <AnimatedFile />
                </div>
                <div>
                  <h3>Tools & Platforms</h3>
                  <AnimatedFile />
                </div>

              </div>


          </div>
        </section>
        <section className="my-20 lg:my-28 mx-4 lg:mx-8 rounded-3xl border-2 min-h-[500px] lg:min-h-[650px]">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl lexend-exa-bold m-4 mt-10 ml-6 sm:ml-12 mb-8">
            ACHIEVEMENTS<span className="text-orange-400">.</span>
          </h2>
          

        </section>
        <section className="my-20 lg:my-28 mx-4 lg:mx-8 rounded-3xl border-2 min-h-[500px] lg:min-h-[650px]">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl lexend-exa-bold m-4 mt-10 ml-6 sm:ml-12 mb-8">
            BLOGS<span className="text-orange-400">.</span>
          </h2>
        </section>
        <section className="my-20 lg:my-28 mx-4 lg:mx-8 rounded-3xl border-2 min-h-[500px] lg:min-h-[650px]">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl lexend-exa-bold m-4 mt-10 ml-6 sm:ml-12 mb-8">
            LET's CONNECT<span className="text-orange-400">.</span>
          </h2>
        </section>
        <footer>

        </footer>
      </div>
    </>
  );
}

export default Home;
