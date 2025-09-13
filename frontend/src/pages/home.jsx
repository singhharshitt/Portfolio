import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
function Home() {
    return (
        <>
            <nav className="top-0 fixed w-full z-50 px-5 py-5">
                <div className="flex justify-between p-4">
                    <h2 className="text-3xl ">Harshit</h2>
                    <div className="flex gap-3">
                        <Link to="\">Home</Link>
                        <Link to="\work">Work</Link>
                        <Link to="\About">About</Link>
                    </div>
                    <div>
                        <Link to="#">Contact</Link>
                    </div>
                </div>



            </nav>
            <section>

            </section>
        </>
    )
}
export default Home;