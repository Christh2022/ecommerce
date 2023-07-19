import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../Firebase.config";

const useProducts = () => {
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState([]);
    const [hair, setHair] = useState([]);
    const [table, setTable] = useState([]);
    const [liquid, setLiquid] = useState([]);
    const [bestSale, setBestSale] = useState([]);
    const [newArrival, setNewArrival] = useState([]);
    const [change, setChange] = useState(false);
    
    const collectionRef = collection(firestore, "produit");

    useEffect(() => {
        const getData = async () => {
            onSnapshot(collectionRef, (snapshot) => {
                setProduct(
                    snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                );
                if (product) {
                    setHair(product.filter((item) => item.category === "hair"));
                    setTable(
                        product.filter((item) => item.category === "creme")
                    );
                    setLiquid(
                        product.filter((item) => item.category === "tisane")
                    );
                    setBestSale(
                        product.filter((item) => item.best_sale === true)
                    );
                    setNewArrival(
                        product.filter((item) => item.status === "new")
                    );
                    setLoading(false);
                    setChange(true)
                }
            });
            // console.log(product);
        };

        getData();

        return () => {};
    }, [change]);
    return { hair, bestSale, newArrival, table, liquid, product, loading };
};

export default useProducts;
