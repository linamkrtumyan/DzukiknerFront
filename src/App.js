import "./App.css";
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";

import Routes from "./Routes/Routes";
import { fetchUser } from "./redux";

document.body.style = "background:  #f8f9fa;";
export const DzukContext = React.createContext();

function App({ token, ready, fetchUser, loading }) {
  useEffect(() => {
    fetchUser();
  }, []);

  if (!loading && !ready && !token) {
    return <p>Loading...</p>;
  } else {
    return (
      <div className="background">
        <Routes isLoggedIn={token} />
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
