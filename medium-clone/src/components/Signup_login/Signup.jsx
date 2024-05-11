import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
function Signup({ togglePopup }) {
  const [showsignin, setshowsignin] = useState(false);
  const navigate=useNavigate()
  const [formdata,setformdata]=useState({
    'first_name':"",
    'last_name':"",
    "username":"",
    "email":"",
    "password":"",
  })
  const [logindata,setlogindata]=useState({
    "username":"",
    "password":""
  })

  async function SignUp(event){
    const response = await fetch("http://127.0.0.1:8000/user/signup",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    });
    const res = await response.json();
    if(res.status===201){

     
      navigate("feedpage")
    }
  }

  async function SignIn(event){
    const response = await fetch("http://127.0.0.1:8000/user/signin",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logindata),
    });
    const res = await response.json();
    console.log("response",res)
    if(res.status===200){
      localStorage.setItem('JWT', res.jwt_token);
      navigate("feedpage")
    }
  }
  
  function handleloginChange(event){
    const name=event.target.name
    const value=event.target.value
    setlogindata(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));

  }
  function handleChange(event){
    const name=event.target.name
    const value=event.target.value
    setformdata(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));

  }

  return (
    <div
      onClick={togglePopup}
      className="flex h-full w-full justify-center items-center absolute  top-0 "
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="flex flex-col w-full md:w-1/2 items-center bg-white rounded-xl relative "
      >
        <CloseIcon onClick={togglePopup} className="absolute top-2 right-2"></CloseIcon>
      
        {showsignin ? (
          <>
            <h1 className="text-3xl p-3 my-5">Welcome Back !</h1>
            <input
              type="text"
              placeholder="username"
              name="username"
              onChange={handleloginChange}
              value={logindata.username}
              className="w-9/12 m-2 h-10 rounded-xl drop-shadow-2xl outline-0 px-2"
            ></input>
            <input
              type="text"
              placeholder="Password"
              name="password"
              onChange={handleloginChange}
              value={logindata.password}
              className="w-9/12 m-2 h-10 rounded-xl drop-shadow-2xl outline-0 px-2"
            ></input>
            <button onClick={SignIn} className="my-10 bg-blue-600 px-20 py-3 rounded-3xl text-white">
              SignUp
            </button>
          </>
        ) : 
        
        (
          <>
            <h1 className="text-3xl p-3 my-5">Create Account</h1>
            <input
              type="text"
              name="first_name"
              placeholder="FirstName"
              value={formdata.first_name}
              onChange={handleChange}
              className="w-9/12 m-2 h-10 rounded-xl drop-shadow-2xl outline-0 px-2"
            ></input>
            <input
              type="text"
              placeholder="LastName"
              name="last_name"
              value={formdata.last_name}
              onChange={handleChange}
              className="w-9/12 m-2 h-10 rounded-xl drop-shadow-2xl outline-0 px-2"
            ></input>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              className="w-9/12 m-2 h-10 rounded-xl drop-shadow-2xl outline-0 px-2 "
            ></input>
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={formdata.email}
              onChange={handleChange}
              className="w-9/12 m-2 h-10 rounded-xl drop-shadow-2xl outline-0 px-2"
            ></input>
            <input
              type="text"
              placeholder="Password"
              name="password"
              value={formdata.password}
              onChange={handleChange}
              className="w-9/12 m-2 h-10 rounded-xl drop-shadow-2xl outline-0 px-2"
            ></input>
            <button onClick={SignUp} className="my-10 bg-blue-600 px-20 py-3 rounded-3xl text-white">
              SignUp
            </button>
            <span>
              Already have an account.
              <span
                onClick={() => setshowsignin(!showsignin)}
                className="text-blue-800	"
              >
                Signin
              </span>
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export default Signup;
