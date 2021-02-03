import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
// import Cookies from 'js-cookie';
// import auth from '../../Auth/Auth'

import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

function Logout({ isLoggedIn }) {
  let history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .get(`/user/logout`)
      .then((res) => {
        if (res.data.success) {
          toast.error(res.data);
          // logout(false);
          // history.push("/login");
          window.location = "/login";
        } else {
          toast.error(res.data);
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  return (
    <div>
      <Button onClick={handleSubmit} variant="secondary" block>
        {"Դուրս գալ"}
      </Button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
  };
};

export default connect(mapStateToProps, null)(Logout);
