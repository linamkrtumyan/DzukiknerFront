import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import "./Report.css";
import excelLogo from "../../img/download-icon3.svg";
import axios from "axios";
import FileSaver from "file-saver";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function GetReports({ data }) {
  // console.log(data);

  let final = [];
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reports, setReports] = useState(data);
  const [fAvgWeight, setFAvgWeight] = useState(0);
  const [finalData, setFinalData] = useState(final);

  useEffect(() => {
    setReports(data);
  }, [data]);

  const getPreviousReports = (e) => {
    e.preventDefault();

    axios
      .post(`/reports/getReportsForMonth`, {
        month: selectedDate.getMonth() + 1,
        year: selectedDate.getFullYear(),
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

  const downloadReports = async (e) => {
    console.log("reports:", reports);
    e.preventDefault();
    axios({
      url: "/reports/download",
      method: "POST",
      data: reports, // Important
    }).then((res) => {
      console.log(res);
      axios
        .get("/reports/download", { responseType: "arraybuffer" })
        .then((response) => {
          var blob = new Blob([response.data], {
            type:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          FileSaver.saveAs(blob, "Հաշվետվություններ.xlsx");
        });
    });
  };

  const setFinal = (weight, r) => {
    // e.preventDefault()
    final.push({
      poolid: r.PoolId,
      weight: weight,
    });
    console.log("final::::", final);
  };

  const confirmReport = (e) => {
    e.preventDefault();
    console.log("final: ", final);
    axios
      .post("/reports/confirmReport", { final })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          console.log("saveReports: ", response.data.success);
        } else {
          console.log("saveReports: failed", response.data.success);
        }
      })
      .catch((e) => {
        console.log("error:", e);
      });
    console.log("finalData: ", finalData);
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
    <div style={{ marginTop: "30px", display: "block" }}>
      <div style={{ marginLeft: "10px" }} className="img-text-wrapper download">
        <div onClick={downloadReports}>
          <img
            src={excelLogo}
            className="excelIcon"
            alt=".xlsx"
            title="Ներբեռնել հաշվետվությունը"
          />
        </div>
        <p className="download_title">
          <b>Ներբեռնել</b>
        </p>
        <label className="subtitle">Ներբեռնել հաշվետվությունը</label>
      </div>

      <div className="previous-reports">
        <DatePicker
          className="datepicker"
          customInput={<ExampleCustomInput />}
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
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
        className="report-table table-wrapper-scroll-y my-custom-scrollbar"
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
        <tbody>
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
                  <td>
                    <input
                      id="final-input"
                      onChange={(e) => {
                        setFinal(e.target.value, report);
                      }}
                    />
                  </td>
                  <td>{report.FinalQuantity}</td>
                  <td>{final.length > 0 ? "nnn" : "-"}</td>
                  <td>{report.PlusOrMinusQuantity}</td>
                  <td>{parseFloat(report.PlusOrMinusWeight).toFixed(1)}</td>
                  <td>{report.Food}</td>
                  <td>-{/* {parseFloat(report.WeightGrow).toFixed(1)}*/}</td>
                  <td>-{/* {parseFloat(report.Coefficient).toFixed(1)} */}</td>
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

      <Button onClick={confirmReport} className="confirm-btn" variant="primary">
        Հաստատել
      </Button>
    </div>
  );
}
