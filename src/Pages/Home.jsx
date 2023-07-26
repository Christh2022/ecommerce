import useProducts from "../Hooks/useProducts";
import ProduitList from "../UI/ProduitList";
import Helmet from "../components/Helmet/Helmet";
import Services from "../services/Services";
import classes from "./css/home.module.css";
import img from "../assets/images/image1.png";
import Clock from "../UI/Clock";
import { Link } from "react-router-dom";
import useImage from "../Hooks/useImage";
import { useEffect, useState } from "react";

const Home = () => {
    const { hair, bestSale, newArrival, table, liquid } = useProducts();
    const { image_1, image_2, image_3, image_4, image_5 } = useImage();
    const [isLoaded, setIsLoaded] = useState(true);
    useEffect(()=>{
        setTimeout(()=>{
            setIsLoaded(false);
        }, 300)
    })
    const handleImageLoad = () => {
        setIsLoaded(false);
        console.log('good');
    };
    const handleImageError = () => {
        // En cas d'erreur lors du chargement de l'image, on peut également gérer cela ici.
        setIsLoaded(true);
        console.log('error');
    };
    return (
        <Helmet title="home" style={{ width: "100%", overflow: "hidden" }}>
            <>
                {isLoaded ? (
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
                    <>
                        <section className={classes.home}>
                            <div className={classes.wrapper}>
                                <div className={classes.intro_left}>
                                    <img
                                        src={image_1}
                                        onLoad={handleImageLoad}
                                        onError={handleImageError}
                                        alt="/"
                                    />
                                    <div className={classes.container_wrapper}>
                                        <span>
                                            Nouveau Produit Riche en Vitamine E
                                        </span>
                                        <h4>Huile éclaircissante.</h4>
                                        <p>
                                            Soit 50€ ou 12.5€/mois Pendant
                                            <br /> 4 mois. Note de bas de page*
                                        </p>
                                        <button>Acheter</button>
                                    </div>
                                </div>
                                <div className={classes.intro_right}>
                                    <div className={classes.box}>
                                        <div>
                                            <span>meilleur vente</span>
                                            <h4>Huile de Beauté</h4>
                                            <p>50 € ou 12.5 € / mois</p>
                                        </div>
                                        <img
                                            src={image_2}
                                            onLoad={handleImageLoad}
                                            onError={handleImageError}
                                            alt=""
                                        />
                                    </div>
                                    <div className={classes.box}>
                                        <div>
                                            <span>Nouvel arrivé</span>
                                            <h4>Lait de Beauté</h4>
                                            <p>33.00 € ou 16.5€/mois</p>
                                        </div>
                                        <img
                                            src={image_3}
                                            onLoad={handleImageLoad}
                                            onError={handleImageError}
                                            alt=""
                                        />
                                    </div>
                                    <div className={classes.box}>
                                        <div>
                                            <span>Nouvel arrivé</span>
                                            <h4>Lait de Beauté</h4>
                                            <p>33.00 € ou 16.5€/mois</p>
                                        </div>
                                        <img
                                            src={image_4}
                                            onLoad={handleImageLoad}
                                            onError={handleImageError}
                                            alt=""
                                        />
                                    </div>
                                    <div className={classes.box}>
                                        <div>
                                            <span>Nouvel arrivé</span>
                                            <h4>Huile de Beauté</h4>
                                            <p>50 € ou 12.5 € / mois</p>
                                        </div>
                                        <img
                                            src={image_5}
                                            onLoad={handleImageLoad}
                                            onError={handleImageError}
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>
                        <Services />
                        <section className={classes.trending_products}>
                            <h2 className={classes.section_title}>
                                Produits Tendance
                            </h2>
                            {!hair ? (
                                <div className={classes.spinner}>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            ) : (
                                <div className={classes.products__list}>
                                    <ProduitList items={hair} />
                                </div>
                            )}
                        </section>

                        <section className={classes.best_sale}>
                            <h2 className={classes.section_title}>
                                Meilleur ventes
                            </h2>
                            {!bestSale ? (
                                <div className={classes.spinner}>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            ) : (
                                <div className={classes.products__list}>
                                    <ProduitList items={bestSale} />
                                </div>
                            )}
                        </section>

                        <section className={classes.timer_count}>
                            <div className={classes.left}>
                                <div className={classes.clock_top_content}>
                                    <h4>Offres limités</h4>
                                    <h3>Produit de Qualité</h3>
                                </div>
                                <Clock />
                                <div className={classes.buy_btn}>
                                    <Link to="/shop">Visitez la Boutique</Link>
                                </div>
                            </div>
                            <div className={classes.right}>
                                <img src={img} alt="/" />
                            </div>
                        </section>

                        <section className={classes.new_arrival}>
                            <h2 className={classes.section_title}>
                                Nouveaux produits
                            </h2>
                            {!newArrival ? (
                                <div className={classes.spinner}>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            ) : (
                                <div className={classes.products__list}>
                                    <ProduitList items={newArrival} />
                                </div>
                            )}
                        </section>

                        <section className={classes.popular_category}>
                            <h2 className={classes.section_title}>
                                Populaire dans la catégorie
                            </h2>
                            <div
                                className={classes.products__list}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "15px",
                                    width: "100%",
                                }}
                            >
                                <div className="hair">
                                    <h6>Cheveux</h6>
                                    {!hair ? (
                                        <div className={classes.spinner}>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                    ) : (
                                        <ProduitList items={hair} />
                                    )}
                                </div>
                                <div className="liquid">
                                    <h6>Tisane Maigrissant</h6>
                                    {!liquid ? (
                                        <div className={classes.spinner}>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                    ) : (
                                        <ProduitList items={liquid} />
                                    )}
                                </div>
                                <div className="table">
                                    <h6>Crème éclaircissannte</h6>
                                    {!table ? (
                                        <div className={classes.spinner}>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                    ) : (
                                        <ProduitList items={table} />
                                    )}
                                </div>
                            </div>
                        </section>
                    </>
                )}
            </>
        </Helmet>
    );
};

export default Home;
