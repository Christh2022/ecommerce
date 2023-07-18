

const useTable = () => {
    const nav_item = [
        {
            Path: "home",
            display: "Accueil",
        },
        {
            Path: "shop",
            display: "Boutique",
        },
        {
            Path: "cart",
            display: "Cart",
        },
        {
            Path: "contact",
            display: "Contact",
        },
    ];
    return {nav_item} ;
};

export default useTable;