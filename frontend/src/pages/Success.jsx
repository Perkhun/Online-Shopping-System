import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { userRequest } from "../requestMethods"
import { clearCart } from '../redux/cartRedux'

const Success = () => {
    const location = useLocation();
    const dispatch = useDispatch()
    const data = location.state.stripeData;
    const cart = location.state.products;
    const currentUser = useSelector((state) => state.user.currentUser)
    const [orderId, setOrderId] = useState(null)

    useEffect(() => {
        const createOrder = async () => {
            try {
                const res = await userRequest.post("/orders", {
                    userId: currentUser._id,
                    username: currentUser.username,
                    products: cart.products.map((item) => ({
                        productId: item._id,
                        quantity: item.quantity,
                        img: item.img,
                        title: item.title,
                        price: item.price,
                        year_of_publication: item.year_of_publication,
                        publication: item.publication
                    })),
                    /* products: cart.products.map((item) => ({
                        productId: item._id,
                        quantity: item._quantity,
                    })), */
                    amount: cart.total,
                    address: data.billing_details.address,
                });
                setOrderId(res.data._id);
                dispatch(clearCart());
            } catch (err) {
                console.log(err)
            }
        };
        data && createOrder();
    }, [cart, data]);

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {orderId
                ? `Замовлення успішно створено. Ваш номер замовлення: ${orderId}`
                : `Успішно. Ваше замовлення готується...`}
            <Link to="/" className="link"><button style={{ padding: 10, marginTop: 20 }}>На головну</button></Link>
            
        </div>
    );
}

export default Success