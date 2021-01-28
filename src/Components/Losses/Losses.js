import React, { useContext, useState, useEffect } from "react";
import { Table, InputGroup, FormControl, Form, Button } from "react-bootstrap";
// import AddFeeding from "./AddFeeding";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

function Losses() {
  let history = useHistory();
  const [data, setData] = useState([]);
  const [addLosses, setAddLosses] = useState(data);

  console.log(addLosses, "addLosses");
  useEffect(() => {
    console.log("object");
    const fetchData = async () => {
      const result = await axios("/pools/getPools");

      setData(result.data.allPools);
    };

    fetchData();
  }, []);
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
    <div className="container" style={{ paddingTop: "130px" }}>
      {" "}
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li
          className="nav-item cursor"
          onClick={() => history.push("/feeding")}
          className="nav-item cursor"
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
