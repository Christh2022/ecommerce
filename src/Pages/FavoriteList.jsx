import { useEffect, useState } from "react";
import classes from "./css/favoritelist.module.css";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../UI/CommonSection";
import ProduitList from "../UI/ProduitList";
import UserAuth from "../custom-hooks/userAuth";
import UserGetData from "../custom-hooks/userGetData";
import useProducts from "../Hooks/useProducts";

const FavoriteList = () => {
    const [isLoaded, setIsLoaded] = useState(true);
    const [list, setList] = useState(null);
    const [tab, setTab] = useState(null);
    const { currentUser } = UserAuth();
    const { like } = UserGetData("favoris");
    const { product } = useProducts();
    useEffect(() => {
        if (like) {
            setList(like.filter((item) => item.idUser === currentUser.uid));
            let newTab = [];
            if (list) {
                for (let i = 0; i < like.length; ++i) {
                    const table = product.filter(
                        (item) => item.id === list[i].idProduct
                    );
                    newTab.push(table[0]);
                }
                setTab(newTab);
            }
            setIsLoaded(false);
        }
        return () => {};
    }, [like, currentUser, product]);
    return (
        <Helmet title="Favoris">
            <>
                <div
                    style={
                        isLoaded
                            ? { width: "100%", height: "70vh" }
                            : { display: "none" }
                    }
                >
                    <div className={classes.spinner}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>

                {!isLoaded && (
                    <>
                        <CommonSection title="Mes Favoris" />
                        <section className={classes.favorite}>
                            {tab && <ProduitList items={tab} />}
                        </section>
                    </>
                )}
            </>
        </Helmet>
    );
};

export default FavoriteList;
