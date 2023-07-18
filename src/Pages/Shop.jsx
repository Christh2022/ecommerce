import { useState } from "react";
import useIcons from "../Hooks/useIcons";
import CommonSection from "../UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import classes from "./css/shop.module.css";
import useProducts from "../Hooks/useProducts";
import ProduitList from "../UI/ProduitList";

const Shop = () => {
    const { Search } = useIcons();
    const { product, table, hair, liquid } = useProducts();
    const [productsData, setProductsData] = useState([...product]);
    const handleFilter = (e) => {
        const filterValue = e.target.value;
        if (filterValue === "creme") {
            setProductsData(table);
        } else if (filterValue === "hair") {
            setProductsData(hair);
        } else if (filterValue === "tisane") {
            setProductsData(liquid);
        } else {
            setProductsData(product);
        }
    };

    const handleSearch = (e) => {
        const searchWord = e.target.value;
        const searchproducts = product.filter((item) =>
            item.title
                .toLocaleLowerCase()
                .includes(searchWord.toLocaleLowerCase())
        );
        setProductsData(searchproducts);
    };

    return (
        <Helmet title="Boutique">
            <>
                <CommonSection title={"Produits"} />

                <section>
                    <div className={classes.row}>
                        <div className={classes.col}>
                            <div className={classes.filter_widget}>
                                <select onChange={handleFilter}>
                                    <option>Filtré par Catégorie</option>
                                    <option value="creme">
                                        Produit Cosmétique
                                    </option>
                                    <option value="hair">
                                        Mèche Brésilienne
                                    </option>
                                    <option value="tisane">
                                        Tisane Maigrissant
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className={classes.col}>
                            <div className={classes.filter_widget}>
                                <select onChange={handleFilter}>
                                    <option>Trié par</option>
                                    <option value="ascending">Ascendant</option>
                                    <option value="descending">
                                        Déscendant
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className={classes.col}>
                            <div className={classes.serch_box}>
                                <input
                                    type="text"
                                    placeholder="Recherche...."
                                    onChange={handleSearch}
                                />
                                <span>
                                    <Search />
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div className={classes.row_product}>
                        {productsData.length === 0 ? (
                            <h1>Aucun produit trouvé</h1>
                        ) : (
                            <ProduitList items={productsData} />
                        )}
                    </div>
                </section>
            </>
        </Helmet>
    );
};

export default Shop;
