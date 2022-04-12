import { useEffect, useState } from "react";
import "./App.css";
import {
  Redirect,
  Route,
  Switch,
  useLocation,
  withRouter,
} from "react-router-dom";
import Register from "./components/Register/Register";
import Main from "./components/Main/Main";
import Alert from "./components/Alerts/Alert";
const App = () => {
  const location = useLocation();
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [display, setDisplay] = useState(false);
  const showAlert = (message, type) => {
    setMessage(message);
    setType(type);
    setDisplay(true);
    setTimeout(() => {
      setDisplay(false);
    }, 3000);
  };
  useEffect(() => {
    return () => {
      sessionStorage.clear();
    };
  });
  return (
    <div className="App d-flex container-fluid p-md-5 p-2">
      {display ? <Alert message={message} type={type} /> : null}
      <Switch>
        <Route exact path="/register">
          <Register showAlert={showAlert} />
        </Route>
        <Route exact path="/main">
          <Main showAlert={showAlert} />
        </Route>
        <Route path="*">
          <Redirect exact to="/register" />
        </Route>
      </Switch>
      {location.pathname === "/register" ? (
        <div className="bg-forms w-50 h-100"></div>
      ) : null}
    </div>
  );
};

export default withRouter(App);
