import React from "react";
import { Table, Button, Form } from "react-bootstrap";
import DeletePartner from "./DeletePartner";
import UpdatePartner from "./UpdatePartner";

function GetPartners({ data }) {
  return (
    <div>
      <Table bordered hover style={{ backgroundColor: "white" }}>
        <thead>
          <tr>
            <th>Անուն</th>
            <th>Նկարագրություն</th>
            <th>Հեռախոսահամար</th>
            <th>Գործողություն</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((partner, index) => {
              return (
                <tr key={index}>
                  <td>{partner.name}</td>
                  <td>{partner.description}</td>
                  <td>{partner.phone}</td>
                  <td className="table_action_column">
                    <UpdatePartner data={partner} />
                    <DeletePartner data={partner} />
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
      </Table>
    </div>
  );
}

export default GetPartners;
