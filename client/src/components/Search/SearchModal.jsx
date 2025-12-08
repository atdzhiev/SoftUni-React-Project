import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { ProductsContext } from "../../contexts/ProductsContext";
import "./SearchModal.css";

export default function SearchModal({ onClose }) {
  const [query, setQuery] = useState("");
  const { onSearchSubmit } = useContext(ProductsContext);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    onSearchSubmit({ search: query.trim() });

    onClose();

    navigate("/products");
  };

  const stop = (e) => e.stopPropagation();

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal-dialog" onClick={stop}>
        <div className="search-modal-header">
          <h6 className="search-title">Search products</h6>
          <button type="button" aria-label="Close" onClick={onClose} className="close-btn">
            ✕
          </button>
        </div>

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search by exact title…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        
      </div>
    </div>
  );
}