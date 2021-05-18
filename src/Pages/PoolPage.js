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
  // const [changeData, setChangeData] = useState([]);

  const addNewPool = (pool) => {
    data.push(pool);
    setData([...data]);
  };

  const deletePool = (pool) => {
    data.map((id1) => {
      if (id1.id == pool) {
        const index = data.indexOf(id1);
        data.splice(index, 1);
        setData([...data]);
      }
    });
  };
  const updatePool = (pool) => {
    data.map((id1) => {
      if (id1.id == pool.id) {
        id1.name = pool.name;
        id1.fishType = pool.fishType;
        setData([...data]);
      }
    });
  };

  const inPool = (pool) => {
    data.map((id1) => {
      if (id1.id == pool.id) {
        id1.fishQuantity = parseInt(id1.fishQuantity) + parseInt(pool.quantity);
        id1.fishWeight = parseInt(id1.fishWeight) + parseInt(pool.weight);
        id1.fishAvgWeight =
          parseInt(pool.allWeight * 1000) / parseInt(pool.allQuantity);
        setData([...data]);
      }
    });
  };
  const correction = (pool) => {
    data.map((id1) => {
      if (id1.id == pool.id) {
        id1.fishQuantity -= pool.quantity;
        id1.fishWeight -= pool.weight;
        id1.fishAvgWeight =
          (parseFloat(id1.fishWeight) * 1000) / parseFloat(id1.fishQuantity);
        // id1.fishType = "";
        setData([...data]);
      }
    });
  };
  const salePool = (pool) => {
    data.map((id1) => {
      if (id1.id == pool.id) {
        id1.fishQuantity = parseInt(id1.fishQuantity) - parseInt(pool.quantity);
        id1.fishWeight = parseInt(id1.fishWeight) - parseInt(pool.weight);
        id1.fishAvgWeight =
          parseInt(pool.allWeight) / parseInt(pool.allQuantity);
        // if (id1.fishQuantity > 0 || id1.fishWeight > 0) {
        //   setData([...data]);
        // } else {
        // }
        setData([...data]);
      }
    });
  };
  const movePool = (pool) => {
    data.map((id1) => {
      if (id1.id == pool.fromPoolid) {
        id1.fishQuantity = parseInt(id1.fishQuantity) - parseInt(pool.quantity);
        id1.fishWeight = parseInt(id1.fishWeight) - parseInt(pool.weight);
        id1.fishAvgWeight = id1.fishWeight / id1.fishQuantity;
        setData([...data]);
      }
    });
    data.map((id1) => {
      if (id1.id == pool.toPoolid) {
        id1.fishQuantity = parseInt(id1.fishQuantity) + parseInt(pool.quantity);
        id1.fishWeight = parseInt(id1.fishWeight) + parseInt(pool.weight);
        id1.fishAvgWeight = id1.fishWeight / id1.fishQuantity;
        setData([...data]);
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/pools/getPoolsAndDetails");
      const fishDatares = await axios("/info/fish/getFishes");
      setFishData(fishDatares.data.allFishes);

      setData(result.data.allPools);
    };

    fetchData();
  }, []);

  return (
    <div className="container " style={{ padding: "80px 0px" }}>
      <div
        style={{
          padding: "10px 0px",

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
          correction,
        }}
      >
        <Cards fishData={fishData} data={data} />
      </PoolContext.Provider>
    </div>
  );
}

export default PoolPage;
