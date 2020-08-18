import React, { Component } from "react";
import "./displayusers.css";

class DataTable extends Component {
  render() {
    return (
      <tr className="text-left">
        <td className="text-left">{this.props.obj.name}</td>
        <td className="text-left">{this.props.obj.email}</td>
      </tr>
    );
  }
}

export default DataTable;
