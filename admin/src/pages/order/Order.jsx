import { useLocation } from "react-router-dom";
import "./order.css";
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { publicRequest } from "../../requestMethods";
import { updateOrders } from "../../redux/apiCalls";

export default function Product() {
    const location = useLocation()
    const dispatch = useDispatch();
    const orderId = location.pathname.split("/")[2];
    // const [pStats, setPStats] = useState([])
    const order = useSelector((state) =>
        state.order.orders.find((order) => order._id === orderId))
    const [inputs, setInputs] = useState({ ...order })
    const [proinputs, setProinputs] = useState([...order.products])
    const [proid, setProid] = useState(order.products[0].productId)
    const [pro, setPro] = useState()
    const [proinfo, setProinfo] = useState({})

    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleproductChange = (e) => {
        setProinputs((prev) => {
            prev[prev.findIndex(item => item.time === pro)] =
                { ...prev[prev.findIndex(item => item.time === pro)], [e.target.name]: e.target.value }
            return prev;
        });
    };

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get("./products/find/" + proid)
                setProinfo(res.data)
            } catch { }
        }
        getProduct()
    }, [proid])
    const handleUpdate = (e) => {
        e.preventDefault()
        const neworder = { ...inputs, products: [...proinputs] };
        updateOrders(order._id, neworder, dispatch)
    }

    const Button = ({ type }) => {
        return <button className={"widgetLgButton " + type}>{type}</button>;
    };

    return (
        <div className="order">
            <div className="orderTitleContainer">
                <h1 className="orderTitle">Order</h1>
            </div>
            <div className="orderTop">
                <div className="orderTopLeft">
                    <div className="orderInfoTop">
                        <span className="orderName"><h3>Деталі замовдення</h3></span>
                        <Button type={order.status} />
                    </div>
                    <div className="orderInfoBottom">
                        <div className="orderInfoItem">
                            <span className="orderInfoKey"><b>Order ID:</b></span>
                            <span className="orderInfoValue">{order._id}</span>
                        </div>
                        <div className="orderInfoItem">
                            <span className="orderInfoKey"><b>Нікнейм: </b></span>
                            <span className="orderInfoValue">{order.username}</span>
                        </div>
                        <div className="orderInfoItem">
                            <span className="orderInfoKey"><b>User ID:</b></span>
                            <span className="orderInfoValue">{order.userId}</span>
                        </div>
                        <div className="orderInfoItem">
                            <span className="orderInfoKey"><b>Створено:</b></span>
                            <span className="orderInfoValue">{order.createdAt}</span>
                        </div>
                        <div className="orderInfoItem">
                            <span className="orderInfoKey"><b>Адреса:</b></span>
                            <span className="orderInfoValue">{order.address}</span>
                        </div>
                        <div className="orderInfoItem">
                            <span className="orderInfoKey"><b>Сума:</b></span>
                            <span className="orderInfoValue">{order.amount}</span>
                        </div>
                    </div>
                </div>
                <div className="orderTopRight">
                    <form className="orderForm">
                        <div className="orderFormLeft">
                            <label>Адреса</label>
                            <input name="address" type="text" placeholder={order.address} onChange={handleChange} />
                            <label>Статус</label>
                            <select name="status" id="status" onChange={handleChange}>
                                <option value={order.status} selected="selected">Вибрати</option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                                <option value="declined">Declined</option>
                            </select>
                        </div>
                    </form>
                    <button onClick={handleUpdate} className="orderProductButton">Оновити</button>
                </div>
            </div>
            {order.products?.map(product =>
                <div className="orderBottom">
                    <div className="orderProductInfo">
                        <div className="info">
                            <div className="orderProductInfoItem">
                                <span className="orderInfoKey"><b>Назва: </b>{product.title}</span>
                            </div>
                            <div className="orderProductInfoItem">
                                <span className="orderInfoKey"><b>Product ID: </b>{product.productId}</span>
                            </div>
                        </div>
                        <div className="orderFormRight">
                            <button onClick={handleUpdate} className="orderProductButton">Оновити</button>
                        </div>
                    </div>
                    <div className="orderProductDetail">
                        <img src={product.img} alt="" className="orderProductInfoImg" />
                        <div className="orderProductDetails">
                            <form className="orderProductForm" >
                                <div className="orderFormLeft" style={{ width: '20%' }}>
                                    <label>Рік видавництва</label>
                                    <select name="year_of_publication" id="year_of_publication" onClick={() => { setProid(product.productId); setPro(product.time) }} onChange={handleproductChange}>
                                        <option defaultValue={product.year_of_publication}>Вибрати</option>
                                        {proinfo.year_of_publication?.map(year_of_publication =>
                                            <option value={year_of_publication}>{year_of_publication}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="orderFormLeft" style={{ width: '20%' }}>
                                    <label>Видавництво</label>
                                    <select name="publication" id="publication" onClick={() => { setProid(product.productId); setPro(product.time) }} onChange={handleproductChange}>
                                        <option value={product.publication} selected="selected">Вибрати</option>
                                        {proinfo.publication?.map(publication =>
                                            <option value={publication}>{publication}</option>
                                        )}
                                    </select>
                                </div>
                            </form>
                            <div className="orderProductAmount">
                                <div className="orderProductInfoItem">
                                    <span className="orderInfoKey"><b>Рік видавництва: </b> {product.year_of_publication}</span>
                                </div>
                                <div className="orderProductInfoItem">
                                    <span className="orderInfoKey"><b>Видавництво: </b>{product.publication}</span>
                                </div>
                                <div className="orderProductInfoItem" style={{ fontSize: '18px' }}>
                                    <span className="orderInfoKey" style={{ fontSize: '18px' }}> UAH {product.price}  <b>x  {product.quantity}</b></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}