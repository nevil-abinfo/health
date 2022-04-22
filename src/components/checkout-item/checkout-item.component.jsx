import React from "react";
import { connect } from "react-redux";
import { getAllCartItem } from "../../redux/cart/cart.actions.js";
import noImage from "../../assets/no-image";
import "./checkout-item.styles.scss";
import { AxiosAPI } from "../../utils/axios.js";
// import { removeItemFromCart } from '../../redux/cart/cart.utils.js';

const CheckoutItem = ({ cartItem, getAllCartItem }) => {
  const {
    ItemName,
    ItemImageURl,
    ItemPrice,
    QTY,
    CartID,
    ItemStockID,
    Rate,
    TotalQTY,
  } = cartItem;

  const handleUpdateQuantity = async (value) => {
    if (value) {
      if (QTY < TotalQTY) {
      } else {
        return;
      }
    } else {
      if (QTY === 1) {
        return;
      }
    }
    const clientID =(localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))?.ClientID) || null
    if (clientID) {
      const payload = {
        cartID: CartID,
        clientID: clientID,
        itemStockID: ItemStockID,
        qty: value ? +QTY + 1 : +QTY - 1,
        rate: Rate,
        amount: Rate * (value ? +QTY + 1 : +QTY - 1),
      };
      const response = await AxiosAPI(`OperateCart/Updatecart`, "put", payload);
      if (response && response?.message) {
        getAllCardList();
      }
    }
  };

  const handleDeleteCartItem = async () => {
    const payload = {
      cartID: CartID,
      clientID: 0,
      itemStockID: 0,
      qty: 0,
      rate: 0,
      amount: 0,
    };
    const response = await AxiosAPI(
      `OperateCart/Deletecart`,
      "delete",
      payload
    );
    if (response && response?.message) {
      getAllCardList();
    }
  };

  const getAllCardList = async () => {
    const clientID =(localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))?.ClientID) || null
    if (clientID) {
      const response = await AxiosAPI(
        `OperateCart/GetCartByClientID?ClientID=${clientID}`,
        "get",
        null
      );
      if (response && response?.Table) {
        getAllCartItem(response?.Table || []);
      }
    }
  };

  return (
    <div className="checkout-item">
      <div className="image-container">
        <img
          src={`${ItemImageURl?.includes("http") ? ItemImageURl : noImage}`}
          alt="item"
        />
      </div>
      <span className="name">{ItemName}</span>
      <span className="quantity">
        <div
          className={QTY === 1 ? "notAllow" : "arrow"}
          onClick={() => handleUpdateQuantity(false)}
          title={QTY === 1 ? "Minimum one quentity is required" : ""}
        >
          &#10094;
        </div>
        <span className="value">{QTY}</span>
        <div
          className={QTY < TotalQTY ? "arrow" : "notAllow"}
          onClick={() => handleUpdateQuantity(true)}
          title={QTY < TotalQTY ? "" : "Maxium quentity limit is reached"}
        >
          &#10095;
        </div>
      </span>
      <span className="price">{ItemPrice}</span>
      <div className="remove-button" onClick={() => handleDeleteCartItem()}>
        &#10005;
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getAllCartItem: (item) => dispatch(getAllCartItem(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
