import React from "react";
import { Table, Button, Form } from "react-bootstrap";

function GetFish({ data }) {
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            {/* <th>#</th> */}
            <th>Id</th>
            <th>Name</th>
            <th>Description </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((fish, index) => {
              return (
                <tr key={index}>
                  <td>{fish.id}</td>
                  <td>{fish.name}</td>
                  <td>{fish.description}</td>
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
