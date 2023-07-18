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
} from "react-icons/ai";

import { IoIosNotificationsOutline } from "react-icons/io";

import { BsFillCartPlusFill, BsTelephone, BsEnvelope } from "react-icons/bs";
import { BiMap } from "react-icons/bi";

const useIcons = () => {
    const Menu = AiOutlineMenu;
    const Shopping = AiOutlineShoppingCart;
    const Heart = AiOutlineHeart;
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

    return {
        Menu,
        Shopping,
        Heart,
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
        Setting
    };
};

export default useIcons;
