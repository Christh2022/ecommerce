import useIcons from "../Hooks/useIcons";
import PropTypes from "prop-types";
import classes from "./css/produitCard.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/CartSlice";
import { toast } from "react-toastify";

const ProduitCard = ({ items: { id, img, description, price, title } }) => {
    const { Plus } = useIcons();
    const [desc, setDesc] = useState(null);

    useEffect(() => {
        const resize = () => {
            setDesc(`${description.slice(0, 60)}...`);
            window.addEventListener("resize", () => {
                if (window.innerWidth < 520)
                    setDesc(`${description.slice(0, 30)}...`);
                else setDesc(`${description.slice(0, 60)}...`);
            });
        };
        resize();
        return () => {
            window.removeEventListener("load", resize);
            window.removeEventListener("resize", resize);
        };
    }, [description]);

    const dispatch = useDispatch();
    const addToCart = () => {
        dispatch(
            cartActions.addItem({
                id: id,
                productName: title,
                price: price,
                image: img,
            })
        );

        toast.success("vous avez ajoutez un produit dans votre panier");
    };

    return (
        <>
            <div key={id} className={classes.product_item}>
                <div className={classes.product_img}>
                    <Link to={`/shop/${id}`}>
                        <img src={img} alt="/" />
                    </Link>
                </div>
                <div className={classes.product_info}>
                    <div>
                        <h3 className={classes.product_name}>
                            <Link to={`/shop/${id}`}>{title}</Link>
                        </h3>
                        <span className={classes.product_description}>
                            {desc}
                        </span>
                    </div>
                    <div className={classes.product_card_bottom}>
                        <span className={classes.price}>{price}</span>
                        <div className={classes.buy} onClick={addToCart}>
                            <span className={classes.buy_icon}>
                                <Plus />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

ProduitCard.propTypes = {
    items: PropTypes.shape({
        title: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        description: PropTypes.string,
        category: PropTypes.string,
        img: PropTypes.string,
    }),
};

export default ProduitCard;
