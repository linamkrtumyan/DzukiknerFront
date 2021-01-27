import React from "react";

import PoolCard from "./PoolCard";

function Cards({ data }) {
  console.log({ data }, "cards");
  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {data.map((data1, index) => (
          <PoolCard key={data1.id} data1={data1} data={data} />
        ))}
      </div>

      {/* <PoolCard data={data} /> */}
    </>
  );
}

export default Cards;
