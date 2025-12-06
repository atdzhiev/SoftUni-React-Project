import { useState, useEffect, useContext } from "react";
import {  useNavigate, useParams } from "react-router";
import { LovesContext } from "../../contexts/LovesContext";
import * as productsService from "../../services/productsService";
import "./Details.css";

const Details = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

  const { loves, onClickLove, onLoveDelete } = useContext(LovesContext);

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});

  
  useEffect(() => {
    productsService
      .getOne(productId)
      .then((result) => {
        setProduct(result);
        const defaultMain =
          result.images?.[result.mainImageIndex] || result.images?.[0] || "";
        setMainImage(defaultMain);
      })
      .catch((err) => {
        alert("Error loading design: " + err.message);
      });
  }, [productId]);

  if (!product) {
    return <p>Loading design...</p>;
  } 
  
  const loveEntry = loves.find((l) => l.productId === product._id);
  const inWishlist = Boolean(loveEntry);

  const handleOptionSelect = (optionKey, value) => {
    setSelectedOptions((prev) => ({ ...prev, [optionKey]: value }));
  };

  return (
    <section className="product-details-wrapper py-5">
      <div className="container">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <button
            className="btn btn-link back-btn"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
        
        </div>

        <div className="row g-5">
          <div className="col-lg-6">
            <div className="main-image-card text-center">
              <img
                src={mainImage}
                alt={product.title}
                className="main-image"
              />
            </div>
            <div className="thumbnail-row mt-3 d-flex justify-content-center flex-wrap">
              {product.images?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Thumbnail ${i}`}
                  className={`thumbnail ${mainImage === img ? "active" : ""}`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>

          <div className="col-lg-6">
            <div className="product-info card p-4">
              <h1 className="product-title">{product.title}</h1>
              {product.brand && (
                <p className="product-brand">Brand: {product.brand}</p>
              )}
              <p className="product-price">{product.price} BGN</p>
              <div className="product-description-container">
                  <h5 className="section-title"></h5>
                  <ul className="product-description-list">
                    {product.description
                      .split(/\r?\n|\./) 
                      .map((sentence, idx) =>
                        sentence.trim() ? <li key={idx}>{sentence.trim()}</li> : null
                      )}
                  </ul>
                </div>


              {Array.isArray(product.options) &&
                product.options.map((opt) => {
                  const values = opt.value.split(",").map((v) => v.trim());
                  return (
                    <div
                      key={opt.key}
                      className="option-box mb-3 p-3 shadow-sm"
                    >
                      <label className="form-label fw-bold">{opt.key}</label>
                      <div className="d-flex flex-wrap gap-2">
                        {values.map((val) => {
                          const isSelected = selectedOptions[opt.key] === val;
                          return (
                            <button
                              key={val}
                              type="button"
                              className={`btn option-btn ${
                                isSelected
                                  ? "btn-success"
                                  : "btn-outline-success"
                              }`}
                            onClick={() => handleOptionSelect(opt.key, val)}
                            >
                              {val}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
               
                 
                    <div className="quantity-control my-4 text-center">
                      <button
                        className="btn btn-outline-dark quantity-btn"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      >
                        −
                      </button>
                      <span className="quantity-value mx-3">{quantity}</span>
                      <button
                        className="btn btn-outline-dark quantity-btn"
                        onClick={() => setQuantity((q) => q + 1)}
                      >
                        +
                      </button>
                    </div>
        
                    <div className="actions d-flex gap-3">
                
                        <button
                          className="btn btn-success flex-fill"
                        >
                          🛒 Add to Cart
                        </button>
                        {inWishlist ? (
                          <button
                            className="btn btn-danger flex-fill"
                            onClick={() => onLoveDelete(loveEntry._id)}
                          >
                            ❤️ Remove from Wishlist
                          </button>
                        ) : (
                          <button
                            className="btn btn-outline-danger flex-fill"
                            onClick={() => onClickLove(product._id)}
                          >
                            🤍 Add to Wishlist
                          </button>
                        )}
                        
                      </div>                   
            </div>
          </div>
        </div>

        {Array.isArray(product.specifications) &&
          product.specifications.length > 0 && (
            <div className="specifications card shadow-sm mt-5 p-4">
              <h3 className="spec-title">Specifications</h3>
              <table className="table table-striped">
                <tbody>
                  {product.specifications.map(({ key, value }) => (
                    <tr key={key}>
                      <th scope="row">{key}</th>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
      </div>

      
    </section>
  );
};

export default Details;