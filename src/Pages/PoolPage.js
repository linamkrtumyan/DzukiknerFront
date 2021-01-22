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
  const [changeData, setChangeData] = useState([]);

  const addNewPool = (pool) => {
    data.push(pool);
    setData([...data]);
  };

  const deletePool = (pool) => {
    data.map((id1) => {
      if (id1.id == pool) {
        const index = data.indexOf(id1);
        data.splice(index, 1);
        // console.log(id1);
        setData([...data]);
        console.log(data, "jnjeluc heto arrayy");
        // setChangeData(data.filter((id1) => id1.id != pool));
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

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/pools/getPoolsAndDetails");

      setData(result.data.allPools);
    };

    fetchData();
  }, []);

  return (
    <div className="container background" style={{ padding: "80px 0px" }}>
      <div
        style={{
          padding: "10px 0px",
          // fontWeight: "700",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <p className="fontsize">Ավազաններ</p>

        <PoolContext.Provider value={{ data, setData, addNewPool }}>
          <AddPool />
        </PoolContext.Provider>
      </div>
      <PoolContext.Provider
        value={{
          data,
          setData,
          addNewPool,
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
