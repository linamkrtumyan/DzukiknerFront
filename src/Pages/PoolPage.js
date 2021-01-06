import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
// import PoolCard from "../components/PoolCard/PoolCard";
// import AddPool from "../Components/Pool/AddPool";
import Cards from "../Components/Pool/Cards";
import AddPool from "../Components/Pool/AddPool";

export const PoolContext = React.createContext();

function PoolPage() {
  const [data, setData] = useState([]);
  console.log(data, "data");

  const addNewPool = (pool) => {
    data.push(pool);
    setData([...data]);
  };

  const deletePool = (pool) => {
    data.map((id1) => {
      if (id1.id == pool) {
        const index = data.indexOf(id1);
        data.splice(index, 1);
        console.log(id1);
        setData([...data]);
      }
    });
  };
  const updatePool = (pool) => {
    data.map((id1) => {
      if (id1.id == pool.id) {
        console.log("updatePool");
        id1.name = pool.name;
        setData([...data]);
      }
    });
  };

  const inPool = (pool) => {
    data.map((id1) => {
      if (id1.id == pool.id) {
        console.log("inPool");
        id1.fishQuantity = parseInt(id1.fishQuantity) + parseInt(pool.quantity);
        id1.fishWeight = parseInt(id1.fishWeight) + parseInt(pool.weight);
        setData([...data]);
      }
    });
  };
  const salePool = (pool) => {
    data.map((id1) => {
      if (id1.id == pool.id) {
        console.log("salePool");
        id1.fishQuantity = parseInt(id1.fishQuantity) - parseInt(pool.quantity);
        id1.fishWeight = parseInt(id1.fishWeight) - parseInt(pool.weight);
        setData([...data]);
      }
    });
  };
  const movePool = (pool) => {
    data.map((id1) => {
      if (id1.id == pool.fromPoolid) {
        console.log("movePool");
        id1.fishQuantity = parseInt(id1.fishQuantity) - parseInt(pool.quantity);
        id1.fishWeight = parseInt(id1.fishWeight) - parseInt(pool.weight);
        setData([...data]);
      }
    });
    data.map((id1) => {
      if (id1.id == pool.toPoolid) {
        console.log("movePool");
        id1.fishQuantity = parseInt(id1.fishQuantity) + parseInt(pool.quantity);
        id1.fishWeight = parseInt(id1.fishWeight) + parseInt(pool.weight);
        setData([...data]);
      }
    });
  };
  //   console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/pools/getPoolsAndDetails");
      //   console.log(result.data.allPools);

      setData(result.data.allPools);
      //   console.log(result.data.allPools);
      // console.log(data, '222');

      // console.log(data.hits);
    };

    fetchData();
    // console.log(data.hits);
  }, []);

  return (
    <div style={{ marginLeft: "160px" }}>
      <div
        style={{
          padding: "10px",
          fontSize: "25px",
          fontWeight: "700",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        Ավազաններ
        <PoolContext.Provider value={{ data, setData, addNewPool }}>
          {" "}
          <AddPool />
        </PoolContext.Provider>
      </div>
      <PoolContext.Provider
        value={{
          data,
          setData,
          deletePool,
          updatePool,
          inPool,
          salePool,
          movePool,
        }}
      >
        <Cards data={data} />
      </PoolContext.Provider>

      {/* <Cards /> */}
    </div>
  );
}

export default PoolPage;
