import React, { Component } from "react";
import axios from "axios";

import { Redirect, Link } from "react-router-dom";

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

class RegisterForm extends Component {
  state = {
    isRegistered: false,
  };
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      email: null,
      password: null,
      formErrors: {
        firstName: "",
        email: "",
        password: "",
      },
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();

    if (formValid(this.state)) {
      let name = this.state.firstName;
      let email = this.state.email;
      let password = this.state.password;
      let user = {
        name: name,
        email: email,
        password: password,
      };
      axios
        .post("http://localhost:9000/sign-up/register", user)
        .then((response) => {
          if (response.data) {
            this.setState({
              isRegistered: true,
            });
          }
        })
        .catch((err) => console.log("Error " + err));

      console.log(`
        --SUBMITTING--
        First Name: ${this.state.firstName}
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
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
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
    if (this.state.isRegistered) {
      alert("Registration Success, Please log in to continue");
      return <Redirect to="/login" />;
    }
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1 style={{ fontFamily: "'Poppins', sans-serif" }}>REGISTER</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="firstName">
              <label
                htmlFor="firstName"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Name
              </label>
              <input
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="Name"
                type="text"
                style={{ fontFamily: "'Poppins', sans-serif" }}
                name="firstName"
                onChange={this.handleChange}
              />
              {formErrors.firstName.length > 0 && (
                <span
                  className="errorMessage"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {formErrors.firstName}
                </span>
              )}
            </div>
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
                name="email"
                style={{ fontFamily: "'Poppins', sans-serif" }}
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
                type="submit"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                REGISTER
              </button>
              <small style={{ fontFamily: "'Poppins', sans-serif" }}>
                Already Have an Account?
                <Link to="/login">
                  <strong style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {" "}
                    SIGNIN
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

export default RegisterForm;
