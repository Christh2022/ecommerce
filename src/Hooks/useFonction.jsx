import UserGetData from "../custom-hooks/userGetData";
import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../Firebase.config";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useFonction = () => {
    const { userList } = UserGetData("utilisateur");
    const { notifStatus } = UserGetData("notifstatus");
    const [notifColor, setNotifColor] = useState(false);


    //fonction pour générer un uuid
    const UUID = () => {
        let d = new Date().getTime(); //Timestamp
        let d2 =
            (typeof performance !== "undefined" &&
                performance.now &&
                performance.now() * 1000) ||
            0; //Time in microseconds since page-load or 0 if unsupported
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
            /[xy]/g,
            function (c) {
                var r = Math.random() * 16; //random number between 0 and 16
                if (d > 0) {
                    //Use timestamp until depleted
                    r = (d + r) % 16 | 0;
                    d = Math.floor(d / 16);
                } else {
                    //Use microseconds since page-load if supported
                    r = (d2 + r) % 16 | 0;
                    d2 = Math.floor(d2 / 16);
                }
                return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
            }
        );
    };

    const handleNewNotification = async (id) => {
        try {
            await setDoc(doc(firestore, "notification", id), {
                notif: true,
            });
            if (notifStatus.length > 0) {
                const tab = [...notifStatus[0].tab_notif];
                tab.push({ order_id: id });
                await updateDoc(
                    doc(firestore, "notifstatus", notifStatus[0].id),
                    {
                        status: true,
                        tab_notif: tab,
                    }
                );
            } else {
                await setDoc(doc(firestore, "notifstatus", UUID()), {
                    status: true,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };


    const handleNotificationSeen = async (id) => {
        await updateDoc(doc(firestore, "notifstatus", notifStatus[0].id), {
            status: false,
        });
        await deleteDoc(doc(firestore, "notification", id));
    };

    useEffect(() => {
        if (notifStatus?.length > 0) setNotifColor(notifStatus[0]?.status);
        return () => {};
    }, [notifStatus]);

    //fonction pour gérer l'affichage de l'heure
    const getTimestamp = (item) => {
        const milliseconds = item.seconds * 1000;
        const date = new Date(milliseconds);

        // Obtenez la date d'aujourd'hui
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Remettre à zéro les heures, minutes, secondes et millisecondes pour comparer les jours seulement

        // Obtenez la date d'hier
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        // Obtenez la date d'hier
        const dayBeforeYesterday = new Date(today);
        dayBeforeYesterday.setDate(today.getDate() - 2);

        if (date.toDateString() === today.toDateString()) {
            return "Aujourd'hui";
        } else if (date.toDateString() === yesterday.toDateString()) {
            return "Hier";
        } else if (date.toDateString() === dayBeforeYesterday.toDateString()) {
            return "Avant Hier";
        } else {
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();

            const formattedDate = `${day.toString().padStart(2, "0")}-${month
                .toString()
                .padStart(2, "0")}-${year}`;
            return formattedDate;
        }
    };

    //fonction pour obtenir le nom de l'utilisateur
    const getUser = (id) => {
        const uid = userList.filter((item) => item.id === id);
        return uid[0].nom + " " + uid[0].prenome;
    };

    //fonction pour obtenir le mail de l'utilisateur
    const getEmail = (id) => {
        const uid = userList.filter((item) => item.id === id);
        return uid[0].email;
    };

    //fonction pour stocker les informations de la livraison
    const shippingInfo = async (uid,nom, add, codePostale, ville, pays, num, email) => {
        try {
            setDoc(doc(firestore, "infoLivraison", uid), {
                Name: nom,
                Address: add,
                CP: codePostale,
                City: ville,
                country: pays,
                tel: num,
                Email: email,
                shippingStatus: "traitement",
            });
        } catch (error) {
            toast.error(error);
        }
    };

    return {
        notifColor,
        UUID,
        getEmail,
        getUser,
        getTimestamp,
        handleNotificationSeen,
        handleNewNotification,
        shippingInfo,
    };
};

export default useFonction;
