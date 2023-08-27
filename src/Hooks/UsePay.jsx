import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useState } from "react";
import { PropTypes } from "prop-types";
import { toast } from "react-toastify";

const UsePay = ({ price, setShowbtn, order_now }) => {
    const [orderId, setOrderID] = useState();
    const createOrder = (data, actions) => {
        return actions.order
            .create({
                purchase_units: [
                    {
                        description: "lait de beauté",
                        amount: {
                            currency_code: "USD",
                            value: price,
                        },
                    },
                ],
                application_context: {
                    shipping_preference: "NO_SHIPPING",
                },
            })
            .then((order_Id) => {
                setOrderID(order_Id);
                return order_Id;
            });
    };

    const onApprove = (data, actions) => {
        return actions.order.capture().then((detail) => {
            const { payer } = detail;
            setShowbtn(false);
            console.log(payer, orderId);
            if(payer) order_now();
        });
    };

    const onError = () => {
        toast.error("une erreur s'est produite lors du payement")
    };
    return (
        <>
            <PayPalScriptProvider
                options={{
                    "client-id":
                        "ARAlbUtjQqYqJaHsgjEL6jmEq-Bo5asKAQz-BFn0pESrDhEWbhOgaCxJ7rAB8iSFmSKDOrYYcgBYkgpS",
                }}
            >
                <> </>
                <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                />
            </PayPalScriptProvider>
        </>
    );
};

UsePay.propTypes = {
    price: PropTypes.number,
    setShowbtn: PropTypes?.function,
    order_now: PropTypes.function
};

export default UsePay;
