import { useSelector } from "react-redux";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../UI/CommonSection";
import classes from "./css/checkout.module.css";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { firestore } from "../Firebase.config";
import UserAuth from "../custom-hooks/userAuth";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useFonction from "../Hooks/useFonction";

const Checkout = () => {
    const totalQty = useSelector((state) => state.cart.totalQuantity);
    const totalAmount = useSelector((state) => state.cart.totalAmount);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const { currentUser } = UserAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { UUID } = useFonction();
    const order_now = async () => {
        setLoading(true);
        try {
            await setDoc(doc(firestore, "commandes", currentUser.uid + UUID()), {
                product_tab: cartItems,
                amount: totalAmount,
                quantity: totalQty,
                user: currentUser.uid,
                time: serverTimestamp()
            });
            setLoading(false);
            toast.success("vous Venez de passer votre commande");
            window.addEventListener("animationend", () => navigate("/shop"));
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    return (
        <Helmet title="checkout">
            <>
                <CommonSection title="Paiement" />

                <section>
                    <div className={classes.row}>
                        <div className={classes.col}>
                            {loading ? (
                                <div className={classes.spinner}>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            ) : (
                                <div>
                                    <h6>Information de paiement</h6>
                                    <form
                                        action=""
                                        className={classes.billing_form}
                                    >
                                        <div className={classes.input_group}>
                                            <input
                                                type="text"
                                                placeholder="Entrez votre Nom"
                                            />
                                        </div>
                                        <div className={classes.input_group}>
                                            <input
                                                type="email"
                                                placeholder="Entrez votre Email"
                                            />
                                        </div>
                                        <div className={classes.input_group}>
                                            <input
                                                type="number"
                                                placeholder="Numero de téléphone"
                                            />
                                        </div>
                                        <div className={classes.input_group}>
                                            <input
                                                type="text"
                                                placeholder="Entrez votre Adresse"
                                            />
                                        </div>
                                        <div className={classes.input_group}>
                                            <input
                                                type="text"
                                                placeholder="Code Postal"
                                            />
                                        </div>
                                        <div className={classes.input_group}>
                                            <input
                                                type="text"
                                                placeholder="Ville"
                                            />
                                        </div>
                                        <div className={classes.input_group}>
                                            <input
                                                type="text"
                                                placeholder="Pays"
                                            />
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                        <div className={classes.col}>
                            <div className={classes.checkout_cart}>
                                <h6>
                                    Qté Total:{" "}
                                    <span>
                                        {totalQty} article{totalQty > 1 && "s"}
                                    </span>
                                </h6>
                                <h6>
                                    Prix : <span>{totalAmount}€</span>
                                </h6>
                                <h6>
                                    <span>
                                        Livraison:
                                        <br /> Livraison gratuite
                                    </span>
                                    <span>0€</span>
                                </h6>
                                <h4>
                                    Prix Total : <span>{totalAmount}€</span>
                                </h4>
                                <button onClick={order_now}>commander</button>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        </Helmet>
    );
};

export default Checkout;
