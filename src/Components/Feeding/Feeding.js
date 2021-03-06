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
  const [error, setError] = useState("");
  const [isOk, setIsOk] = useState(false);

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
  }, []);

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

  const [addFood, setAddFood] = useState([]);
  const ExampleCustomInput = ({ value, onClick }) => (
    <Button className="example-custom-input" onClick={onClick}>
      {value}
    </Button>
  );

  const handleSubmit = (evt) => {
    evt.preventDefault();

    for (let i = 0; i < addFood.length; i++) {
      if (addFood[i].count && !addFood[i].coef) {
        setError("form-control is-invalid ");
        return;
      }
      if (addFood[i].count && !addFood[i].food) {
        setError("form-control is-invalid ");
        return;
      }
    }

    axios
      .post(`/feeding/addFeed`, {
        addFood,
      })
      .then((response) => {
        if (response.data.success) {
          let newArray = addFood.map(function (food) {
            delete food.count;
            delete food.coef;
            delete food.date;
            delete food.food;
            return food;
          });
          setAddFood(newArray);
          toast.success("Կատարված է");
          // setIsOk(true);
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
        style={{
          backgroundColor: "white",
          padding: "50px 30px",
          height: "100%",
        }}
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
                        onWheel={() => document.activeElement.blur()}
                        placeholder="Կերի քանակ"
                        value={Number(addFood[index]?.count)}
                        onChange={(e) => {
                          setError("");
                          addFood[index] = {
                            ...data[index],
                            ...addFood[index],
                            count: e.target.value,
                            date:
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
                          };
                          setAddFood([...addFood]);
                        }}
                      />
                    </td>
                    <td>
                      <Form.Control
                        as="select"
                        className={
                          addFood[index]?.count > 0 &&
                          addFood[index]?.food == null
                            ? error
                            : ""
                        }
                        value={addFood[index]?.food ?? "Ընտրեք կերը"}
                        // placeholder="Ընտրեք կերը"
                        onChange={(e) => {
                          setError("");
                          addFood[index] = {
                            ...data[index],
                            ...addFood[index],
                            food: e.target.value,
                          };
                          setAddFood([...addFood]);
                        }}
                      >
                        <option hidden value="">
                          {addFood[index]?.food ? "Ընտրեք կերը" : "Ընտրեք կերը"}
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
                        value={Number(addFood[index]?.coef)}
                        onWheel={() => document.activeElement.blur()}
                        min="0"
                        placeholder="Գործակիցը"
                        className={
                          addFood[index]?.count > 0 &&
                          addFood[index]?.coef == null
                            ? error
                            : ""
                        }
                        onChange={(e) => {
                          setError("");
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
          <Button
            onClick={handleSubmit}
            variant="primary"
            // disabled
          >
            Հաստատել
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Feeding;
