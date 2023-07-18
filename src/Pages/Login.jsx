import classes from "./css/login.module.css";
import Helmet from "../components/Helmet/Helmet";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";
import { toast } from "react-toastify";
import UserAuth from "../custom-hooks/userAuth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setShowInfo } = UserAuth();

    const login = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, pwd);
            setLoading(false);
            toast.success("connexion réussit");
            setShowInfo(false);
            setTimeout(() => {
                navigate("/checkout");
            });
        } catch (error) {
            setLoading(false);
            toast.error(error.message);
        }
    };
    return (
        <Helmet title="Login">
            <>
                <section>
                    <div className={classes.container}>
                        <div className={classes.row}>
                            {loading ? (
                                <div className={classes.spinner}>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            ) : (
                                <div className={classes.col}>
                                    <h3>Connexion</h3>
                                    <form onSubmit={login}>
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
                                        <button>se connecter</button>
                                        <p>
                                            Vous n{`'`}avez pas de compte?{" "}
                                            <Link to="/signup">
                                                Cliquez ici
                                            </Link>
                                        </p>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </>
        </Helmet>
    );
};

export default Login;
