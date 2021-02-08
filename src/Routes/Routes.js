import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import PreviousReports from "../Components/Report/PreviousReports";

import PoolPage from "../Pages/PoolPage";
import Partners from "../Pages/Partners";
import Fishes from "../Pages/Fishes";
import Foods from "../Pages/Foods";

import Reports from "../Pages/Reports";
import Login from "../Pages/Login";
import NavbarPage from "../Navbar/Navbar";
import Feeding from "../Components/Feeding/Feeding";
import Losses from "../Components/Losses/Losses";
import FeedingMoveHistory from "../Pages/FeedingMoveHistory";

function Routes({ isLoggedIn }) {
  if (isLoggedIn) {
    return (
      <div>
        <div>
          <NavbarPage />
        </div>

        <Switch>
          {/* <NavbarPage /> */}
          <Route path="/pools" component={PoolPage} exact />
          <Route path="/information/partners" component={Partners} exact />
          {/* <Route path="/fishes" component={Fishes} exact /> */}
          <Route path="/information/partners/foods" component={Foods} exact />
          {/* <Route path="/information/partners" component={Information} exact /> */}
          <Route path="/feeding" component={Feeding} exact />
          <Route path="/feeding/losses" component={Losses} exact />
          <Route path="/reports" component={Reports} exact />
          <Route path="/information/partners/fishes" component={Fishes} exact />
          <Route
            path="/reports/report-for-month/:month/:year/:selectedDate"
            component={PreviousReports}
            exact
          />
          {/* <Route path="feeding-history" component={FeedingHistory} exact /> */}
          <Route
            path="/pools/feeding-move-history/:id"
            component={FeedingMoveHistory}
            exact
          />
          <Redirect to="/pools" />
        </Switch>
      </div>
    );
  } else {
    // console.log("Routes, ", isLoggedIn);
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
