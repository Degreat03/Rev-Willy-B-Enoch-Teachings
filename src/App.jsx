import { Routes, Route } from "react-router-dom";
import Home from "./Home.jsx"
import About from "./About.jsx"
import RevWillyTeachings from "./RevWillyTeachings.jsx"
import Contact from "./Contact.jsx"
import NavBar from "./NavBar.jsx"
import Footer from "./Home-Component/Footer.jsx"
import BookingNow from "./BookingNow.jsx";
import ScrollToTop from "./ScrollToTop.jsx";


function App(){
  return(
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/teachings" element={<RevWillyTeachings />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<BookingNow />} />
      </Routes>
      <ScrollToTop />
      <Footer />
    </div>
  )
}

export default App