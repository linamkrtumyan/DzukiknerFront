import React, { useEffect, useState } from "react";
import GetReport from "../Components/Report/GetReport";
import axios from "axios";

export const DzukContext = React.createContext();

function Reports() {
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month.toString().length == 1) {
    month = "0" + month;
  }
  const day = date.getDate();
  const currentDate = `'${year}-${month}-${day}'`;
  console.log(currentDate);
  const [data, setData] = useState([]);

  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      axios
        .post(`/reports/getCurrentReports`, {
          currentDate,
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
      style={{
        marginTop: "0px",
        padding: "40px 0px",
      }}
    >
      <DzukContext.Provider value={{ data, setData }}>
        <GetReport data={data} />
      </DzukContext.Provider>
    </div>
  );
}

export default Reports;
