import { useState } from "react"
import { Link } from "react-router-dom"

function Header({togglePopup}) {
    return (
        <div className="flex flex-row bg-yellow-500  h-20 justify-around border-b-[2px] border-black"> 
            
                <img src="https://miro.medium.com/v2/resize:fit:8978/1*s986xIGqhfsN8U--09_AdA.png" className="w-48 object-contain"/>
            <div className="flex flex-row items-center justify-evenly w-[45%]">
                <span className="text-sm hidden md:block">Our story</span>
                <span className="text-sm hidden md:block">Membership</span>
                <span className="text-sm hidden md:block">Write</span>
                <span className="text-sm hidden sm:block">Signin</span>
                <button onClick={togglePopup}  className="text-sm text-white px-5 py-2 rounded-3xl bg-black">Get started</button>
            </div>
        </div>
    )
}

export default Header
