import React from "react";
import { connect } from "react-redux";
import CustomButton from "../custom-button/custom-button.component.jsx";
import { addItem } from "../../redux/cart/cart.actions.js";
import noImage from "../../assets/no-image";

import "./collection-item.styles.scss";

const CollectionItem = ({ item, addItem }) => {
  const { ItemName, ItemImageURl, ItemPrice, UOMDescription } = item;
  return (
    <div className="collection-item">
      <div
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
        <span className="name"> {UOMDescription} </span>
      </div>

      <CustomButton onClick={() => addItem(item)} inverted>
        Add to cart
      </CustomButton>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
