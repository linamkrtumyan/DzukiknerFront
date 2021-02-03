import React, { useEffect, useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import GetPartners from "../Components/Partner/GetPartners";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AddPartner from "../Components/Partner/AddPartner";

export const DzukContext = React.createContext();
function Partners() {
  let history = useHistory();
  const [data, setData] = useState([]);

  const addDzuk = (dzuk) => {
    data.push(dzuk);
    setData([...data]);
  };
  const updatePartner = (partner) => {
    data.map((id1) => {
      if (id1.id == partner.id) {
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

        setData([...data]);
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/info/partner/getPartners");

      setData(result.data.allPartners);
    };

    fetchData();
  }, []);
  return (
    <div className="container" style={{ paddingTop: "130px" }}>
      <ul
        // style={{ padding: "0px 43px" }}
        className="nav nav-tabs "
        id="myTab"
        role="tablist"
      >
        <li className="nav-item cursor">
          <a
            className="nav-link active "
            id="home-tab"
            data-toggle="tab"
            role="tab"
            aria-controls="home"
            aria-selected="true"
          >
            Գործընկերներ
          </a>
        </li>
        <li
          className="nav-item cursor"
          onClick={() =>
            history.push("/information/fishes", { from: "Information" })
          }
        >
          <a
            className="nav-link "
            id="profile-tab"
            data-toggle="tab"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            Ձկան տեսակ
          </a>
        </li>
        <li
          className="nav-item cursor"
          onClick={() =>
            history.push("/information/foods", { from: "Information" })
          }
        >
          <a
            className="nav-link"
            id="contact-tab"
            data-toggle="tab"
            role="tab"
            aria-controls="contact"
            aria-selected="false"
          >
            Կերի տեսակ
          </a>
        </li>
      </ul>

      <div
        className="container"
        style={{
          // marginTop: "30px",
          padding: "0px 30px 30px 30px",
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
    </div>
  );
}

export default Partners;
