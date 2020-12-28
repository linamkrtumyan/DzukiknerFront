import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import GetFish from "../Components/Fish/GetFish";
import axios from "axios";
import AddFish from "../Components/Fish/AddFish";

export const FishContext = React.createContext();
function Fishes() {
  const [data, setData] = useState([]);

  const addFish = (fish) => {
    data.push(fish);
    setData([...data]);
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
        Ձկներ
        <FishContext.Provider value={{ data, setData, addFish }}>
          <AddFish />
        </FishContext.Provider>
      </div>

      <GetFish data={data} />
    </div>
  );
}

export default Fishes;
