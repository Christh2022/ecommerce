import classes from "./css/login.module.css";
import Helmet from "../components/Helmet/Helmet";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, firestore } from "../Firebase.config";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";
import UserAuth from "../custom-hooks/userAuth";

const Signup = () => {
    const [name, setName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setShowInfo } = UserAuth();

    const signup = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                pwd
            );
            const user = userCredential.user;

            //mise à jour du profile
            await updateProfile(user, {
                displayName: name + " " + firstName,
            });

            //insertion des données dans le firestore
            await setDoc(doc(firestore, "utilisateur", user.uid), {
                id: user.uid,
                nom: name,
                prenome: firstName,
                email: email,
            });
            setLoading(false);
            toast.success("Félicitation vous etes inscrit");
            setTimeout(() => {
                navigate("/login");
            }, 300);
            setShowInfo(false);
        } catch (error) {
            toast.error("Une erreur c'est produit");
            console.log(error);
        }
    };
    return (
        <Helmet title="signup">
            <>
                <section>
                    <div className={classes.container}>
                        {loading ? (
                            <div className={classes.spinner}>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        ) : (
                            <div className={classes.row}>
                                <div className={classes.col}>
                                    <h3>Inscription</h3>
                                    <form onSubmit={signup}>
                                        <div className={classes.input_group}>
                                            <input
                                                type="text"
                                                placeholder="Entrez votre Nom"
                                                value={name}
                                                onChange={(e) =>
                                                    setName(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className={classes.input_group}>
                                            <input
                                                type="text"
                                                placeholder="Entrez votre Prénom"
                                                value={firstName}
                                                onChange={(e) =>
                                                    setFirstName(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className={classes.input_group}>
                                            <input
                                                type="email"
                                                placeholder="Entrez votre email"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className={classes.input_group}>
                                            <input
                                                type="password"
                                                placeholder="Mot de Passe"
                                                value={pwd}
                                                onChange={(e) =>
                                                    setPwd(e.target.value)
                                                }
                                            />
                                        </div>
                                        <button>créé un compte</button>
                                        <p>
                                            Vous avez déjà un compte?{" "}
                                            <Link to="/login">Cliquez ici</Link>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </>
        </Helmet>
    );
};

export default Signup;
