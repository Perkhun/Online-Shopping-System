import { useEffect, useState } from "react";
import "./widgetLg.css";
import { userRequest } from "../../requestMethods"
import { format } from "timeago.js"

export default function WidgetLg() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("orders/all")
        setOrders(res.data)
        setOrders(prev => [...prev].sort((a, b) => b.time - a.time))
      } catch { }
    }
    getOrders()
  }, [])

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Останні замовлення</h3>
      <table className="widgetLgTable">
        <tbody>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Замовник</th>
            <th className="widgetLgTh">Дата</th>
            <th className="widgetLgTh">Сума</th>
            <th className="widgetLgTh">Статус</th>
          </tr>
        </tbody>
        {orders.map((order) => (
          <tbody key={order._id}>
            <tr className="widgetLgTr">
              <td className="widgetLgUser">
                <span className="widgetLgName">{order.username}</span>
              </td>
              <td className="widgetLgDate">{format(order.createdAt)}</td>
              <td className="widgetLgAmount">{order.amount} грн.</td>
              <td className="widgetLgStatus">
                <Button type={order.status} />
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}