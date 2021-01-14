import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import Fishes from "./Fishes";
import Partners from "./Partners";
import Foods from "./Foods";
function Information() {
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
          title="Գործընկերներ"
          //   defaultactivekey
        >
          <Partners />
        </Tab>
        <Tab eventKey="fishes" title="Ձկան տեսակ">
          <Fishes />
        </Tab>
        <Tab eventKey="foods" title="Կերի տեսակ">
          <Foods />
        </Tab>
      </Tabs>
    </div>
  );
}

export default Information;
