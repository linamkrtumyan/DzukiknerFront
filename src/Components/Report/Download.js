import React from "react";
import { Button } from "react-bootstrap";
import excelLogo from "../../img/download.svg";
import axios from "axios";
import FileSaver from "file-saver";
import "./Report.css";

export default function DownloadReport({ reports }) {
  const downloadReports = async (e) => {
    console.log("reports:", reports);
    e.preventDefault();
    axios({
      url: "/reports/download",
      method: "POST",
      data: reports, // Important
    }).then((res) => {
      console.log(res);
      axios
        .get("/reports/download", { responseType: "arraybuffer" })
        .then((response) => {
          var blob = new Blob([response.data], {
            type:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          FileSaver.saveAs(blob, "Հաշվետվություններ.xlsx");
        });
    });
  };

  return (
    <div
      style={{ marginLeft: "50px", marginTop: "6s0px" }}

      // className="img-text-wrapper download"
    >
      <Button variant="primary" onClick={downloadReports}>
        <img
          src={excelLogo}
          className="partner_icon"
          alt=".xlsx"
          title="Ներբեռնել հաշվետվությունը"
        />
        {/* <p className="download_title"> */}
        Ներբեռնել
        {/* </p> */}
        {/* <p className="subtitle">Ներբեռնել հաշվետվությունը</p> */}
      </Button>
    </div>
  );
}
