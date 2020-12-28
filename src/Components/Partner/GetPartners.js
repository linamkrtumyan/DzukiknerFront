import React from "react";
import { Table, Button, Form } from "react-bootstrap";

function GetPartners({ data }) {
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Phone </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((partner, index) => {
              return (
                <tr key={index}>
                  <td>{partner.id}</td>
                  <td>{partner.name}</td>
                  <td>{partner.description}</td>
                  <td>{partner.phone}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5">Loading...</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default GetPartners;
