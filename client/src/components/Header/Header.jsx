import { Link } from "react-router";
import WishlistDrawer from "../WishList/Wish";
import SearchModal from "../Search/SearchModal";
import { LovesContext } from "../../contexts/LovesContext";
import { CartContext } from "../../contexts/CartContext";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useState } from "react";

export default function Header() {
   const { isAuthenticated, isAdmin } = useContext(AuthContext);
   const [isWishlistOpen, setWishlistOpen] = useState(false);
   const [isSearchOpen, setSearchOpen] = useState(false);
   const { loves } = useContext(LovesContext);
   const { cart } = useContext(CartContext);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light shadow">
        <div className="container d-flex justify-content-between align-items-center">
          <Link
            className="navbar-brand text-success logo h1 align-self-center"
            to="/"
          >
            <img src="/assets/img/logo.png" alt="Site Logo" className="site-logo" />
          </Link>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#templatemo_main_nav"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className="align-self-center collapse navbar-collapse flex-fill d-lg-flex justify-content-lg-between"
            id="templatemo_main_nav"
          >
            <div className="flex-fill">
              <ul className="nav navbar-nav d-flex justify-content-between mx-lg-auto">
                <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/products">Shop</Link></li>
               {isAdmin ? <li className="nav-item"><Link className="nav-link" to="/products/create">Add Product</Link></li> : null}
                <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
              </ul>
            </div>

            <div className="navbar align-self-center d-flex">
             
              <div className="d-lg-none flex-sm-fill mt-3 mb-4 col-7 col-sm-auto pr-3">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    id="inputMobileSearch"
                    placeholder="Search ..."
                  />
                  <div className="input-group-text">
                    <i className="fa fa-fw fa-search" />
                  </div>
                </div>
              </div>

            
              <button
                type="button"
                className="nav-icon d-none d-lg-inline btn btn-link p-0"
                onClick={() => setSearchOpen(true)}
              >
                <i className="fa fa-fw fa-search text-dark mr-2" />
              </button>

            
             {isAuthenticated ?
                <>
                      <button
                        type="button"
                        className="nav-icon position-relative text-decoration-none btn btn-link p-0"
                        onClick={() => setWishlistOpen(true)}
                      >
                        <i className="fa fa-heart text-dark mr-1" />
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-dark">
                          {loves.length>0 && loves.length}
                        </span>
                      </button>

                      <Link className="nav-icon position-relative text-decoration-none" to="/shoppingcart">
                        <i className="fa fa-fw fa-cart-arrow-down text-dark mr-1" />
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-dark">
                         {cart.length>0 && cart.length}
                        </span>
                      </Link>

                      <Link className="nav-i&con position-relative text-decoration-none" to="/logout">
                        <i className="fa fa-fw fa-sign-out-alt text-dark mr-3" />
                      </Link>
                  </>
                  :
                      <Link className="nav-icon position-relative text-decoration-none" to="/login">
                        <i className="fa fa-fw fa-user text-dark mr-3" />
                      </Link>
                  }
            </div>
          </div>
        </div>
      </nav>

      {isSearchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
      {isWishlistOpen && (
            <WishlistDrawer onClose={() => setWishlistOpen(false)} />
          )}
     
    </>
  );
}