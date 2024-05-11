import { GETCOMMENTS } from "../../constants";

export async function fetchcomments(postid) {
    const token = localStorage.getItem("JWT");
    
    const res = await fetch(GETCOMMENTS + postid, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const response = await res.json();
    
    return response;
}
