import React from "react";
import { connect } from "react-redux";
import CustomButton from "../custom-button/custom-button.component.jsx";
import { getAllCartItem } from "../../redux/cart/cart.actions.js";
import noImage from "../../assets/no-image";

import "./collection-item.styles.scss";
import { AxiosAPI } from "../../utils/axios.js";

const CollectionItem = ({ item, getAllCartItem }) => {
  const {
    ItemName,
    ItemImageURl,
    ItemPrice,
    UOMName,
    ItemDescription,
    ItemType1,
    ItemStockID,
  } = item;
  const handleAddtoCart = async () => {
    const clientID = 1 || JSON.parse(localStorage.getItem('user'))?.ClientID || null
    if (clientID) {
      const payload = {
        cartID: 0,
        clientID: clientID,
        itemStockID: ItemStockID,
        qty: 1,
        rate: ItemPrice,
        amount: ItemPrice,
      };
      const response = await AxiosAPI(
        `OperateCart/Insertcart`,
        "post",
        payload
      );
      if (response && response?.message) {
        getAllCardList();
      }
    }
  };

  const getAllCardList = async () => {
    const clientID = 1 || JSON.parse(localStorage.getItem('user'))?.ClientID || null;
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
    <div className="collection-item">
      <div
        title={ItemDescription || ""}
        className="image"
        style={{
          backgroundImage: `url(${
            ItemImageURl?.includes("http") ? ItemImageURl : noImage
          })`,
        }}
      />
      <div className="collection-footer">
        <span className="name"> {ItemName} </span>
        <span className="price"> {ItemPrice} </span>
      </div>
      <div className="collection-footer">
        <span className="name"> {ItemType1} </span>
        <span className="uomName"> {UOMName} </span>
      </div>

      <CustomButton onClick={() => handleAddtoCart()} inverted>
        Add to cart
      </CustomButton>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getAllCartItem: (item) => dispatch(getAllCartItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
