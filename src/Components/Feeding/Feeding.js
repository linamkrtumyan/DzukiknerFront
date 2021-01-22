import React, { useContext, useState } from "react";
import { Table, InputGroup, FormControl, Form, Button } from "react-bootstrap";
import AddFeeding from "./AddFeeding";
import axios from "axios";
import { toast } from "react-toastify";
import "./feeding.css";

function Feeding({ data, foods, coefficient }) {
  // console.log(data, "data");
  const [addFood, setAddFood] = useState(data);
  // con
  console.log(addFood, "addfood");

  // let sql = addFood.map(
  //   (item) =>
  //     `(${item.id}, ${item.coef}, ${item.count}, ${item.food}, ${item.name})`
  // );

  // console.log(sql, "sql");

  const handleSubmit = (evt) => {
    // console.log(sql);
    axios
      .post(`/feeding/addFeedingHistory`, {
        addFood,
      })
      .then((response) => {
        console.log(response);
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
    <div
      className="container"
      style={{ backgroundColor: "white", padding: "30px", height: "110vh" }}
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
                      min="0"
                      placeholder="Կերի քանակ"
                      // name="count"
                      onChange={(e) => {
                        addFood[index] = {
                          ...data[index],
                          ...addFood[index],
                          count: e.target.value,
                        };
                        setAddFood([...addFood]);
                      }}
                    />
                  </td>
                  <td>
                    {" "}
                    <Form.Control
                      as="select"
                      placeholder="Ընտրեք կերը"
                      onChange={(e) => {
                        addFood[index] = {
                          ...data[index],
                          ...addFood[index],
                          // count: count,
                          food: e.target.value,
                        };
                        setAddFood([...addFood]);
                      }}
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
                      type="number"
                      min="0"
                      placeholder="Գործակիցը"
                      onChange={(e) => {
                        addFood[index] = {
                          ...data[index],
                          ...addFood[index],
                          coef: e.target.value,
                        };
                        setAddFood([...addFood]);
                      }}
                    >
                      {/* <option hidden value="">
                        Ընտրեք գործակիցը
                      </option>
                      {data.map((coef) => (
                        <option key={coef.id} value={coef.id}>
                          {coef.coefficient}
                        </option>
                      ))} */}
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
      <div className="done_btn">
        <Button onClick={handleSubmit} variant="primary">
          Հաստատել
        </Button>
      </div>
    </div>
  );
}

export default Feeding;
