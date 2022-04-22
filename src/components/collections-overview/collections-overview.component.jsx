import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { setMedicineList, setDiseaseList } from "../../redux/shop/shop.actions";
import { selectCollections } from "../../redux/shop/shop.selectors";
import { AxiosAPI } from "../../utils/axios";
import CollectionPreview from "../preview-collection/collection-preview.component";
import "./collections.overview.styles.scss";

const CollectionsOverview = ({ collections, setMedicine , setDiseaseList }) => {
  useEffect(() => {
    handleGetMedicineList();
    handleGetDiseaseList();
  }, []);
  const handleGetMedicineList = async () => {
    const response = await AxiosAPI("Report/MedicineReport", "get", null);
    if (response && response?.ItemMaster) {
      setMedicine(response?.ItemMaster || []);
    }
  };
  const handleGetDiseaseList = async () => {
    const response = await AxiosAPI("OperateDiseaseMaster/GetAllDiseaseMaster", "get", null);
    if (response && response?.Table) {
      setDiseaseList(response?.Table || []);
    }
  };
  return (
    <div className="collections-overview">
      {collections.map(({ ...otherCollectionProps } , index) => (
        <CollectionPreview
          key={index}
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
  setDiseaseList: (user) => dispatch(setDiseaseList(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionsOverview);
