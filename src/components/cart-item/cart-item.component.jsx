import React from 'react';
import noImage from "../../assets/no-image" 
import './cart-item.styles.scss'

const CartItem = ({ item: { ItemImageURl, ItemPrice, ItemName, QTY } }) => (
  <div className="cart-item">
    <img src={ItemImageURl?.includes("http") ? ItemImageURl : noImage} alt="cart item" />
    <div className="item-details">
      <span className="name">{ItemName}</span>
      <span className="price">
        {QTY} x ${ItemPrice}
    </span>
    </div>
  </div>
);

export default CartItem