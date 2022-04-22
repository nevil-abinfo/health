import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/cart/cart.selectors";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import "./checkout.styles.scss";
import { AxiosAPI } from "../../utils/axios";
import { getAllCartItem } from "../../redux/cart/cart.actions";

const CheckoutPage = ({ cartItems, total, getAllCartItem }) => {
  const amount = (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))?.AvailableFund) || 0;
  const [openModal, setOpenModal] = useState(false);
  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleCheckout = () => {
    if (total > amount) {
      handleClickOpen();
      return;
    } else {
      handleClose();
    }
    getClientAddress();
  };

  const getClientAddress = async () => {
    const clientId = 1;
    const response = await AxiosAPI(
      `OperateAddressmaster/GetAddressByCustID?CustID=${clientId}`,
      "get",
      null
    );
    if (response && response?.AddressMaster) {
      setAddressList(response?.AddressMaster || []);
      setShowAddressPopup(true);
      setSelectedAddress(
        (response?.AddressMaster &&
          response?.AddressMaster?.length > 0 &&
          response?.AddressMaster.find(
            ({ IsDefault }) => IsDefault === true
          )) ||
          {}
      );
    } else {
      setAddressList([]);
      setShowAddressPopup(false);
      setSelectedAddress({});
    }
  };

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setShowSuccessPopup(false);
  };

  const handleAddressModal = (value) => {
    setShowAddressPopup(!showAddressPopup);
    if (value === true && selectedAddress?.AddressID) {
      handleCheckoutAPI();
    }
  };

  const handleCheckoutAPI = async () => {
    const clientId = 1;
    const response = await AxiosAPI(
      `Order/Checkout?ClientID=${clientId}&AddressID=${selectedAddress?.AddressID}`,
      "get",
      null
    );
    if (response && response?.message) {
      setShowSuccessPopup(true);
      handleGetCardList();
    }
  };

  const handleChangeAddress = (e, index) => {
    let cloneAddress = addressList.slice();
    const indexPosition = addressList.findIndex(
      ({ IsDefault }) => IsDefault === true
    );
    if (~indexPosition && indexPosition !== index) {
      cloneAddress[indexPosition]["IsDefault"] = false;
    }
    cloneAddress[index]["IsDefault"] = e?.target?.checked;
    setSelectedAddress(
      (cloneAddress &&
        cloneAddress?.length > 0 &&
        cloneAddress.find(({ IsDefault }) => IsDefault === true)) ||
        {}
    );
    setAddressList(cloneAddress);
  };

  const handleGetCardList = async () => {
    const clientID =
    (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))?.ClientID) || null
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
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>

        <div className="header-block">
          <span>Description</span>
        </div>

        <div className="header-block">
          <span>Quantity</span>
        </div>

        <div className="header-block">
          <span>Price</span>
        </div>

        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.ItemID} cartItem={cartItem} />
      ))}
      <div className="total">
        <span>TOTAL: {total ? total?.toFixed(2) : 0}</span>
      </div>
      <div className="checkout" onClick={() => handleCheckout()}>
        <span>Checkout</span>
      </div>
      {openModal && (
        <Dialog
          open={openModal}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Insufficient Fund</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Currnetly you can not place order because of insufficient fund in
              your account, Please add more fund first.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancle</Button>
            <Button onClick={handleClose} autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {showSuccessPopup && (
        <Dialog
          open={showSuccessPopup}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Order</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Your order placed successfully!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancle</Button>
            <Button onClick={handleClose} autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {showAddressPopup && (
        <Dialog
          open={showAddressPopup}
          onClose={handleAddressModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Address List</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {addressList && addressList.length > 0
                ? addressList.map((data, index) => {
                    const {
                      IsDefault,
                      Address1,
                      Address2,
                      Address3,
                      City,
                      State,
                      Country,
                      ZipCode,
                      ContactPerson,
                    } = data;
                    return (
                      <div key={index} className="address-box">
                        <input
                          type="checkbox"
                          checked={IsDefault}
                          onChange={(e) => handleChangeAddress(e, index)}
                        />{" "}
                        <label><b> Contact Persone</b>: {ContactPerson || ""}</label>{" "}
                        <br></br>
                        <label className="address">
                          <b>Address</b>:{" "}
                          {`${Address1}, ${Address2}, ${Address3}, ${City}, ${State}, ${Country}, ${ZipCode}.`}
                        </label>
                      </div>
                    );
                  })
                : "You don't have any address currnettly please add address first then you can checkout!"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddressModal}>Cancle</Button>
            <Button onClick={() => handleAddressModal(addressList && addressList?.length ? true : false)} autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});
const mapDispatchToProps = (dispatch) => ({
  getAllCartItem: (user) => dispatch(getAllCartItem(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
