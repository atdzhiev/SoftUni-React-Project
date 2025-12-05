import { Route, Routes } from "react-router"
import Header from "./components/Header/Header"
import Home from "./components/Home/Home"


function App() {
  return (
    <>
       <Header />
          <div className="product-details-wrapper">
             <Routes>
                <Route path="/" element={<Home />} />
             </Routes>
          </div>
               
    </>
  )
}

export default App
