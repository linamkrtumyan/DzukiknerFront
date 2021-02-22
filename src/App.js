import "./App.css";
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routes from "./Routes/Routes";
import { fetchUser } from "./redux";

document.body.style = "background:  #f8f9fa;";
export const DzukContext = React.createContext();

function App({ token, ready, fetchUser, loading }) {
  // console.log = console.warn = console.error = () => {};
  // console.error("Something bad happened.");

  useEffect(() => {
    fetchUser();
  }, []);

  if (!loading && !ready && !token) {
    return <p>Loading...</p>;
  } else {
    return (
      <div className="background">
        <Routes isLoggedIn={token} />
        <ToastContainer style={{ zIndex: 10000000000 }} autoClose={4000} />
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
