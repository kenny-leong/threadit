import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import NavBar from "./components/NavBar";
import FeedSideBar from "./components/FeedSideBar";
import TrendBar from "./components/TrendBar";
import PostFeed from "./components/PostFeed";
import CommunitySection from "./components/CommunitySection";
import OwnedSR from "./components/OwnedSR";
import SubredditDetails from "./components/SubredditDetails";


function App() {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user)


  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
    {(!sessionUser) && (
      <Switch>
        <Route exact path="/">
          <NavBar />
          <FeedSideBar />
          <TrendBar />
          <PostFeed />
          <CommunitySection />
        </Route>
        <Route path='/subreddits/:subredditId'>
          <NavBar />
          <FeedSideBar />
          <SubredditDetails />
        </Route>
      </Switch>
    )}
      {isLoaded && sessionUser && (
        <>
          <Switch>
            <Route path='/home'>
              <NavBar />
              <FeedSideBar />
              <TrendBar />
              <PostFeed />
              <CommunitySection />
            </Route>
            <Route path='/owned-subreddits'>
              <NavBar />
              <FeedSideBar />
              <OwnedSR />
            </Route>
            <Route path='/my-communities'>
              <NavBar />
              <FeedSideBar />
            </Route>
            <Route path='/subreddits/:subredditId'>
              <NavBar />
              <FeedSideBar />
              <SubredditDetails />
            </Route>
          </Switch>
        </>
      )}
    </>
  );
}

export default App;
