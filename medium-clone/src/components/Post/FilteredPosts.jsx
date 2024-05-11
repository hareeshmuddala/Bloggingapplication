import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FILTERPOST } from "../../constants";
import PostCard from "../Cards/Postcard";

function FilteredPosts() {
  const [filteredPosts, setFilteredPosts] = useState(null);
  const { filter } = useParams();

  useEffect(() => {
    async function filterPosts() {
      const res = await fetch(FILTERPOST + `${filter}`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('JWT')}`,
        },

    });;
      const result = await res.json();
      console.log("Filtered posts are ", result);
      setFilteredPosts(result);
    }
    filterPosts();
  }, [filter]); 



  return (
    <>
      <p>Results For {filter.toUpperCase()} are :</p>
      <div className="sm:grid sm:grid-cols-2 sm:gap-4">
      {filteredPosts &&
            filteredPosts?.posts?.map((post, index) => (
              <PostCard
                className=""
                key={index}
                postsinfo={post}
              />
            ))}
        </div>
    </>
  );
}

export default FilteredPosts;
