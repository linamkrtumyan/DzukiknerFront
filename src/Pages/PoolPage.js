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

  const addNewPool = (pool) => {
    data.push(pool);
    setData([...data]);
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

      <Cards data={data} />
      {/* <Cards /> */}
    </div>
  );
}

export default PoolPage;
