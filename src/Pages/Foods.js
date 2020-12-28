import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import GetFoods from "../Components/Food/GetFoods";
import axios from "axios";
import AddFood from "../Components/Food/AddFood";

export const FoodContext = React.createContext();
function Foods() {
  const [data, setData] = useState([]);
  const addFood = (food) => {
    data.push(food);
    setData([...data]);
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
    <div style={{ marginTop: "30px", marginLeft: "160px" }}>
      <div
        style={{
          padding: "10px",
          fontSize: "25px",
          fontWeight: "700",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        Կերեր
        <FoodContext.Provider value={{ data, setData, addFood }}>
          <AddFood />
        </FoodContext.Provider>
      </div>

      <GetFoods data={data} />
    </div>
  );
}

export default Foods;
