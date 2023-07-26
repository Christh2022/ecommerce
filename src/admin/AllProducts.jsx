import { useState } from "react";
import useIcons from "../Hooks/useIcons";
import classes from "./css/allProducts.module.css";
import { useEffect } from "react";
import UserGetData from "../custom-hooks/userGetData";

const AllProducts = () => {
    const { Delete } = useIcons();
    const [putIcons, setPutIcons] = useState(false);
    const [isLoaded, setIsLoaded] = useState(true);

    useEffect(() => {
        const showIcon = () => {
            if (window.innerWidth < 500) setPutIcons(true);
            else setPutIcons(false);
        };
        window.addEventListener("resize", showIcon);
        return () => removeEventListener("resize", showIcon);
    });

    const {
        data: productsData,
        loading,
        deleteProduct,
    } = UserGetData("produit");

    const handleImageLoad = () => {
        setIsLoaded(false);
    };
    const handleImageError = () => {
        // En cas d'erreur lors du chargement de l'image, on peut également gérer cela ici.
        setIsLoaded(true);
    };
    return (
        <div className={classes.rows}>
            {loading && isLoaded ? (
                <div style={{ width: "100%", height: "70vh" }}>
                    <div className={classes.spinner}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            ) : (
                <div className={classes.col}>
                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Titre</th>
                                <th>Categorie</th>
                                <th>Prix</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <div className={classes.spinner}>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                </tr>
                            ) : (
                                productsData?.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <img
                                                src={item.img}
                                                onLoad={handleImageLoad}
                                                onError={handleImageError}
                                                alt="/"
                                            />
                                        </td>
                                        <td>{item.title}</td>
                                        <td>{item.category}</td>
                                        <td>{item.price}</td>
                                        <td>
                                            {putIcons ? (
                                                <span
                                                    onClick={() =>
                                                        deleteProduct(item.id)
                                                    }
                                                >
                                                    <Delete />
                                                </span>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        deleteProduct(item.id)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AllProducts;
