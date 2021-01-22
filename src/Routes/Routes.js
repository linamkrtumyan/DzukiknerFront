import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import PoolPage from "../Pages/PoolPage";
import Partners from "../Pages/Partners";
import Fishes from "../Pages/Fishes";
import Foods from "../Pages/Foods";
import Information from "../Pages/Information";
import FeedingAndLosses from "../Pages/FeedingAndLosses";
import Reports from "../Pages/Reports";
import Login from "../Pages/Login";
import NavbarPage from "../Navbar/Navbar";

function Routes({ isLoggedIn }) {
  console.log("isLoggedIn: ", isLoggedIn);
  if (isLoggedIn) {
    return (
      <div>
        <div>
          <NavbarPage />
        </div>

        <Switch>
          {/* <NavbarPage /> */}
          <Route path="/pools" component={PoolPage} exact />
          <Route path="/partners" component={Partners} exact />
          <Route path="/fishes" component={Fishes} exact />
          <Route path="/foods" component={Foods} exact />
          <Route path="/information" component={Information} exact />
          <Route path="/feedingandlosses" component={FeedingAndLosses} exact />
          <Route path="/reports" component={Reports} exact />
          <Redirect to="/pools" />
        </Switch>
      </div>
    );
  } else {
    console.log("Routes, ", isLoggedIn);
    return (
      <Switch>
        <Route path="/login" component={Login} exact>
          {/* <Login /> */}
        </Route>
        {/* <Route path="/login" component={Login} exact /> */}
        <Redirect to="/login" />
      </Switch>
    );
  }
}

export default Routes;
