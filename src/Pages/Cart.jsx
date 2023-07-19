import { useDispatch, useSelector } from "react-redux";
import useIcons from "../Hooks/useIcons";
import CommonSection from "../UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import classes from "./css/cart.module.css";
import { cartActions } from "../redux/slices/CartSlice";
import { useNavigate } from "react-router-dom";
const Cart = () => {
    const { Delete } = useIcons();
    const dispatch = useDispatch();
    const deleteProduct = (id) => {
        dispatch(cartActions.deleteItem(id));
    };
    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalAmount = useSelector((state) => state.cart.totalAmount);
    const navigate = useNavigate();
    return (
        <div>
            <Helmet title="cart">
                <>
                    <CommonSection title="Panier de commande" />
                    <div className={classes.row}>
                        <div className={classes.col}>
                            {cartItems.length === 0 ? (
                                <h2>Votre Panier est vide </h2>
                            ) : (
                                <table className={classes.table}>
                                    <thead>
                                        <tr>
                                            <th>image</th>
                                            <th>titre</th>
                                            <th>prix</th>
                                            <th>Qté</th>
                                            <th>supprimé</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item) => (
                                            <tr key={item.id}>
                                                <td>
                                                    <img
                                                        src={item.productUrl}
                                                        alt="/"
                                                    />
                                                </td>
                                                <td>{item.productName}</td>
                                                <td>{item.totalPrice}{' '}€</td>
                                                <td>{item.quantity} </td>
                                                <td>
                                                    <Delete
                                                        onClick={() =>
                                                            deleteProduct(
                                                                item.id
                                                            )
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                        <div className={classes.col}>
                            <h6 className={classes.col_h6}>
                                <span>Total</span>
                                <span>{totalAmount} €</span>
                            </h6>
                            <p>
                                Les taxes et les frais de livraison seront
                                calculés lors du paiement.
                            </p>
                            <div className={classes.btn}>
                                <button onClick={() => navigate("/shop")}>
                                    Coutinué vos courses
                                </button>
                                <button onClick={() => cartItems.length !== 0 && navigate("/checkout")}>
                                    Acheter
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            </Helmet>
        </div>
    );
};

export default Cart;
