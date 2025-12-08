
import "./Contact.css";
import { Link } from "react-router";

export default function ContactPage() {
  

  return (
    <section className="contact-page">
      <div className="contact-hero">
        <h1>Let’s Connect ✏️</h1>
        <p>
          Questions, ideas, or just a friendly hello — we’re always excited to hear from you!
        </p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <h2>Visit Us</h2>
          <p><i className="fas fa-map-marker-alt"></i> 123 Creative Lane, Sofia</p>
          <p><i className="fas fa-phone"></i> +359 888 888 888</p>
          <p><i className="fas fa-envelope"></i> info@state.com</p>
          <p><i className="fas fa-clock"></i> Mon–Fri: 9:00 – 18:00</p>
          <div className="map-frame">
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d5865.715820463563!2d23.313818996023176!3d42.68555208465768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sbg!2sbg!4v1765182192493!5m2!1sbg!2sbg" 
            width="600" 
            height="300" 
            style= {{ border: 0 }} 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade">


            </iframe>

          </div>
        </div>

        <div className="contact-form">
          <h2>Send Us a Message</h2>
          <form >
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Your Name ✍️" required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Your Email 📧" required />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea placeholder="Write your message..." rows="5" required></textarea>
            </div>
            <button type="submit" className="btn-submit">Send Message 🚀</button>
          </form>
        </div>
      </div>

      <div className="contact-footer">
        <h3>Follow Our Creative Journey</h3>
        <div className="social-icons">
          <Link to="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></Link>
          <Link to="https://www.instagram.com/"><i className="fab fa-instagram"></i></Link>
          <Link to="https://x.com/"><i className="fab fa-twitter"></i></Link>
        </div>
      </div>

      
    </section>
  );
}