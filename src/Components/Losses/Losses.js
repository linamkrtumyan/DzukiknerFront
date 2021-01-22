import React, { useContext, useState } from "react";
import { Table, InputGroup, FormControl, Form, Button } from "react-bootstrap";
// import AddFeeding from "./AddFeeding";
import axios from "axios";
import { toast } from "react-toastify";

function Losses({ data }) {
  const [addLosses, setAddLosses] = useState(data);

  console.log(addLosses, "addLosses");
  return (
    <div>
      {" "}
      <div
        className="container"
        style={{ backgroundColor: "white", padding: "30px", height: "110vh" }}
      >
        <Table bordered hover>
          <thead>
            <tr>
              <th>Ավազան</th>
              <th>Կորուստ (կգ)</th>
              <th>Պիտանի (հատ)</th>
              <th>Թափոն (հատ)</th>
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
                        min="0"
                        placeholder="Կորուստ"
                        onChange={(e) => {
                          addLosses[index] = {
                            ...data[index],
                            ...addLosses[index],
                            losses: e.target.value,
                          };
                          setAddLosses([...addLosses]);
                        }}
                      />
                    </td>
                    <td>
                      {" "}
                      <Form.Control
                        type="number"
                        min="0"
                        placeholder="Պիտանի"
                        onChange={(e) => {
                          addLosses[index] = {
                            ...data[index],
                            ...addLosses[index],

                            fit: e.target.value,
                          };
                          setAddLosses([...addLosses]);
                        }}
                      ></Form.Control>
                    </td>
                    <td>
                      {" "}
                      <Form.Control
                        type="number"
                        min="0"
                        placeholder="Թափոն"
                        onChange={(e) => {
                          addLosses[index] = {
                            ...data[index],
                            ...addLosses[index],

                            waste: e.target.value,
                          };
                          setAddLosses([...addLosses]);
                        }}
                      ></Form.Control>
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

        <div className="done_btn">
          <Button
            //  onClick={handleSubmit}
            variant="primary"
          >
            Հաստատել
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Losses;
