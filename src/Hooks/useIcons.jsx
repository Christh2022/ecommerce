import {
    AiOutlineMenu,
    AiOutlineShoppingCart,
    AiOutlineHeart,
    AiOutlineUser,
    AiOutlineSearch,
    AiFillStar,
    AiOutlineDelete,
    AiOutlineClose,
    AiOutlineSetting,
    AiFillHeart
} from "react-icons/ai";
import { FaEuroSign, FaShopify} from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import {  MdOutlineShoppingBasket } from "react-icons/md";
import { BsFillCartPlusFill, BsTelephone, BsEnvelope } from "react-icons/bs";
import { BiMap } from "react-icons/bi";

const UseIcons = () => {
    const Menu = AiOutlineMenu;
    const Shopping = AiOutlineShoppingCart;
    const Heart = AiOutlineHeart;
    const FilHeart = AiFillHeart;
    const User = AiOutlineUser;
    const Plus = BsFillCartPlusFill;
    const Mape = BiMap;
    const Phone = BsTelephone;
    const Envelope = BsEnvelope;
    const Search = AiOutlineSearch;
    const Star = AiFillStar;
    const Delete = AiOutlineDelete;
    const Close = AiOutlineClose;
    const Notification = IoIosNotificationsOutline;
    const Setting = AiOutlineSetting;
    const Euro = FaEuroSign;
    const Shop_admin = FaShopify;
    const Quantity = MdOutlineShoppingBasket
    return {
        Menu,
        Shopping,
        Heart,
        FilHeart,
        User,
        Plus,
        Mape,
        Phone,
        Envelope,
        Search,
        Star,
        Delete,
        Close,
        Notification,
        Setting,
        Euro,
        Shop_admin,
        Quantity
    };
};

export default UseIcons;