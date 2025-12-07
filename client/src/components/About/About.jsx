import { Link } from "react-router";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <section className="about-us">
      <div className="about-hero">
        <h1 className="about-title">About Us</h1>
        <p className="about-subtitle">
          Where paper meets imagination ✨
        </p>
      </div>

      <div className="about-content container">
        <div className="about-text">
          <h2>Our Story</h2>
          <p>
            Born from a love of ink, paper, and creativity, our stationery store
            is more than a shop — it’s a playground for dreamers, planners, and
            doodlers. Every notebook, pen, and sketchpad is chosen to spark joy
            and inspire your everyday.
          </p>
        </div>

        <div className="about-highlights">
          <div className="highlight-card">
            <div className="icon-circle">
              <i className="fas fa-pencil-alt"></i>
            </div>
            <h3>Premium Quality</h3>
            <p>
              Smooth paper, vibrant inks, and tools that make writing feel like art.
            </p>
          </div>
          <div className="highlight-card">
            <div className="icon-circle">
              <i className="fas fa-lightbulb"></i>
            </div>
            <h3>Creative Spark</h3>
            <p>
              Designs that fuel imagination — from whimsical journals to bold planners.
            </p>
          </div>
          <div className="highlight-card">
            <div className="icon-circle">
              <i className="fas fa-leaf"></i>
            </div>
            <h3>Eco-Friendly</h3>
            <p>
              Sustainable stationery that cares for the planet as much as your ideas.
            </p>
          </div>
        </div>
      </div>

      <div className="about-footer">
        <h2>Join Our Creative Community</h2>
        <p>
          Whether you’re sketching, journaling, or planning your next big idea —
          we’re here to make it beautiful.
        </p>
        <Link className="btn-discover" to="/products">Explore Our Collection</Link>
      </div>
    </section>
  );
};

export default AboutUs;