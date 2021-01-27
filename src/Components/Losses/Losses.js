import React, { useContext, useState } from "react";
import { Table, InputGroup, FormControl, Form, Button } from "react-bootstrap";
// import AddFeeding from "./AddFeeding";
import axios from "axios";
import { toast } from "react-toastify";

function Losses({ data }) {
  const [addLosses, setAddLosses] = useState(data);

  console.log(addLosses, "addLosses");

  const handleSubmit = (evt) => {
    console.log("sql");
    axios
      .post(`/losses/addLosse`, {
        addLosses,
      })
      .then((response) => {
        console.log(response, "response");
        if (response.data.success) {
          toast.success("Կատարված է");
        } else {
          toast.error(response.data.errorMessage);
        }
      })
      .catch((e) => {
        console.log("error");
        toast.error("Կատարված չէ");
      });
  };
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
              <th>Թափոն (հատ)</th>
              <th>Թափոն (կգ)</th>
              <th>Պիտանի (հատ)</th>
              <th>Պիտանի (կգ)</th>
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
                      {" "}
                      <Form.Control
                        type="number"
                        min="0"
                        placeholder="Թափոն (հատ)"
                        onChange={(e) => {
                          addLosses[index] = {
                            ...data[index],
                            ...addLosses[index],

                            wastequantity: e.target.value,
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
                        placeholder="Թափոն (կգ)"
                        onChange={(e) => {
                          addLosses[index] = {
                            ...data[index],
                            ...addLosses[index],

                            wasteweight: e.target.value,
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
                        placeholder="Պիտանի (հատ)"
                        onChange={(e) => {
                          addLosses[index] = {
                            ...data[index],
                            ...addLosses[index],

                            profitablewastequantity: e.target.value,
                          };
                          setAddLosses([...addLosses]);
                        }}
                      ></Form.Control>
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        min="0"
                        placeholder="Պիտանի (կգ)"
                        onChange={(e) => {
                          addLosses[index] = {
                            ...data[index],
                            ...addLosses[index],

                            profitablewasteweight: e.target.value,
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
          <Button onClick={handleSubmit} variant="primary">
            Հաստատել
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Losses;
