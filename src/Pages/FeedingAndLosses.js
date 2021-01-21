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
    console.log("object");
    const fetchData = async () => {
      console.log("object2");
      const result = await axios("/pools/getPools");
      console.log("object3");
      const foodresult = await axios("/info/food/getFoods");
      // const coefresult = await axios("/info/food/getCoefficient");
      console.log(foodresult, "foodresult");
      console.log(result.data.allPools, "result");
      // console.log(result, "result");

      // setCoefficient(coefresult.data.allCoef);
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
          <Losses data={data} />
        </Tab>
      </Tabs>
    </div>
  );
}

export default FeedingAndLosses;
