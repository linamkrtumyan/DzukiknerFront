import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import "./Report.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Download from "./Download";
import { toast } from "react-toastify";

export default function PreviousReports(props) {
  const { month, year, selectedDate } = props.match.params;
  const sd = Date.parse(selectedDate);

  const [reports, setReports] = useState([]);
  const [date, setDate] = useState(sd);

  useEffect(() => {
    axios
      .post(`/reports/getReportsForMonth`, {
        month,
        year,
      })
      .then((response) => {
        if (response.data.reports) {
          setReports(response.data.reports);
        } else {
          toast.error(`${response.data.errorMessage}`);
        }
      })
      .catch((e) => {
        toast.error("Կատարված չէ");
      });

    setDate(sd);
  }, [sd]);

  const getPreviousReports = (d) => {
    axios
      .post(`/reports/getReportsForMonth`, {
        month: d.getMonth() + 1,
        year: d.getFullYear(),
      })
      .then((response) => {
        if (response.data.reports) {
          setReports(response.data.reports);
        } else {
          toast.error(`${response.data.errorMessage}`);
        }
      });
    // .catch(toast.error("Տվյալներ չեն գտնվել"));
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
      <div style={{ display: "flex", paddingTop: "30px" }}>
        <Download reports={reports} />

        <div className="report-for-month">
          <DatePicker
            className="datepicker"
            customInput={<ExampleCustomInput />}
            selected={date}
            onChange={(d) => getPreviousReports(d)}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            closeOnScroll={true}
            maxDate={new Date()}
          />
        </div>
      </div>

      <Table
        bordered
        hover
        style={{ backgroundColor: "white", className: "values-of-report td" }}
        className="report-for-month-table table-wrapper-scroll-y my-custom-scrollbar"
      >
        <thead>
          <tr
            style={{ fontSize: "12px", fontWeight: "700" }}
            className="values-of-report td"
          >
            <th colSpan="2"></th>
            <th colSpan="3">Սկզբնական</th>
            <th colSpan="2">Մուտք</th>
            <th colSpan="2">Վաճառք</th>
            <th colSpan="2">Տեղափոխություն</th>
            <th colSpan="2">Անկում</th>
            <th colSpan="3">Վերջնական</th>
            <th colSpan="2">Ավելցուկ/պակասորդ</th>
            <th colSpan="1"></th>
            <th colSpan="2"></th>
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
