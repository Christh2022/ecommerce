import { useEffect, useRef, useState } from "react";
import useIcons from "../../Hooks/useIcons";
import useTable from "../../Hooks/useTable";
import classes from "./header.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserAuth from "../../custom-hooks/userAuth";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../Firebase.config.jsx";

const Header = () => {
    const { nav_item } = useTable();
    const [menu, setMenu] = useState(false);
    const [menuUser, setMenuUser] = useState(false);
    const { Menu, Shopping, Heart, User, Close } = useIcons();
    const headerRef = useRef();
    const btn = useRef();
    const navigate = useNavigate();
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    const { currentUser, showInfo, setShowInfo } = UserAuth();

    const seeMenu = () => {
        setMenu(!menu);
        if (!menu) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "auto";
    };
    const Sticky = () => {
        window.addEventListener("scroll", () => {
            if (
                document.body.scrollTop > 10 ||
                document.documentElement.scrollTop > 10
            ) {
                headerRef.current.classList.add("sticky");
            }
            if (
                document.body.scrollTop <= 10 &&
                document.documentElement.scrollTop <= 10
            ) {
                headerRef.current.classList.remove("sticky");
            }
        });
    };

    useEffect(() => {
        console.log(menu);
        Sticky();
        return () => window.removeEventListener("scroll", Sticky);
    });

    const navigateToCart = () => navigate("/cart");
    const navigateToLogin = () => {
        if (!currentUser) navigate("/login");
        else showInfo && setMenuUser(!menuUser);
    };

    const logout = async () => {
        try {
            await signOut(auth);
            toast.success("Vous venez de vous déconnecter");
            setShowInfo(false);
            navigate("/shop");
        } catch (error) {
            toast.error("ue erreur c'est produite");
        }
    };

    return (
        <>
            <div className={classes.header} ref={headerRef}>
                <div className={classes.logo}>logo</div>
                <div className={classes.wrapper}>
                    <ul>
                        {nav_item.map((link) => (
                            <li
                                key={link.Path}
                                className={classes.navItem}
                                onClick={() => window.scrollTo(0, 0)}
                            >
                                <NavLink
                                    to={link.Path}
                                    className={(navClass) =>
                                        navClass.isActive ? classes.active : ""
                                    }
                                >
                                    {link.display}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <div className={classes.nav_icon}>
                        <span className={classes.favIcon}>
                            <Heart />
                            <span className={classes.badge}>1</span>
                        </span>
                        <span
                            className={classes.cartIcon}
                            onClick={navigateToCart}
                        >
                            <Shopping />
                            <span className={classes.badge}>
                                {totalQuantity}
                            </span>
                        </span>
                        <span
                            className={classes.userIcon}
                            onClick={navigateToLogin}
                            style={{ position: "relative" }}
                        >
                            <User />
                            {menuUser && (
                                <div className={classes.user}>
                                    <p>{currentUser.displayName}</p>
                                    <p onClick={logout}>Déconnexion</p>
                                </div>
                            )}
                        </span>
                    </div>
                </div>
                <div className={classes.mobileMenu}>
                    <span onClick={seeMenu} ref={btn}>
                        <Menu />
                    </span>
                    <span className={classes.cartIcon} onClick={navigateToCart}>
                        <Shopping />
                        <span className={classes.badge}>{totalQuantity}</span>
                    </span>
                    <span className={classes.favIcon}>
                        <Heart />
                        <span className={classes.badge}>1</span>
                    </span>
                </div>
            </div>
            <div
                className={
                    menu ? classes.wrapperMobile : classes.wrapperMobilehiden
                }
            >
                <span
                    onClick={seeMenu}
                    ref={btn}
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row-reverse",
                        cursor: "pointer",
                        position: 'relative',
                        zIndex: '50'
                    }}
                >
                    <Close />
                </span>
                <ul>
                    {nav_item.map((link) => (
                        <li
                            key={link.Path}
                            onClick={() => {
                                setMenu(!menu);
                                window.scrollTo(0, 0);
                            }}
                            className={classes.navItem}
                        >
                            <NavLink
                                to={link.Path}
                                className={(navClass) =>
                                    navClass.isActive ? classes.active : ""
                                }
                            >
                                {link.display}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <div className={classes.nav_icon_mobile}>
                    <div>
                        <span className={classes.favIcon}>
                            <Heart />
                            <span className={classes.badge}>1</span>
                        </span>
                        <span
                            className={classes.cartIcon}
                            onClick={navigateToCart}
                        >
                            <Shopping />
                            <span className={classes.badge}>
                                {totalQuantity}
                            </span>
                        </span>
                    </div>
                    <span
                        className={classes.userIcon}
                        onClick={() => navigate("/login")}
                    >
                        <User />
                    </span>
                </div>
                <div className={classes.blur}></div>
            </div>
            
        </>
    );
};

export default Header;
