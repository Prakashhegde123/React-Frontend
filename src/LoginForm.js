import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import store from "./Redux/store";
import { userStored } from "./Redux/actionCreators";

import axios from "axios";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};

class LoginForm extends Component {
  state = {
    isLoggedin: false,
    user: "",
    persons: [],
  };
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
      formErrors: {
        email: "",
        password: "",
      },
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();

    if (formValid(this.state)) {
      let email = this.state.email;
      let password = this.state.password;
      let user = {
        email: email,
        password: password,
      };
      axios
        .post("http://localhost:9000/sign-up/login", user)
        .then((response) => {
          if (response) {
            if (response.data.user) {
              store.dispatch(userStored(email, password));
              this.setState({
                isLoggedin: true,
                user: email,
              });
            }
            if (response.data.error || response.error) {
              alert(response.data.error, response.error);
            }
          }
        })
        .catch((err) => console.log("Error " + err));

      console.log(`
        --SUBMITTING--
        Email: ${this.state.email}
        Password: ${this.state.password}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;
    if (this.state.isLoggedin) {
      console.log(this.state.user);
      localStorage.setItem("user", this.state.user);
      return <Redirect to="/homepage" />;
    }
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1 style={{ fontFamily: "'Poppins', sans-serif" }}>LOGIN</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="email">
              <label
                htmlFor="email"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Email
              </label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                style={{ fontFamily: "'Poppins', sans-serif" }}
                name="email"
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span
                  className="errorMessage"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {formErrors.email}
                </span>
              )}
            </div>
            <div className="password">
              <label
                htmlFor="password"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Password
              </label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                style={{ fontFamily: "'Poppins', sans-serif" }}
                name="password"
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span
                  className="errorMessage"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {formErrors.password}
                </span>
              )}
            </div>
            <div className="createAccount">
              <button
                typeof="submit"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                LOGIN
              </button>
              <small style={{ fontFamily: "'Poppins', sans-serif" }}>
                Don't have an account?{" "}
                <Link to="/">
                  <strong style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {" "}
                    SIGNUP
                  </strong>
                </Link>
              </small>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
