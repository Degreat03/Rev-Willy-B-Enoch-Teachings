import { Link } from "react-router-dom";
import RWT from "./assets/RWT.jpg"
import { useState } from "react";

function NavBar(){
    const [open, setOpen] = useState(false);
    return(
        <div className="flex items-center justify-between py-[10px] px-[50px] bg-white fixed w-full top-0 z-50">
            <div>
                <Link to="/">
                    <img src={RWT} alt="RWT icon" className="w-[40px] h-[40px] rounded-full" />
                </Link>
                
            </div>
            <nav className="flex items-center gap-[20px] font-[600] hidden sm:flex">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/teachings">Rev Willy B. Teachings</Link>
                <Link to="/contact">Contact</Link>
            </nav>
            {/* Toggle Button for Mobile */}
            <button 
            className="sm:hidden text-2xl cursor-pointer" 
            onClick={() => setOpen(!open)}
            >
                {open ? "✕" : "☰"}
            </button>
            {open && (
                <nav className="flex flex-col items-center bg-[#a52a2a] text-white sm:hidden w-full z-40 fixed p-6 gap-5 top-[72px] shadow-lg cursor-pointer">
                    <Link to="/" onClick={() => setOpen(false)}>Home</Link>
                    <Link to="/about" onClick={() => setOpen(false)}>About</Link>
                    <Link to="/teachings" onClick={() => setOpen(false)}>Rev Willy B. Teachings</Link>
                    <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
                </nav>
            )}
        </div>
    )
}

export default NavBar