import React, { useEffect, useState } from "react";
import { fetchAllPosts } from "../APIcalls/FetchAllposts";
import PostCard from "../Cards/Postcard";

function Feeds() {
  const [postInfo, setPostInfo] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setLoading(true);

    async function fetchPosts() {
      console.log("running api call bro^^^^^^^^^^^^^^^^^^^");
      const res = await fetchAllPosts(page);
      setLoading(false);
      if (res.posts.length === 0) {
        setHasMore(false);
      } else {
        setPostInfo((prevPostInfo) => [...prevPostInfo, ...res.posts]);
      }
    }

    fetchPosts();
  }, [page]);

  const loadMore = () => {
    setPage(page + 1);
  };

  return (
    <>
    <div className="flex flex-col  px-2">
      <div className="sm:grid sm:grid-cols-3 sm:gap-4">
        {postInfo.map((post, index) => (
          <PostCard key={index} postsinfo={post} />
        ))}
      </div>
      
    </div>
    <div className="flex flex-col items-center px-2">
    {!loading && hasMore && (
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl w-fit"
          onClick={loadMore}
        >
          Load More...  
        </button>
      )}
      {loading && <div>Loading...</div>}
      {!hasMore && <div>No more posts to load</div>}
      </div>
    </>
  );
}

export default Feeds;
