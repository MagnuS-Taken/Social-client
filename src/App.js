import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import ForgotPassword from "./pages/forgot/ForgotPassword";

import { useAuth } from "./context/AuthContext";

require("dotenv").config();

function App() {
  const { currentUser } = useAuth();

  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {currentUser ? <Home /> : <Login />}
          </Route>
          <Route exact path="/profile/:username">
            {currentUser ? <Profile /> : <Login />}
          </Route>
          <Route path="/login">
            {currentUser ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route path="/signup">
            {currentUser ? <Redirect to="/" /> : <Signup />}
          </Route>
          <Route path="/forgot-password" component={ForgotPassword} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
