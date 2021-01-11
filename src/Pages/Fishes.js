import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import GetFish from "../Components/Fish/GetFish";
import axios from "axios";
import AddFish from "../Components/Fish/AddFish";
import DeleteFish from "../Components/Fish/DeleteFish";

export const FishContext = React.createContext();
function Fishes() {
  const [data, setData] = useState([]);

  const addFish = (fish) => {
    data.push(fish);
    setData([...data]);
  };
  const updateFish = (fish) => {
    data.map((id1) => {
      if (id1.id == fish.id) {
        console.log("updateFish");
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
        console.log(id1);
        setData([...data]);
      }
    });
  };

  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/info/fish/getFishes");
      console.log(result.data.allFishes);

      setData(result.data.allFishes);
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
        Ձկներ
        <FishContext.Provider value={{ data, setData, addFish }}>
          <AddFish />
        </FishContext.Provider>
      </div>

      <FishContext.Provider value={{ data, setData, updateFish, deleteFish }}>
        <GetFish data={data} />
      </FishContext.Provider>
    </div>
  );
}

export default Fishes;
