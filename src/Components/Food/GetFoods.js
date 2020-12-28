import React from "react";
import { Table, Button, Form } from "react-bootstrap";
import UpdateFood from "./UpdateFood";

function GetFoods({ data }) {
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            {/* <th>Id</th> */}
            <th>Անուն</th>
            <th>Համար</th>
            <th>Քաշ </th>
            <th>Գործակից </th>
            <th>Գործողություն</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((food, index) => {
              return (
                <tr key={index}>
                  {/* <td>{food.id}</td> */}
                  <td>{food.name}</td>
                  <td>{food.number}</td>
                  <td>{food.weight}</td>
                  <td>{food.coefficient}</td>
                  <td>
                    <UpdateFood data={food} />
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

export default GetFoods;
