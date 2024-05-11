import React, { useEffect } from "react";
import { useState } from "react";
import { fetchData } from "../APIcalls/Fetchmyposts";
import PostCard from "../Cards/Postcard";
import UserDetails from "./UserDetails";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [postsinfo, setpostinfo] = useState();
  const [check, setCheck] = useState(false);
  let { userId } = useParams();
  const navigate = useNavigate();
  function isSaved() {
    setCheck(!check);
  }
  useEffect(() => {
    async function fetchposts() {
      try {
        const posts = await fetchData(userId);
        if(posts.status===400)
          navigate("error")
        setpostinfo(posts);
      } catch (error) {
        navigate("error")
      }
    }
    fetchposts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("JWT");
    
    navigate("/")
  };

  return (
    <>
      <UserDetails Info={postsinfo} show={userId} className="w-4/12"></UserDetails>

      <div className="flex flex-col md:flex-row  gap-20 md:px-20">
        <div className="flex flex-col w-full sm:w-1/2">
          <header className="flex flex-row gap-3 my-3 sticky top-12  w-full h-7 rounded-lg px-2">
            <p className="text-sky-500">All Posts</p>
            {userId === undefined && (
              <Link to="/feedpage/savedposts">
                <p>SavedPosts</p>
              </Link>
            )}
          </header>
          {postsinfo &&
            postsinfo.posts.map((post, index) => (
              <PostCard
                className=""
                key={index}
                isSaved={isSaved}
                check={check}
                postsinfo={post}
              />
            ))}
        </div>

        {/* <UserDetails Info={postsinfo} className=" w-4/12"></UserDetails> */}

       {userId === undefined &&  <button onClick={handleLogout} className="fixed right-2 bottom-3 bg-red-600 p-2 rounded-2xl">
          logout
        </button>} 
      </div>
    </>
  );
}

export default Profile;
