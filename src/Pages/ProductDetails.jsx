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
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../Firebase.config";

const ProductDetails = () => {
    const { id } = useParams();
    const { product } = useProducts();
    const { Star } = useIcons();

    const [rating, setRating] = useState(null);
    const [tab, setTab] = useState("desc");

    const [reviewUser, setReviewUser] = useState(null);
    const [reviewMsg, setReviewMsg] = useState(null);
    const [detail, setDetail] = useState(null);
    const [comment, setComment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedProducts, setRelatedProducts] = useState(null);
    useEffect(() => {
        if (product) {
            setDetail(product.find((item) => item.id === id));
            setComment(detail?.reviews)
            console.log(comment);
            if (detail) {
                setRelatedProducts(
                    product.filter((item) => item.category === detail.category)
                );
                setLoading(false);
            }
        }
    }, [product, detail, id]);

    const dispatch = useDispatch();
    const addToCart = () => {
        dispatch(
            cartActions.addItem({
                id: id,
                productName: detail.title,
                price: detail.price,
                image: detail.img,
            })
        );

        toast.success("vous avez ajoutez un produit dans votre panier");
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const reviewObj = {
            userName: reviewUser,
            text: reviewMsg,
            rating,
        };
        setComment([...comment, reviewObj])

        try {
            await updateDoc(doc(firestore, "produit", id), {
                avrating: 4,
                reviews: comment,
            });
            console.log(reviewObj);
            console.log(comment);
            toast.success("votre commentaire a été ajouté avec succes");
        } catch (error) {
            console.log(error);
            toast.error("une erreur s'est produite veuillez réécrire votre commentaires");
        }
    };
    return (
        <>
            {loading ? (
                <div
                    style={{
                        width: "100%",
                        minHeight: "70vh",
                        marginTop: "4rem",
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
                <Helmet title={detail.title}>
                    <>
                        <CommonSection title={detail.title} />

                        <section>
                            <div className={classes.row}>
                                <div className={classes.col}>
                                    <img src={detail.img} alt="/" />
                                </div>
                                <div className={classes.col}>
                                    <div className={classes.product_detail}>
                                        <h2>{detail.title}</h2>
                                        <div className={classes.product_rating}>
                                            <div
                                                className={
                                                    classes.product_rating_star
                                                }
                                            >
                                                <span
                                                    onClick={() => setRating(1)}
                                                >
                                                    <Star />
                                                </span>
                                                <span
                                                    onClick={() => setRating(2)}
                                                >
                                                    <Star />
                                                </span>
                                                <span
                                                    onClick={() => setRating(3)}
                                                >
                                                    <Star />
                                                </span>
                                                <span
                                                    onClick={() => setRating(4)}
                                                >
                                                    <Star />
                                                </span>
                                                <span
                                                    onClick={() => setRating(5)}
                                                >
                                                    <Star />
                                                </span>
                                            </div>
                                            <p>
                                                (Note :{" "}
                                                <span>{detail.avrating}/5</span>
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
                                            {detail.reviews.map((item) => (
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

export default ProductDetails;
