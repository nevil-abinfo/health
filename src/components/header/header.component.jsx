import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { auth } from "../../firebase/firebase.utils.js";

import { ReactComponent as Logo } from "../../assets/crown.svg";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component.jsx";
import { selectCartHidden } from "../../redux/cart/cart.selectors.js";
import { selectCurrentUser } from "../../redux/user/user.selector.js";

import "./header.styles.scss";
import CustomizedHook from "../disease-drop-down/index.js";
import { AxiosAPI } from "../../utils/axios.js";
import { getAllCartItem } from "../../redux/cart/cart.actions.js";

const Header = ({ currentUser, hidden, getAllCartItem }) => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    handleGetCardList();
  }, []);

  const handleGetCardList = async () => {
    const clientID =
      (localStorage.getItem("user") &&
        JSON.parse(localStorage.getItem("user"))?.ClientID) ||
      null;
    // currentUser = localStorage.getItem('user');
    setUser(JSON.parse(localStorage.getItem("user")));
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

  const bankPage = () => {
    window.location.href = window.location.origin + "/bank";
  };

  const FundPage = () => {
    window.location.href = window.location.origin + "/fund";
  };
  const Address = () => {
    window.location.href = window.location.origin + "/addresslist";
  };
  const Signout = () => {
    localStorage.clear();
    window.location.href = window.location.origin + "/signin";
  };

  return (
    <div className="header">
      <Link className="logo-container" to="/">
        <Logo className="logo" />
      </Link>

      {/* {!hideSearchInput && (
        <div>
          <FormInput
            name="medicine"
            type="text"
            handleChange={handleChange}
            value={searchValue}
            label="Search Medicine"
            search="true"
          />
        </div>
      )} */}
      <div className="search-position">
        <CustomizedHook />
      </div>

      <div className="options">
        {users && (
          <>
            <p sx={{ pl: 1, textTransform: "capitalize" }}>
              {`Hi ${users.ClientName}${"- "}${users.AvailableFund}`}
            </p>
            <br />
          </>
        )}

        {users && (
          // <div className="option" to="/address">
          <div className="option" onClick={() => Address()}>
            Address
          </div>
        )}
        {users && (
          // <div className="option" onClick={() => auth.signOut()}>
          <div className="option" to="/bank" onClick={bankPage}>
            Bank
          </div>
        )}
        {users && (
          // <div className="option" onClick={() => auth.signOut()}>
          <div className="option" to="/bank" onClick={FundPage}>
            Fund
          </div>
        )}
        {/* {currentUser ? ( */}
        {users ? (
          <div className="option" onClick={() => Signout()}>
            {/* //auth.signOut()}> */}
            SignOut
          </div>
        ) : (
          <Link className="option" to="/signin">
            SIGN IN
          </Link>
        )}
        <CartIcon />
      </div>
      {hidden ? null : <CartDropdown />}
      {/* <p className = king>&#169 2021</p> */}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

const mapDispatchToProps = (dispatch) => ({
  getAllCartItem: (user) => dispatch(getAllCartItem(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
