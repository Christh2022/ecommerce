import { useEffect, useState } from "react";
import UserOrderData from "../../custom-hooks/userOrderData";
import useFonction from "../../Hooks/useFonction";
import { useNavigate } from "react-router-dom";
import UserGetData from "../../custom-hooks/userGetData";
import { firestore } from "../../Firebase.config";
import { doc, updateDoc } from "firebase/firestore";

const Commandes = () => {
    const { order } = UserOrderData();
    const { getEmail, getUser } = useFonction();
    const [list, setList] = useState(null);
    const navigate = useNavigate();
    const { getTimestamp, notifColor } = useFonction();
    const { notifStatus } = UserGetData("notifstatus");

    useEffect(() => {
        if (order) {
            setList([...order]);
        }
        return () => {};
    }, [setList, order]);

    const getOrderId = (id) => {
        if (notifColor === "false") {
            const newtab = notifStatus[0].tab_notif?.filter(
                (item) => id === item.order_id
            );
            console.log(newtab);
            if (newtab.length === 1) return true;
            else return false;
        }
    };

    useEffect(() => {
        if (notifStatus?.length > 0 && notifStatus[0].status === "false") {
            setTimeout(()=>{

                updateDoc(doc(firestore, "notifstatus", notifStatus[0].id), {
                    tab_notif: [],
                });
            }, 1000000)

            return () => {};
        }
    });

    const seeProductInformation = (path) => {
        navigate(`/dashboard/${path}`);
    };

    return (
        <table>
            <thead>
                <tr style={{ background: "#252841" }}>
                    <th>Nom</th>
                    <th>email</th>
                    <th>Prix</th>
                    <th>Qté</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {/** Trier le tableau par ordre croissant en fonction de la clé "timestamp
                 * pour éviter toute modification sur le tableau d'origine avec la méthode sort(), on a utilisé la méthode slice()
                 */}
                {list
                    ?.slice()
                    .sort((a, b) => b.time - a.time)
                    .map((value, index) => (
                        <tr
                            key={value.id}
                            style={
                                index % 2 === 0
                                    ? (getOrderId(value.id)
                                        ? {
                                              background: "green",
                                              cursor: "pointer",
                                          }
                                        : {
                                              background: "#463e4b",
                                              cursor: "pointer",
                                          })
                                    : 
                                    (getOrderId(value.id)
                                    ? {
                                          background: "green",
                                          cursor: "pointer",
                                      }
                                    : {
                                          background: "rgb(117 107 119 / 81%)",
                                          cursor: "pointer",
                                      })
                            }
                            onClick={() =>
                                getOrderId(value.id) &&
                                seeProductInformation(value.id)
                            }
                        >
                            <td>{getUser(value.user)}</td>
                            <td>{getEmail(value.user)}</td>
                            <td>{value.amount} €</td>
                            <td>{value.quantity}</td>
                            <td>{getTimestamp(value.time)}</td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );
};

export default Commandes;
