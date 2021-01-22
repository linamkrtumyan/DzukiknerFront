import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
// import Cookies from 'js-cookie';
// import auth from '../../Auth/Auth'

import { connect } from "react-redux";
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
          // logout(false);
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

// const mapDispatchToProps = (dispatch) => {
//   return {
//     logout: () => dispatch(logout()),
//   };
// };

export default connect(mapStateToProps, null)(Logout);
