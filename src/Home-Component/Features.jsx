import LeaderShip from "../assets/leadership.jpg"
import Marriage from "../assets/marriage.jpg"
import SpiritualGrowth from "../assets/spiritual-growth.jpg"
import YouthMinistry from "../assets/youth-ministry.jpg"

function Features(){
    return(
        <div>
            <h2 className="text-center text-xl md:text-4xl font-[600] my-[30px]">Teachings Categories</h2>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center 
            justify-items-center text-center max-w-[1000px] mx-auto
            gap-[10px] my-[40px]
            ">
                <div>
                    <img src={LeaderShip} alt="leadership image" className="h-[300px] w-[300px] rounded mb-[10px]"/>
                    <h3 className="text-xl font-[600]">Leadership</h3>
                </div>
                <div>
                    <img src={Marriage} alt="marriage image" className="h-[300px] w-[300px] rounded mb-[10px]"/>
                    <h3 className="text-xl font-[600]">Marriage</h3>
                </div>
                <div>
                    <img src={SpiritualGrowth} alt="spiritual growth image" className="h-[300px] w-[300px] rounded mb-[10px]"/>
                    <h3 className="text-xl font-[600]">Spiritual growth</h3>
                </div>
                <div>
                    <img src={YouthMinistry} alt="Youth image" className="h-[300px] w-[300px] rounded mb-[10px]"/>
                    <h3 className="text-xl font-[600]">Youth Ministry</h3>
                </div>
            </div>
        </div>
    )
}

export default Features