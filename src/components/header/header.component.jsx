import React, { useState } from "react";
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
import FormInput from "../form-input/form-input.component.jsx";
import { setFilterValue } from "../../redux/shop/shop.actions.js";
let hideSearchInput = false;
const Header = ({ currentUser, hidden, filterProduct }) => {
  const [searchValue, setSearchValue] = useState("");

  React.useEffect(() => {
    console.log("window.location", window.location);
    console.log('process.env.REACT_APP_API_URL', process.env.REACT_APP_API_URL)
  });
  const handleChange = (e) => {
    const { value } = e?.target;
    setSearchValue(value || "");
    filterProduct(value);
  };
   return <div className="header">
      <Link className="logo-container" to="/">
        <Logo className="logo" />
      </Link>
      {!hideSearchInput && (
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
      )}

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
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

const mapDispatchToProps = (dispatch) => ({
  filterProduct: (user) => dispatch(setFilterValue(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
