import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
function FeedPage() {
  return (
    <>
      <NavBar></NavBar>
      <div className="w-Full mx-2">
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default FeedPage;
