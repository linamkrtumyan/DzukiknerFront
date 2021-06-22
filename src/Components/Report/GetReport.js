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
  const [isCurrentReport, setIsCurrentReport] = useState(false);
  const [selected, setSelected] = useState(false);
  const [sumExample, setSumExample] = useState(0);
  const [sel, setSel] = useState([]);

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
    setIsCurrentReport(true);
    setSelectedDate(date);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
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

    // history.push(`/reports/report-for-month/${month}/${year}/${date}`);
    // <PreviousReports />;
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

  const handleClick = (thing) => {
    if (!sel.some((s) => s.PoolId == thing.PoolId)) {
      setSel([
        ...sel,
        {
          PoolId: thing.PoolId,
        },
      ]);
    } else {
      setSel(sel.filter((s) => thing.PoolId !== s.PoolId));
    }
  };

  //   a = [{ value:"4a55eff3-1e0d-4a81-9105-3ddd7521d642", display:"Jamsheer"}, { value:"644838b3-604d-4899-8b78-09e4799f586f", display:"Muhammed"}, { value:"b6ee537a-375c-45bd-b9d4-4dd84a75041d", display:"Ravi"}, { value:"e97339e1-939d-47ab-974c-1b68c9cfb536", display:"Ajmal"},  { value:"a63a6f77-c637-454e-abf2-dfb9b543af6c", display:"Ryan"}]
  // b = [{ value:"4a55eff3-1e0d-4a81-9105-3ddd7521d642", display:"Jamsheer", $$hashKey:"008"}, { value:"644838b3-604d-4899-8b78-09e4799f586f", display:"Muhammed", $$hashKey:"009"}, { value:"b6ee537a-375c-45bd-b9d4-4dd84a75041d", display:"Ravi", $$hashKey:"00A"}, { value:"e97339e1-939d-47ab-974c-1b68c9cfb536", display:"Ajmal", $$hashKey:"00B"}]

  function comparer(otherArray) {
    return function (current) {
      return (
        otherArray.filter(function (other) {
          // console.log(other, "other");
          // console.log(
          //   other.PoolId == current.PoolId,
          //   " other.PoolId == current.PoolId"
          // );
          return other.PoolId == current.PoolId;
        }).length == 0
      );
    };
  }

  // var onlyInSel = sel.filter(comparer(reports));
  var onlyInReports = reports.filter(comparer(sel));
  // console.log(onlyInSel, "onlyInSel");

  // let result = onlyInSel.concat(onlyInReports);

  // console.log(result);

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
            // excludeDates={[new Date(), subMonths(new Date(), 1)]}
          />
        </div>
      </div>
      <div className="scroll tableFixHead">
        {!isCurrentReport ? (
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
                <th colSpan="3"></th>
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
                <th></th>
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
                  // console.log(report, "report");
                  return (
                    <tr key={index} className="values-of-report">
                      <td>
                        <input
                          readOnly
                          checked={onlyInReports.some(
                            (s) => s.PoolId === report.PoolId
                          )}
                          onClick={() => {
                            handleClick(report);
                          }}
                          type="checkbox"
                        />
                      </td>
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
              {onlyInReports.length > 0 ? (
                <tr style={{ fontWeight: "700" }}>
                  <td>Ընդամենը</td>
                  <td></td>
                  <td></td>
                  <td>
                    {onlyInReports.reduce(function (prev, current) {
                      return prev + +current.InitialAvgWeight;
                    }, 0)}
                  </td>
                  <td>
                    {" "}
                    {onlyInReports.reduce(function (prev, current) {
                      return prev + +current.InitialQuantity;
                    }, 0)}
                  </td>
                  <td>
                    {" "}
                    {onlyInReports.reduce(function (prev, current) {
                      return prev + +current.InitialWeight;
                    }, 0)}
                  </td>
                  <td>
                    {" "}
                    {onlyInReports.reduce(function (prev, current) {
                      return prev + +current.InQuantity;
                    }, 0)}
                  </td>
                  <td>
                    {" "}
                    {onlyInReports.reduce(function (prev, current) {
                      return prev + +current.InWeight;
                    }, 0)}
                  </td>
                  <td>
                    {onlyInReports.reduce(function (prev, current) {
                      return prev + +current.SaleQuantity;
                    }, 0)}
                  </td>

                  <td>
                    {onlyInReports.reduce(function (prev, current) {
                      return prev + +current.SaleWeight;
                    }, 0)}
                  </td>
                  <td>
                    {onlyInReports.reduce(function (prev, current) {
                      return prev + +current.MoveQuantity;
                    }, 0)}
                  </td>
                  <td>
                    {onlyInReports.reduce(function (prev, current) {
                      return prev + +current.MoveWeight;
                    }, 0)}
                  </td>

                  <td>
                    {onlyInReports.reduce(function (prev, current) {
                      return prev + +current.DeadQuantity;
                    }, 0)}
                  </td>
                  <td>
                    {onlyInReports.reduce(function (prev, current) {
                      return prev + +current.DeadWeight;
                    }, 0)}
                  </td>
                  <td></td>

                  <td>
                    {onlyInReports.reduce(function (prev, current) {
                      return prev + +current.FinalQuantity;
                    }, 0)}
                  </td>
                  <td>
                    {onlyInReports.reduce(function (prev, current) {
                      return prev + +current.FinalWeight;
                    }, 0)}
                  </td>
                  <td>
                    {onlyInReports.reduce(function (prev, current) {
                      return prev + +current.PlusOrMinusQuantity;
                    }, 0)}
                  </td>
                  <td>
                    {onlyInReports.reduce(function (prev, current) {
                      return prev + +current.PlusOrMinusWeight;
                    }, 0)}
                  </td>
                  <td>
                    {onlyInReports.reduce(function (prev, current) {
                      return prev + +current.Food;
                    }, 0)}
                  </td>
                  <td>
                    {onlyInReports.reduce(function (prev, current) {
                      return prev + +current.WeightGrow;
                    }, 0)}
                  </td>
                  <td>
                    {onlyInReports.reduce(function (prev, current) {
                      return prev + +current.Coefficient;
                    }, 0)}
                  </td>
                </tr>
              ) : null}
            </tbody>
          </Table>
        ) : (
          <Table
            bordered
            hover
            style={{
              backgroundColor: "white",
              // className: "values-of-report td",
            }}
            // className="report-for-month-table table-wrapper-scroll-y my-custom-scrollbar"
          >
            <thead>
              <tr
                style={{ fontSize: "12px", fontWeight: "700" }}
                className="values-of-report td"
              >
                <th colSpan="3"></th>
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
                <th></th>
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
                      <td>
                        <input
                          readOnly
                          checked={onlyInReports.some(
                            (s) => s.PoolId === report.PoolId
                          )}
                          onClick={() => {
                            handleClick(report);
                          }}
                          type="checkbox"
                        />
                      </td>
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
              {onlyInReports.length > 0 ? (
                <tr style={{ fontSize: "14px", fontWeight: "700" }}>
                  <td>Ընդամենը</td>
                  <td></td>
                  <td></td>
                  <td>
                    {onlyInReports.reduce(function (prev, current) {
                      return prev + +current.InitialAvgWeight;
                    }, 0)}
                  </td>
                  <td>
                    {" "}
                    {onlyInReports.reduce(function (prev, current) {
                      return prev + +current.InitialQuantity;
                    }, 0)}
                  </td>
                  <td>
                    {" "}
                    {onlyInReports.reduce(function (prev, current) {
                      return prev + +current.InitialWeight;
                    }, 0)}
                  </td>
                  <td>
                    {" "}
                    {onlyInReports.reduce(function (prev, current) {
                      return prev + +current.InQuantity;
                    }, 0)}
                  </td>
                  <td>
                    {" "}
                    {onlyInReports.reduce(function (prev, current) {
                      return prev + +current.InWeight;
                    }, 0)}
                  </td>
                  <td>
                    {onlyInReports.reduce(function (prev, current) {
                      return prev + +current.SaleQuantity;
                    }, 0)}
                  </td>

                  <td>
                    {onlyInReports.reduce(function (prev, current) {
                      return prev + +current.SaleWeight;
                    }, 0)}
                  </td>
                  <td>
                    {onlyInReports.reduce(function (prev, current) {
                      return prev + +current.MoveQuantity;
                    }, 0)}
                  </td>
                  <td>
                    {onlyInReports.reduce(function (prev, current) {
                      return prev + +current.MoveWeight;
                    }, 0)}
                  </td>

                  <td>
                    {onlyInReports.reduce(function (prev, current) {
                      return prev + +current.DeadQuantity;
                    }, 0)}
                  </td>
                  <td>
                    {onlyInReports.reduce(function (prev, current) {
                      return prev + +current.DeadWeight;
                    }, 0)}
                  </td>
                  <td>
                    {onlyInReports.reduce(function (prev, current) {
                      return prev + +current.FinalAvgWeight;
                    }, 0)}
                  </td>

                  <td>
                    {onlyInReports.reduce(function (prev, current) {
                      return prev + +current.FinalQuantity;
                    }, 0)}
                  </td>
                  <td>
                    {onlyInReports.reduce(function (prev, current) {
                      return prev + +current.FinalWeight;
                    }, 0)}
                  </td>
                  <td>
                    {onlyInReports.reduce(function (prev, current) {
                      return prev + +current.PlusOrMinusQuantity;
                    }, 0)}
                  </td>
                  <td>
                    {onlyInReports.reduce(function (prev, current) {
                      return prev + +current.PlusOrMinusWeight;
                    }, 0)}
                  </td>
                  <td>
                    {onlyInReports.reduce(function (prev, current) {
                      return prev + +current.Food;
                    }, 0)}
                  </td>
                  <td>
                    {onlyInReports.reduce(function (prev, current) {
                      return prev + +current.WeightGrow;
                    }, 0)}
                  </td>
                  <td>
                    {onlyInReports.reduce(function (prev, current) {
                      return prev + +current.Coefficient;
                    }, 0)}
                  </td>
                </tr>
              ) : null}
            </tbody>
          </Table>
        )}
      </div>

      <Button onClick={confirmReport} className="confirm-btn" variant="primary">
        Հաստատել
      </Button>
    </div>
  );
}
