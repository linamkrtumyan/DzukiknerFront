import React, { useEffect, useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import GetFitFishes from "../Components/FitFishes/GetFitFishes";
import Pagination from "../Components/MoveFeedingReport/Pagination";

export const DzukContext = React.createContext();
function FitFish() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [postsCount, setPostsCount] = useState(0);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  let history = useHistory();
  const [fitFishes, setFitFishes] = useState([]);

  useEffect(() => {
    axios
      .post(`/info/fish/usefulFishes`, {
        currentPage,
      })

      .then((response) => {
        setFitFishes(response.data.usefulFishes);
        setPostsCount(response.data.count);
        if (response.data.success) {
        } else {
          // toast.(response.data.errorMessage);
        }
      })
      .catch((e) => {
        // toast.error("Կատարված չէ");
      });
  }, [currentPage]);
  return (
    <div className="container" style={{ paddingTop: "130px" }}>
      <ul
        // style={{ padding: "0px 43px" }}
        className="nav nav-tabs "
        id="myTab"
        role="tablist"
      >
        <li
          className="nav-item cursor"
          onClick={() =>
            history.push("/information/partners", { from: "Information" })
          }
        >
          <a
            className="nav-link "
            id="home-tab"
            data-toggle="tab"
            // href="#home"
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
            history.push("/information/partners/fishes", {
              from: "Information",
            })
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
        <li
          className="nav-item cursor"
          onClick={() =>
            history.push("/information/partners/fitFish", {
              from: "Information",
            })
          }
        >
          <a
            className="nav-link active"
            id="contact-tab"
            data-toggle="tab"
            role="tab"
            aria-controls="contact"
            aria-selected="false"
          >
            Պիտանի
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
            padding: "50px 0px",
          }}
        >
          <GetFitFishes data={fitFishes} />
        </div>

        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={postsCount}
          paginate={paginate}
          currentPage={currentPage}
        />

        {/* <DzukContext.Provider
          value={{ data, setData, updatePartner, deletePartner }}
        >
          <GetPartners data={data} />
        </DzukContext.Provider> */}
      </div>
    </div>
  );
}

export default FitFish;
