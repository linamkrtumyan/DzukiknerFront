import React from "react";
import { Table } from "react-bootstrap";

function GetFitFishes({ data }) {
  let sum = data.reduce(function (prev, current) {
    return prev + +current.count;
  }, 0);
  return (
    <div>
      <Table bordered hover style={{ backgroundColor: "white" }}>
        <thead>
          <tr>
            <th>Ավազան</th>
            <th>Քանակ</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((fitFish, index) => {
              return (
                <>
                  <tr key={index}>
                    <td>{fitFish.poolName}</td>
                    <td>{fitFish.count}</td>
                  </tr>
                </>
              );
            })
          ) : (
            <tr>
              <td colSpan="5">Տվյաներ չկան</td>
            </tr>
          )}
          {data.length > 0 ? (
            <tr style={{ fontWeight: "700" }}>
              <td colSpan="1">Ընդամենը</td>
              <td>{sum}</td>
            </tr>
          ) : null}
        </tbody>
      </Table>{" "}
    </div>
  );
}

export default GetFitFishes;
