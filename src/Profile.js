import React, { Component } from "react";
import "./profile.css";
import { connect } from "react-redux";
import axios from "axios";
import store from "./Redux/store";
import { userUpdated, showStatus } from "./Redux/actionCreators";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email,
      password: this.props.password,
    };
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const updateUser = {
      email: this.state.email,
      password: this.state.password,
    };

    // api call
    axios
      .put("http://localhost:9000/sign-up/update-user", updateUser)
      .then((res) => {
        const { status, data } = res;
        const { msg, user } = data;
        //console.log(`status: ${status}, msg: ${msg}`);
        store.dispatch(showStatus("success", msg));
        store.dispatch(userUpdated(user.email, user.password));
      })
      .catch((err) => {
        const { status, data } = err.response;
        store.dispatch(showStatus("warning", data.msg));
        //console.log(`status: ${status}, msg: ${data.msg}`);
      });
  };

  render() {
    return (
      <section className="parent">
        <div className="card">
          <figure>
            <img
              src="https://www.vhv.rs/dpng/d/256-2569650_men-profile-icon-png-image-free-download-searchpng.png"
              alt="salad"
            />
          </figure>
          <div className="card__container">
            {" "}
            <form className="" onSubmit={this.onSubmit}>
              <p className="card__text">
                <label style={{ fontFamily: "Poppins', sans-serif" }}>
                  <strong>EMAIL</strong>
                </label>
                <input
                  id="login__username"
                  size="35"
                  type="text"
                  name="username"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                  className="form__input"
                  onChange={this.onChange}
                  readOnly
                  placeholder={this.props.email}
                  required
                />
              </p>
              <p className="card__text">
                <label style={{ fontFamily: "Poppins', sans-serif" }}>
                  <strong>PASSWORD</strong>
                </label>
                <input
                  id="login__password"
                  size="35"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                  type="text"
                  name="password"
                  className="form__input"
                  onChange={this.onChange}
                  placeholder={this.props.password}
                  required
                />
              </p>
              <button
                type="submit"
                className="btn btn2"
                style={{ width: "340px", fontFamily: "Poppins', sans-serif" }}
              >
                UPDATE
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.email,
    password: state.password,
  };
};

export default connect(mapStateToProps)(Profile);
