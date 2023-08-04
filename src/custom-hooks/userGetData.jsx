import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { firestore } from "../Firebase.config";
import { toast } from "react-toastify";

const UserGetData = (collectionName) => {
    const [data, setData] = useState();
    const [userList, setUserList] = useState();
    const [like, setLike] = useState();
    const [notifStatus, setnotifStatus] = useState();
    const [notifiactionTab, setNotifiactionTab] = useState(false);

    const [loading, setLoading] = useState(true);
    const collectionRef = collection(firestore, collectionName);
    useEffect(() => {
        const getData = () => {
            try {
                onSnapshot(collectionRef, (snapshot) => {
                    setData(
                        snapshot.docs.map((doc) => ({
                            ...doc.data(),
                            id: doc.id,
                        }))
                    );
                    setLoading(false);
                });
                onSnapshot(collectionRef, (snapshot) => {
                    setUserList(
                        snapshot.docs.map((doc) => ({
                            ...doc.data(),
                            id: doc.id,
                        }))
                    );
                    setLoading(false);
                });
            } catch (error) {
                toast.error(
                    "une erreur s'est produite lors de la récupéraation des donnés"
                );
            }
        };

        const getLike = () => {
            onSnapshot(collection(firestore, collectionName), (snapshot) => {
                setLike(
                    snapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }))
                );
                setLoading(false);
            });
        };

        const getNotification = () => {
            onSnapshot(collectionRef, (snapshot) => {
                setNotifiactionTab(
                    snapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }))
                );
                setLoading(false);
            });
        };

        const getNotificationStatus = () => {
            onSnapshot(collectionRef, (snapshot) => {
                setnotifStatus(
                    snapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }))
                );
                setLoading(false);
            });
        };

        getData();
        getLike();
        getNotification();
        getNotificationStatus();

        return () => {};
    }, []);
    const deleteProduct = async (id) => {
        await deleteDoc(doc(firestore, "produit", id));
        toast.success("l'article a été supprimé avec succées");
    };

    return {
        data,
        loading,
        deleteProduct,
        userList,
        like,
        notifiactionTab,
        notifStatus,
    };
};

export default UserGetData;
