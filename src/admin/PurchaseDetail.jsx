import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserOrderData from "../custom-hooks/userOrderData";
import UseIcons from "../Hooks/useIcons";
import useFonction from "../Hooks/useFonction";
import style from "./css/purchaseDetail.module.css";


const PurchaseDetail = () => {
    const { id } = useParams();
    const [tab, setTab] = useState([]);
    const [listInfo, setListInfo] = useState([]);
    const [size, setSize] = useState(true);
    const { order, orderAddress } = UserOrderData();
    const { User } = UseIcons();
    const { getUser } = useFonction();

    useEffect(() => {
        if (order) {
            setTab(order.filter((item) => item.id === id));
            setListInfo(orderAddress.filter((item) => item.id === id));
        }
    }, [order, setTab, id, orderAddress]);
    console.log(tab);

    useEffect(() => {
        const getSize = () => {
            window.addEventListener("resize", () => {
                if (window.innerWidth > 500) setSize(true);
                else setSize(false);
            });
        };
        getSize();
        return () => window.removeEventListener("resize", getSize);
    });

    return (
        <div className={style.container}>
            {tab.length === 0 ? (
                <div style={{ color: "white" }}> chargement .....</div>
            ) : (
                <>
                    {tab?.map((value) => (
                        <div key={value.id} style={{ color: "white" }}>
                            <div className={style.user_info}>
                                <div className={style.left}>
                                    <span>
                                        <User />
                                    </span>
                                    <span>{getUser(value.user)}</span>
                                </div>

                                {listInfo?.map((item) => (
                                    <div key={item.id} className={style.right}>
                                        <div className={style.address}>
                                            <p>
                                                <span>Numéro :</span> {item.tel}
                                            </p>
                                            <p>
                                                <span>Adresse :</span> {item.Address}
                                            </p>
                                            <p>
                                                <span>Code Postal :</span> {item.CP}
                                            </p>
                                            <p>
                                                <span>Ville :</span> {item.City}
                                            </p>
                                        </div>
                                        <div className={style.shipping_info}>
                                            <p className={style.horizontal}></p>
                                            <p>
                                                {" "}
                                                <span>Livraison :</span>{" "}
                                                Gratuite{" "}
                                            </p>
                                            <div className={style.shipping}>
                                                <h5>
                                                    Information de la Livraison
                                                </h5>
                                                <div>
                                                    <span className={item.shippingStatus.toLowerCase() === "traitement"  && style.success}>Traitement</span>
                                                    <span>
                                                        Expédition en <br />{" "}
                                                        préparation
                                                    </span>
                                                    <span>Expédiées</span>
                                                    <span>Livré</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <table className={style.table}>
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Nom</th>
                                        <th>Qté</th>
                                        {size && <th>Prix(par unité)</th>}
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {value.product_tab.map((item) => (
                                        <tr key={item.id}>
                                            <td>
                                                <img
                                                    src={item.productUrl}
                                                    alt="/"
                                                />
                                            </td>
                                            <td>{item.productName}</td>
                                            <td>{item.quantity}</td>
                                            {size && <td>{item.price} €</td>}
                                            <td>
                                                {size
                                                    ? `${
                                                          item.price *
                                                          item.quantity
                                                      }€`
                                                    : `${item.price}€ x ${item.quantity}`}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default PurchaseDetail;
