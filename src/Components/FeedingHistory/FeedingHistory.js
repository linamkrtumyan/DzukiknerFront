import React, { useState } from "react";
import { Button, Tab, Tabs } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function FeedingHistory() {
  const [key, setKey] = useState("feeding-history");
  //   const history = useHistory();

  //   function handleClick() {
  //     history.goBack();
  //   }

  return (
    <>
      <div className="container" style={{ paddingTop: "100px" }}>
        Feeding History
      </div>
    </>
  );
}

export default FeedingHistory;
