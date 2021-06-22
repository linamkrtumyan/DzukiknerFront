import React, { useState } from "react";
import { DropdownButton, Dropdown, Form, Button } from "react-bootstrap";
import FeedingTable from "../Components/MoveFeedingReport/FeedingTable";
import MoveTable from "../Components/MoveFeedingReport/MoveTable";
import Select from "react-select";
import DatePicker from "react-datepicker";

function ReportForMoveAndFeeding() {
  const [reportName, setReportName] = useState("move");
  const [options, setOptions] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());

  const ExampleCustomInput = ({ value, onClick }) => (
    <Button className="example-custom-input" onClick={onClick}>
      {value}
    </Button>
  );

  return (
    <div className="container" style={{ paddingTop: "130px" }}>
      <DropdownButton id="dropdown-basic-button" title={reportName}>
        <Dropdown.Item href="">
          <div onClick={() => setReportName("feeding")}>Կերակրում</div>
        </Dropdown.Item>
        <Dropdown.Item href="">
          <div onClick={() => setReportName("move")}>Տեղափոխություն</div>
        </Dropdown.Item>
      </DropdownButton>

      {/* <Form.Control
        as="select"
        placeholder="Ընտրեք գործընկերոջը"
        // onChange={(e) => setPartnerId(e.target.value)}
      >
        <option hidden value="">
          Ընտրեք գործընկերոջը
        </option>

        <option>Կերակրում</option>
        <option>Տեղափոխություն</option>
      </Form.Control> */}
      {reportName == "feeding" ? <FeedingTable /> : <MoveTable />}
    </div>
  );
}

export default ReportForMoveAndFeeding;
