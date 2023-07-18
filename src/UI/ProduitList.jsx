import ProduitCard from "./ProduitCard";
import classes from "./css/produitList.module.css";
import PropTypes from "prop-types";

const ProduitList = ({ items }) => {
    return (
        <div className={classes.product_list}>
            {items.map((item) => (
                <ProduitCard key={item.id} items={item} />
            ))}
        </div>
    );
};

ProduitList.propTypes = {
    items: PropTypes.array.isRequired,
};

export default ProduitList;
