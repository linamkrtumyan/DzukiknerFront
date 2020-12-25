import logo from "./logo.svg";
import "./App.css";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PoolCard from "./Components/Pool/PoolCard";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import PoolPage from "./Pages/PoolPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
      <Sidebar />
      {/* <Switch> */}
      {/* <Route path="/pools" component={PoolCard} exact /> */}
      {/* <Route path="/pools" component={PoolPage} exact /> */}
      <PoolPage />
      {/* <Route path="/about" component={About} /> */}
      {/* <Route path="/shop" component={Shop} /> */}
      {/* </Switch> */}
      {/* <PoolCard /> */}
    </div>
  );
}

export default App;
