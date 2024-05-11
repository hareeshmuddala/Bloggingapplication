
import { GETSAVEDPOSTS } from "../../constants";

export async function fetchSavedData() {
    const token = localStorage.getItem("JWT");
    
    
    const res = await fetch(GETSAVEDPOSTS, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const response = await res.json();
    return response;
}
