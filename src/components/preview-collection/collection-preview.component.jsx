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
  return (
    <div className="collection-preview">
      <div className="preview">
        <CollectionItem item={item} />
      </div>
    </div>
  );
};

export default CollectionPreview;
