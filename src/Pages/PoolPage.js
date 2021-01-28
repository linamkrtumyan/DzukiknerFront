import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
// import PoolCard from "../components/PoolCard/PoolCard";
// import AddPool from "../Components/Pool/AddPool";
import Cards from "../Components/Pool/Cards";
import AddPool from "../Components/Pool/AddPool";
import { toast } from "react-toastify";

export const PoolContext = React.createContext();

toast.configure();

function PoolPage() {
  const [data, setData] = useState([]);
  const [fishData, setFishData] = useState([]);
  console.log(data, "pool page data");
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
        id1.fishType = pool.fishType;
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
        if (id1.fishQuantity > 0 || id1.fishWeight > 0) {
          setData([...data]);
        } else {
          toast.error("aaaaaaaa");
          console.log("aaaaaaaaaaaaaaa");
        }
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
      const fishDatares = await axios("/info/fish/getFishes");
      setFishData(fishDatares.data.allFishes);
      console.log(result, "gpollsdetails");
      setData(result.data.allPools);
    };

    fetchData();
  }, []);

  return (
    <div className="container " style={{ padding: "80px 0px" }}>
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
          <AddPool fishData={fishData} />
        </PoolContext.Provider>
      </div>
      <PoolContext.Provider
        value={{
          data,
          fishData,
          setData,
          addNewPool,
          deletePool,
          updatePool,
          inPool,
          salePool,
          movePool,
        }}
      >
        <Cards fishData={fishData} data={data} />
      </PoolContext.Provider>

      {/* <Cards /> */}
    </div>
  );
}

export default PoolPage;
