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
    const [size, setSize] = useState(false);
    const navigate = useNavigate();
    const { getTimestamp, notifColor, handleNotificationSeen } = useFonction();
    const { notifStatus } = UserGetData("notifstatus");

    useEffect(() => {
        if (order) {
            setList([...order]);
        }
        return () => {};
    }, [setList, order]);

    useEffect(() => {
        const getSize = () => {
            window.addEventListener("resize", () => {
                if (window.innerWidth  > 750) setSize(true);
                else setSize(false);
            });
        };
        getSize()

        return ()=> window.removeEventListener('resize', getSize)
    });

    const getOrderId = (id) => {
        if (notifColor === false) {
            const newtab = notifStatus[0].tab_notif?.filter(
                (item) => id === item.order_id
            );
            if (newtab.length === 1) return true;
            else return false;
        }
    };

    const seeProductInformation = (id) => {
        if (notifStatus?.length > 0 && notifStatus[0].status === false) {
            const tab = [...notifStatus[0].tab_notif];
            const newtab = notifStatus[0].tab_notif?.filter(
                (item) => id === item.order_id
            );
            if (newtab.length === 1) {
                handleNotificationSeen(newtab[0].order_id);

                // Recherche de l'index de l'élément avec l'identifiant spécifique
                let indexASupprimer = -1;
                for (let i = 0; i < tab.length; i++) {
                    if (tab[i].order_id === id) {
                        indexASupprimer = i;
                        break;
                    }
                }

                // Suppression de l'élément du tableau si trouvé
                if (indexASupprimer !== -1) {
                    tab.splice(indexASupprimer, 1);
                    updateDoc(
                        doc(firestore, "notifstatus", notifStatus[0].id),
                        {
                            tab_notif: tab,
                        }
                    );
                }
                console.log(tab);
            }
        }
        navigate(`/dashboard/${id}`);
    };

    return (
        <table>
            <thead>
                <tr style={{ background: "#252841" }}>
                    <th>Nom</th>
                    {size && <th>email</th>}
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
                                    ? getOrderId(value.id)
                                        ? {
                                              background: "#5bbc51",
                                              cursor: "pointer",
                                          }
                                        : {
                                              background: "#463e4b",
                                              cursor: "pointer",
                                          }
                                    : getOrderId(value.id)
                                    ? {
                                          background: "#5bbc51",
                                          cursor: "pointer",
                                      }
                                    : {
                                          background: "rgb(117 107 119 / 81%)",
                                          cursor: "pointer",
                                      }
                            }
                            onClick={() => {
                                getOrderId(value.id);
                                seeProductInformation(value.id);
                            }}
                        >
                            <td>{getUser(value.user)}</td>
                            {size && <td>{getEmail(value.user)}</td>}
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
