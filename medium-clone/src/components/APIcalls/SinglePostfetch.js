
import { GETPOST } from "../../constants";
 async  function getPost(post_id){
    console.log("post id is",post_id)
    const token = localStorage.getItem("JWT");
    const res = await fetch(GETPOST + `${post_id}`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
    });
    const response = await res.json();
    console.log("NEW POST API",response)
    return response
  }

  export default getPost