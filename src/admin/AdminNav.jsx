import { useEffect, useState } from "react";
import useIcons from "../Hooks/useIcons";
import classes from "./css/adminNav.module.css";
import { NavLink } from "react-router-dom";

const AdminNav = () => {
    const { Search, Notification, Setting, User, Menu, Close } = useIcons();
    const [smallWidth, setSamllWidth] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
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
        handleShowMenu;
        window.scrollTo(0, 0);
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
        console.log(showMenu);

        return () => {
            window.removeEventListener("resize", small);
        };
    });

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
                                    <User />
                                </span>
                            </>
                        )}
                        <span>
                            <Notification />
                        </span>
                        <span>
                            <Setting />
                        </span>
                        {smallWidth && (
                            <span onClick={handleShowMenu}>
                                <Menu />
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
