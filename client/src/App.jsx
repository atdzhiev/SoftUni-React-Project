import { Route, Routes } from "react-router"
import Header from "./components/Header/Header"
import Home from "./components/Home/Home"
import Footer from "./components/Footer/Footer"
import About from "./components/About/About"
import Contact from "./components/Contact/Contact"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import Logout from "./components/Logout/Logout"
import { CreatePage } from "./components/Create_Edit/Create"
import Catalog from "./components/Catalog/Catalog"
import Details from "./components/Details/Details"
import ShoppingCart from "./components/ShoppingCart/ShoppingCart"
import { EditPage } from "./components/Create_Edit/Edit"
import OrderConfirmation from "./components/OrderConfirm/OrderConfirm"


function App() {
  return (
    <>
       <Header />
          <div className="product-details-wrapper">
             <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/products/create" element={<CreatePage />} />
                <Route path="/products" element={<Catalog />} />
                <Route path="/products/details/:productId" element={<Details/>} />
                <Route path="/shoppingcart" element={<ShoppingCart />}  />
                <Route path="/products/edit/:productId" element={<EditPage />} />
                <Route path="/shoppingcart/confirmation" element={<OrderConfirmation />} />
             </Routes>
          </div>
      <Footer />
               
    </>
  )
}

export default App
