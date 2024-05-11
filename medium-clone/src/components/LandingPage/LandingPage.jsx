import React from "react"
import Banner from "./Banner"
import Header from "./Header"
import { useState } from "react"
import Signup from "../Signup_login/Signup"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react"
function LandingPage(){

const navigate = useNavigate();
useEffect(() => {
    const token = localStorage.getItem('JWT');
    if (token) {
        navigate("/feedpage");
    }
    }, []);

const [show,setShow]=useState(false)
    function togglePopup(){
        console.log("hello ther")
        setShow(!show)
    }

return (
    <div className="">
    <Header togglePopup={togglePopup}></Header>
    <Banner></Banner>
    {show && <Signup togglePopup={togglePopup}></Signup>}
    
    </div>

)

}
export default LandingPage