import React, { useState, useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Feeding from "../Components/Feeding/Feeding";
import Losses from "../Components/Losses/Losses";
import axios from "axios";
import PoolPage from "./PoolPage";
import Reports from "./Reports";
import Filter from "./Filter";

function FilterReport() {
  return (
    <div
      //  className="container"
      style={{ padding: "80px 0px" }}
    >
      <Tabs
        style={{ paddingTop: "50px " }}
        defaultactivekey="partners"
        id="uncontrolled-tab-example"
      >
        <Tab eventKey="partners" title="Քաշաճ">
          <Reports />
        </Tab>
        <Tab eventKey="fishes" title="ֆիլտր">
          <Filter />
        </Tab>
      </Tabs>
    </div>
  );
}

export default FilterReport;
