import { useEffect, useState } from "react";
import useIcons from "../Hooks/useIcons";
import classes from "./css/adminNav.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import UserAuth from "../custom-hooks/userAuth";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase.config";
import { toast } from "react-toastify";
import useFonction from "../Hooks/useFonction";
import UserGetData from "../custom-hooks/userGetData";

const AdminNav = () => {
    const { Search, Notification, Setting, User, Menu, Close } = useIcons();
    const [smallWidth, setSamllWidth] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const { currentUser, showInfo, setShowInfo } = UserAuth();
    const { handleNotificationSeen } = useFonction();
    const [menuUser, setMenuUser] = useState(false);
    const navigate = useNavigate();
    const { notifiactionTab } = UserGetData("notification");
    const adminNav = [
        {
            display: "Tableau de bord",
            path: "/dashboard",
        },
        {
            display: "Produits",
            path: "/dashboard/all-products",
        },
        {
            display: "Ajouter un produit",
            path: "/dashboard/add-products",
        },
        {
            display: "Administrateur",
            path: "/dashboard/user",
        },
    ];

    const search = () => setShowSearch(!showSearch);

    const handleShowMenu = () => setShowMenu(!showMenu);
    const handleItem = () => {
        setShowMenu(false);
        window.scrollTo(0, 0);
    };

    const navigateToLogin = () => {
        if (!currentUser) navigate("/login");
        else showInfo && setMenuUser(!menuUser);
        window.scrollTo(0, 0);
    };

    const logout = async () => {
        try {
            await signOut(auth);
            toast.success("Vous venez de vous déconnecter");
            setShowInfo(false);
            navigate("/shop");
            window.scrollTo(0, 0);
        } catch (error) {
            toast.error("ue erreur c'est produite");
        }
    };

    useEffect(() => {
        const small = () => {
            window.addEventListener("resize", () => {
                if (window.innerWidth <= 760) setSamllWidth(true);
                else setSamllWidth(false);
            });

            if (window.innerWidth <= 500) setSamllWidth(true);
        };
        small();

        return () => {
            window.removeEventListener("resize", small);
        };
    });

    useEffect(() => {
        if (notifiactionTab) {
            notifiactionTab.length > 0 &&
                toast.success(
                    "une personne vient de passer une nouvelle commande"
                );
        } else {
            console.log("good");
        }
    }, [notifiactionTab]);

    return (
        <>
            <header className={classes.admin_header}>
                <div className={classes.admin_nav_top}>
                    <div className={classes.logo}>
                        <h2>logo</h2>
                    </div>
                    {!smallWidth && (
                        <div className={classes.search_box}>
                            <input type="text" placeholder="Recherche..." />
                            <span>
                                <Search />
                            </span>
                        </div>
                    )}
                    <div className={classes.admin_nav_right}>
                        {smallWidth && (
                            <span onClick={search}>
                                <Search />
                            </span>
                        )}
                        {!smallWidth && (
                            <>
                                <span>
                                    <Setting />
                                </span>
                            </>
                        )}
                        <span
                            style={{ position: "relative" }}
                            onClick={handleNotificationSeen}
                        >
                            <Notification />
                            {notifiactionTab?.length !== 0 && (
                                <span className={classes.badge}>
                                    {notifiactionTab?.length || 0}
                                </span>
                            )}
                        </span>
                        <span onClick={navigateToLogin}>
                            <User />
                            {menuUser && (
                                <div className={classes.user}>
                                    <p>{currentUser?.displayName}</p>
                                    <p
                                        onClick={logout}
                                        style={{ cursor: "pointer" }}
                                    >
                                        Déconnexion
                                    </p>
                                </div>
                            )}
                        </span>
                        {smallWidth && (
                            <span onClick={handleShowMenu}>
                                {showMenu ? <Close /> : <Menu />}
                            </span>
                        )}
                    </div>
                </div>
                {showSearch && (
                    <div className={classes.search_box_mobile}>
                        <div className={classes.search_box}>
                            <input type="text" placeholder="Recherche..." />
                            <span onClick={search}>
                                <Close />
                            </span>
                        </div>
                    </div>
                )}
            </header>

            <section className={classes.admin_menu}>
                <div className={classes.admin_navigation}>
                    <ul className={classes.admin_menu_list}>
                        {adminNav.map((item, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    handleShowMenu;
                                    window.scrollTo(0, 0);
                                }}
                                className={classes.admin_menu_item}
                            >
                                <NavLink
                                    to={item.path}
                                    className={(navClass) =>
                                        navClass.isActive
                                            ? `${classes.active_admin_menu}`
                                            : ""
                                    }
                                >
                                    {item.display}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/**Mobile Menu navigation */}

            {smallWidth && (
                <section className={classes.admin_menu_mobile}>
                    <div className={classes.admin_navigation_mobile}>
                        <ul
                            className={
                                showMenu
                                    ? classes.show_mobile_menu
                                    : classes.admin_menu_list_mobile
                            }
                        >
                            {adminNav.map((item, index) => (
                                <li
                                    key={index}
                                    className={classes.admin_menu_mobile_item}
                                    onClick={handleItem}
                                >
                                    <NavLink
                                        to={item.path}
                                        className={(navClass) =>
                                            navClass.isActive
                                                ? `${classes.active_admin_menu_mobile}`
                                                : ""
                                        }
                                    >
                                        {item.display}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            )}
        </>
    );
};

export default AdminNav;
