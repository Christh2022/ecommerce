import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Shope from "../Pages/Shop";
import ProductDetails from "../Pages/ProductDetails";
import Cart from "../Pages/Cart";
import Checkout from "../Pages/Checkout";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import ProtectedRouter from "./ProtectedRouter";
import AllProducts from "../admin/AllProducts";
import AddProduct from "../admin/AddProduct";
import Dashboard from "../admin/Dashboard";

const Routers = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="home" />} />
                <Route path="home" element={<Home />} />
                <Route path="shop" element={<Shope />} />
                <Route path="shop/:id" element={<ProductDetails />} />
                <Route path="cart" element={<Cart />} />
                <Route path="/*" element={<ProtectedRouter />}>
                    <Route path="checkout" element={<Checkout />} />
                    <Route
                        path="dashboard"
                        element={<Dashboard />}
                    />
                    <Route
                        path="dashboard/all-products"
                        element={<AllProducts />}
                    />
                    <Route
                        path="dashboard/add-products"
                        element={<AddProduct />}
                    />
                </Route>

                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
            </Routes>
        </>
    );
};

export default Routers;
