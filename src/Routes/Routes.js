import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import PoolPage from "../Pages/PoolPage";
import Partners from "../Pages/Partners";
import Fishes from "../Pages/Fishes";
import Foods from "../Pages/Foods";
import Information from "../Pages/Information";
import FeedingAndLosses from "../Pages/FeedingAndLosses";

export default function Routes() {
  return (
    <Switch>
      <Route path="/pools" component={PoolPage} exact />
      <Route path="/partners" component={Partners} exact />
      <Route path="/fishes" component={Fishes} exact />
      <Route path="/foods" component={Foods} exact />
      <Route path="/information" component={Information} exact />
      <Route path="/feedingandlosses" component={FeedingAndLosses} exact />
      <Redirect to="/pools" />
    </Switch>
  );
}
