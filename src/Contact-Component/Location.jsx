

function Location(){
    return(
        <div className="mt-[100px] mb-[120px]">
            <h2 className="text-center text-[#a52a2a] text-2xl md:text-4xl font-[600] my-[30px]" >Contact Us</h2>
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center
            gap-[20px]
            ">
                <div className="flex flex-col bg-[#e0e0e0cb] items-center justify-center text-center shadow-xxl w-[20rem] h-[10rem] p-[20px] rounded-lg">
                    <i class="bi bi-whatsapp text-5xl mb-[10px]"></i>
                    <p>+234 8035023566</p>
                </div>
                <div className="flex flex-col bg-[#e0e0e0cb] items-center justify-center text-center shadow-xxl w-[20rem] h-[10rem] p-[20px] rounded-lg">
                    <i className="bi bi-facebook text-5xl mb-[10px]"></i>
                    <p className="text-xl font-[300]">@Willy B Enoch</p>
                </div>
                <div className="flex flex-col bg-[#e0e0e0cb] items-center justify-center text-center shadow-xxl w-[20rem] h-[10rem] p-[20px] rounded-lg">
                    <i class="bi bi-envelope text-5xl mb-[10px]"></i>
                    <p className="text-xl font-[300]">willybenoch@gmail.com</p>
                </div>
            </div>
            
        </div>
    )
}

export default Location