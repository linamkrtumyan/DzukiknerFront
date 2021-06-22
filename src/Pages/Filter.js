import React, { useState, useEffect } from "react";
import { Table, Form, Button } from "react-bootstrap";
import Select from "react-select";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FilterDownload from "../Components/Report/FilterDownload";

function Filter() {
  const [options, setOptions] = useState([]);
  const [send, setSend] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pools, setPools] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // console.log(startDate, endDate, send);
    axios
      .post(`/reports/filterReports`, {
        startDate,
        endDate,
        send,
        // addFood,
      })
      .then((response) => {
        setReports(response.data.data);
        if (response.data.success) {
        } else {
          // toast.error(response.data.errorMessage);
        }
      })
      .catch((e) => {
        // toast.error("Կատարված չէ");
      });
  }, [send, startDate, endDate]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/pools/getPoolsForFilter");
      // console.log(result, "88888");
      setOptions(result.data.allPools);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setStartDate(
      selectedStartDate.getFullYear() +
        "-" +
        (selectedStartDate.getMonth() + 1) +
        "-" +
        selectedStartDate.getDate(),
      "selectedStartDate"
    );
  }, [selectedStartDate]);

  useEffect(() => {
    setEndDate(
      selectedEndDate.getFullYear() +
        "-" +
        (selectedEndDate.getMonth() + 1) +
        "-" +
        selectedEndDate.getDate(),
      "selectedEndDate"
    );
  }, [selectedEndDate]);

  useEffect(() => {
    if (send.length > 0) {
      // pools.push(send.value);
      // setPools(...send.value);
    }
  }, [send]);

  const ExampleCustomInput = ({ value, onClick }) => (
    <Button className="example-custom-input" onClick={onClick}>
      {value}
    </Button>
  );

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div style={{ margin: "20px 10px" }}>
          <FilterDownload reports={reports} />
        </div>
        <div style={{ margin: "20px 10px" }}>
          <DatePicker
            style={{
              width: "150px",
              margin: "10px",
              cursor: "pointer",
            }}
            selected={selectedStartDate}
            onChange={(date) => {
              setSelectedStartDate(date);
            }}
            dateFormat="yyyy/MM/dd"
            maxDate={new Date()}
            closeOnScroll={true}
            scrollableMonthYearDropdown
            showMonthDropdown
            showYearDropdown
            customInput={<ExampleCustomInput />}
            mode="date"
          />
        </div>

        <div style={{ margin: "20px 10px" }}>
          <DatePicker
            style={{
              width: "150px",
              margin: "10px",
              cursor: "pointer",
            }}
            selected={selectedEndDate}
            onChange={(date) => {
              setSelectedEndDate(date);
            }}
            dateFormat="yyyy/MM/dd"
            minDate={selectedStartDate}
            maxDate={new Date()}
            closeOnScroll={true}
            scrollableMonthYearDropdown
            showMonthDropdown
            showYearDropdown
            customInput={<ExampleCustomInput />}
            mode="date"
          />
        </div>

        <div
          style={{
            // width: "300px",
            margin: "20px 10px",
            minWidth: "300px",
            maxWidth: "800px",
          }}
        >
          <Select
            placeholder={"Ընտրեք ավազաններ"}
            closeMenuOnSelect={false}
            options={options}
            onChange={setSend}
            isMulti
          />
        </div>
      </div>

      <div
      //  className="container"
      >
        <div className="scroll tableFixHeadFilter">
          <Table
            bordered
            hover
            // style={{ backgroundColor: "white" }}
            className="report-table values-of-report"
          >
            <thead className="fix">
              <tr
                style={{ fontSize: "12px", fontWeight: "700" }}
                className="values-of-report td "
              >
                <th colSpan="2"></th>
                {/* <th colSpan="3">Սկզբնական</th> */}
                <th colSpan="2">Մուտք</th>
                <th colSpan="2">Վաճառք</th>
                <th colSpan="2">Տեղափոխություն</th>
                <th colSpan="2">Անկում</th>
                {/* <th colSpan="3">Վերջնական</th> */}
                <th colSpan="2">Ճշգրտում</th>
                <th colSpan="1"></th>
                {/* <th colSpan="2"></th> */}
              </tr>
              <tr className="report_title">
                <th>Ավազաններ</th>
                <th>Ձկան տեսակ</th>
                {/* <th>միջ․քաշ /գ/</th>
                <th>քանակ /հատ/</th>
                <th>քաշ /կգ/</th> */}
                <th>քանակ /հատ/</th>
                <th>քաշ /կգ/</th>
                <th>քանակ /հատ/</th>
                <th>քաշ /կգ/</th>
                <th>քանակ /հատ/</th>
                <th>քաշ /կգ/</th>
                <th>քանակ /հատ/</th>
                <th>քաշ /կգ/</th>
                {/* <th>միջ․քաշ</th>
                <th>քանակ</th>
                <th>քաշ</th> */}
                <th>քանակ /հատ/</th>
                <th>քաշ /կգ/</th>
                <th>Կեր</th>
                {/* <th>Քաշաճ</th>
                <th>Գործակից</th> */}
              </tr>
            </thead>
            <tbody>
              {reports.length > 0 ? (
                reports.map((report, index) => {
                  return (
                    <tr key={index} className="values-of-report">
                      <td>{report.PoolName}</td>
                      <td>{report.FishName}</td>

                      {/* <td>{report.InitialAvgWeight}</td>
                      <td>{report.InitialQuantity}</td>
                      <td>{parseFloat(report.InitialWeight).toFixed(1)}</td> */}

                      <td>{report.InQuantity}</td>
                      <td>{parseFloat(report.InWeight).toFixed(1)}</td>

                      <td>{report.SaleQuantity}</td>
                      <td>{parseFloat(report.SaleWeight).toFixed(1)}</td>

                      <td>{report.MoveQuantity}</td>
                      <td>{parseFloat(report.MoveWeight).toFixed(1)}</td>

                      <td>{report.DeadQuantity}</td>
                      <td>{parseFloat(report.DeadWeight).toFixed(1)}</td>

                      {/* <td>{report.FinalAvgWeight}</td>
                      <td>{report.FinalQuantity}</td>
                      <td>{report.FinalWeight}</td> */}

                      <td>{report.CorrectionQuantity}</td>
                      <td>{parseFloat(report.CorrectionWeight).toFixed(1)}</td>

                      <td>{parseFloat(report.Food)}</td>

                      {/* <td>{report.WeightGrow}</td>
                      <td>{report.Coefficient}</td> */}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5">Տվյալներ չկան</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default Filter;
