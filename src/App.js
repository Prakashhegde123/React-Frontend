import React from "react";
import "./App.css";
import "./displayusers.css";
import "./header.css";
import "./Fontawesomeicons";
import LoginForm from "./LoginForm";
import Homepage from "./Homepage";
import Profile from "./Profile";
import RegisterForm from "./RegisterForm";
import { BrowserRouter as Router, Route } from "react-router-dom";
import DisplayUsers from "./DisplayUsers";

function App() {
  return (
    <div>
      <Router>
        <Route path="/" exact component={RegisterForm} />
        <Route path="/login" component={LoginForm} />
        <Route path="/homepage" component={Homepage} />
        <Route path="/users" component={DisplayUsers} />
        <Route path="/profile" component={Profile} />
      </Router>
    </div>
  );
}

export default App;
