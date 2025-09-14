
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faAddressCard } from "@fortawesome/free-solid-svg-icons";
import Dock from "../components/Dock.jsx";
import { VscHome, VscAccount } from 'react-icons/vsc';



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
    <>
      <nav className="top-0 fixed w-full z-50 px-5 py-5">
        <div className="flex justify-between p-4">
            <div className="flex flex-col justify-center items-center">
          <h2 className="text-3xl font-snpro font-extrabold">HARSH<span className="font-fliege font-extrabold">IT</span><span className="text-orange-400">.</span></h2>
          </div>
          <div className="flex gap-3">
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
                height="30px"
                viewBox="0 -960 960 960"
                width="30px"
                fill="#000000"
              >
                <path d="M185-80q-16.33 0-29.17-12.83Q143-105.67 143-122v-105q0-90 56-159t144-88q-40 28-62 70.5T259-312v190q0 11 3 22t10 20h-87Zm147 0q-17 0-29.5-12.5T290-122v-190q0-70 49.5-119T459-480h189q70 0 119 49t49 119v64q0 70-49 119T648-80H332Zm148-484q-66 0-112-46t-46-112q0-66 46-112t112-46q66 0 112 46t46 112q0 66-46 112t-112 46Z" />
              </svg>
            </Link>
          </div>
        </div>
      </nav>
      <section></section>
    </>
  );
}

export default Home;
