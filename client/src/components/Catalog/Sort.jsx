import { memo, useContext, useState } from "react";
import { ProductsContext } from '../../contexts/ProductsContext';

const SortCriteria = () => {
    const [selected, setSelected] = useState("");
    const {onOptionChangeHandler} = useContext(ProductsContext);

    const onOptionChange = (e) => {
        const optionName = e.target.value;
        onOptionChangeHandler(optionName);
        setSelected(optionName);
    };

    return (
        <div className="col-md-4">
            <span className="d-flex py-1">sort by :</span>
            <div className="d-flex">
                <select onChange={onOptionChange} value={selected} className="form-control">
                    <option value="none">None</option>
                    <option value="alphabetically">A to Z</option>
                    <option value="price-asc">Price /ascending/</option>
                    <option value="price-desc">Price /descending/</option>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                </select>
            </div>
        </div>
    );
};

export default memo(SortCriteria);