import React from "react";
import { Table, Button, Form } from "react-bootstrap";
import UpdateFish from "./UpdateFish";
import DeleteFish from "./DeleteFish";

function GetFish({ data }) {
  return (
    <div>
      <Table striped bordered hover>
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
                  <td>
                    <UpdateFish data={fish} />
                    <DeleteFish data={fish} />
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5">Loading...</td>
            </tr>
          )}
        </tbody>
      </Table>{" "}
    </div>
  );
}

export default GetFish;
