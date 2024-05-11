import { GETALLPOSTS } from "../../constants"

export async function fetchAllPosts(pagenumber){

    const token = localStorage.getItem("JWT");
    const res=await fetch(GETALLPOSTS+`${pagenumber}`,{
        method:"GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })

    const response=res.json()
    return response
}