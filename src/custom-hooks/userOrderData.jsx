import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../Firebase.config";

const UserOrderData = () => {
    const [order, setOrder] = useState(null);
    const [orderAddress, setOrderAddress] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getData = async () => {
            await onSnapshot(collection(firestore, "Commandes"), (snapShot) => {
                setOrder(
                    snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                );
                setLoading(false);
            });
            await onSnapshot(collection(firestore, "infoLivraison"), (snapShot) => {
                setOrderAddress(
                    snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                );
                setLoading(false);
            });
        };

        getData();

        return () => {};
    }, [setLoading]);
    return { order, loading, orderAddress };
};

export default UserOrderData;
