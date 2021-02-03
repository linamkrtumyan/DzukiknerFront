import React, { useState, useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Feeding from "../Components/Feeding/Feeding";
import Losses from "../Components/Losses/Losses";
import axios from "axios";

function FeedingAndLosses() {
  const [data, setData] = useState([]);
  const [foods, setFoods] = useState([]);
  const [coefficient, setCoefficient] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/pools/getPools");

      const foodresult = await axios("/info/food/getFoods");

      setData(result.data.allPools);
      setFoods(foodresult.data.allFoods);
    };

    fetchData();
  }, []);

  return (
    <div className="container" style={{ padding: "80px 0px" }}>
      <Tabs
        style={{ paddingTop: "50px " }}
        defaultactivekey="partners"
        id="uncontrolled-tab-example"
      >
        <Tab eventKey="partners" title="Կերակրում">
          <Feeding data={data} foods={foods} coefficient={coefficient} />
        </Tab>
        <Tab eventKey="fishes" title="Կորուստ">
          <Losses data={data} />
        </Tab>
      </Tabs>
    </div>
  );
}

export default FeedingAndLosses;
