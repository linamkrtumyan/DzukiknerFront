import React, { useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import "./Report.css";
import excelLogo from "../../img/excel.svg";
import axios from "axios";
import FileSaver from "file-saver";

export default function Reports({ data }) {
  console.log(data);

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [reports, setReports] = useState(data);

  const getMonth = (e) => {
    setMonth(e.target.value);
  };
  const getYear = (e) => {
    setYear(e.target.value);
  };

  const getPreviousReports = (e) => {
    axios
      .post(`/reports/getReportsForMonth`, {
        month,
        year,
      })
      .then((response) => {
        console.log(response);
        if (response.data.reports) {
          setReports(response.data.reports);
          // console.log("++++++++++++ ", reports);
        } else {
          console.log(response.data.errorMessage);
        }
      })
      .catch((e) => {
        console.log("error");
      });
  };

  const downloadReports = async (e) => {
    console.log("reports:", reports);
    e.preventDefault();
    axios
      .post("/reports/download", { responseType: "arraybuffer", data: reports })
      .then((response) => {
        var blob = new Blob([response.data], {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        FileSaver.saveAs(blob, "Հաշվետվություններ.xlsx");
      });
  };

  return (
    <div className="reports">
      <div style={{ marginTop: "30px" }}>
        <div
          style={{ marginLeft: "10px" }}
          className="img-text-wrapper download"
        >
          <div onClick={downloadReports}>
            <img
              src={excelLogo}
              className="excelIcon"
              alt=".xlsx"
              title="Ներբեռնել հաշվետվությունը"
            />
          </div>
          <p className="download_title">Ներբեռնել</p>
          <label className="subtitle">Ներբեռնել հաշվետվությունը</label>
        </div>
        <div className="previous-reports">
          <Form.Control
            style={{ width: "150px", margin: "10px" }}
            as="select"
            onChange={getMonth}
          >
            <option hidden value="">
              Ամիս
            </option>
            <option value="1">Հունվար</option>
            <option value="2">Փետրվար</option>
            <option value="3">Մարտ</option>
            <option value="4">Ապրիլ</option>
            <option value="5">Մայիս</option>
            <option value="6">Հունիս</option>
            <option value="7">Հուլիս</option>
            <option value="8">Օգոստոս</option>
            <option value="9">Սեպտեմբեր</option>
            <option value="10">Հոկտեմբեր</option>
            <option value="11">Նոյեմբեր</option>
            <option value="12">Դեկտեմբեր</option>
          </Form.Control>
          <Form.Control
            style={{ width: "150px", margin: "10px" }}
            as="select"
            onChange={getYear}
          >
            <option hidden value="">
              Տարի
            </option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="2028">2028</option>
            <option value="2029">2029</option>
            <option value="2030">2030</option>
            <option value="2031">2031</option>
          </Form.Control>

          <Button
            style={{ margin: "10px", width: "130px", fontSize: "16px" }}
            variant="primary"
            onClick={getPreviousReports}
            id="reportBtn"
          >
            Փնտրել
          </Button>
        </div>

        <div></div>

        <Table
          bordered
          hover
          style={{ backgroundColor: "white" }}
          className="report-table"
        >
          <thead>
            <tr>
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
              <th>միջ․քաշ</th>
              <th>քանակ</th>
              <th>քաշ</th>
              <th>քանակ /հատ/</th>
              <th>քաշ /կգ/</th>
              <th>քանակ /հատ/</th>
              <th>քաշ /կգ/</th>
              <th>քանակ&#10; /հատ/</th>
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
            {data.length > 0 ? (
              data.map((report, index) => {
                return (
                  <tr key={index}>
                    <td>{report.PoolName}</td>
                    <td>{report.FishType}</td>
                    <td>{report.InitialAvgWeight}</td>
                    <td>{report.InitialQuantity}</td>
                    <td>{report.InitialWeight}</td>
                    <td>{report.InQuantity}</td>
                    <td>{report.InWeight}</td>
                    <td>{report.SaleQuantity}</td>
                    <td>{report.SaleWeight}</td>
                    <td>{report.MoveQuantity}</td>
                    <td>{report.MoveWeight}</td>
                    <td>{report.DeadQuantity}</td>
                    <td>{report.DeadWeight}</td>
                    <td>{report.FinalAvgWeight}</td>
                    <td>{report.FinalQuantity}</td>
                    <td>{report.FinalWeight}</td>
                    <td>{report.PlusOrMinusQuantity}</td>
                    <td>{report.PlusOrMinusWeight}</td>
                    <td>{report.Food}</td>
                    <td>{report.WeightGrow}</td>
                    <td>{report.Coefficient}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5">Loading...</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
