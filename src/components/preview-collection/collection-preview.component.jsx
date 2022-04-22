import React from "react";
import CollectionItem from "../collection-item/collection-item.component";
import "./collection-preview.styles.scss";

const CollectionPreview = ({
    ...otherCollectionProps
}) => {
  return <CollectionItem item={otherCollectionProps} />
};

export default CollectionPreview;
