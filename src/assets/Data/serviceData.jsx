import { BsTruck, BsCurrencyExchange } from "react-icons/bs";
import { BiRefresh } from "react-icons/bi";
import { MdPayment } from "react-icons/md";
import { useEffect, useState } from "react";
import UseIcons from "../../Hooks/useIcons";
import UserOrderData from "../../custom-hooks/userOrderData";
import UserGetData from "../../custom-hooks/userGetData";
const ServiceData = () => {
    const { Euro, Shop_admin, Quantity, User } = UseIcons();
    const { order } = UserOrderData();
    const { userList } = UserGetData("utilisateur");
    const [order_info, setOrder_info] = useState(null);
    useEffect(() => {
        if (order && userList) {
            setOrder_info([
                {
                    title: "Revenue",
                    amount: `${order.reduce((acc, item) => acc + item.amount, 0)}`,
                    color: "#ebcdab",
                    color_2: "rgb(243 170 7)",
                    icon: <Euro/>,
                },
                {
                    title: "commandes",
                    amount: order?.length || 0,
                    color: "#8FBF9F",
                    color_2: "#ffe992",
                    icon: <Shop_admin/>
                },
                {
                    title: "Produits",
                    amount: order.reduce((acc, item) => acc + item.quantity, 0),
                    color: "#F5D7B5",
                    color_2: "orange",
                    icon: <Quantity/>
                },
                {
                    title: `Utilisateur${userList.lenght !== 1 ?  's' : '' }`,
                    amount: userList.length || 0,
                    color: "#B7C4CF",
                    color_2: "#b38835",
                    icon: <User/>
                },
            ])
        }
    }, [userList, Euro]);
    const data = [
        {
            icon: BsTruck,
            title: "Livraison Gratuite",
            subtitle:
                "Livraison Gratuite sur toutes les commandes supérieur à 50€",
            id: 1,
            bg: "#ebcdab",
        },
        {
            icon: BiRefresh,
            title: "Retour Facile",
            subtitle:
                "Renvoyé le colis dans un interval de 14 jours après sa reception",
            id: 2,
            bg: "#8FBF9F",
        },
        {
            icon: MdPayment,
            title: "Paiement Sécurisé",
            subtitle: "Paiement 100% sécurisé",
            id: 3,
            bg: "#F5D7B5",
        },
        {
            icon: BsCurrencyExchange,
            title: "Remboursement Garantie",
            subtitle:
                "Nous vous offrons une garantie de remboursement sans conditions.",
            id: 4,
            bg: "#B7C4CF",
        },
    ];


    return { data, order_info };
};

export default ServiceData;
