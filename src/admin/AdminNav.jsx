import { useEffect, useState } from "react";
import useIcons from "../Hooks/useIcons";
import classes from "./css/adminNav.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import UserAuth from "../custom-hooks/userAuth";
import { signOut } from "firebase/auth";
import { auth, firestore } from "../Firebase.config";
import { toast } from "react-toastify";
import UserGetData from "../custom-hooks/userGetData";
import { doc, updateDoc } from "firebase/firestore";

const AdminNav = () => {
    const { Search, Notification, Setting, User, Menu, Close } = useIcons();
    const [smallWidth, setSamllWidth] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const { currentUser, showInfo, setShowInfo } = UserAuth();
    const [menuUser, setMenuUser] = useState(false);
    const navigate = useNavigate();
    const { notifiactionTab } = UserGetData("notification");
    const { notifStatus } = UserGetData("notifstatus");
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

    //fonction pour gérer le bouton search
    const search = () => setShowSearch(!showSearch);
    
    //fonction pour gérer le bouton search
    const handleShowMenu = () => setShowMenu(!showMenu);
    const handleItem = () => {
        setShowMenu(false);
        window.scrollTo(0, 0);
    };

    //fonction pour gérer le bouton user
    const navigateToLogin = () => {
        if (!currentUser) navigate("/login");
        else showInfo && setMenuUser(!menuUser);
        window.innerWidth <= 500 && window.scrollTo(0, 0);
    };

    //fonction pour se déconnecter
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

    //fonction pour mettre à jour les notifications
    const updateNotif = async () => {
        await updateDoc(doc(firestore, "notifstatus", notifStatus[0].id), {
            status: false,
        });
    };

    useEffect(() => {
        if (notifiactionTab && notifStatus.length > 0) {
            if (notifStatus[0].status === true) {
                notifiactionTab.length > 0 &&
                    toast.success(
                        "une personne vient de passer une nouvelle commande"
                    );
                updateNotif();
            }
        } 
    }, [notifiactionTab, notifStatus]);

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
