import React, { useState } from "react";
import {
  DropdownButton,
  Dropdown,
  Form,
  Button,
  Tab,
  Tabs,
} from "react-bootstrap";
import FeedingTable from "../Components/MoveFeedingReport/FeedingTable";
import MoveTable from "../Components/MoveFeedingReport/MoveTable";
import Select from "react-select";
import DatePicker from "react-datepicker";

function ReportForMoveAndFeeding() {
  const [reportName, setReportName] = useState("Տեղափոխություն");
  const [options, setOptions] = useState([]);

  return (
    <>
      {/* <div className="container" style={{ paddingTop: "130px" }}>
      <DropdownButton id="dropdown-basic-button" title={reportName}>
        <Dropdown.Item href="">
          <div onClick={() => setReportName("Կերակրում")}>Կերակրում</div>
        </Dropdown.Item>
        <Dropdown.Item href="">
          <div onClick={() => setReportName("Տեղափոխություն")}>
            Տեղափոխություն
          </div>
        </Dropdown.Item>
      </DropdownButton>

      {reportName == "Կերակրում" ? <FeedingTable /> : <MoveTable />}
    </div> */}
      <div className="container" style={{ padding: "130px 0px 0px 0px" }}>
        <Tabs defaultactivekey="feeding" id="uncontrolled-tab-example">
          <Tab eventKey="feeding" title="Կերակրում">
            <FeedingTable />{" "}
          </Tab>
          <Tab eventKey="moving" title="Տեղափոխություն">
            <MoveTable />{" "}
          </Tab>
        </Tabs>
      </div>
    </>
  );
}

export default ReportForMoveAndFeeding;
