import React from "react";
import excelLogo from "../../img/download-icon3.svg";
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
      style={{ marginLeft: "50px", paddingTop: "20px" }}
      className="img-text-wrapper download"
    >
      <div onClick={downloadReports}>
        <img
          src={excelLogo}
          className="excelIcon"
          alt=".xlsx"
          title="Ներբեռնել հաշվետվությունը"
        />
      </div>
      <p className="download_title">
        <b>Ներբեռնել</b>
      </p>
      <label className="subtitle">Ներբեռնել հաշվետվությունը</label>
    </div>
  );
}
