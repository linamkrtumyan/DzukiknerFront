import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import "./Report.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Download from "./Download";

export default function PreviousReports(props) {
  const { month, year } = props.match.params;
  console.log(month, year);

  console.log("previous");

  const [reports, setReports] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const fetchData = () => {
      axios
        .post(`/reports/getReportsForMonth`, {
          month,
          year,
        })
        .then((response) => {
          console.log(response);
          if (response.data.reports) {
            setReports(response.data.reports);
            console.log("++++++", reports);
          } else {
            console.log(response.data.errorMessage);
          }
        })
        .catch((e) => {
          console.log("error:", e);
        });
    };

    fetchData();
  }, []);

  const getPreviousReports = (e) => {
    e.preventDefault();

    axios
      .post(`/reports/getReportsForMonth`, {
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      })
      .then((response) => {
        console.log(response);
        if (response.data.reports) {
          setReports(response.data.reports);
          console.log("++++++", reports);
        } else {
          console.log(response.data.errorMessage);
        }
      })
      .catch((e) => {
        console.log("error:", e);
      });
  };

  const ExampleCustomInput = ({ value, onClick }) => (
    <Button
      className="example-custom-input"
      variant="secondary"
      onClick={onClick}
    >
      {value}
    </Button>
  );

  return (
    <div
      style={{ paddingTop: "70px", display: "block" }}
      // style={{ display: "absolute" }}
    >
      <Download reports={reports} />

      <div className="report-for-month">
        <DatePicker
          className="datepicker"
          customInput={<ExampleCustomInput />}
          //   selected={selectedDate}
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          closeOnScroll={true}
          maxDate={new Date()}
        />

        <Button
          style={{ width: "130px", fontSize: "16px", cursor: "pointer" }}
          variant="primary"
          onClick={getPreviousReports}
          id="reportBtn"
        >
          Փնտրել
        </Button>
      </div>

      <Table
        bordered
        hover
        style={{ backgroundColor: "white", className: "values-of-report td" }}
        className="report-for-month-table table-wrapper-scroll-y my-custom-scrollbar"
      >
        <thead>
          <tr className="values-of-report td">
            <td colSpan="2"></td>
            <td colSpan="3">Սկզբնական</td>
            <td colSpan="2">Մուտք</td>
            <td colSpan="2">Վաճառք</td>
            <td colSpan="2">Տեղափոխություն</td>
            <td colSpan="2">Անկում</td>
            <td colSpan="3">Վերջնական</td>
            <td colSpan="2">Ավելցուկ/պակասորդ</td>
            <td colSpan="1"></td>
            <td colSpan="2"></td>
          </tr>
          <tr className="report_title">
            <th>Ավազաններ</th>
            <th>Ձկան տեսակ</th>
            <th>միջ․քաշ /գ/</th>
            <th>քանակ /հատ/</th>
            <th>քաշ /կգ/</th>
            <th>քանակ /հատ/</th>
            <th>քաշ /կգ/</th>
            <th>քանակ /հատ/</th>
            <th>քաշ /կգ/</th>
            <th>քանակ /հատ/</th>
            <th>քաշ /կգ/</th>
            <th>քանակ /հատ/</th>
            <th>քաշ /կգ/</th>
            <th>միջ․քաշ</th>
            <th>քանակ</th>
            <th>քաշ</th>
            <th>քանակ /հատ/</th>
            <th>քաշ /կգ/</th>
            <th>Կեր</th>
            <th>Քաշաճ</th>
            <th>Գործակից</th>
          </tr>
        </thead>
        <tbody
        // className="table-wrapper-scroll-y my-custom-scrollbar"
        >
          {reports.length > 0 ? (
            reports.map((report, index) => {
              return (
                <tr key={index} className="values-of-report">
                  <td>{report.PoolName}</td>
                  <td>{report.FishName}</td>
                  <td>{parseFloat(report.InitialAvgWeight).toFixed(1)}</td>
                  <td>{report.InitialQuantity}</td>
                  <td>{parseFloat(report.InitialWeight).toFixed(1)}</td>
                  <td>{report.InQuantity}</td>
                  <td>{parseFloat(report.InWeight).toFixed(1)}</td>
                  <td>{report.SaleQuantity}</td>
                  <td>{parseFloat(report.SaleWeight).toFixed(1)}</td>
                  <td>{report.MoveQuantity}</td>
                  <td>{parseFloat(report.MoveWeight).toFixed(1)}</td>
                  <td>{report.DeadQuantity}</td>
                  <td>{parseFloat(report.DeadWeight).toFixed(1)}</td>
                  <td>{report.FinalAvgWeight}</td>
                  <td>{report.FinalQuantity}</td>
                  <td>{report.FinalWeight}</td>
                  <td>{report.PlusOrMinusQuantity}</td>
                  <td>{parseFloat(report.PlusOrMinusWeight).toFixed(1)}</td>
                  <td>{report.Food}</td>
                  <td>{parseFloat(report.WeightGrow).toFixed(1)}</td>
                  <td>{parseFloat(report.Coefficient).toFixed(1)}</td>
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
  );
}
