import React from "react";
import { Button } from "react-bootstrap";
import excelLogo from "../../img/download.svg";
import axios from "axios";
import FileSaver from "file-saver";
import "./Report.css";

export default function DownloadReport({ reports }) {
  const downloadReports = async (e) => {
    // console.log("reports:", reports);
    e.preventDefault();
    axios({
      url: "/reports/download",
      method: "POST",
      data: reports, // Important
    }).then(async (res) => {
      // console.log(res);
      if (res.data.success) {
        window.location.href =
          "https://192.168.32.45/reports/download/" + res.data.id;
      }
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
