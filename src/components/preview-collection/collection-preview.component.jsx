import React from "react";
import CollectionItem from "../collection-item/collection-item.component";
import "./collection-preview.styles.scss";

const CollectionPreview = ({ name, imageUrl, price }) => {
  const item = { name, imageUrl, price };
  return (
    <div className="collection-preview">
      <div className="preview">
        <CollectionItem item={item} />
        <CollectionItem item={item} />
        <CollectionItem item={item} />
        <CollectionItem item={item} />
      </div>
    </div>
  );
};

export default CollectionPreview;
