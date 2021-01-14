import React, { useEffect, useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import GetPartners from "../Components/Partner/GetPartners";
import axios from "axios";
import AddPartner from "../Components/Partner/AddPartner";

export const DzukContext = React.createContext();
function Partners() {
  const [data, setData] = useState([]);
  // console.log(data);
  const addDzuk = (dzuk) => {
    data.push(dzuk);
    setData([...data]);
  };
  const updatePartner = (partner) => {
    data.map((id1) => {
      if (id1.id == partner.id) {
        console.log("updatePartner");
        id1.name = partner.name;
        id1.description = partner.description;
        id1.phone = partner.phone;
        setData([...data]);
      }
    });
  };

  const deletePartner = (partner) => {
    data.map((id1) => {
      if (id1.id == partner) {
        const index = data.indexOf(id1);
        data.splice(index, 1);
        console.log(id1);
        setData([...data]);
      }
    });
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
    <div
      className="container"
      style={{
        // marginTop: "30px",
        padding: "30px",
        backgroundColor: "white",
        // , marginLeft: "160px"
      }}
    >
      <div
        style={{
          padding: "10px 0px",
          fontSize: "25px",
          fontWeight: "700",
          display: "flex",
          justifyContent: "space-between",
          float: "right",
        }}
      >
        <DzukContext.Provider value={{ data, setData, addDzuk }}>
          <AddPartner />
        </DzukContext.Provider>
      </div>
      <DzukContext.Provider
        value={{ data, setData, updatePartner, deletePartner }}
      >
        <GetPartners data={data} />
      </DzukContext.Provider>
    </div>
  );
}

export default Partners;
