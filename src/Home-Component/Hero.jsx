import Bible from "../assets/bible-bg.jpg"
import { Link } from "react-router-dom"

function Hero(){
    return(
        <div className="bg-center bg-cover bg-no-repeat h-[80vh] text-center flex flex-col
        justify-center items-center text-white" 
        style={{ backgroundImage: ` linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
            url(${Bible})` }}
        >
            <div className="flex flex-col items-center justify-center mt-[30px]" >
                <h1 className="text-3xl md:text-5xl text-bold drop-shadow-lg">Rev Willy B. Enoch Teachings</h1>
                <p className="italic mt-[10px]">Empowering Your Faith Through the Word</p>
                <Link to="/contact">
                <button className="bg-[#a52a2a] text-white mt-[10px] px-[25px] py-[5px] 
                rounded-2xl font-bold hover:bg-[#db3838] cursor-pointer transition-all">
                    Join our service
                </button>
                </Link>
            </div>
        </div>
    )
}

export default Hero