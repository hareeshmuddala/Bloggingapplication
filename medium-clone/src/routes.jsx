import { Navigate, useLoaderData } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import NavBar from "./components/FeedPage/NavBar";
import CreatePost from "./components/Post/CreatePost";
import FeedPage from "./components/FeedPage/FeedPage";
import Profile from "./components/UserProfile/Profile";
import FullPost from "./components/Cards/FullPost";
import Feeds from "./components/FeedPage/Feeds";
import FilteredPosts from "./components/Post/FilteredPosts";
import SavedPosts from "./components/UserProfile/Saved_UserPosts";
import Error from "./components/Error";

const routes = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/feedpage",
    element: <FeedPage />,
   

    children: [
      {
        path: "",
        element: <Feeds />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "savedposts",
        element: <SavedPosts />,
      },
      {
        path: "profile/:userId",
        element: <Profile />,
      },
      {
        path: "posts/:postId",
        element: <FullPost />,
      },
      {
        path: ":filter",
        element: <FilteredPosts />,
      },
      
      
    ],
    
  },
  
  {
    path: "createpost",
    element: <CreatePost />,
  },
  {
    path: "error",
    element: <Error />,
  },
  {
    path: "*",
    element: <Error />,
  },
  
 
  
];

export default routes;
