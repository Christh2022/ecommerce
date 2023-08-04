import UserGetData from "../custom-hooks/userGetData";
import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../Firebase.config";
import { useEffect, useState } from "react";

const useFonction = () => {
    const { userList } = UserGetData("utilisateur");
    //fonctions pour gérer les notifications
    const { notifiactionTab } = UserGetData("notification");
    const { notifStatus } = UserGetData("notifstatus");
    const [tab, setTab] = useState();
    
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

    useEffect(() => {
        if (notifiactionTab) {
            const newTab = [...notifiactionTab];
            notifiactionTab && setTab(newTab);
        }
    }, [notifiactionTab]);

    const handleNewNotification = async () => {
        try {
            await setDoc(doc(firestore, "notification", UUID()), {
                number: tab?.length + 1 || 1,
                notif: true,
            });
            if (notifStatus.length > 0) {
                await updateDoc(
                    doc(firestore, "notifstatus", notifStatus[0].id),
                    {
                        status: "true",
                    }
                );
            } else{
                await setDoc(doc(firestore, "notifstatus", UUID()), {
                    status: "true"
                })
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleNotificationSeen = async () => {
        await updateDoc(
            doc(firestore, "notifstatus", notifStatus[0].id),
            {
                status: "false",
            }
        );
        for (let i = 0; i < notifiactionTab.length; i++) {
            await deleteDoc(
                doc(firestore, "notification", notifiactionTab[i].id)
            );
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

    return {
        UUID,
        getEmail,
        getUser,
        handleNotificationSeen,
        handleNewNotification,
    };
};

export default useFonction;
