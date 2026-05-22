import MyPastorImg2 from "../assets/my-pastor2.jpeg"

function History(){
    return(
        <div className="my-[70px]">
           <h2 className="text-center text-[#a52a2a] text-xl md:text-4xl font-[600] my-[30px]">About The Pastor</h2>
            <div className="flex flex-col lg:flex-row items-center justify-center text-center mx-auto gap-[30px] my-[40px] px-4">
                <div>
                    <img 
                    src={MyPastorImg2} 
                    alt="Rev Willy B. Enoch" 
                    className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full object-cover"
                    />
                </div>
            <div className="max-w-[700px]">
                <p className="text-md leading-relaxed">
                    Rev Willy Bigman Enoch. Is a Carry of Grace, ordained to preach the Gospel with the heart of love and compassion call as an Evangelist, with a prophetic grace, a Preacher and a Teacher of the Word, He is ordained minister with Christian Pentecostal Mission Int't, Born in 14th February 1980. From Abua Odual Local Government Area, Emago Kugbo, Rivers State, Nigeria. Married to Mrs Hope Willy Enoch and they are blessed with children.
                </p>
                </div>
            </div>   
        </div>
    )
}

export default History