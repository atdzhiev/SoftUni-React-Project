import { Route, Routes } from "react-router"
import Header from "./components/Header/Header"
import Home from "./components/Home/Home"
import Footer from "./components/Footer/Footer"
import About from "./components/About/About"
import Contact from "./components/Contact/Contact"


function App() {
  return (
    <>
       <Header />
          <div className="product-details-wrapper">
             <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
             </Routes>
          </div>
      <Footer />
               
    </>
  )
}

export default App
