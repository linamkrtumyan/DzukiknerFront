import React from "react";
import { Table, Button, Form } from "react-bootstrap";
import UpdateFish from "./UpdateFish";
import DeleteFish from "./DeleteFish";

function GetFish({ data }) {
  return (
    <div>
      <Table bordered hover style={{ backgroundColor: "white" }}>
        <thead>
          <tr>
            <th>Անուն</th>
            <th>Նկարագրություն </th>
            <th>Գործողություն</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((fish, index) => {
              return (
                <tr key={index}>
                  <td>{fish.name}</td>
                  <td>{fish.description}</td>
                  <td className="table_action_column">
                    <UpdateFish data={fish} />
                    <DeleteFish data={fish} />
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
      </Table>{" "}
    </div>
  );
}

export default GetFish;
