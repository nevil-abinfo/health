import React from "react";
import CollectionItem from "../collection-item/collection-item.component";
import "./collection-preview.styles.scss";

const CollectionPreview = ({
  ItemName,
  ItemImageURl,
  ItemPrice,
  UOMDescription,
  ItemID,
}) => {
  const item = { ItemName, ItemImageURl, ItemPrice, UOMDescription, ItemID };
  return <CollectionItem item={item} />
};

export default CollectionPreview;
