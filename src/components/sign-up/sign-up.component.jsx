import React from "react";
import "./sign-up.styles.scss";
import axios from "axios";
import FormInput from "../form-input/form-input.component.jsx";
import CustomButton from "../custom-button/custom-button.component.jsx";
import Swal from "sweetalert2";
import {
  auth,
  createUserProfileDocument,
} from "../../firebase/firebase.utils.js";

import "./sign-up.styles.scss";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      dob: "",
      phone: "",
      address: "",
    };
  }
  Add = () => {
    alert("register insert call");
    axios
      .post("http://localhost:52564/Api/User/Register/", {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        dob: this.state.dob,
        phone: this.state.phone,
        Address: this.state.address,
      })
      .then((json) => {
        if (json.data.Status === "Success") {
          console.log(json.data.Status);
          alert("Data Save Successfully");
          Swal.fire({
            title: "Success",
            type: "success",
            text: "Yahoo! Registration Successfully.",
          });
          //this.props.history.push('/')
        } else {
          alert("Data not Saved");
          debugger;
          //this.props.history.push('/Studentlist')
        }
      });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    // const {
    //   firstName,
    //   lastName,
    //   email,
    //   password,
    //   confirmPassword,
    //   dob,
    //   phone,
    //   address,
    // } = this.state;

    if (this.state.password !== this.state.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      // const { user } = await auth.createUserWithEmailAndPassword(
      //   email,
      //   password
      // );
      // await createUserProfileDocument(user, { firstName });
      axios.post("https://localhost:44342/api/Client/CreateClient/", {
        ClientName: this.state.firstName,
        companyName: this.state.lastName,
        emailID: this.state.email,
        password: this.state.password,
        mobileNo: this.state.phone,
      });

      this.setState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        // dob: "",
        phone: "",
        // address: "",
      });
      Swal.fire({
        title: "Success",
        type: "success",
        text: "Success! Your Registration is done Successfully.",
      });
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      dob,
      phone,
      address,
    } = this.state;
    return (
      <div className="sign-up">
        <h2 className="title">I do not have an account</h2>
        <span>Sign up with your email and password</span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="firstName"
            value={firstName}
            onChange={this.handleChange}
            label="first Name"
            required
          />

          <FormInput
            type="text"
            name="lastName"
            value={lastName}
            onChange={this.handleChange}
            label="last Name"
            required
          />

          <FormInput
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            label="Email"
            required
          />

          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            label="Password"
            required
          />

          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange}
            label="Confirm Password"
            required
          />

          {/* <FormInput
            type="date"
            name="dob"
            value={dob}
            onChange={this.handleChange}
            required
          /> */}

          <FormInput
            type="number"
            name="phone"
            value={phone}
            onChange={this.handleChange}
            label="Phone"
            required
          />

          {/* <FormInput
            type="text"
            name="address"
            value={address}
            onChange={this.handleChange}
            label="Address"
            required
          /> */}

          <CustomButton type="submit">SIGN UP</CustomButton>

          {/* <button type="button" onClick={this.Add} className="btn btn-success">Submit</button>   */}
        </form>
      </div>
    );
  }
}

export default SignUp;
