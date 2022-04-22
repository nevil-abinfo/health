import React, { useEffect } from "react";
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

const Header = ({ currentUser, hidden , getAllCartItem }) => {

  useEffect(()=>{
    handleGetCardList()
  },[])

  const handleGetCardList = async () =>{

    const clientID =(localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))?.ClientID) || null
    if(clientID){
      const response = await AxiosAPI(`OperateCart/GetCartByClientID?ClientID=${clientID}`, "get", null);
      if(response && response?.Table){
        getAllCartItem(response?.Table || [])
      }
    }
  }
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
        {currentUser ? (
          <div className="option" onClick={() => auth.signOut()}>
            SIGN OUT
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
