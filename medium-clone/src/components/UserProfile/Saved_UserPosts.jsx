import React, { useEffect } from "react";
import { useState } from "react";
import { fetchSavedData } from "../APIcalls/getSavedPosts";
import PostCard from "../Cards/Postcard";
import UserDetails from "./UserDetails";
import { Link, useParams } from "react-router-dom";
function SavedPosts() {
  const [savedposts, setsavedposts] = useState([]);
  const [check, setCheck] = useState(false);
  let {userId}=useParams()
  function isSaved() {
    setCheck(!check);
  }
  useEffect(() => {
    async function fetchposts() {
      try {
        const posts = await fetchSavedData();
        setsavedposts(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchposts();
  }, []);

  return (
    <>
   
      <UserDetails Info={savedposts} className="w-4/12"></UserDetails>
      <div className="flex flex-col md:flex-row  gap-20 md:px-20">
        <div className="flex flex-col w-full sm:w-1/2">
          <header className="flex flex-row gap-3 my-3 sticky top-12  w-full h-7 rounded-lg px-2">
           <Link to="/feedpage/profile"> <p>All Posts</p></Link>
            {userId === undefined && <p className="text-sky-500">SavedPosts</p>}
          </header>
          {savedposts?.posts?.length >=1 &&
            savedposts.posts.map((post, index) => (
              <PostCard
                className=""
                key={index}
                isSaved={isSaved}
                check={check}
                postsinfo={post.post_id}  
              />
            ))}
        </div>

        {/* <UserDetails Info={savedposts} className=" w-4/12"></UserDetails> */}
      </div>
    </>
  );
}

export default SavedPosts;
