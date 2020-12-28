import React, { useEffect, useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import GetPartners from "../Components/Partner/GetPartners";
import axios from "axios";
import AddPartner from "../Components/Partner/AddPartner";

export const DzukContext = React.createContext();
function Partners() {
  const [data, setData] = useState([]);

  const addDzuk = (dzuk) => {
    data.push(dzuk);
    setData([...data]);
  };

  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/info/partner/getPartners");
      console.log(result.data.allPartners);

      setData(result.data.allPartners);
      //   console.log(result.data.allPools);
      // console.log(data, '222');

      // console.log(data.hits);
    };

    fetchData();
    // console.log(data.hits);
  }, []);
  return (
    <div style={{ marginTop: "30px", marginLeft: "160px" }}>
      <div
        style={{
          padding: "10px",
          fontSize: "25px",
          fontWeight: "700",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        Գործընկերներ
        <DzukContext.Provider value={{ data, setData, addDzuk }}>
          <AddPartner />
        </DzukContext.Provider>
      </div>

      <GetPartners data={data} />
    </div>
  );
}

export default Partners;
