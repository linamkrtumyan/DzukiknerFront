import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import GetFish from "../Components/Fish/GetFish";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AddFish from "../Components/Fish/AddFish";
import DeleteFish from "../Components/Fish/DeleteFish";

export const FishContext = React.createContext();
function Fishes() {
  let history = useHistory();
  const [data, setData] = useState([]);

  const addFish = (fish) => {
    data.push(fish);
    setData([...data]);
  };
  const updateFish = (fish) => {
    data.map((id1) => {
      if (id1.id == fish.id) {
        id1.name = fish.name;
        id1.description = fish.description;

        setData([...data]);
      }
    });
  };

  const deleteFish = (fish) => {
    data.map((id1) => {
      if (id1.id == fish) {
        const index = data.indexOf(id1);
        data.splice(index, 1);

        setData([...data]);
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/info/fish/getFishes");

      setData(result.data.allFishes);
    };

    fetchData();
  }, []);
  return (
    <div className="container" style={{ paddingTop: "130px" }}>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li
          className="nav-item cursor"
          onClick={() =>
            history.push("/information/partners", { from: "Information" })
          }
        >
          <a
            className="nav-link "
            id="home-tab"
            data-toggle="tab"
            // href="#home"
            role="tab"
            aria-controls="home"
            aria-selected="true"
          >
            Գործընկերներ
          </a>
        </li>
        <li className="nav-item cursor">
          <a
            className="nav-link active"
            id="profile-tab"
            data-toggle="tab"
            // href="#profile"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            Ձկան տեսակ
          </a>
        </li>
        <li
          className="nav-item cursor"
          onClick={() =>
            history.push("/information/foods", { from: "Information" })
          }
        >
          <a
            className="nav-link"
            id="contact-tab"
            data-toggle="tab"
            role="tab"
            aria-controls="contact"
            aria-selected="false"
          >
            Կերի տեսակ
          </a>
        </li>
      </ul>

      <div
        className="container"
        style={{ backgroundColor: "white", padding: "0px 30px 30px 30px" }}
      >
        <div
          style={{
            padding: "10px 0px",
            fontSize: "25px",
            fontWeight: "700",
            display: "flex",
            justifyContent: "space-between",
            float: "right",
          }}
        >
          <FishContext.Provider value={{ data, setData, addFish }}>
            <AddFish />
          </FishContext.Provider>
        </div>

        <FishContext.Provider value={{ data, setData, updateFish, deleteFish }}>
          <GetFish data={data} />
        </FishContext.Provider>
      </div>
    </div>
  );
}

export default Fishes;
