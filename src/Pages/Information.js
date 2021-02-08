import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Fishes from "./Fishes";
import Partners from "./Partners";
import Foods from "./Foods";
function Information() {
  let history = useHistory();
  function handleClick() {
    history.push("/information/fishes");
  }
  return (
    <div className="container" style={{ padding: "130px 0px" }}>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li
          className="nav-item"
          // onClick={() =>
          //   history.push("/information/partners", { from: "Information" })
          // }
        >
          <a
            className="nav-link active"
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
          className="nav-item"
          onClick={() =>
            history.push("/information/partners/fishes", {
              from: "Information",
            })
          }
        >
          <a
            className="nav-link"
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
          className="nav-item"
          onClick={() =>
            history.push("/information/partners/foods", { from: "Information" })
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
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          homeeee
        </div>
        <div
          className="tab-pane fade"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          ...
        </div>
        <div
          className="tab-pane fade"
          id="contact"
          role="tabpanel"
          aria-labelledby="contact-tab"
        >
          aaaaaaaaaaa
        </div>
      </div>

      {/* <Tabs
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
          <div onClick={() => history.push("/about", { from: "Information" })}>
            sxmi
          </div>
          <Fishes />
        </Tab>

        <Tab eventKey="foods" title="Կերի տեսակ">
          <Foods />
        </Tab>
      </Tabs> */}
    </div>
  );
}

export default Information;
