import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import GetFoods from "../Components/Food/GetFoods";
import axios from "axios";
import AddFood from "../Components/Food/AddFood";
import { useHistory } from "react-router-dom";

export const FoodContext = React.createContext();
function Foods() {
  let history = useHistory();
  const [data, setData] = useState([]);
  const [coef, setCoef] = useState([]);
  const [allWeight, setAllWeight] = useState(0);

  const addFood = (food) => {
    data.push(food);
    setData([...data]);
  };
  const updateFood = (food) => {
    data.map((id1) => {
      if (id1.id == food.id) {
        id1.name = food.name;
        id1.number = food.number;
        id1.weight = food.weight;
        setData([...data]);
      }
    });
  };

  const plusFood = (food) => {
    data.map((id1) => {
      if (id1.id == food.id) {
        id1.weight = parseInt(id1.weight) + parseInt(food.weight);

        setData([...data]);
      }
    });
  };

  const deleteFood = (fish) => {
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
      const result = await axios("/info/food/getFoods");
      const coef = await axios("/pools/getPoolsAndDetails");
      const allFoodWeight = await axios("/info/food/getFoodWeights");
      // console.log(allFoodWeight.data.count, "2");

      setData(result.data.allFoods);
      setCoef(coef.data.allPools);
      setAllWeight(allFoodWeight.data.count);
    };

    fetchData();
  }, []);
  return (
    <div className="container" style={{ paddingTop: "130px" }}>
      <ul className="nav nav-tabs " id="myTab" role="tablist">
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
        <li
          className="nav-item cursor"
          onClick={() =>
            history.push("/information/partners/fishes", {
              from: "Information",
            })
          }
        >
          <a
            className="nav-link "
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
        <li className="nav-item cursor">
          <a
            className="nav-link active"
            id="contact-tab"
            data-toggle="tab"
            // href="#contact"
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
        style={{ padding: "0px 30px 30px 30px", backgroundColor: "white" }}
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
          <FoodContext.Provider value={{ data, setData, addFood }}>
            <AddFood />
          </FoodContext.Provider>
        </div>
        <FoodContext.Provider
          value={{ data, setData, updateFood, deleteFood, plusFood }}
        >
          <GetFoods data={data} coef={coef} allWeight={allWeight} />
        </FoodContext.Provider>
      </div>
    </div>
  );
}

export default Foods;
