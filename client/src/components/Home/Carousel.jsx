import { useContext } from "react";
import { useNavigate } from "react-router";
import { ProductsContext } from "../../contexts/ProductsContext";
import "./Carousel.css"; 

export default function Carousel() {
  const navigate = useNavigate();
  const { onBrandClickHandler } = useContext(ProductsContext);

  const handleBrandClick = (brand) => {
    onBrandClickHandler(brand);
    navigate("/products");
  };

  return (
    <div
      id="template-mo-zay-hero-carousel"
      className="carousel slide"
      data-bs-ride="carousel"
    >
    
      <ol className="carousel-indicators">
        <li
          data-bs-target="#template-mo-zay-hero-carousel"
          data-bs-slide-to={0}
          className="active"
        />
        <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to={1} />
        <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to={2} />
      </ol>
 
      <div className="carousel-inner">
       
        
        <div className="carousel-item">
          <div className="container">
            <div className="row p-5">
              <div
                className="banner banner-1"
              >
                <div className="banner-content left">
                  <h2>World of Parker</h2>
                  <p>
                    Explore over 130 years of Parker brand history, expert craftsmanship
                    and the future of Parker fine pens.
                  </p>
                  <button onClick={() => handleBrandClick("Parker")}>
                    Describe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div className="carousel-item active">
          <div className="container">
            <div className="row p-5">
              <div className="banner banner-2">
                <div className="banner-content right">
                  <h2>Discover State</h2>
                  <p>Your Stationery Destination</p>
                  <p>Step into a world where creativity meets craftsmanship.</p>
                  <button onClick={() => navigate("/about")}>About Us</button>
                </div>
              </div>
            </div>
          </div>
        </div>

       
        <div className="carousel-item">
          <div className="container">
            <div className="row p-5">
              <div className="banner banner-3">
                <h2>Explore our environmentally friendly office supplies</h2>
                <button onClick={() => handleBrandClick("Navigator")}>
                  Explore
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

     
      <a
        className="carousel-control-prev text-decoration-none w-auto ps-3"
        href="#template-mo-zay-hero-carousel"
        role="button"
        data-bs-slide="prev"
      >
        <i className="fas fa-chevron-left" />
      </a>
      <a
        className="carousel-control-next text-decoration-none w-auto pe-3"
        href="#template-mo-zay-hero-carousel"
        role="button"
        data-bs-slide="next"
      >
        <i className="fas fa-chevron-right" />
      </a>
    </div>
  );
}