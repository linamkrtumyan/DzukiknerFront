import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import GetFoods from "../Components/Food/GetFoods";
import axios from "axios";
import AddFood from "../Components/Food/AddFood";

export const FoodContext = React.createContext();
function Foods() {
  const [data, setData] = useState([]);
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
      console.log(result.data.allFoods);

      setData(result.data.allFoods);
    };

    fetchData();
  }, []);
  return (
    <div style={{ marginTop: "30px", padding: "30px" }}>
      <div
        style={{
          padding: "10px",
          fontSize: "25px",
          fontWeight: "700",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        Կերի տեսակ
        <FoodContext.Provider value={{ data, setData, addFood }}>
          <AddFood />
        </FoodContext.Provider>
      </div>
      <FoodContext.Provider value={{ data, setData, updateFood, deleteFood }}>
        <GetFoods data={data} />
      </FoodContext.Provider>
    </div>
  );
}

export default Foods;
