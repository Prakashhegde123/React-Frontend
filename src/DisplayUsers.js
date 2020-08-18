import React from "react";
import axios from "axios";

import "./displayusers.css";
import DataTable from "./DataTable";

class DisplayUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount = () => {
    this.getdata();
  };
  getdata = () => {
    axios
      .get("http://localhost:9000/sign-up")
      .then((res) => {
        const data = res.data;
        const posts = data.response.map((user) => {
          const newUser = {
            name: user.name,
            email: user.email,
          };
          return newUser;
        });
        this.setState({ posts });
      })
      .catch(() => {
        alert("Error retrieving data!!!");
      });
  };

  displayPost = (posts) => {
    if (!posts.length) return null;

    return posts.map((post, index) => {
      return <DataTable obj={post} key={index} />;
    });
  };

  render() {
    //JSX
    return (
      <div className="body-users">
        <div className="table-title">
          <h3 style={{fontFamily:"'Poppins', sans-serif"}}>Users List</h3>
          <table className="table-fill">
            <thead>
              <tr>
                <th className="text-left" style={{fontFamily:"'Poppins', sans-serif"}}>Name</th>
                <th className="text-left" style={{fontFamily:"'Poppins', sans-serif"}}>Email</th>
              </tr>
            </thead>
            <tbody className="table-hover" style={{fontFamily:"'Poppins', sans-serif"}}>
              {this.displayPost(this.state.posts)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default DisplayUsers;
