import React from "react";
import { getAllOrders } from "../axiosRequests/ordersRequests";
import "../styles/Cart.css";

const HistoryContainer = () => {
  const [cart, setCart] = React.useState([]);

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.isAdmin) getAllOrders().then((res) => setCart(res.data));
  }, []);

  return (
    <div className="cart">
      <table className="table">
        <tr>
          <th>Username</th>
          <th>Title</th>
          <th>Author</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
        {cart && cart.map((cart, index) => {
          return (
            <tr key={index}>
              {cart.user ? <td>{cart.user.username}</td> : <td></td>}
              <td>{cart.book.title}</td>
              <td>{cart.book.author}</td>
              <td>{cart.quantity}</td>
              <td>{cart.book.price}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default HistoryContainer;
