import React, { useState, useEffect } from "react";
import { Button, Table, Badge } from "react-bootstrap";
import Select from "react-select";
import DatePicker from "react-datepicker";
import axios from "axios";
import Pagination from "./Pagination";
import EditFeedingReport from "./EditFeedingReport";
import DeleteFeedingReport from "./DeleteFeedingReport";
export const FeedingReportContext = React.createContext();

function FeedingTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  var ourDate = new Date();
  var pastDate = ourDate.getDate() - 7;
  ourDate.setDate(pastDate);
  const [selectedStartDate, setSelectedStartDate] = useState(ourDate);
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());

  const [pools, setPools] = useState([]);
  const [foods, setFoods] = useState([]);
  const [send, setSend] = useState([]);
  const [send1, setSend1] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reports, setReports] = useState([]);
  const [postsCount, setPostsCount] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);

  const foodsForFilter = send.map((i) => i.value);
  const poolsForFilter = send1.map((s) => s.value);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/pools/getPoolsForFilter");
      const foods = await axios("/info/food/getFoodsDetails");
      setPools(result.data.allPools);
      setFoods(foods.data.foodsDetails);
      console.log(foods, "foods");
    };

    fetchData();
  }, []);

  const deleteFeedingReport = (moveitem) => {
    reports.map((report) => {
      if (report.id == moveitem) {
        const index = reports.indexOf(report);
        reports.splice(index, 1);

        setReports([...reports]);
      }
    });
  };
  const updateFeedingReport = (updateitem) => {
    setIsUpdate(!isUpdate);
  };

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
      foodsForFilter,
      startDate,
      endDate,
      currentPage,
      "uxarkvoxy"
    );
    axios
      .post(`/reports/feedHistory`, {
        poolsForFilter,
        foodsForFilter,
        startDate,
        endDate,
        currentPage,
      })

      .then((response) => {
        console.log(response, "response");
        setReports(response.data.result);
        setPostsCount(response.data.count);
        if (response.data.success) {
        } else {
          // toast.(response.data.errorMessage);
        }
      })
      .catch((e) => {
        // toast.error("Կատարված չէ");
      });
  }, [send, send1, startDate, endDate, currentPage, isUpdate]);

  const ExampleCustomInput = ({ value, onClick }) => (
    <Button className="example-custom-input" onClick={onClick}>
      {value}
    </Button>
  );
  return (
    <>
      <div
        style={{
          display: "flex",
          backgroundColor: "white",
          marginBottom: "-50px",
          padding: "0 20px",
        }}
      >
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
            placeholder={"Ընտրեք կերի տեսակ"}
            closeMenuOnSelect={false}
            options={foods}
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
              <th>Ավազան</th>
              <th>Կերի տեսակ</th>
              <th>Քաշ</th>
              <th>Գործակից</th>
              <th>Ամսաթիվ</th>

              <th style={{ maxWidth: "90px" }}></th>
            </tr>
          </thead>
          <tbody>
            {reports.length > 0 ? (
              reports.map((report, index) => {
                return (
                  <tr key={index}>
                    <td>{report.poolName}</td>
                    <td>{report.foodName}</td>
                    <td>{report.weight}</td>
                    <td>{report.coefficient}</td>

                    <td>{report.insertedDate}</td>

                    <td
                      style={{ width: "90px" }}
                      className="table_action_column"
                    >
                      <FeedingReportContext.Provider
                        value={{
                          reports,
                          setReports,
                          deleteFeedingReport,
                          updateFeedingReport,
                        }}
                      >
                        {" "}
                        <EditFeedingReport data={report} />
                        <DeleteFeedingReport data={report} />
                      </FeedingReportContext.Provider>
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

export default FeedingTable;
