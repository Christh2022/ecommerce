import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { firestore } from "../firebase.config";
import { toast } from "react-toastify";

const UserGetData = (collectionName) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const collectionRef = collection(firestore, collectionName);
    useEffect(() => {
        const getData = async () => {
            await onSnapshot(collectionRef, (snapshot) => {
                setData(
                    snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                );
                setLoading(false);
            });
        };

        getData();
    }, []);
    const deleteProduct = async (id) => {
        await deleteDoc(doc(firestore, "produit", id));
        toast.success("l'article a été supprimé avec succées");
    };

    return { data, loading, deleteProduct };
};

export default UserGetData;
