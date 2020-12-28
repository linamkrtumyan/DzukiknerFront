import React from "react";
import { Table, Button, Form } from "react-bootstrap";

function GetFoods({ data }) {
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Number </th>
            <th>Weight </th>
            <th>Coefficcient </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((food, index) => {
              return (
                <tr key={index}>
                  <td>{food.id}</td>
                  <td>{food.name}</td>
                  <td>{food.number}</td>
                  <td>{food.weight}</td>
                  <td>{food.coefficient}</td>
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

export default GetFoods;
