import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import "./sign-in.styles.scss";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  setSession = (accessToken, user) => {
    if (accessToken) {
      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete axios.defaults.headers.common.Authorization;
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = axios
        .post(`${process.env.REACT_APP_API_URL}Authentication/Login/`, {
          emailID: this.state.email,
          password: this.state.password,
          role: "User",
        })
        .then((json) => {
          if (json) this.setState({ email: "", password: "" });
          Swal.fire({
            title: "Success",
            type: "success",
            text: "Yahoo! Login Successfully.",
          });
          const { accessToken, user } = json.data; //.data.token
          const userInfo = JSON.parse(user)?.Client[0];
          this.setSession(accessToken, userInfo);
          window.location.href = window.location.origin + "/";
        });
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            handleChange={this.handleChange}
            value={this.state.email}
            label="email"
            required
          />

          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleChange}
            label="password"
            required
          />
          <div className="buttons">
            <CustomButton type="submit"> Sign In </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
