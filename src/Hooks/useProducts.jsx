import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../firebase.config";

const useProducts = () => {
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState([]);
    const [hair, setHair] = useState([]);
    const [table, setTable] = useState([]);
    const [liquid, setLiquid] = useState([]);
    const [bestSale, setBestSale] = useState([]);
    const [newArrival, setNewArrival] = useState([]);
    const collectionRef = collection(firestore, "produit");

    // {
    //     img: "https://www.demeter.fr/wp-content/uploads/2022/01/AdobeStock_272372012-scaled-e1648815823187.jpeg",
    //     description:
    //         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem suscipit iste debitis eos distinctio accusamus nihil dignissimos, in pariatur odio blanditiis, aspernatur a accusantium eligendi sint corporis deleniti inventore quia.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, possimus? Quas deserunt quia explicabo excepturi laboriosam ipsa omnis, enim, iure autem magnam id dolorum consequatur reiciendis dolores! Ut, earum sint.",
    //     title: "Huile éclaircissante",
    //     price: 200,
    //     status: "old",
    //     category: "creme",
    //     shortDescription:
    //         "lorem mammamdhjjh pzieebd paoeeuie auzauiziuezuet dolor sit amet consectetur adipisicing elit dolor sit amet consectetur adipisicing elit",
    //     best_sale: true,
    //     id: 1,
    //     avrating: 3,
    //     reviews: [{id: 1,rating : `${2,3}`, text : 'lorem dolor sit amet consectetur adipisicing elit'}]
    // },
    // {
    //     img: "https://www.leparisien.fr/resizer/3B4WPIFf24gjtHX5s4p1kMtjJ1w=/932x582/cloudfront-eu-central-1.images.arcpublishing.com/lpguideshopping/ZO544NJ2RBDDVKEFFGU2LE4UTU.jpg",
    //     description:
    //         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem suscipit iste debitis eos distinctio accusamus nihil dignissimos, in pariatur odio blanditiis, aspernatur a accusantium eligendi sint corporis deleniti inventore quia.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, possimus? Quas deserunt quia explicabo excepturi laboriosam ipsa omnis, enim, iure autem magnam id dolorum consequatur reiciendis dolores! Ut, earum sint.",
    //     title: "creme éclaircissante",
    //     price: 200,
    //     status: "old",
    //     category: "creme",
    //     shortDescription:
    //         "lorem mammamdhjjh pzieebd paoeeuie auzauiziuezuet dolor sit amet consectetur adipisicing elit dolor sit amet consectetur adipisicing elit",
    //     best_sale: true,
    //     id: 2,
    //     avrating: 4,
    //     reviews: [{id: 1, rating : `${2,3}`, text : 'lorem dolor sit amet consectetur adipisicing elit'}]
    // },
    // {
    //     img: "https://www.natureo-bio.fr/wp-content/uploads/2017/07/SOIN-BEAUTE-BIO-Lechoix-min.jpg",
    //     description:
    //         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem suscipit iste debitis eos distinctio accusamus nihil dignissimos, in pariatur odio blanditiis, aspernatur a accusantium eligendi sint corporis deleniti inventore quia.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, possimus? Quas deserunt quia explicabo excepturi laboriosam ipsa omnis, enim, iure autem magnam id dolorum consequatur reiciendis dolores! Ut, earum sint.",
    //     title: "Lait de beauté",
    //     price: 200,
    //     status: "old",
    //     category: "creme",
    //     shortDescription:
    //         "lorem mammamdhjjh pzieebd paoeeuie auzauiziuezuet dolor sit amet consectetur adipisicing elit dolor sit amet consectetur adipisicing elit",
    //     best_sale: true,
    //     id: 3,
    //     avrating: 4,
    //     reviews: [{id: 1, rating : `${2,3}`, text : 'lorem dolor sit amet consectetur adipisicing elit'}]
    // },
    // {
    //     img: "https://cdn.mivaah.com/wp-content/uploads/sites/4/2020/07/tissage-bresilien-100-naturel.jpg",
    //     description:
    //         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem suscipit iste debitis eos distinctio accusamus nihil dignissimos, in pariatur odio blanditiis, aspernatur a accusantium eligendi sint corporis deleniti inventore quia.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, possimus? Quas deserunt quia explicabo excepturi laboriosam ipsa omnis, enim, iure autem magnam id dolorum consequatur reiciendis dolores! Ut, earum sint.",
    //     title: "Tissage brésilien",
    //     price: 100,
    //     status: "old",
    //     category: "hair",
    //     shortDescription:
    //         "lorem mammamdhjjh pzieebd paoeeuie auzauiziuezuet dolor sit amet consectetur adipisicing elit dolor sit amet consectetur adipisicing elit",
    //     best_sale: true,
    //     id: 4,
    //     avrating: 5,
    //     reviews: [{id: 1, rating : `${2,3}`, text : 'lorem dolor sit amet consectetur adipisicing elit'}]
    // },
    // {
    //     img: "https://i0.wp.com/www.korynhairparis.com/wp-content/uploads/2021/03/TISSAGE-BRESILIEN-LISSE-TISSAGE-BRESILIEN-LISSE-10-1-1.jpg",
    //     description:
    //         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem suscipit iste debitis eos distinctio accusamus nihil dignissimos, in pariatur odio blanditiis, aspernatur a accusantium eligendi sint corporis deleniti inventore quia.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, possimus? Quas deserunt quia explicabo excepturi laboriosam ipsa omnis, enim, iure autem magnam id dolorum consequatur reiciendis dolores! Ut, earum sint.",
    //     title: "Cheuveux brésilien",
    //     price: 80,
    //     status: "old",
    //     category: "hair",
    //     shortDescription:
    //         "lorem mammamdhjjh pzieebd paoeeuie auzauiziuezuet dolor sit amet consectetur adipisicing elit dolor sit amet consectetur adipisicing elit",
    //     best_sale: true,
    //     id: 5,
    //     avrating: 4,
    //     reviews: [{id: 1, rating : `${2,3}`, text : 'lorem dolor sit amet consectetur adipisicing elit'}]
    // },
    // {
    //     img: "https://www.maghair.fr/6412-large_default/tissage-bresilien-lisse-20-pouces-grade-9a.jpg",
    //     description:
    //         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem suscipit iste debitis eos distinctio accusamus nihil dignissimos, in pariatur odio blanditiis, aspernatur a accusantium eligendi sint corporis deleniti inventore quia.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, possimus? Quas deserunt quia explicabo excepturi laboriosam ipsa omnis, enim, iure autem magnam id dolorum consequatur reiciendis dolores! Ut, earum sint.",
    //     title: "Tissage brésilien",
    //     price: 120,
    //     status: "old",
    //     category: "hair",
    //     shortDescription:
    //         "lorem mammamdhjjh pzieebd paoeeuie auzauiziuezuet dolor sit amet consectetur adipisicing elit dolor sit amet consectetur adipisicing elit",
    //     best_sale: true,
    //     id: 6,
    //     avrating: 4,
    //     reviews: [{id: 1, rating : `${2,3}`, text : 'lorem dolor sit amet consectetur adipisicing elit'}]
    // },
    // {
    //     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX7_fndnbWr0SqQ_at8ipa5lf646EbkWuGZQ&usqp=CAU",
    //     description: "lorem mamamdhjjh pzieebd paoeeuie auzauiziuezuet",
    //     title: "Tissage brésilien",
    //     price: 70,
    //     status: "old",
    //     category: "hair",
    //     shortDescription:
    //         "lorem mammamdhjjh pzieebd paoeeuie auzauiziuezuet dolor sit amet consectetur adipisicing elit dolor sit amet consectetur adipisicing elit",
    //     best_sale: true,
    //     id: 7,
    //     avrating: 3,
    //     reviews: [{id: 1, rating : `${2,3}`, text : 'lorem dolor sit amet consectetur adipisicing elit'}]
    // },
    // {
    //     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTER-jRDjFIZoD5A1D8O_NnKYBshsrN-4jG95RjJfdWwYNYM9cpJWOPo5WpWA1RToncjak&usqp=CAU",
    //     description:
    //         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem suscipit iste debitis eos distinctio accusamus nihil dignissimos, in pariatur odio blanditiis, aspernatur a accusantium eligendi sint corporis deleniti inventore quia.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, possimus? Quas deserunt quia explicabo excepturi laboriosam ipsa omnis, enim, iure autem magnam id dolorum consequatur reiciendis dolores! Ut, earum sint.",
    //     title: "Tissage brésilien",
    //     price: 79,
    //     status: "new",
    //     category: "hair",
    //     shortDescription:
    //         "lorem mammamdhjjh pzieebd paoeeuie auzauiziuezuet dolor sit amet consectetur adipisicing elit dolor sit amet consectetur adipisicing elit",
    //     best_sale: false,
    //     id: 8,
    //     avrating: 4,
    //     reviews: [{id: 1, rating : `${2,3}`, text : 'lorem dolor sit amet consectetur adipisicing elit'}]
    // },
    // {
    //     img: "data:image/jpeg;base64,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",
    //     description:
    //         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem suscipit iste debitis eos distinctio accusamus nihil dignissimos, in pariatur odio blanditiis, aspernatur a accusantium eligendi sint corporis deleniti inventore quia.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, possimus? Quas deserunt quia explicabo excepturi laboriosam ipsa omnis, enim, iure autem magnam id dolorum consequatur reiciendis dolores! Ut, earum sint.",
    //     title: "Tisane Minceur",
    //     price: 30,
    //     status: "old",
    //     category: "tisane",
    //     shortDescription:
    //         "lorem mammamdhjjh pzieebd paoeeuie auzauiziuezuet dolor sit amet consectetur adipisicing elit dolor sit amet consectetur adipisicing elit",
    //     best_sale: false,
    //     id: 9,
    //     avrating: 5,
    //     reviews: [{id: 1, rating : `${2,3}`, text : 'lorem dolor sit amet consectetur adipisicing elit'}]
    // },
    // {
    //     img: "https://www.sublimybody.fr/wp-content/uploads/2021/05/TisaneMinceur-min.jpeg",
    //     description:
    //         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem suscipit iste debitis eos distinctio accusamus nihil dignissimos, in pariatur odio blanditiis, aspernatur a accusantium eligendi sint corporis deleniti inventore quia.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, possimus? Quas deserunt quia explicabo excepturi laboriosam ipsa omnis, enim, iure autem magnam id dolorum consequatur reiciendis dolores! Ut, earum sint.",
    //     title: "Tisane Minceur",
    //     price: 25,
    //     status: "new",
    //     category: "tisane",
    //     shortDescription:
    //         "lorem mammamdhjjh pzieebd paoeeuie auzauiziuezuet dolor sit amet consectetur adipisicing elit dolor sit amet consectetur adipisicing elit",
    //     best_sale: false,
    //     id: 10,
    //     avrating: 2,
    //     reviews: [{id: 1, rating : `${2,3}`, text : 'lorem dolor sit amet consectetur adipisicing elit'}]
    // },
    // {
    //     img: "https://ma.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/55/561163/1.jpg?1872",
    //     description:
    //         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem suscipit iste debitis eos distinctio accusamus nihil dignissimos, in pariatur odio blanditiis, aspernatur a accusantium eligendi sint corporis deleniti inventore quia.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, possimus? Quas deserunt quia explicabo excepturi laboriosam ipsa omnis, enim, iure autem magnam id dolorum consequatur reiciendis dolores! Ut, earum sint.",
    //     title: "Tisane Minceur",
    //     price: 15,
    //     status: "old",
    //     category: "tisane",
    //     shortDescription:
    //         "lorem mammamdhjjh pzieebd paoeeuie auzauiziuezuet dolor sit amet consectetur adipisicing elit dolor sit amet consectetur adipisicing elit",
    //     best_sale: false,
    //     id: 11,
    //     avrating: 5,
    //     reviews: [{id: 1, rating : `${2,3}`, text : 'lorem dolor sit amet consectetur adipisicing elit'}]
    // },
    // {
    //     img: "https://cestmoiquilaifaitpourvous.fr/148-home_default/tisane-minceur-bslim-1-boite.jpg",
    //     description:
    //         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem suscipit iste debitis eos distinctio accusamus nihil dignissimos, in pariatur odio blanditiis, aspernatur a accusantium eligendi sint corporis deleniti inventore quia.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, possimus? Quas deserunt quia explicabo excepturi laboriosam ipsa omnis, enim, iure autem magnam id dolorum consequatur reiciendis dolores! Ut, earum sint.",
    //     title: "Tisane Minceur",
    //     price: 15,
    //     status: "old",
    //     category: "tisane",
    //     shortDescription:
    //         "lorem mammamdhjjh pzieebd paoeeuie auzauiziuezuet dolor sit amet consectetur adipisicing elit dolor sit amet consectetur adipisicing elit",
    //     best_sale: false,
    //     id: 12,
    //     avrating: 1,
    //     reviews: [{id: 1, rating : `${2,3}`, text : 'lorem dolor sit amet consectetur adipisicing elit'}]
    // },
    // {
    //     img: "https://pausedetox.fr/wp-content/uploads/2017/05/TDF-recto-1.jpg",
    //     description:
    //         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem suscipit iste debitis eos distinctio accusamus nihil dignissimos, in pariatur odio blanditiis, aspernatur a accusantium eligendi sint corporis deleniti inventore quia.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, possimus? Quas deserunt quia explicabo excepturi laboriosam ipsa omnis, enim, iure autem magnam id dolorum consequatur reiciendis dolores! Ut, earum sint.",
    //     title: "Tisane Minceur",
    //     price: 35,
    //     status: "new",
    //     category: "tisane",
    //     shortDescription:
    //         "lorem mammamdhjjh pzieebd paoeeuie auzauiziuezuet dolor sit amet consectetur adipisicing elit dolor sit amet consectetur adipisicing elit",
    //     best_sale: true,
    //     id: 13,
    //     avrating: 3,
    //     reviews: [{id: 1, rating : `${2,3}`, text : 'lorem dolor sit amet consectetur adipisicing elit'}]
    // },
    // {
    //     img: "https://resize-elle.ladmedia.fr/rcrop/796,1024/img/var/plain_site/storage/images/beaute/news-beaute/soins/beaute-comprenez-le-nouveau-glossaire-vert-de-la-cosmetique-3928745/94878271-2-fre-FR/Beaute-comprenez-le-nouveau-glossaire-vert-de-la-cosmetique.jpg",
    //     description:
    //         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem suscipit iste debitis eos distinctio accusamus nihil dignissimos, in pariatur odio blanditiis, aspernatur a accusantium eligendi sint corporis deleniti inventore quia.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, possimus? Quas deserunt quia explicabo excepturi laboriosam ipsa omnis, enim, iure autem magnam id dolorum consequatur reiciendis dolores! Ut, earum sint.",
    //     title: "Huile éclaircissante",
    //     price: 30,
    //     status: "new",
    //     category: "creme",
    //     shortDescription:
    //         "lorem mammamdhjjh pzieebd paoeeuie auzauiziuezuet dolor sit amet consectetur adipisicing elit dolor sit amet consectetur adipisicing elit",
    //     best_sale: true,
    //     id: 14,
    //     avrating: 4,
    //     reviews: [{id: 1, rating : `${2,3}`, text : 'lorem dolor sit amet consectetur adipisicing elit'}]
    // },
    // {
    //     img: "https://static.wixstatic.com/media/f56302_09894e8b8010492e82009752a6fe9932~mv2.png/v1/fill/w_640,h_640,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/f56302_09894e8b8010492e82009752a6fe9932~mv2.png",
    //     description:
    //         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem suscipit iste debitis eos distinctio accusamus nihil dignissimos, in pariatur odio blanditiis, aspernatur a accusantium eligendi sint corporis deleniti inventore quia.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, possimus? Quas deserunt quia explicabo excepturi laboriosam ipsa omnis, enim, iure autem magnam id dolorum consequatur reiciendis dolores! Ut, earum sint.",
    //     title: "Huile éclaircissante",
    //     price: 25,
    //     status: "new",
    //     category: "creme",
    //     shortDescription:
    //         "lorem mammamdhjjh pzieebd paoeeuie auzauiziuezuet dolor sit amet consectetur adipisicing elit dolor sit amet consectetur adipisicing elit",
    //     best_sale: true,
    //     id: 15,
    //     avrating: 2,
    //     reviews: [{id: 1, rating : `${2,3}`, text : 'lorem dolor sit amet consectetur adipisicing elit'}]
    // },

    useEffect(() => {
        const getData = async () => {
            onSnapshot(collectionRef, (snapshot) => {
                setProduct(
                    snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                );
                if (product) {
                    setHair(product.filter((item) => item.category === "hair"));
                    setTable(product.filter((item) => item.category === "creme"));
                    setLiquid(product.filter((item) => item.category === "tisane"));
                    setBestSale(product.filter((item) => item.best_sale === true));
                    setNewArrival(product.filter((item) => item.status === "new"));
                    setLoading(false)
                }
            });
            // console.log(product);
        };

        getData();

        return () => {};
    }, [product, collectionRef]);
    return { hair, bestSale, newArrival, table, liquid, product, loading };
};

export default useProducts;
