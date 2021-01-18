import "./App.css";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header/Header";
import { Route, Redirect } from "react-router-dom";
import Login from "./Pages/Login";
import Routes from "./Routes/Routes";
import { connect } from "react-redux";
import axios from "axios";
import NavbarPage from "./Navbar/Navbar";
document.body.style = "background:  #f1f1f1;";

function App({ isLoggedIn }) {
  const [data, setData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/user/token");
      // console.log(result);
      setData(result.data.success);
    };

    fetchData();
  }, []);

  // console.log(data);
  // console.log(isLoggedIn);
  // if(isLoggedIn) {

  // if(window.location == '/' || window.location == '/login') {
  // axios.get(`/user/logout`).then(res => {
  // console.log(res.data.success);
  // if (res.data.success) {
  // console.log('Success is true!');

  // } else {
  // console.log(res.data);

  // }
  // console.log(res);
  // })
  // .catch (err => {
  // console.log(err)
  // } );
  // }

  // if(window.location == '/login') {

  // }

  if (data) {
    return (
      <>
        <NavbarPage />
        <Routes />
      </>
    );
  } else {
    return (
      <>
        {/* <Header /> */}
        <Route path="/login" component={Login} />
        <Redirect to="./login" />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
  };
};

export default connect(mapStateToProps)(App);
