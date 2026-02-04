import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ isSidebarOpen, setIsSidebarOpen }) {
  return (
    <>
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
                  } w - 6 h - 6 lg: w - 8 lg: h - 8`}
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
                  } w - 6 h - 6 lg: w - 8 lg: h - 8`}
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
    </>
  )
}