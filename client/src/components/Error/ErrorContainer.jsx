import { useEffect } from "react";
import { useError } from "../../contexts/ErrorContext";
import "./ErrorContainer.css";

export default function ErrorContainer() {
  const { errors, clearErrors } = useError();

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        clearErrors(); 
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [errors, clearErrors]);

  if (errors.length === 0) return null;

 
  return (
    <div className="error-container">
      <div className="error-item">
        <span className="error-icon">⚠️</span>
        <span className="error-message">{errors[0]}</span>
      </div>
    </div>
  );
}