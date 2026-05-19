import img1 from "../assets/one-plus-one-in-marriage-2.png"
import img2 from "../assets/one-plus-one-in-marriage-1.png"

export default function Bulletin(){
    // Points directly to the file inside your public folder
    const pdfUrl = "https://drive.google.com/file/d/1miMRzzhscvLwEzrODuu8EMuoc_XPAXrj/view?usp=drive_link";
    const pdfUrl2 = "https://drive.google.com/file/d/1k-pSnusknLegKpVuEWElaLQo1RJl1I4D/view?usp=drive_link"

    function handleClick(){
        window.open(pdfUrl, "_blank");
    }

    function handleClick2(){
        window.open(pdfUrl2, "_blank");
    }

    return(
        <div className="p-4">
            <h2 className="mt-[50px] text-center text-[#a52a2a] text-2xl md:text-4xl font-[600]">Sermons</h2>
            {/* Top Grid Section with your Images and Buttons */}
            <div className="my-[30px] grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center 
            justify-items-center">
                <div>
                    <img src={img1} alt="Divine Marriage Series 2" className=" h-[97px] object-cover"/>
                    {/* Added the direct click handler here */}
                    <button onClick={handleClick2} className="w-full max-w-xs mx-auto bg-[#db3838] 
                    text-white font-medium cursor-pointer py-[8px]">
                        Download
                    </button>
                </div>
                <div>
                    <img src={img2} alt="Divine Marriage Series 1" className=" h-[97px] object-cover"/>
                    {/* Added the direct click handler here */}
                    <button onClick={handleClick} className=" w-full max-w-xs mx-auto bg-[#db3838] 
                    text-white font-medium cursor-pointer py-[8px]">
                        Download
                    </button>
                </div>
            </div>
        </div>
    )
}