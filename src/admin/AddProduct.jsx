import { useState } from "react";
import classes from "./css/addProduct.module.css";
import { toast } from "react-toastify";
import { firestore, storage } from "../firebase.config.jsx";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import useFonction from "../Hooks/useFonction.jsx";

const AddProduct = () => {
    const [enterTitle, setEnterTitle] = useState("");
    const [enterShortDesc, setEnterShortDesc] = useState("");
    const [enterDescription, setEnterDescription] = useState("");
    const [enterCategory, setEnterCategory] = useState("");
    const [enterImage, setEnterImage] = useState(null);
    const [enterPrice, setEnterPrice] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState();
    const { UUID } = useFonction();

    const addProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (
                enterTitle &&
                enterShortDesc &&
                enterDescription &&
                enterCategory &&
                enterImage &&
                enterPrice
            ) {
                const storageRef = ref(
                    storage,
                    `productsImages/${UUID() + enterImage.name}`
                );
                const uploadTask = uploadBytesResumable(storageRef, enterImage);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100;
                        console.log("Upload is " + progress + "% done");
                        switch (snapshot.state) {
                            case "paused":
                                console.log("Upload is paused");
                                break;
                            case "running":
                                console.log("Upload is running");
                                break;
                            default:
                        }
                    },
                    (error) => {
                        toast.error("une erreur s'est produite");
                        console.log(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(
                            async (downloadURL) => {
                                await addDoc(collection(firestore, "produit"), {
                                    title: enterTitle,
                                    shortDescription: enterShortDesc,
                                    description: enterDescription,
                                    category: enterCategory,
                                    price: enterPrice,
                                    img: downloadURL,
                                    status: "new",
                                    best_sale: false,
                                    avrating: 4,
                                    reviews: [
                                        {
                                            id: 1,
                                            rating: `${(2, 3)}`,
                                            text: "lorem dolor sit amet consectetur adipisicing elit",
                                        },
                                    ],
                                });
                                console.log(downloadURL);
                            }
                        );
                        toast.success("vous avez ajouté un nouveau produit");
                        setLoading(false);
                        navigate("/dashboard/all-products");
                    }
                );
            } else {
                toast.error("veuillez remplir tous les champs");
                setLoading(false);
            }
        } catch (error) {
            toast.error("une erreur s'est produite");
        }
    };
    return (
        <>
            <div className={classes.row}>
                {loading ? (
                    <div className={classes.col}>
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
                        <h6>Ajoutez un produit</h6>
                        <form onSubmit={addProduct}>
                            <div className={classes.input_group}>
                                <span>Nom du Produit</span>
                                <div className={classes.input_box}>
                                    <input
                                        type="text"
                                        placeholder="tissage ...."
                                        value={enterTitle}
                                        onChange={(e) =>
                                            setEnterTitle(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className={classes.input_group}>
                                <span>Courte Description</span>
                                <div className={classes.input_box}>
                                    <input
                                        type="text"
                                        placeholder="tissage ...."
                                        value={enterShortDesc}
                                        onChange={(e) =>
                                            setEnterShortDesc(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className={classes.input_group}>
                                <span>Description</span>
                                <div className={classes.input_box}>
                                    <input
                                        type="text"
                                        placeholder="Description ...."
                                        value={enterDescription}
                                        onChange={(e) =>
                                            setEnterDescription(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className={classes.input_price}>
                                <div className={classes.input_group}>
                                    <span>Prix</span>
                                    <div className={classes.input_box}>
                                        <input
                                            type="text"
                                            placeholder="120€"
                                            value={enterPrice}
                                            onChange={(e) =>
                                                setEnterPrice(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className={classes.input_group}>
                                    <span>Catégorie</span>
                                    <select
                                        value={enterCategory}
                                        onChange={(e) =>
                                            setEnterCategory(e.target.value)
                                        }
                                    >
                                        <option>Choisir une catégorie</option>
                                        <option value="creme">Crème</option>
                                        <option value="hair">Cheveux</option>
                                        <option value="tisane">Tisane</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <div className={classes.input_group}>
                                    <span>Image du Produit</span>
                                    <input
                                        type="file"
                                        onChange={(e) =>
                                            setEnterImage(e.target.files[0])
                                        }
                                    />
                                </div>
                            </div>
                            <button>Ajoutez le Produit</button>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
};

export default AddProduct;
