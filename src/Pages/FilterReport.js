import React, { useState, useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";

import Reports from "./Reports";
import Filter from "./Filter";
import ReportForMoveAndFeeding from "./ReportForMoveAndFeeding";

function FilterReport() {
  return (
    <div
      //  className="container"
      style={{ padding: "80px 0px 0px 0px" }}
    >
      <Tabs
        // style={{ paddingTop: "50px " }}
        defaultactivekey="partners"
        id="uncontrolled-tab-example"
      >
        <Tab eventKey="partners" title="Քաշաճ">
          <Reports />
        </Tab>
        <Tab eventKey="fishes" title="Ֆիլտր">
          <Filter />
        </Tab>
        {/* <Tab eventKey="reports" title="Հաշվետվություններ">
          <ReportForMoveAndFeeding />
        </Tab> */}
      </Tabs>
    </div>
  );
}

export default FilterReport;
