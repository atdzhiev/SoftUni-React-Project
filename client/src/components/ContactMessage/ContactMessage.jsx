
import { useNavigate } from "react-router";
import "./ContactMessage.css";

const ContactMessage = ({ open, onClose }) => {
  const navigate = useNavigate();

  if (!open) return null;

  return (
    <div className="contactmessage-overlay">
      <div className="contactmessage-box" onClick={(e) => e.stopPropagation()}>
        <h2>Thank You!</h2>
        <p>Your message has been sent successfully. We’ll be in touch soon.</p>

        <div className="contactmessage-actions">
          <button className="btn-home" onClick={() => navigate("/")}>
            Home
          </button>
          <button className="btn-cancel" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactMessage;