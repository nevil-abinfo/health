import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import ShopPage from "./pages/shop/shop.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import Address from "./pages/shop/Address";
import AddressList from "./pages/shop/AddressList";
import Invoice from "./pages/shop/Invoice";

import SignInAndSignUp from "./pages/sign-in-sign-up/sign-in-sign-up.component";
import Header from "./components/header/header.component";

import { createStructuredSelector } from "reselect";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils.js";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selector";
import BankPage from "./pages/bank/bank.component";
import FundPage from "./pages/fund/fund.components";

import "./App.css";

// JSON.parse(data.user)?.Client[0]
// {
//   "ClientID": 1,
//   "ID": 3,
//   "ClientName": "Sanjeev Godakhindi",
//   "AvailableFund": 42700,
//   "CompnayName": "Cipla Limited",
//   "EmailID": "Sanjeev@Gmail.com",
//   "MobileNo": "909090445",
//   "RegistrationDate": "2022-03-14T15:09:19.7"
// }

// '{"ClientID":1,"ID":3,"ClientName":"Sanjeev Godakhindi","AvailableFund":42700,"CompnayName":"Cipla Limited","EmailID":"Sanjeev@Gmail.com","MobileNo":"909090445","RegistrationDate":"2022-03-14T15:09:19.7"}'

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }

      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={ShopPage} />
          {/* <Route exact path="/" component={SignInAndSignUp} /> */}
          <Route path="/shop" component={ShopPage} />
          <Route path="/address" component={Address} />
          <Route path="/addresslist" component={AddressList} />
          <Route path="/invoice" component={Invoice} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route exact path="/bank" component={BankPage} />
          <Route exact path="/fund" component={FundPage} />

          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignInAndSignUp />
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
