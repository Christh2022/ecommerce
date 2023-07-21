import { useState } from "react";
import style from "./css/dashboard.module.css";

const Dashboard = () => {
    const [order_info, setOrder_info] = useState([
        {
            title: "Revenue",
            amount: "700€",
            color: "#ebcdab",
        },
        {
            title: "commandes",
            amount: "140",
            color: "#8FBF9F",
        },
        {
            title: "Produits",
            amount: "700",
            color: "#F5D7B5",
        },
        {
            title: "Utilisateurs",
            amount: "300",
            color: "#B7C4CF",
        },
    ]);
    return (
        <div className={style.container}>
            <div className={style.rows}>
                {order_info?.map((value, index) => (
                    <div
                        key={index}
                        style={{ background: `${value.color}` }}
                        className={style.col}
                    >
                        <span>{value.title}</span>
                        <h5>{value.amount}</h5>
                    </div>
                ))}
            </div>

            <div className={style.order}>
                <h4>Liste des commandes</h4>
                <table>
                    <thead>
                        <tr>
                            <th>image</th>
                            <th>titre</th>
                            <th>Prix</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>image</td>
                            <td>creme</td>
                            <td>100€</td>
                            <td>Livré</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
