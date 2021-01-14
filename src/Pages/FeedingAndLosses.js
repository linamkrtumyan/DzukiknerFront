import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import Feeding from "../Components/Feeding/Feeding";
import Losses from "../Components/Losses/Losses";

function FeedingAndLosses() {
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
          <Feeding />
        </Tab>
        <Tab eventKey="fishes" title="Կորուստ">
          <Losses />
        </Tab>
      </Tabs>
    </div>
  );
}

export default FeedingAndLosses;
