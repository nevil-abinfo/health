import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { setMedicineList } from "../../redux/shop/shop.actions";
import { selectCollections } from "../../redux/shop/shop.selectors";
import { AxiosAPI } from "../../utils/axios";
import CollectionPreview from "../preview-collection/collection-preview.component";
import "./collections.overview.styles.scss";

const CollectionsOverview = ({ collections, setMedicine }) => {
  useEffect(() => {
    handleGetMedicineList();
  }, []);

  const handleGetMedicineList = async () => {
    const response = await AxiosAPI("Report/MedicineReport", "get", null);
    if (response && response?.ItemMaster) {
      setMedicine(response?.ItemMaster || []);
    }
  };
  return (
    <div className="collections-overview">
      {collections.map(({ ...otherCollectionProps }) => (
        <CollectionPreview
          key={otherCollectionProps?.ItemID}
          {...otherCollectionProps}
        />
      ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  collections: selectCollections,
});

const mapDispatchToProps = (dispatch) => ({
  setMedicine: (user) => dispatch(setMedicineList(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionsOverview);
