import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import Select from "react-select";
import DatePicker from "react-datepicker";
import axios from "axios";
import Pagination from "./Pagination";
import EditMoveReport from "./EditMoveReport";
import DeleteMoveReport from "./DeleteMoveReport";

function MoveTable() {
  const [currentPage, setCurrentPage] = useState(1);
  console.log(currentPage, "currentPage");
  const [postsPerPage] = useState(10);

  var ourDate = new Date();
  var pastDate = ourDate.getDate() - 7;
  ourDate.setDate(pastDate);
  const [selectedStartDate, setSelectedStartDate] = useState(ourDate);
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());

  const [pools, setPools] = useState([]);
  const [types, setTypes] = useState([
    { value: "մուտք", label: "Մուտք" },
    { value: "վաճառք", label: "Վաճառք" },
    { value: "տեղափոխություն", label: "Տեղափոխություն" },
    { value: "սատկ", label: "Սատկ" },
  ]);
  const [send, setSend] = useState([]);
  const [send1, setSend1] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reports, setReports] = useState([]);
  const [postsCount, setPostsCount] = useState(0);

  const typesForFilter = send.map((i) => i.value);
  const poolsForFilter = send1.map((s) => s.value);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/pools/getPoolsForFilter");
      setPools(result.data.allPools);
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
    console.log(
      poolsForFilter,
      typesForFilter,
      startDate,
      endDate,
      currentPage,
      "uxarkvoxy"
    );
    axios
      .post(`/reports/fishMoveHistory`, {
        poolsForFilter,
        typesForFilter,
        startDate,
        endDate,
        currentPage,
      })
      .then((response) => {
        console.log(response, "response");
        setReports(response.data.data);
        setPostsCount(response.data.count);
        console.log(reports, "reports");
        if (response.data.success) {
        } else {
          // toast.error(response.data.errorMessage);
        }
      })
      .catch((e) => {
        // toast.error("Կատարված չէ");
      });
  }, [send, send1, startDate, endDate, currentPage]);

  const ExampleCustomInput = ({ value, onClick }) => (
    <Button className="example-custom-input" onClick={onClick}>
      {value}
    </Button>
  );
  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ width: "270px", margin: "20px 10px" }}>
          <Select
            placeholder={"Ընտրեք ավազաններ"}
            closeMenuOnSelect={false}
            options={pools}
            onChange={setSend1}
            isMulti
          />
        </div>

        <div style={{ width: "270px", margin: "20px 10px" }}>
          <Select
            placeholder={"Ընտրեք տիպը"}
            closeMenuOnSelect={false}
            options={types}
            onChange={setSend}
            isMulti
          />
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
            maxDate={new Date()}
            closeOnScroll={true}
            scrollableMonthYearDropdown
            showMonthDropdown
            showYearDropdown
            customInput={<ExampleCustomInput />}
            mode="date"
          />
        </div>
      </div>
      <div
        className="container"
        style={{
          backgroundColor: "white",
          padding: "50px 30px",
          height: "100%",
        }}
      >
        <Table bordered hover style={{ backgroundColor: "white" }}>
          <thead>
            <tr>
              <th>Ավազան (ելք)</th>
              <th>Ավազան (մուտք) </th>
              <th>Քանակ</th>
              <th>Գործընկեր</th>
              <th>Նկարագրություն</th>
              <th>Տիպ</th>
              <th>Գործողություն</th>
            </tr>
          </thead>
          <tbody>
            {reports.length > 0 ? (
              reports.map((report, index) => {
                // console.log(currentPosts, "current Posts");
                return (
                  <tr key={index}>
                    <td>{report.fromPool}</td>
                    <td>{report.toPool}</td>
                    <td>{report.quantity}</td>
                    <td>{report.partnerName}</td>
                    <td>{report.description}</td>
                    <td>{report.type}</td>
                    <td className="table_action_column">
                      <EditMoveReport data={report} />
                      <DeleteMoveReport data={report} />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5">Տվյաներ չկան</td>
              </tr>
            )}
          </tbody>
        </Table>

        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={postsCount}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </>
  );
}

export default MoveTable;
