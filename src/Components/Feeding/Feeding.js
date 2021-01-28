import React, { useContext, useState, useEffect } from "react";
import { Table, InputGroup, FormControl, Form, Button } from "react-bootstrap";
import AddFeeding from "./AddFeeding";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import "./feeding.css";

function Feeding() {
  let history = useHistory();
  const [data, setData] = useState([]);
  const [foods, setFoods] = useState([]);
  const [coefficient, setCoefficient] = useState([]);
  //   console.log(coefficient, "coef from page");
  useEffect(() => {
    console.log("object");
    const fetchData = async () => {
      console.log("object2");
      const result = await axios("/pools/getPools");
      console.log("object3");
      const foodresult = await axios("/info/food/getFoods");
      // const coefresult = await axios("/info/food/getCoefficient");
      console.log(foodresult, "foodresult");
      console.log(result.data.allPools, "result");
      // console.log(result, "result");

      // setCoefficient(coefresult.data.allCoef);
      setData(result.data.allPools);
      setFoods(foodresult.data.allFoods);
    };

    fetchData();
  }, []);

  console.log(foods, "data feeding");
  const [addFood, setAddFood] = useState(data);
  // con
  console.log(addFood, "addfood");

  // let sql = addFood.map(
  //   (item) =>
  //     `(${item.id}, ${item.coef}, ${item.count}, ${item.food}, ${item.name})`
  // );

  // console.log(sql, "sql");

  const handleSubmit = (evt) => {
    // evt.target.reset();
    // evt.preventDefault();
    // console.log(sql);
    axios
      .post(`/feeding/addFeed`, {
        addFood,
      })
      .then((response) => {
        // evt.target.reset();
        console.log(response);
        if (response.data.success) {
          // evt.target.reset();
          setAddFood("");
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
    <div className="container" style={{ paddingTop: "130px" }}>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item cursor">
          <a
            className="nav-link active "
            id="home-tab"
            data-toggle="tab"
            role="tab"
            aria-controls="home"
            aria-selected="true"
          >
            Կերակրում
          </a>
        </li>
        <li onClick={() => history.push("/losses")} className="nav-item cursor">
          <a
            className="nav-link "
            id="profile-tab"
            data-toggle="tab"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            Կորուստ
          </a>
        </li>
      </ul>
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
                        // type="reset"
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
                            {food.name}&nbsp;
                            {food.number}
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
    </div>
  );
}

export default Feeding;
