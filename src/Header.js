import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
import { connect } from "react-redux";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email,
      password: this.props.password,
    };
  }
  state = {
    user: "",
    name: "",
    persons: ["name", "email", "password"],
  };
  componentDidMount() {
    const user = localStorage.getItem("user");
    const name = localStorage.getItem("name");
    this.setState({
      user: user,
      name: name,
    });
  }

  deleteUser = () => {
    axios
      .delete(`http://localhost:9000/sign-up//${this.props.email}/delete`)
      .then((res) => {
        const { status, data } = res;
        const { msg, user } = data;
        console.log(`status: ${status}, msg: ${msg}, user: ${user.email}`);
      });
  };

  render() {
    return (
      <div className="s-layout">
        <div className="s-layout__sidebar">
          <nav className="s-sidebar__nav">
            <ul className="check-list">
              <li className="users">
                <Link className="s-sidebar__nav-link active" to="/users">
                  <FontAwesomeIcon
                    icon="users"
                    style={{ marginLeft: "20px", marginTop: "23px" }}
                  />
                  <em style={{ fontFamily: "'Poppins', sans-serif" }}>USERS</em>
                </Link>
              </li>
              <li className="user">
                <Link className="s-sidebar__nav-link" to="/">
                  <FontAwesomeIcon
                    icon="plus-square"
                    style={{ marginLeft: "20px", marginTop: "23px" }}
                  />
                  <em style={{ fontFamily: "'Poppins', sans-serif" }}>
                    ADD USER
                  </em>
                </Link>
              </li>
              <li className="profile">
                <Link className="s-sidebar__nav-link" to="/profile">
                  <FontAwesomeIcon
                    icon="user-circle"
                    style={{ marginLeft: "20px", marginTop: "23px" }}
                  />
                  <em style={{ fontFamily: "'Poppins', sans-serif" }}>
                    PROFILE
                  </em>
                </Link>
              </li>

              <li className="logout">
                <Link className="s-sidebar__nav-link" to="/login">
                  <FontAwesomeIcon
                    icon="sign-out-alt"
                    style={{ marginLeft: "20px", marginTop: "23px" }}
                  />
                  <em style={{ fontFamily: "'Poppins', sans-serif" }}>
                    LOGOUT
                  </em>
                </Link>
              </li>

              <li className="delete">
                <Link
                  className="s-sidebar__nav-link"
                  to="/"
                  onClick={this.deleteUser}
                >
                  <FontAwesomeIcon
                    icon="trash"
                    style={{ marginLeft: "20px", marginTop: "23px" }}
                  />
                  <em style={{ fontFamily: "'Poppins', sans-serif" }}>
                    DELETE USER
                  </em>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <main className="s-layout__content">
          <h1 style={{ fontFamily: "Poppins', sans-serif" }}>
            Welcome <br />
            <br />
            {this.state.user}
          </h1>
        </main>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    email: state.email,
  };
};
export default connect(mapStateToProps)(Header);
