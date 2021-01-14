import React from "react";
import { Table, InputGroup, FormControl, Form } from "react-bootstrap";

function Feeding() {
  return (
    <div
      className="container"
      style={{ backgroundColor: "white", padding: "30px" }}
    >
      <Table bordered hover>
        <thead>
          <tr>
            <th>Ավազան</th>
            <th>Այսօր</th>
            <th>Երեկ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>
              {/* <InputGroup as="number" size="sm" className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing-sm">
                    Small
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    as="number"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                />
              </InputGroup> */}

              <Form.Control
                type="number"
                placeholder="Կերի քանակ"
                name="zip"
                // value={values.zip}
                // onChange={handleChange}
                // isInvalid={!!errors.zip}
              />
            </td>
            <td>Otto</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Feeding;
