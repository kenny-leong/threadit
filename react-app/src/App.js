import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import { authenticate } from "./store/session";
import NavBar from "./components/NavBar";
import FeedSideBar from "./components/FeedSideBar";
import TrendBar from "./components/TrendBar";
import PostFeed from "./components/PostFeed";
import CommunitySection from "./components/CommunitySection";


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
          <FeedSideBar />
          <TrendBar />
          <PostFeed />
          <CommunitySection />
        </Route>
      </Switch>
      {isLoaded && (
        <>
          <Switch>
            <Route path='/home'>
              <NavBar />
              <FeedSideBar />
              <TrendBar />
              <PostFeed />
              <CommunitySection />
            </Route>
          </Switch>
        </>
      )}
    </>
  );
}

export default App;
