import React from "react";
import { Table, InputGroup, FormControl, Form } from "react-bootstrap";
import AddFeeding from "./AddFeeding";

function Feeding({ data, foods, coefficient }) {
  console.log(coefficient, "coefficient");
  return (
    <div
      className="container"
      style={{ backgroundColor: "white", padding: "30px" }}
    >
      <Table bordered hover>
        <thead>
          <tr>
            <th>Ավազան</th>
            <th>Կերի քանակ (կգ)</th>
            <th>Կերի տեսակ</th>
            <th>Գործակից</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((pool, index) => {
              return (
                <tr key={pool.id}>
                  {/* <td>{partner.id}</td> */}
                  <td>{pool.name}</td>
                  <td>
                    <Form.Control
                      type="number"
                      placeholder="Կերի քանակ"
                      name="zip"
                    />
                  </td>
                  <td>
                    {" "}
                    <Form.Control
                      as="select"
                      placeholder="Ընտրեք կերը"
                      //   onChange={(e) => setPartnerId(e.target.value)}
                    >
                      <option hidden value="">
                        Ընտրեք կերը
                      </option>
                      {foods.map((food) => (
                        <option key={food.id} value={food.id}>
                          {food.name}
                        </option>
                      ))}
                    </Form.Control>
                  </td>
                  <td>
                    <Form.Control
                      as="select"
                      placeholder="Ընտրեք գործակիցը"
                      //   onChange={(e) => setPartnerId(e.target.value)}
                    >
                      {coefficient.map((coef) => (
                        <option key={coef.id} value={coef.id}>
                          {coef.coefficient}
                        </option>
                      ))}
                    </Form.Control>
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
      </Table>
      <AddFeeding />
    </div>
  );
}

export default Feeding;
