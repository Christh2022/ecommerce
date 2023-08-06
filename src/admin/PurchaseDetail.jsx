import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserOrderData from "../custom-hooks/userOrderData";
import UseIcons from "../Hooks/useIcons";
import useFonction from "../Hooks/useFonction";
import style from "./css/purchaseDetail.module.css";

const PurchaseDetail = () => {
    const { id } = useParams();
    const [tab, setTab] = useState([]);
    const [size, setSize] = useState(true);
    const { order } = UserOrderData();
    const { User } = UseIcons();
    const { getUser } = useFonction();

    useEffect(() => {
        if (order) {
            setTab(order.filter((item) => item.id === id));
        }
    }, [order, setTab, id]);
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
                                <span>
                                    <User />
                                </span>
                                <span>{getUser(value.user)}</span>
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
