import { useDispatch, useSelector } from "react-redux";
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
import { cartActions } from "../redux/slices/CartSlice";
import { useEffect } from "react";

const Checkout = () => {
    const totalQty = useSelector((state) => state.cart.totalQuantity);
    const totalAmount = useSelector((state) => state.cart.totalAmount);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const { currentUser } = UserAuth();
    const [loading, setLoading] = useState(false);
    const [add, setAdd] = useState(null);
    const [cp, setCp] = useState(null);
    const [city, setCity] = useState(null);
    const [number, setNumber] = useState(null);
    const [email, setEmail] = useState(null);
    const [name, setName] = useState(null);
    const [country, setCountry] = useState(null);
    const navigate = useNavigate();

    const { UUID, handleNewNotification, shippingInfo } = useFonction();
    const dispatch = useDispatch();
    const order_now = async () => {
        if (name && add && cp && city && country && number && email) {
            setLoading(true);
            const id = currentUser.uid + UUID();
            try {
                await setDoc(doc(firestore, "Commandes", id), {
                    product_tab: cartItems,
                    amount: totalAmount,
                    quantity: totalQty,
                    user: currentUser.uid,
                    time: serverTimestamp(),
                });
                shippingInfo(id, name, add, cp, city, country, number, email);
                setLoading(false);
                toast.success("vous Venez de passer votre commande");
                for (let i = 0; i < cartItems.length; ++i) {
                    dispatch(cartActions.deleteItem(cartItems[i].id));
                }
                handleNewNotification(id);
                window.addEventListener("animationend", () =>
                    navigate("/shop")
                );
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        } else {
            toast.error("veuillez remplir tous les champs")
        }
    };

    useEffect(() => {
        if (totalQty === 0 && totalAmount === 0) navigate("/shop");
    });

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
                                                onChange={(e) =>
                                                    setName(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className={classes.input_group}>
                                            <input
                                                type="email"
                                                placeholder="Entrez votre Email"
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className={classes.input_group}>
                                            <input
                                                type="number"
                                                placeholder="Numero de téléphone"
                                                onChange={(e) =>
                                                    setNumber(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className={classes.input_group}>
                                            <input
                                                type="text"
                                                placeholder="Entrez votre Adresse"
                                                onChange={(e) =>
                                                    setAdd(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className={classes.input_group}>
                                            <input
                                                type="text"
                                                placeholder="Code Postal"
                                                onChange={(e) =>
                                                    setCp(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className={classes.input_group}>
                                            <input
                                                type="text"
                                                placeholder="Ville"
                                                onChange={(e) =>
                                                    setCity(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className={classes.input_group}>
                                            <input
                                                type="text"
                                                placeholder="Pays"
                                                onChange={(e) =>
                                                    setCountry(e.target.value)
                                                }
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
