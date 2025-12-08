import { useContext } from 'react';
import { ProductsContext } from '../../contexts/ProductsContext';
import SortCriteria from "./Sort";
import CatalogCard from "./CatalogCard";
import "./Catalog.css"


const Catalog = () => {
  const { products } = useContext(ProductsContext);

  return (
    <div className="catalog-wrapper py-5">
      <div className="d-flex">
        <div className="catalog-main flex-grow-1 ms-3">

          <div className="catalog-sort d-flex justify-content-end mb-3">
            <SortCriteria />
          </div>
          
          <div className="catalog-products row">
            {products.length ? (
              products.map(x => (
                <div className="col-md-3 mb-4" key={x._id}>
                  <CatalogCard {...x} />
                </div>
              ))
            ) : (
              <h2 className="catalog-empty">There are no products...</h2>
            )}
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default Catalog;