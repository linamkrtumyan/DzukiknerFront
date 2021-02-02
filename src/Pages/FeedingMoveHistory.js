import React, { useState } from "react";
import { Button, Tab, Tabs } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function FeedingMoveHistory() {
  const [key, setKey] = useState("feeding-move-history");
  const history = useHistory();

  function handleClick() {
    history.goBack();
  }
  return (
    <>
      <div className="container" style={{ paddingTop: "100px" }}>
        <Button onClick={handleClick}>
          {" "}
          <img
            className="partner_icon"
            src={require("../img/arrow-left.svg").default}
          />
        </Button>

        <Tabs
          style={{ paddingTop: "20px" }}
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="feeding-move-history" title="Կերակրման պատմություն">
            {/* <Sonnet /> */}
          </Tab>
          <Tab eventKey="profile" title="Տեղափոխության պատմություն">
            {/* <Sonnet /> */}
          </Tab>
        </Tabs>
      </div>
    </>
  );
}

export default FeedingMoveHistory;
