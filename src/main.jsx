import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/Store.jsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <ToastContainer
                    theme="light"
                    position="top-right"
                    autoClose={5000}
                    closeOnClick
                    pauseOnHover={false}
                />
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
