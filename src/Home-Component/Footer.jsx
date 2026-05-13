import RWTLogo from "../assets/RWT.jpg"
import { Link } from "react-router-dom"

function Footer(){
    return(
        <div className="bg-[#a52a2a] text-white p-[30px] md:p-[50px]">
            {/* Use a grid: 1 column on mobile, 3 columns on medium screens and up */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-[40px] text-center md:text-left">
                
                {/* Section 1: Logo */}
                <div className="flex justify-center md:justify-start">
                    <Link to="/">
                        <img src={RWTLogo} alt="RWT icon" className="w-[70px] h-[70px] rounded-full" />
                    </Link>
                </div>

                {/* Section 2: Quick Links */}
                <nav>
                    <h3 className="mb-[15px] font-bold text-lg">Quick Links</h3>
                    <div className="flex flex-col text-sm gap-2">
                        <Link to="/" className="hover:underline">Home</Link>
                        <Link to="/about" className="hover:underline">About</Link>
                        <Link to="/teachings" className="hover:underline">Rev Willy B. Teachings</Link>
                    </div>
                </nav>

                {/* Section 3: Contact */}
                <div>
                    <h3 className="mb-[15px] font-bold text-lg">Contact</h3>
                    <div className="text-sm flex flex-col gap-3">
                        <span className="flex items-center justify-center md:justify-start gap-2">
                            <i className="bi bi-whatsapp"></i> +234 8035023566
                        </span>
                        <span className="flex items-center justify-center md:justify-start gap-2">
                            <i className="bi bi-facebook"></i> @Willy B Enoch
                        </span>
                        <span className="flex items-center justify-center md:justify-start gap-2">
                            <i className="bi bi-envelope"></i> willybenoch@gmail.com
                        </span>
                    </div>
                </div>
            </div>

            {/* Copyright Bar */}
            <hr className="border-white/20 mb-6" />
            <p className="text-center text-xs opacity-80">
                &copy; 2026 Rev Willy B. Enoch Teachings. All rights reserved.
            </p>
        </div>
    )
}

export default Footer