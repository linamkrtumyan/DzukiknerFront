import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import "./Report.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Download from "./Download";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import PreviousReports from "./PreviousReports";

export default function GetReports({ data }) {
  let history = useHistory();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reports, setReports] = useState(data);
  const [finalReport, setFinalReports] = useState([]);
  const [finalMijin, setFinalMijin] = useState([]);

  useEffect(() => {
    setReports(data);
    for (let i = 0; i < data.length; i++) {
      finalMijin.push({
        id: data[i].PoolId,
        weight: null,
      });
    }
    setFinalReports(finalMijin);
  }, [data]);

  const getPreviousReports = (date) => {
    setSelectedDate(date);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    history.push(`/reports/report-for-month/${month}/${year}/${date}`);
    <PreviousReports />;
  };

  const confirmReport = (e) => {
    e.preventDefault();
    axios
      .post("/reports/confirmReport", { final: finalReport })
      .then((response) => {
        if (response.data.success) {
          toast.success("Կատարված է");
        } else {
          toast.success("Չհաջողվեց հաստատել");
        }
      })
      .catch((e) => {
        toast.success("Չհաջողվեց հաստատել");
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

  const handleSetFinalMijin = (e, i) => {
    let newarr = [...finalMijin];
    newarr[i].weight = e;
    setFinalMijin(newarr);
  };

  return (
    <div
      style={{
        // marginTop: "30px",
        display: "block",
        // , padding: "0px 20px"
      }}
    >
      <div
        style={{ paddingTop: "20px", paddingBottom: "20px", display: "flex" }}
      >
        <Download reports={reports} />

        <div className="previous-reports">
          <DatePicker
            className="datepicker"
            customInput={<ExampleCustomInput />}
            selected={selectedDate}
            onChange={(date) => getPreviousReports(date)}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            closeOnScroll={true}
            maxDate={new Date()}
          />
        </div>
      </div>
      <div className="scroll tableFixHead">
        <Table
          bordered
          hover
          // style={{ backgroundColor: "white" }}
          className="report-table values-of-report"
        >
          <thead>
            <tr
              style={{
                fontSize: "12px",
                fontWeight: "800",
                // position: "sticky !important",
              }}
              className="values-of-report td "
              // className="report_title"
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
          <tbody>
            {reports.length > 0 ? (
              reports.map((report, index) => {
                return (
                  <tr key={index} className="values-of-report">
                    <td>{report.PoolName}</td>
                    <td>{report.FishName}</td>
                    <td>{report.InitialAvgWeight}</td>
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
                        className="report_input"
                        value={
                          finalMijin[index].weight
                            ? finalMijin[index].weight
                            : ""
                        }
                        onChange={(e) => {
                          handleSetFinalMijin(e.target.value, index);
                        }}
                      />
                    </td>
                    <td>{report.FinalQuantity}</td>
                    <td>
                      {finalMijin[index].weight
                        ? parseFloat(
                            report.FinalQuantity * finalMijin[index].weight
                          ).toFixed(4)
                        : "-"}
                    </td>
                    <td>{report.PlusOrMinusQuantity}</td>
                    <td>{parseFloat(report.PlusOrMinusWeight).toFixed(1)}</td>
                    <td>{parseFloat(report.Food)}</td>
                    <td>
                      {finalMijin[index].weight
                        ? parseFloat(
                            parseFloat(finalMijin[index].weight) +
                              parseFloat(report.SaleWeight) -
                              parseFloat(report.InitialWeight) +
                              parseFloat(report.MoveWeight) +
                              parseFloat(report.DeadWeight) -
                              parseFloat(report.InWeight)
                          ).toFixed(4)
                        : "-"}
                    </td>

                    <td>
                      {finalMijin[index].weight
                        ? report.Food == 0 ||
                          parseFloat(finalMijin[index].weight) +
                            report.SaleWeight -
                            report.InitialWeight +
                            report.MoveWeight +
                            report.DeadWeight -
                            report.InWeight ==
                            0
                          ? 0
                          : parseFloat(
                              parseFloat(report.Food) /
                                (parseFloat(finalMijin[index].weight) +
                                  parseFloat(report.SaleWeight) -
                                  parseFloat(report.InitialWeight) +
                                  parseFloat(report.MoveWeight) +
                                  parseFloat(report.DeadWeight) -
                                  parseFloat(report.InWeight))
                            ).toFixed(4)
                        : "-"}
                    </td>
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

      <Button onClick={confirmReport} className="confirm-btn" variant="primary">
        Հաստատել
      </Button>
    </div>
  );
}
