import style from "./css/dashboard.module.css";
import ServiceData from "../assets/Data/serviceData";
import Commandes from "../assets/Data/Commandes";
import { useEffect, useRef, useState } from "react";

const Dashboard = () => {
    const { order_info } = ServiceData();
    const [loading, setLoading] = useState(true);
    const targetRef = useRef();
    useEffect(() => {
        if (order_info) setLoading(false);

        targetRef.current?.scrollIntoView({ behavior: "smooth" });
        return () => {};
    }, [order_info]);

    return (
        <>
            {loading ? (
                <div style={{ width: "100%", height: "70vh" }}>
                    <div className={style.spinner}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            ) : (
                <div className={style.container} ref={targetRef}>
                    <div className={style.rows}>
                        {order_info?.map((value, index) => (
                            <div
                                key={index}
                                style={{ background: `${value.color}` }}
                                className={style.col}
                            >
                                <div>
                                    <span style={{ color: value.color_2 }}>
                                        {value.icon}
                                    </span>
                                </div>
                                <div>
                                    <span>{value.title}</span>
                                    <h5>{value.amount}</h5>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={style.order}>
                        <h4>Liste des commandes</h4>
                        <Commandes />
                    </div>
                </div>
            )}
        </>
    );
};

export default Dashboard;
