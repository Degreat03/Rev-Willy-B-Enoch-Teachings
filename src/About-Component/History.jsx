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
                    Rev Willy Bigman Enoch! . Was born with a passion for God, 
                    as a child he loved the things of God so much, at the age of twelve years 
                    he gave his life and will to God to protect and use him, Willy B is from Nigeria Rivers State,
                    Abua Odual . L.G.A. Emago Kugbo.. Date of Birth. 1980 February 14th. He is married 
                    and they're bless with Children. Presently he is a Pastor in Christian 
                    Pentecostal Mission Int't. He base in Lagos Nigeria He is an Evangelist by calling with a teaching grace,
                    he came into the full-time ministry in the year 1999, He planted a Church in Omoku Onelga Rivers State Nigeria 
                    1997 and Successful Pastor them for twelve years Christian Pentecostal Mission Int't, and was move 
                    to OYigbo in Rivers State Nigeria,  He pastor them for nine months and was moved to Lagos CPM Ilasa branch, 
                    waiting for the next move. Willy B is a Man God has shown mercy, how my journey started, in the year 1993 I had a passion for ministry as a young boy. 
                    I gathered children in the street and I started preaching the gospel to them. The first time I handle mic in a church to preach, that's was awesome, I saw a Man went down under the Anointing,  
                    as I was praying that was how my father believed in me. 1997 In the year 1999  I came to Lagos and joined a Bible School. (P. I. B. S.) Pentecostal International Bible S.
                </p>
                </div>
            </div>   
        </div>
    )
}

export default History