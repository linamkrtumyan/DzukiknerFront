import React, { useState, useEffect } from "react";
import { Table, Form, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import "./feeding.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Feeding() {
  let history = useHistory();
  const [data, setData] = useState([]);
  const [foods, setFoods] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sendDate, setSendDate] = useState("");

  useEffect(() => {
    setSendDate(
      selectedDate.getFullYear() +
        "-" +
        (selectedDate.getMonth() + 1) +
        "-" +
        selectedDate.getDate() +
        " " +
        selectedDate.getHours() +
        ":" +
        selectedDate.getMinutes() +
        ":" +
        selectedDate.getSeconds(),
      "selectedDate"
    );
  }, [selectedDate]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/pools/getPools");

      const foodresult = await axios("/info/food/getFoods");

      setData(result.data.allPools);
      setAddFood(result.data.allPools);
      setFoods(foodresult.data.allFoods);
    };

    fetchData();
  }, []);

  const [addFood, setAddFood] = useState("");
  const ExampleCustomInput = ({ value, onClick }) => (
    <Button className="example-custom-input" onClick={onClick}>
      {value}
    </Button>
  );

  const handleSubmit = (evt) => {
    axios
      .post(`/feeding/addFeed`, {
        addFood,
      })
      .then((response) => {
        if (response.data.success) {
          setAddFood("");
          toast.success("Կատարված է");
        } else {
          toast.error(response.data.errorMessage);
        }
      })
      .catch((e) => {
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
        <li
          onClick={() => history.push("/feeding/losses")}
          className="nav-item cursor"
        >
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
        <DatePicker
          style={{
            width: "150px",
            margin: "10px",
            cursor: "pointer",
          }}
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
          }}
          dateFormat="yyyy/MM/dd"
          maxDate={new Date()}
          closeOnScroll={true}
          scrollableMonthYearDropdown
          showMonthDropdown
          showYearDropdown
          customInput={<ExampleCustomInput />}
          placeholderText="Տարի/Ամիս/Օր        🔽"
          mode="date"
        />

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
                    <td>{pool.name}</td>
                    <td>
                      <Form.Control
                        type="number"
                        min="0"
                        placeholder="Կերի քանակ"
                        onChange={(e) => {
                          addFood[index] = {
                            ...data[index],
                            ...addFood[index],
                            count: e.target.value,
                            date: sendDate,
                          };
                          setAddFood([...addFood]);
                        }}
                      />
                    </td>
                    <td>
                      <Form.Control
                        as="select"
                        placeholder="Ընտրեք կերը"
                        onChange={(e) => {
                          addFood[index] = {
                            ...data[index],
                            ...addFood[index],
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
                      ></Form.Control>
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
