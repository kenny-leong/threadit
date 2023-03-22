import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import NavBar from "./components/NavBar";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Switch>
        <Route exact path="/">
          <NavBar />
        </Route>
        <Route exact path ='/login'>
          {/* <LoginPage /> */}
        </Route>
        <Route exact path='/register'>
          {/* <SignupPage /> */}
        </Route>
      </Switch>
    </>
  );
}

export default App;
