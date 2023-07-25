import { useEffect, useState } from "react";
import UserOrderData from "../../custom-hooks/userOrderData";
import UserGetData from "../../custom-hooks/userGetData";
import useFonction from "../../Hooks/useFonction";

const Commandes = () => {
    const { order } = UserOrderData();
    const { userList } = UserGetData("utilisateur");
    const { getEmail, getUser } = useFonction();
    const [list, setList] = useState(null);

    useEffect(() => {
        if (order) {
            setList([...order]);
        }
        order && console.log(list);
        return () => {};
    }, [userList]);

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
                        <td>{getUser(value.id)}</td>
                        <td>{getEmail(value.id)}</td>
                        <td>{value.amount} €</td>
                        <td>{value.quantity}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Commandes;
