import "./App.css";
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header/Header";
import { Route, Redirect } from "react-router-dom";
import Login from "./Pages/Login";
import Routes from "./Routes/Routes";
import { connect } from "react-redux";
import Navbar from "./Navbar/Navbar";

document.body.style = "background:  #f1f1f1;";

function App({ isLoggedIn }) {
  // useEffect(() => {
  //   tokenVerify();
  // }, []);

  const tokenVerify = () => {
    //if(window.location == '/login') {
    // if (token exist) {
    //delete token from cookie
    // }
    //} else {
    //}
  };
  // if (isLoggedIn)
  // if (isLoggedIn) {
  return (
    <>
      <Navbar />
      <Routes />
    </>
  );
  // } else {
  //   return (
  //     <>

  //       <Route path="/login" component={Login} />
  //     </>
  //   );
  // }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
  };
};

export default connect(mapStateToProps)(App);
