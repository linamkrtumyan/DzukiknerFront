import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import GetFoods from "../Components/Food/GetFoods";
import axios from "axios";
import AddFood from "../Components/Food/AddFood";

export const FoodContext = React.createContext();
function Foods() {
  const [data, setData] = useState([]);
  const [coef, setCoef] = useState([]);
  console.log(data);
  const addFood = (food) => {
    data.push(food);
    setData([...data]);
  };
  const updateFood = (food) => {
    data.map((id1) => {
      if (id1.id == food.id) {
        console.log("updateFood");
        id1.name = food.name;
        id1.number = food.number;
        id1.weight = food.weight;
        id1.coefficient = food.coefficient;

        setData([...data]);
      }
    });
  };

  const deleteFood = (fish) => {
    data.map((id1) => {
      if (id1.id == fish) {
        const index = data.indexOf(id1);
        data.splice(index, 1);
        console.log(id1);
        setData([...data]);
      }
    });
  };

  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/info/food/getFoods");
      const coef = await axios("/pools/getPoolsAndDetails");
      console.log(result.data.allFoods);

      setData(result.data.allFoods);
      setCoef(coef.data.allPools);
    };

    fetchData();
  }, []);
  return (
    <div
      className="container"
      style={{ padding: "30px", backgroundColor: "white" }}
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
      <FoodContext.Provider value={{ data, setData, updateFood, deleteFood }}>
        <GetFoods data={data} coef={coef} />
      </FoodContext.Provider>
    </div>
  );
}

export default Foods;
