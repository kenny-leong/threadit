import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { authenticate } from "./store/session";
import NavBar from "./components/NavBar";
import FeedSideBar from "./components/FeedSideBar";
import TrendBar from "./components/TrendBar";
import PostFeed from "./components/PostFeed";
import CommunitySection from "./components/CommunitySection";
import OwnedSR from "./components/OwnedSR";
import SubredditDetails from "./components/SubredditDetails";
import MySubreddits from "./components/MySubreddits";
import PopularFeed from "./components/PostFeed/PopularFeed";
import JoinSideBar from "./components/FeedSideBar/SideBarJoin";
import PostDetails from "./components/PostDetails";
import ProjectInfo from "./components/ProjectInfo";
import NotFound from "./components/NotFound";

function App() {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user)


  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <>
          {sessionUser ? (
            <Switch>
              <Route path="/" exact>
                <NavBar />
                <FeedSideBar />
                <TrendBar />
                <PostFeed />
                <CommunitySection />
              </Route>
              <Route path="/home" exact>
                <NavBar />
                <FeedSideBar />
                <TrendBar />
                <PostFeed />
                <CommunitySection />
              </Route>
              <Route path="/popular" exact>
                <NavBar />
                <FeedSideBar />
                <TrendBar />
                <PopularFeed />
                <CommunitySection />
              </Route>
              <Route path="/owned-subreddits" exact>
                <NavBar />
                <FeedSideBar />
                <OwnedSR />
              </Route>
              <Route path="/my-communities" exact>
                <NavBar />
                <FeedSideBar />
                <MySubreddits />
              </Route>
              <Route exact path="/subreddits/:subredditId">
                <NavBar />
                <FeedSideBar />
                <SubredditDetails />
              </Route>
              <Route exact path="/subreddits/:subredditId/posts/:postId">
                <NavBar />
                <FeedSideBar />
                <PostDetails />
              </Route>
              <Route exact path="/project-info">
                <NavBar />
                <FeedSideBar />
                <ProjectInfo />
              </Route>
              <Route path="*">
                <NavBar />
                <FeedSideBar />
                <NotFound />
              </Route>
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/">
                <NavBar />
                <JoinSideBar />
                <FeedSideBar />
                <TrendBar />
                <PostFeed />
                <CommunitySection />
              </Route>
              <Route exact path="/popular">
                <NavBar />
                <JoinSideBar />
                <FeedSideBar />
                <TrendBar />
                <PopularFeed />
                <CommunitySection />
              </Route>
              <Route exact path="/subreddits/:subredditId">
                <NavBar />
                <JoinSideBar />
                <FeedSideBar />
                <SubredditDetails />
              </Route>
              <Route exact path="/subreddits/:subredditId/posts/:postId">
                <NavBar />
                <FeedSideBar />
                <PostDetails />
                <JoinSideBar />
              </Route>
              <Route exact path="/project-info">
                <NavBar />
                <FeedSideBar />
                <ProjectInfo />
                <JoinSideBar />
              </Route>
              <Route path="*">
                <NavBar />
                <FeedSideBar />
                <NotFound />
                <JoinSideBar />
              </Route>
            </Switch>
          )}
        </>
      )}
    </>
  );
}

export default App;
