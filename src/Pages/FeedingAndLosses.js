import React, { useState, useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Feeding from "../Components/Feeding/Feeding";
import Losses from "../Components/Losses/Losses";
import axios from "axios";

function FeedingAndLosses() {
  const [data, setData] = useState([]);
  const [foods, setFoods] = useState([]);
  const [coefficient, setCoefficient] = useState([]);
  //   console.log(coefficient, "coef from page");
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/pools/getPools");
      const foodresult = await axios("/info/food/getFoods");
      const coefresult = await axios("/info/food/getCoefficient");
      console.log(coefresult, "coefresult");
      console.log(result, "result");
      setCoefficient(coefresult.data.allCoef);
      setData(result.data.allPools);
      setFoods(foodresult.data.allFoods);
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <Tabs
        style={{ paddingTop: "50px " }}
        defaultactivekey="partners"
        // activeKey="partners"

        id="uncontrolled-tab-example"
      >
        <Tab
          //   className="defaultActiveKey"
          eventKey="partners"
          title="Կերակրում"
          //   style={{ borderColor: "red !important" }}
          //   defaultactivekey
        >
          <Feeding data={data} foods={foods} coefficient={coefficient} />
        </Tab>
        <Tab eventKey="fishes" title="Կորուստ">
          <Losses />
        </Tab>
      </Tabs>
    </div>
  );
}

export default FeedingAndLosses;
