import React, { useEffect } from "react";
import { useState } from "react";
import { fetchData } from "../APIcalls/Fetchmyposts";
import PostCard from "../Cards/Postcard";
function UserPosts() {
const [postsinfo, setpostinfo] = useState();
useEffect(() => {
    async function fetchposts() {
      try {
        const posts = await fetchData();
        setpostinfo(posts);
        console.log("fetched posts are ", postsinfo);
        console.log(typeof postsinfo);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchposts();
  }, []);

  return (
        <>
        {postsinfo &&
            postsinfo.posts.map((post, index) => (
              <PostCard
                className=""
                key={index}
                postsinfo={post}
              />
            ))}
        </>
  )
}

export default UserPosts;
