import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
// import PoolCard from "../components/PoolCard/PoolCard";
// import AddPool from "../Components/Pool/AddPool";
import Cards from "../Components/Pool/Cards";
import AddPool from "../Components/Pool/AddPool";

const PoolPage = () => {
  const [data, setData] = useState([]);

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
      <div style={{ padding: "10px", fontSize: "25px", fontWeight: "700" }}>
        Ավազաններ
      </div>

      <AddPool />
      <Cards data={data} />
      {/* <Cards /> */}
    </div>
  );
};

export default PoolPage;
