import { useParams } from "react-router-dom";
import CommonSection from "../UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import useProducts from "../Hooks/useProducts";
import classes from "./css/detail.module.css";
import useIcons from "../Hooks/useIcons";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { cartActions } from "../redux/slices/CartSlice";
import { useState } from "react";
import ProduitList from "../UI/ProduitList";
import { useEffect } from "react";
import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../Firebase.config";
import Stars from "../components/Stars/Stars";
import UserAuth from "../custom-hooks/userAuth";
import UserGetData from "../custom-hooks/userGetData";

const ProductDetail = () => {
    const { id } = useParams();
    const { product } = useProducts();
    const { currentUser } = UserAuth();
    const { Star, Heart, FilHeart } = useIcons();
    const { like } = UserGetData("favoris");

    const [rating, setRating] = useState(null);
    const [tab, setTab] = useState("desc");

    const [reviewUser, setReviewUser] = useState("");
    const [reviewMsg, setReviewMsg] = useState("");
    const [detail, setDetail] = useState(null);
    const [comment, setComment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [favoris, setFavoris] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState(null);
    const [note, setNote] = useState(0);

    useEffect(() => {
        if (product) {
            setDetail(product.find((item) => item.id === id));
            setComment(detail?.reviews);
            setNote(detail?.avrating.toFixed(2));
            if (detail) {
                setRelatedProducts(
                    product.filter((item) => item.category === detail.category)
                );
                setFavoris(
                    like.filter(
                        (item) =>
                            item.idUser === currentUser?.uid &&
                            item.idProduct === id
                    )
                );
                setLoading(false);
            }
        }
    }, [product, detail, id, like, currentUser]);

    const dispatch = useDispatch();
    const addToCart = () => {
        let newPrice = detail.price.replace(/\s/g, "").split("");

        if (newPrice.length - 1 >= 0 && newPrice.length - 1 < newPrice.length) {
            newPrice.splice(newPrice.length - 1, 1);
        }

        dispatch(
            cartActions.addItem({
                id: id,
                productName: detail.title,
                price: parseInt(newPrice.join("")),
                image: detail.img,
            })
        );

        toast.success("vous avez ajoutez un produit dans votre panier");
    };

    const handleHeart = async () => {
        if (id && currentUser) {
            try {
                //vérifie si ce document existe
                if (favoris[0]?.like) {
                    // si oui supprime le
                    await deleteDoc(
                        doc(firestore, "favoris", id + currentUser.uid)
                    );
                    toast.warning(
                        "ce produit vient d'etre retiré de vos favoris"
                    );
                }
                // s'il n'existe pas crée un nouveau document
                else {
                    await setDoc(
                        doc(firestore, "favoris", id + currentUser.uid),
                        {
                            idProduct: id,
                            idUser: currentUser.uid,
                            like: true,
                        }
                    );
                    toast.success(
                        "ce produit vient d'etre ajouté dans vos favoris"
                    );
                }
            } catch (error) {
                toast.error(`${error}`);
                console.log(error);
            }
        } else
            toast.warning(
                "Veuillez vous connecter pour ajouter cet article dans vos favoris"
            );
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const reviewObj = {
            id: detail.reviews.length + 1,
            userName: reviewUser,
            text: reviewMsg,
            rating,
        };
        const newTab = [...comment];
        newTab.push(reviewObj);

        //la moyenne des notes descommentaires
        const sumRating = newTab.reduce((acc, value) => acc + value.rating, 0);
        let average;
        if (newTab.length > 1) average = sumRating / newTab.length;
        console.log(sumRating, average);

        try {
            await updateDoc(doc(firestore, "produit", id), {
                avrating: average,
                reviews: newTab,
            });
            toast.success("votre commentaire a été ajouté avec succes");
        } catch (error) {
            console.log(error);
            toast.error(
                "une erreur s'est produite veuillez réécrire votre commentaires"
            );
        }

        setReviewMsg("");
        setReviewUser("");
        setRating(0);
    };
    
    return (
        <>
            {loading ? (
                <div
                    style={{
                        width: "100%",
                        minHeight: "70vh",
                        marginTop: "0rem",
                    }}
                >
                    <div className={classes.spinner}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            ) : (
                <Helmet title={detail?.title}>
                    <>
                        <CommonSection title={detail.title} />

                        <section>
                            <div className={classes.row}>
                                <div className={classes.col}>
                                    <img src={detail.img} alt="/" />
                                </div>
                                <div className={classes.col}>
                                    <div className={classes.product_detail}>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "50px",
                                            }}
                                        >
                                            <h2>{detail.title}</h2>
                                            <span
                                                onClick={handleHeart}
                                                style={{
                                                    color: "orange",
                                                    cursor: "pointer",
                                                    padding: "auto",
                                                }}
                                            >
                                                {favoris[0]?.like ? (
                                                    <FilHeart />
                                                ) : (
                                                    <Heart />
                                                )}
                                            </span>
                                        </div>
                                        <div className={classes.product_rating}>
                                            <div
                                                className={
                                                    classes.product_rating_star
                                                }
                                            >
                                                <Stars note={note} />
                                            </div>
                                            <p>
                                                (Note :{" "}
                                                <span>
                                                    {parseFloat(
                                                        detail.avrating.toFixed(
                                                            2
                                                        )
                                                    )}{" "}
                                                    / 5
                                                </span>
                                                )
                                            </p>
                                        </div>
                                        <span className={classes.price}>
                                            {detail.price}
                                        </span>
                                        <p className={classes.description}>
                                            {detail.shortDescription}
                                        </p>
                                        <button onClick={addToCart}>
                                            Ajoutez au panier
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className={classes.tab}>
                            <div className={classes.tab_wrapper}>
                                <h6
                                    className={`${
                                        tab === "desc"
                                            ? `${classes.active_tab}`
                                            : ""
                                    }`}
                                    onClick={() => setTab("desc")}
                                >
                                    Description
                                </h6>

                                <h6
                                    className={`${
                                        tab === "rev"
                                            ? `${classes.active_tab} ${classes.h6_tab}`
                                            : `${classes.h6_tab}`
                                    }`}
                                    onClick={() => setTab("rev")}
                                >
                                    commentaires ({detail.reviews.length})
                                </h6>
                            </div>

                            {tab === "desc" ? (
                                <div className={classes.tab_content}>
                                    <p>{detail.description}</p>
                                </div>
                            ) : (
                                <div className={classes.product_review}>
                                    <div className={classes.review_pwrapper}>
                                        <ul>
                                            {detail.reviews
                                                .reverse()
                                                .map((item) => (
                                                    <li key={item.id}>
                                                        <span>
                                                            {item.rating} (note
                                                            moyenne)
                                                        </span>
                                                        <p>{item.text}</p>
                                                    </li>
                                                ))}
                                        </ul>

                                        <div className={classes.review_form}>
                                            <h4>Laissez un message</h4>
                                            <form
                                                action=""
                                                onSubmit={submitHandler}
                                            >
                                                <div
                                                    className={
                                                        classes.form_group
                                                    }
                                                >
                                                    <input
                                                        type="text"
                                                        placeholder="Entrez votre nom"
                                                        onChange={(e) =>
                                                            setReviewUser(
                                                                e.target.value
                                                            )
                                                        }
                                                        value={reviewUser}
                                                        required
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        classes.form_group
                                                    }
                                                >
                                                    <span
                                                        onClick={() =>
                                                            setRating(1)
                                                        }
                                                    >
                                                        1<Star />
                                                    </span>
                                                    <span
                                                        onClick={() =>
                                                            setRating(2)
                                                        }
                                                    >
                                                        2<Star />
                                                    </span>
                                                    <span
                                                        onClick={() =>
                                                            setRating(3)
                                                        }
                                                    >
                                                        3<Star />
                                                    </span>
                                                    <span
                                                        onClick={() =>
                                                            setRating(4)
                                                        }
                                                    >
                                                        4<Star />
                                                    </span>
                                                    <span
                                                        onClick={() =>
                                                            setRating(5)
                                                        }
                                                    >
                                                        5<Star />
                                                    </span>
                                                </div>
                                                <div
                                                    className={
                                                        classes.form_group
                                                    }
                                                >
                                                    <textarea
                                                        rows={5}
                                                        placeholder="Ecrivez un Message..."
                                                        onChange={(e) =>
                                                            setReviewMsg(
                                                                e.target.value
                                                            )
                                                        }
                                                        value={reviewMsg}
                                                        required
                                                    />
                                                </div>
                                                <button type="submit">
                                                    Envoyez
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className={classes.relative_product}>
                                <h2 className={classes.related_title}>
                                    Vous aimeriez peut etre
                                </h2>
                            </div>
                            <ProduitList items={relatedProducts} />
                        </section>
                    </>
                </Helmet>
            )}
        </>
    );
};

export default ProductDetail;
