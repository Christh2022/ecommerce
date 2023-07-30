

const useTable = () => {
    const nav_item = [
        {
            Path: "home",
            display: "Accueil",
            function: () => window.scrollTo(0, 0)
        },
        {
            Path: "shop",
            display: "Boutique",
            function: () => window.scrollTo(0, 0)
        },
        {
            Path: "cart",
            display: "Panier",
            function: () => window.scrollTo(0, 0)
        },
        {
            Path: "",
            display: "Contact",
            function: () =>  window.location.href = 'mailto:exemple@gmail.fr'
        },
    ];
    return {nav_item} ;
};

export default useTable;