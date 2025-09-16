import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faAddressCard } from "@fortawesome/free-solid-svg-icons";
import Dock from "../components/Dock.jsx";
import { VscHome, VscAccount } from 'react-icons/vsc';
import me from "../assets/me.jpg";



function Home() {
  const navigate = useNavigate();
  const items = [
    {
      icon: <VscHome size={24} />,
      label: "Home",
      onClick: () => navigate("/"),
    },
    {
      icon: <FontAwesomeIcon icon={faBriefcase} size="lg" />,
      label: "Work",
      onClick: () => navigate("/work"),
    },
    {
      icon: <VscAccount size={24} />,
      label: "About",
      onClick: () => navigate("/About"),
    },
    {
      icon: <FontAwesomeIcon icon={faAddressCard} size="lg" />,
      label: "Testimonial",
      onClick: () => navigate("/Testimonal"),
    },
  ];
  return (
    <div className="overflow-hidden">
      <nav className="top-0 fixed w-full px-4 sm:px-5 py-4 sm:py-5">
        <div className="flex justify-between items-center p-3 sm:p-4">


          <div className="flex flex-col justify-center items-center">
            <h2 className="text-[28px] sm:text-[32px] md:text-[38px] font-fliege font-extrabold">
              HARSHIT
              <span className="text-orange-400 font-snpro">.</span>
            </h2>
          </div>


          <div className="flex items-center justify-center mr-4 sm:mr-8 scale-90 sm:scale-100"
            style={{ height: '68px', overflow: 'visible' }}>
            <Dock
              items={items}
              panelHeight={68}
              baseItemSize={50}
              magnification={70}
              className="bg-white/10 backdrop-blur-sm"
            />
          </div>


          <div className="flex flex-col justify-center items-center">
            <Link to="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="36px"
                viewBox="0 -960 960 960"
                width="36px"
                fill="#000000"
              >
                <path d="M185-80q-16.33 0-29.17-12.83Q143-105.67 143-122v-105q0-90 56-159t144-88q-40 28-62 70.5T259-312v190q0 11 3 22t10 20h-87Zm147 0q-17 0-29.5-12.5T290-122v-190q0-70 49.5-119T459-480h189q70 0 119 49t49 119v64q0 70-49 119T648-80H332Zm148-484q-66 0-112-46t-46-112q0-66 46-112t112-46q66 0 112 46t46 112q0 66-46 112t-112 46Z" />
              </svg>
            </Link>
          </div>

        </div>
      </nav>

      <section className="mt-24 sm:mt-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 px-4 sm:px-5 py-5 items-center">
          <div className="order-2 md:order-1 flex justify-center items-center mt-8 md:mt-28 h-full ml-0 md:ml-10">
            <div className="flex flex-col m-auto gap-4 max-w-[640px] w-full px-1">
              <p className="mb-1.5 font-bold text-2xl sm:text-3xl md:text-4xl font-snpro ml-0 sm:ml-1">Hey, I am <span className="text-orange-400">Harshit</span></p>
              <h2 className="mb-5 lexend-exa-bold text-4xl sm:text-6xl lg:text-7xl">FULL STACK DEVELOPER</h2>
              <p className="text-[14px] sm:text-[16px] font-snpro ml-0 sm:ml-1 w-full max-w-[560px] text-justify font-semibold">I’m a Full Stack Developer skilled across modern frameworks, creating scalable, high-performance applications with clean, user-focused design.</p>


              <div className="flex flex-row gap-3 sm:gap-4 mt-5 flex-wrap">
                <button className="px-4 py-3 lexend-exa-bold rounded-xl text-sm border-2 relative overflow-hidden group">
                  <span className="relative transition-colors duration-300 group-hover:text-orange-400 after:absolute after:inset-0 after:content-[''] group-hover:animate-chitchat">
                    Let’s Connect
                  </span>
                </button>

                <button className="px-4 py-3 lexend-exa-bold rounded-xl text-sm border-2 relative overflow-hidden group">
                  <span className="relative transition-colors duration-300 group-hover:text-orange-400 after:absolute after:inset-0 after:content-[''] group-hover:animate-chitchat">
                    Explore Projects
                  </span>
                </button>


              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center items-center mt-8 md:mt-20 h-full">
            <div className="">
              <img
                src={me}
                alt="My Photo"
                className="w-full max-w-[320px] sm:max-w-[420px] md:max-w-[480px] lg:max-w-[520px] h-auto object-cover border-2 border-gray-800 shadow-[4px_4px_0px_#323232] rounded-xl ml-0 md:ml-8"
              />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
