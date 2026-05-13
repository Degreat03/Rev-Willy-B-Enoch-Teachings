import MyPastorImg from '../assets/my-pastor2.jpeg'
import { Link } from 'react-router-dom'

function AboutPastor(){
    return(
        <div className='flex flex-col items-center jusstify-center'>
            <h2 className="text-center text-xl md:text-4xl font-[600] my-[30px]">About The Pastor</h2>
            <div className="flex flex-col lg:flex-row items-center justify-center text-center mx-auto gap-[20px] my-[40px] px-4">
                <div>
                    <img 
                        src={MyPastorImg} 
                        alt="Rev Willy B. Enoch" 
                        className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full object-cover"
                    />
                </div>
                <div className="max-w-[400px]">
                    <p className="text-lg leading-relaxed mb-[20px]">
                        Rev Willy Bigman Enoch! Was born with a passion for God... 
                        Presently he is a Pastor in Christian Pentecostal Mission Int't. 
                        He is based in Lagos, Nigeria.
                    </p>
                    <Link to="/booking" >
                        <button className="bg-white border-[2px] border-solid py-[7px] px-[90px] mb-[30px]
                        rounded text-black hover:bg-[#db3838] cursor-pointer transition-all">
                            Book an Appointment
                        </button>
                    </Link>
                </div>
            </div>
            <Link to="/about" >
                <button className="bg-[#a52a2a] py-[7px] px-[90px] mb-[30px]
                 rounded text-white hover: bg-[#db3838] cursor-pointer transition-all">
                    See more
                </button>
            </Link>
        </div>
    )
}

export default AboutPastor