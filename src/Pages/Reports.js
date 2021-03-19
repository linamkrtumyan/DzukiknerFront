import React, { useEffect, useState } from "react";
import GetReport from "../Components/Report/GetReport";
import axios from "axios";
import { toast } from "react-toastify";

function Reports() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      axios
        .post(`/reports/getCurrentReports`)
        .then((response) => {
          if (response.data.reports) {
            setData(response.data.reports);
          } else {
            toast.error("Չհաջողվեց բեռնել տվյալները");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };

    fetchData();
  }, []);
  return (
    <div
      style={{
        marginTop: "0px",
        // padding: "40px 0px",
      }}
    >
      <GetReport data={data} />
    </div>
  );
}

export default Reports;
