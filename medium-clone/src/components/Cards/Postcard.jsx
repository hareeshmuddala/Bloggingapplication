import React, { useEffect } from "react";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import { months } from "../../constants";
import { useNavigate } from "react-router-dom";

function PostCard({ postsinfo }) {

console.log(postsinfo)
const navigate=useNavigate()

  function dateparsing(dateString) {
    const dateObject = new Date(dateString);
    const month = months[dateObject.getMonth()];
    const day = dateObject.getDate();
    const year = dateObject.getFullYear().toString();
    const formattedDate = `${month} ${day},${year}`;
    return formattedDate;
  }

  
   
  return (
    <div onClick={()=>navigate(`/feedpage/posts/${postsinfo.post_id}`)} className="flex flex-col w-full shadow-xl rounded-xl my-4 ">
      <div className="flex flex-row m-5 justify-between">
        <div>
          <div className="flex flex-row justify-start items-center">
            <img
              className="w-5 h-5 rounded-3xl"
              src={postsinfo?.user_id?.user_image}
            />
            <span className="mx-3">
              {postsinfo.user_id.username}.
              <span className="text-base text-slate-500 my-5 text-xs">
                {dateparsing(postsinfo.date_created)}
              </span>
            </span>
          </div>
          <p className=" text-sm sm:text-xl font-extrabold line-clamp-2 py-1">
            {postsinfo.title}
          </p>
          <p className="text-base text-slate-500 hidden sm:block">
            {postsinfo.subtitle}
          </p>
        </div>
        <div>
          <img
            className=" w-[100px] h-[100px] sm:w-[200px] sm:h-[160px]"
            src={postsinfo.post_image}
          />
        </div>
      </div>

      <div className="flex flex-row justify-between m-5 border-b-2 py-2  shadow-sm">
        <div className="">
        <FavoriteBorderOutlinedIcon className="m-2 text-gray-500"/>
        <ModeCommentOutlinedIcon className="m-2 text-gray-500"/>
        <PaidOutlinedIcon className="m-2 text-gray-500"></PaidOutlinedIcon>      
        </div>
        <BookmarkBorderIcon  className="text-gray-500"/>
      </div>
    </div>
  );
}

export default PostCard;
