import { Link } from "react-router-dom";
import classes from "./footer.module.css";
import useIcons from "../../Hooks/useIcons";

const Footer = () => {
    const { Mape, Phone, Envelope } = useIcons();
    return (
        <footer className={classes.footer}>
            <div className={classes.box}>
                <div className="logo">logo</div>

                <p className={classes.footer_text}>
                    Notre priorité est votre satisfaction et nous nous engageons
                    à vous offrir une expérience d{`'`}achat sans risque.
                    Profitez de notre garantie de remboursement et découvrez nos
                    produits de qualité dès aujourd{`'`}hui !
                </p>
            </div>
            <div className={classes.box}>
                <div className="footer_quick_links">
                    <h4 className="quick_links_title">Top Categories</h4>
                    <ul>
                        <li>
                            <Link to="#">Cheveux</Link>
                        </li>
                        <li>
                            <Link to="#">Tisane Maigrissant</Link>
                        </li>
                        <li>
                            <Link to="#">Produit de beauté</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={classes.box}>
                <div className="footer_quick_links">
                    <h4 className="quick_links_title">Liens utiles</h4>
                    <ul>
                        <li>
                            <Link to="/shop">Boutique</Link>
                        </li>
                        <li>
                            <Link to="/cart">Panier</Link>
                        </li>
                        <li>
                            <Link to="/login">Connexion</Link>
                        </li>
                        <li>
                            <Link to="#">politique de confidentialité</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={classes.box}>
                <div className="footer_quick_links">
                    <h4 className="quick_links_title">Contact</h4>
                    <ul>
                        <li>
                            <span>
                                <Mape />
                            </span>
                            <p>02 rue de martyr champigny, 94452</p>
                        </li>
                        <li>
                            <span>
                                <Phone />
                            </span>
                            <p>+33 (0) 0 00 00 00 00</p>
                        </li>
                        <li>
                            <span>
                                <Envelope />
                            </span>
                            <p>exemple@gmaail.fr</p>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
