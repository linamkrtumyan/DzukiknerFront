import React, { useEffect, useState } from "react";
import GetReport from "../Components/Report/GetReport";
import axios from "axios";

function Reports() {
  const [data, setData] = useState([]);

  // console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      axios
        .post(`/reports/getCurrentReports`)
        .then((response) => {
          console.log(response.data.reports);
          if (response.data.reports) {
            setData(response.data.reports);
          } else {
            console.log(response.data.errorMessage);
          }
        })
        .catch((e) => {
          console.log("error");
        });
    };

    fetchData();
  }, []);
  return (
    <div
      style={{
        marginTop: "0px",
        padding: "40px 0px",
      }}
    >
      <GetReport data={data} />
    </div>
  );
}

export default Reports;
