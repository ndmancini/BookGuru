import React from "react";
import { Link } from "react-router-dom";
import { getUserCart } from "../axiosRequests/usersRequests";
import {
  deleteOrderAxios,
  updateQuantity,
  checkoutOrder,
} from "../axiosRequests/ordersRequests";
import cartTotalPrice from "../hooks/cartTotalPrice";
import SuccessToast from "../hooks/toastNotifications/SuccessToast";
import WarningToast from "../hooks/toastNotifications/WarningToast";
import "../styles/Cart.css";

const CartContainer = () => {
  const [cart, setCart] = React.useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  React.useEffect(() => {
    getUserCart().then((res) => setCart(res.data));
  }, []);

  const deleteOrder = (orderId) => {
    deleteOrderAxios(orderId)
      .then(() => getUserCart())
      .then((res) => setCart(res.data));
  };

  const quantityHandler = (quantity, orderId, stock) => {
    if (stock >= quantity) {
      updateQuantity(quantity, orderId)
        .then(() => getUserCart())
        .then((res) => setCart(res.data));
    } else {
      WarningToast("🚫There's not enough stock!🚫");
    }
  };

  const checkout = () => {
    checkoutOrder(cart).then(() => {
      SuccessToast("✨ 📚 Thank you for shopping with us!✨ 📚");
      setCart([]);
    });
  };

  return (
    <div className="cart">
      {/* onClick={() => history.push("/previous")} */}
      <div className="previousOrdersDiv">
        <Link
          className="sub-link"
          to="/user_history"
          style={{ textDecoration: "none" }}
        >
          <div>
            <button className="checkout" style={{ textDecoration: "none" }}>
              Previous Orders
            </button>
          </div>
        </Link>
      </div>
      {/* Cart table */}
      <table className="table">
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
          {cart &&
            cart.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{data.book.title}</td>
                  <td>{data.book.author}</td>
                  <td>
                    {/* onChange={quantityChange(data.quantity, data.orderId)} */}
                    {/* <input>data.quantity</input> */}
                    <div className="addAndRemoveButtonsDiv">
                      <button
                        className="button-cart"
                        name="decrease"
                        disabled={data.quantity <= 1 ? true : false}
                        onClick={() =>
                          quantityHandler(
                            data.quantity - 1,
                            data.id,
                            data.book.stock
                          )
                        }
                      >
                        -
                      </button>
                      <div style={{ padding: "0em 0.5em" }}>
                        {data.quantity <= 1 ? 1 : data.quantity}
                      </div>
                      <button
                        className="button-cart"
                        name="increase"
                        onClick={() =>
                          quantityHandler(
                            data.quantity + 1,
                            data.id,
                            data.book.stock
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>{data.book.price}</td>
                  <td>
                    {data.quantity > 1
                      ? data.book.price * data.quantity
                      : data.book.price}
                  </td>
                  <td>
                    <button
                      className="button-cart"
                      onClick={() => deleteOrder(data.id)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
        <tfoot>
          <tr>
            <td>Total: {cartTotalPrice(cart)}</td>
          </tr>
        </tfoot>
      </table>
      <div className="checkoutAndOrdersDiv">
        <button
          className="checkout"
          disabled={!cart.length > 0 ? true : false}
          onClick={() => checkout()}
        >
          Checkout
        </button>
        <br />
        {user.isAdmin === true ? (
          <Link
            to="/history"
            className="cartCheckoutButton"
            style={{ textDecoration: "none" }}
          >
            <button className="checkout">See all orders</button>{" "}
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default CartContainer;
