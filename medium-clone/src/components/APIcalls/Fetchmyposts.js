import { useEffect, useState } from "react"
import { MYPOSTS } from "../../constants";

export async function fetchData(userId) {
    const token = localStorage.getItem("JWT");
    let url = MYPOSTS; 

    if (userId) {
        url = `${url}${userId}/`; 
    }

    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    
    const response = await res.json();
    return response;
}
