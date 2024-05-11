import React, { useState } from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import getPost from "../APIcalls/SinglePostfetch";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GETCOMMENTS, LIKEPOST, SAVEPOST, DELETEPOST } from "../../constants";
import { Link } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import Comments from "./Comments";
import Error from "../Error";
function FullPost() {
  const [post, setpost] = useState(null);
  const { postId } = useParams();
  const [displaycomments, setDisplayComments] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const [savedmessgae, setSavedMessage] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const navigate=useNavigate()
  function handleLike() {
    setpost([
      {
        ...post[0],
        likes: post[0].likes + 1,
      },
    ]);
    const res = fetch(LIKEPOST + `${postId}/`, {
      
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("JWT")}`,
      },
    });
    setIsLiked(true);
    setTimeout(() => {
      setIsLiked(false);
    }, 2000);
  }

  async function saveItem(postId) {
    const token = localStorage.getItem("JWT");
    const res = await fetch(SAVEPOST + `${postId}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await res.json(); // Wait for JSON response
    setResponseMessage(response?.message);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
      setResponseMessage(null); // Reset response message after hiding message
    }, 2000);
  }

  function showComments(postid) {
    setDisplayComments(!displaycomments);
  }

  useEffect(() => {
    async function fetchPost() {
      const response = await getPost(postId);
      
     
      setpost(response.posts);
    }
    fetchPost();
  }, []);

  const deletepost = async (postId) => {
    const token = localStorage.getItem("JWT");
    const res = await fetch(DELETEPOST + `${postId}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const response = await res.json(); // Wait for JSON response
    setResponseMessage(response?.message);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
      setResponseMessage(null); // Reset response message after hiding message
    }, 2000); // Hide message after 2 seconds
  };
  return (
    <div className="flex flex-row justify-center">
      {console.log("this is the new response", post)}
      <div className="flex flex-col px-2 ">
        <header className="flex flex-col sm:max-w-xl">
          <h1 className="text-xl font-serif	 line-clamp-2 font-bold leading-[52px] my-5  sm:text-5xl ">
            {post?.[0]?.title}
          </h1>
          <p className="md:text-xl text-slate-400">{post?.[0]?.subtitle}</p>
        </header>
        <section className="flex flex-col">
          <Link to={`/feedpage/profile/${post?.[0]?.user_id?.id}`}>
            {" "}
            <main className="flex flex-row  items-center m-2 sm:max-w-xl my-4">
              <img
                className="w-10 h-10 rounded-3xl"
                src={post?.[0]?.user_id?.user_image}
              />
              <p className="mx-3">{post?.[0]?.user_id?.username}</p>
            </main>
          </Link>

          <div className="flex flex-row justify-between m-4 border-b-2 py-2">
            <div className="">
              {isLiked ? (
                <FavoriteOutlinedIcon
                  onClick={handleLike}
                  className="m-2 text-red-500 animate-pulse"
                />
              ) : (
                <FavoriteBorderOutlinedIcon
                  onClick={handleLike}
                  className="m-2 text-gray-500"
                />
              )}

              <span>{post?.[0]?.likes}</span>
              <ModeCommentOutlinedIcon
                onClick={() => showComments(post?.[0]?.post_id)}
                className="m-2 text-gray-500"
              />
              <PaidOutlinedIcon className="m-2 text-gray-500"></PaidOutlinedIcon>
            </div>

            <div>
              <DeleteOutlineIcon
                onClick={() => deletepost(post?.[0]?.post_id)}
                className="text-gray-500 mx-3 relative "
              ></DeleteOutlineIcon>

              {showMessage && (
                <p className="bg-gray-600 text-white rounded-xl p-2 absolute ">
                  {responseMessage}
                </p>
              )}
              <BookmarkBorderIcon
                onClick={() => saveItem(post?.[0]?.post_id)}
                className="text-gray-500"
              />
            </div>
          </div>
        </section>
        <article className="flex flex-col m-2 sm:max-w-xl my-4">
        <img
      className="max-w-full sm:max-w-xl"
      src={(post?.[0]?.post_image)} 
      alt="Post Image"
  />

          <span className=""> {post?.[0]?.text}</span>
        </article>
      </div>
      {displaycomments ? (
        <Comments postid={post?.[0]?.post_id} close={showComments}></Comments>
      ) : (
        <></>
      )}
    </div>
  );
}
export default FullPost;
