import React from "react";

import PoolCard from "./PoolCard";

function Cards({ data }) {
  //   console.log({ data }, "cards");
  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", marginLeft: "160px" }}>
        {data.map((data1) => (
          <PoolCard key={data1.id} data1={data1} data={data} />
        ))}
      </div>

      {/* <PoolCard data={data} /> */}
    </>
  );
}

export default Cards;
