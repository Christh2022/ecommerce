import {BsTruck, BsCurrencyExchange} from 'react-icons/bs'
import {BiRefresh} from 'react-icons/bi'
import {MdPayment} from 'react-icons/md'
const serviceData = () => {
    const data = [
        {
            icon : BsTruck,
            title: 'Livraison Gratuite',
            subtitle : 'Livraison Gratuite sur toutes les commandes supérieur à 50€',
            id: 1,
            bg: '#ebcdab'
        },
        {
            icon : BiRefresh,
            title: 'Retour Facile',
            subtitle : 'Renvoyé le colis dans un interval de 14 jours après sa reception',
            id: 2,
            bg: '#8FBF9F'
        },
        {
            icon : MdPayment,
            title: 'Paiement Sécurisé',
            subtitle : 'Paiement 100% sécurisé',
            id: 3,
            bg: '#F5D7B5'
        },
        {
            icon : BsCurrencyExchange,
            title: 'Remboursement Garantie',
            subtitle : 'Nous vous offrons une garantie de remboursement sans conditions.',
            id: 4,
            bg: '#B7C4CF'
        },
    ];

    return {data};
};

export default serviceData;