import { useEffect, useState } from "react";
import UserOrderData from "../../custom-hooks/userOrderData";
import useFonction from "../../Hooks/useFonction";

const Commandes = () => {
    const { order } = UserOrderData();
    const { getEmail, getUser } = useFonction();
    const [list, setList] = useState(null);

    useEffect(() => {
        if (order) {
            setList([...order]);
        }
        return () => {};
    }, [setList, order]);

    return (
        <table>
            <thead>
                <tr style={{ background: "#252841" }}>
                    <th>Nom</th>
                    <th>email</th>
                    <th>Prix</th>
                    <th>Qté</th>
                </tr>
            </thead>
            <tbody>
                {list?.map((value, index) => (
                    <tr
                        key={value.id}
                        style={
                            index % 2 === 0
                                ? { background: "#463e4b" }
                                : { background: "rgb(117 107 119 / 81%)" }
                        }
                    >
                        <td>{getUser(value.user)}</td>
                        <td>{getEmail(value.user)}</td>
                        <td>{value.amount} €</td>
                        <td>{value.quantity}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Commandes;
