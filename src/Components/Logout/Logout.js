import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
// import Cookies from 'js-cookie';
// import auth from '../../Auth/Auth'

import { connect } from "react-redux";
import { logout } from "../../redux/auth/actions/logout";
import { useHistory } from "react-router-dom";

function Logout({ isLoggedIn }) {
  console.log(isLoggedIn);

  let history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .get(`/user/logout`)
      .then((res) => {
        console.log(res.data.success);
        if (res.data.success) {
          console.log("Success is true!");
          toast.error(res.data);
          logout(false);
          // history.push("/login");
          window.location = "/login";
        } else {
          console.log(res.data);

          toast.error(res.data);
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Button
        style={{
          color: "black",
          margin: "5%",
          boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)",
          background: "red",
        }}
        onClick={handleSubmit}
        size="lg"
        className="bg-gradient-theme-left border-0"
        block
      >
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

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
