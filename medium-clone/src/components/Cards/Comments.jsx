import { useEffect, useState } from "react";
import { postcomment } from "../APIcalls/PostComment";
import { fetchcomments } from "../APIcalls/getComments";
import { Link } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';


function Comments(props) {
  const [value, setValue] = useState("");
  const [height, setHeight] = useState("auto");
  const [comments, setComments] = useState([]);
  console.log("regrading comments", props.postid);
  const handleChange = (event) => {
    setValue(event.target.value);
    setHeight(`${event.target.scrollHeight}px`);
  };

  useEffect(() => {
    async function get() {
      const response = await fetchcomments(props.postid);
      console.log("hey there it is in comments", response);
      setComments(response.comments);
    }

    get();
  }, [props.postid,value]);

  async function Comment() {
    const res = await postcomment(props.postid, value);
    setValue("");
  }

  return (
    <div className="fixed right-2 bg-zinc-50 h-screen w-full md:w-1/4 overflow-y-auto p-2  rounded-sm">
     
      <CloseIcon onClick={()=>props.close()}></CloseIcon>
     
      <div className="h-full">
        <textarea
          value={value}
          onChange={handleChange}
          style={{ height: height }}
          className="resize-none w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter your comment..."
        />
        <button
          onClick={Comment}
          className="bg-emerald-500 rounded-3xl px-4 py-1"
        >
          Respond
        </button>
        
        {comments.length === 0 && <h1 className="m-4">No comments yet..</h1>}
        {comments.map((cmnt, index) => (
    <Link key={index} to={`/feedpage/profile/${cmnt?.user_id?.id}`}>
        <div className="p-2 bg-white m-2 rounded-2xl">
            <div className="flex items-center ">
                <img src={cmnt.user_id?.user_image} className="m-2 w-5 h-5 rounded-3xl"></img>
                <p>{cmnt.user_id.username}</p>
            </div>
            <span className="mx-2">{cmnt.comment}</span>
        </div>
    </Link>
))}

      </div>
    </div>
  );
}

export default Comments;
