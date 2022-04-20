import React from "react";
import { connect } from "react-redux";
import {
  clearItemFromCart,
  addItem,
  removeItem,
} from "../../redux/cart/cart.actions.js";
import noImage from "../../assets/no-image";
import "./checkout-item.styles.scss";
// import { removeItemFromCart } from '../../redux/cart/cart.utils.js';

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
  const { ItemName, ItemImageURl, ItemPrice, quantity } = cartItem;
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
        <div className="arrow" onClick={() => removeItem(cartItem)}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => addItem(cartItem)}>
          &#10095;
        </div>
      </span>
      <span className="price">{ItemPrice}</span>
      <div className="remove-button" onClick={() => clearItem(cartItem)}>
        &#10005;
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearItem: (item) => dispatch(clearItemFromCart(item)),
  addItem: (item) => dispatch(addItem(item)),
  removeItem: (item) => dispatch(removeItem(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
