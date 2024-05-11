import React from "react";
import CreateIcon from "@mui/icons-material/Create";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { FILTERPOST } from "../../constants";
import FilteredPosts from "../Post/FilteredPosts";
import { Link } from "react-router-dom";
function NavBar() {
  const [searchtext, Setsearchtext] = useState("");
  const navigate = useNavigate();
  function updateText(event) {
    Setsearchtext(event.target.value);
  }

  async function handleKeyPress(event) {
    if (event.key === "Enter") {
      navigate(`${searchtext}`);
    }
  }

  return (
    <>
      <div className="flex flex-row justify-between items-center px-5 py-1 border-b border-zinc-200 sticky top-0 bg-white">
        <div className="flex flex-row items-center">
        <Link to="/feedpage"> <svg
            fill="#000000"
            width="40px"
            height="45px"
            viewBox="0 0 256 256"
            id="Flat"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M136,128c0,37.49512-28.71,68-64,68S8,165.49514,8,128,36.71,60,72,60,136,90.5049,136,128ZM240,64a8.00039,8.00039,0,0,0-8,8V184a8,8,0,0,0,16,0V72A8.00039,8.00039,0,0,0,240,64Zm-56,0c-5.68262,0-16.39941,2.76074-24.32373,21.251C154.72607,96.8008,152,111.98342,152,128s2.72607,31.19922,7.67627,42.749C167.60059,189.23928,178.31738,192,184,192s16.39941-2.76074,24.32373-21.251C213.27393,159.19924,216,144.01662,216,128s-2.72607-31.19922-7.67627-42.749C200.39941,66.76076,189.68262,64,184,64Z" />
          </svg>
          </Link>
          <input
            className=" w-[150px] sm:w-[300px] bg-zinc-100 rounded-3xl mx-3 px-2 outline-0 h-9 opacity-60"
            type="text"
            placeholder="Search"
            value={searchtext}
            onChange={updateText}
            onKeyDown={handleKeyPress}
          />
        </div>
        <div className="flex flex-row justify-between w-48 items-center">
          <div
            onClick={() => navigate("/createpost")}
            className="hidden md:inline-block "
          >
            <CreateIcon className="text-slate-600 p-1" />
            <span className="text-slate-600  text-sm">Write</span>
          </div>
          <div className="hidden md:inline-block ">
            <NotificationsActiveIcon className="text-slate-600" />
          </div>
          <button
            onClick={() => {
             
              return navigate("/feedpage/profile");
            }}
            className="hidden md:inline-block bg-slate-100 rounded-full h-9 px-3"
          >
            H
          </button>
        </div>

        <button
          onClick={() => {
           
            return navigate("/feedpage/profile");
          }}
          className="md:hidden bg-slate-100 rounded-full h-9 px-3"
        >
          H
        </button>
      </div>
    </>
  );
}

export default NavBar;
