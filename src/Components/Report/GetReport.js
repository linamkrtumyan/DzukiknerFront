import React, { useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import "./Report.css";
// import excelLogo from '../../iconfinder_excel_272697.svg';
import excelLogo from "../../img/excel.svg";
import axios from "axios";

export default function Reports({ data }) {
  console.log(data);

  // const [report, setReport] = useState([])

  const getPreviousReports = (e) => {};

  const downloadReports = async (e) => {
    console.log("sexmvec");
    e.preventDefault();

    axios
      .post(`/reports/download`, {
        data,
      })
      .then((response) => {
        console.log(response);
        // setReport(data.data.reports)
        // if (response.data.reports) {
        //   setData(response.data.reports)

        // } else {
        //   console.log(response.data.errorMessage);
        // }
      })
      .catch((e) => {
        console.log(e);
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
          <Form.Control style={{ width: "150px", margin: "10px" }} as="select">
            <option hidden value="">
              Ամիս
            </option>
            <option value="January">Հունվար</option>
            <option value="February">Փետրվար</option>
            <option value="March">Մարտ</option>
            <option value="April">Ապրիլ</option>
            <option value="May">Մայիս</option>
            <option value="June">Հունիս</option>
            <option value="July">Հուլիս</option>
            <option value="August">Օգոստոս</option>
            <option value="September">Սեպտեմբեր</option>
            <option value="October">Հոկտեմբեր</option>
            <option value="November">Նոյեմբեր</option>
            <option value="December">Դեկտեմբեր</option>
          </Form.Control>
          <Form.Control style={{ width: "150px", margin: "10px" }} as="select">
            <option hidden value="">
              Տարի
            </option>
            <option value="Jun">2021</option>
            <option value="Jun">2022</option>
            <option value="Jun">2024</option>
            <option value="Jun">2025</option>
            <option value="Jun">2026</option>
            <option value="Jun">2027</option>
            <option value="Jun">2028</option>
            <option value="Jun">2029</option>
            <option value="Jun">2030</option>
            <option value="Jun">2031</option>
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
            <tr>
              <th>Ավազաններ</th>
              <th>Ձկան տեսակ</th>
              <th>միջ․քաշ</th>
              <th>քանակ</th>
              <th>քաշ</th>
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
            {data.length > 0 ? (
              data.map((report, index) => {
                return (
                  <tr key={index}>
                    {/* <td>{partner.id}</td> */}
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
