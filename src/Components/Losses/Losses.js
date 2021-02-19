import React, { useState, useEffect } from "react";
import { Table, Form, Button } from "react-bootstrap";

import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { set } from "js-cookie";

function Losses() {
  let history = useHistory();
  const [data, setData] = useState([]);
  const [addLosses, setAddLosses] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sendDate, setSendDate] = useState("");
  const [waste, setWaste] = useState("");
  const ExampleCustomInput = ({ value, onClick }) => (
    <Button className="example-custom-input" onClick={onClick}>
      {value}
    </Button>
  );
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
      setAddLosses(result.data.allPools);
      setData(result.data.allPools);
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   data.map((losse) => setWaste(Number(losse.profitablewastequantity)));
  //   // addLosses.map()
  // }, [data]);
  const handleSubmit = (evt) => {
    addLosses.map(
      (losse) =>
        (losse.wastequantity = String(
          losse.wastequantity - losse.profitablewastequantity
        ))
    );
    // addLosses.map((losse) => console.log(losse.wastequantity));
    // console.log(addLosses, "addLosses");
    axios
      .post(`/losses/addLosse`, {
        addLosses,
      })
      .then((response) => {
        // console.log(response);
        if (response.data.success) {
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
      {" "}
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li
          className="nav-item cursor"
          onClick={() => history.push("/feeding")}
        >
          <a
            className="nav-link  "
            id="home-tab"
            data-toggle="tab"
            role="tab"
            aria-controls="home"
            aria-selected="true"
          >
            Կերակրում
          </a>
        </li>
        <li>
          <a
            className="nav-link active "
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
        {" "}
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
              <th>Ընդհանուր (հատ)</th>
              <th>Պիտանի (հատ)</th>
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
                        placeholder="Ընդհանուր (հատ)"
                        onChange={(e) => {
                          addLosses[index] = {
                            ...data[index],
                            ...addLosses[index],

                            wastequantity: e.target.value,
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
                          setAddLosses([...addLosses]);
                        }}
                      ></Form.Control>
                    </td>

                    <td>
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

export default Losses;
