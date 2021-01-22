import "./App.css";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import NavbarPage from "./Navbar/Navbar";
import Routes from "./Routes/Routes";
import { fetchUser } from "./redux";

document.body.style = "background:  #f8f9fa;";
export const DzukContext = React.createContext();

function App({ token, ready, fetchUser, loading }) {
  console.log(token + " token, " + ready + " ready, " + loading + " loading ");

  useEffect(() => {
    fetchUser();
  }, []);

  if (!loading && !ready && !token) {
    return <p>Loading...</p>;
  } else {
    return (
      <div className="background">
        <DzukContext.Provider>
          {/* <NavbarPage /> */}
          <Routes isLoggedIn={token} />
        </DzukContext.Provider>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ready: state.ready,
    token: state.token,
    loading: state.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
