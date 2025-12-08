import { useContext } from "react";
import { ProductsContext } from "../../contexts/ProductsContext";

const Pagination = () => {
  const { onPageChange, page, maxPage } = useContext(ProductsContext);

  return (
    <div className="row">
      <ul className="pagination pagination-lg justify-content-end">
        <li className="page-item">
          <button
            disabled={page === 1}
            onClick={() => onPageChange(-1)}
            className="page-link rounded-0 mr-3 shadow-sm border-top-0 border-left-0 text-dark"
          >
            &lt; Prev
          </button>
        </li>
        <li className="page-item">
          <p className="page-link active rounded-0 mr-3 shadow-sm border-top-0 border-left-0 text-dark">
            {page} / {maxPage}
          </p>
        </li>
        <li className="page-item">
          <button
            disabled={page === maxPage}
            onClick={() => onPageChange(+1)}
            className="page-link rounded-0 shadow-sm border-top-0 border-left-0 text-dark"
          >
            Next &gt;
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;