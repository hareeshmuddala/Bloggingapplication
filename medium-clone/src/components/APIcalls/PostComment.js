import { POSTCOMMENT } from "../../constants";

export async function postcomment(postid, comment) {
    const token = localStorage.getItem("JWT");
    
    const res = await fetch(POSTCOMMENT, {
        method: "POST",
        body: JSON.stringify({ postid: postid, comment: comment }), // Corrected 'posid' to 'postid'
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const response = await res.json();
    return response;
}
