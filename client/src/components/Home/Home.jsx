import { Link, useNavigate } from "react-router";
import Carousel from "./Carousel";
import "./HomePage.css";
import { ProductsContext } from "../../contexts/ProductsContext";
import { useContext } from "react";

  
export default function HomePage() {
    const navigate = useNavigate();
    const { onCategoryClickHandler } = useContext(ProductsContext);

    const handleClick = (category) => {
    onCategoryClickHandler(category);
    navigate("/products");
  };
  return (
    <div className="home-page">
      <Carousel />

      <section className="intro">
        <h1>Welcome to Your Creative Hub ✏️</h1>
        <p>
          Find the perfect tools to bring your ideas to life — from beautifully crafted journals to pens that make writing a joy. Let’s create something amazing together.
        </p>
      </section>

      <section className="featured">
        <h2>Featured Collections</h2>
        <div className="featured-grid">
          
            <div className="featured-card" onClick={() => handleClick("notebook")}  style={{ cursor: "pointer" }}>
                <img
                  src="https://i.etsystatic.com/18836762/r/il/20897e/3571286260/il_570xN.3571286260_6hxn.jpg"
                  alt="Journals"
                />
                <h3>Journals</h3>
                <p>Elegant notebooks for your thoughts and sketches.</p>
              </div>
           

          <div className="featured-card" onClick={() => handleClick("pen")} style={{ cursor: "pointer" }}>
            <img src="https://scriveiner.com/cdn/shop/files/card_1_fountain_edc.jpg?v=1752671616" alt="Pens" />
            <h3>Pens</h3>
            <p>Premium writing tools that glide effortlessly.</p>
          </div>
          <div className="featured-card" onClick={() => handleClick("paper")} style={{ cursor: "pointer" }}>
            <img src="https://ecobee.ae/cdn/shop/files/3_1445x.jpg?v=1763643140" alt="Paper" />
            <h3>Eco Paper</h3>
            <p>Sustainable sheets for a greener tomorrow.</p>
          </div>
        </div>
      </section>

      <section className="about-teaser">
        <h2>Our Story</h2>
        <p>
          We believe stationery is more than paper and ink — it’s a canvas for imagination.
        </p>
        <Link to="/about" className="btn-primary">Learn More</Link>
      </section>

    </div>
  );
}