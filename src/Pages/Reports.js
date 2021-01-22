import React, { useEffect, useState } from "react";
import GetReport from "../Components/Report/GetReport";
import axios from "axios";

export const DzukContext = React.createContext();

function Reports() {
  const date = "2021-01-21";
  const [data, setData] = useState([]);

  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      axios
        .post(`/reports/getReports`, {
          date,
        })
        .then((response) => {
          console.log(response);
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
      // className="container "
      style={{
        marginTop: "0px",
        padding: "40px 0px",
        // padding: "10px",
        // backgroundColor: "white",
        // , marginLeft: "160px"
      }}
    >
      <DzukContext.Provider value={{ data, setData }}>
        <GetReport data={data} />
      </DzukContext.Provider>
    </div>
  );
}

export default Reports;
