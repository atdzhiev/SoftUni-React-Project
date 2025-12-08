import { memo, useCallback, useContext } from "react";
import { Link } from "react-router";
import { ProductsContext } from "../../contexts/ProductsContext";

const FilterCriteria = () => {
    const {onCategoryClickHandler} = useContext(ProductsContext);

    const onCategoryClick = useCallback((e) => {
        onCategoryClickHandler(e.target.name);
    }, [onCategoryClickHandler]);

    return (
        <div className="col-lg-3">
            <h1 className="h2 pb-4">Category</h1>
            
            <ul className="list-unstyled templatemo-accordion" onClick={onCategoryClick}>
                <li><Link className="text-decoration-none" name="none">All</Link></li>
                <li><Link className="text-decoration-none" name="pen">Pen</Link></li>
                <li><Link className="text-decoration-none" name="pencils">Pencils</Link></li>
                <li><Link className="text-decoration-none" name="notebook">Notebooks</Link></li>
                <li><Link className="text-decoration-none" name="paper">Paper</Link></li>
                <li><Link className="text-decoration-none" name="markers">Markers</Link></li>
                <li><Link className="text-decoration-none" name="correlators">Correlators</Link></li>
                <li><Link className="text-decoration-none" name="presentation">Presentation</Link></li>
                <li><Link className="text-decoration-none" name="adhesive">Adhesive</Link></li>
            </ul>
            
        </div>
    );
};

export default memo(FilterCriteria);