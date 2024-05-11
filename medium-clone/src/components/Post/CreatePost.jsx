import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost() {
    const [postdata, setPostData] = useState({
        user_id: 1,
        post_image: null,
        title: "",
        subtitle: "",
        text: "",
    });
  
    const [responseMessage, setResponseMessage] = useState(null);
    const[showmessage,setshowmessage]=useState()
    const navigate=useNavigate()

    function handleInputChange(event) {
        const { name, value, files } = event.target;
        setPostData(prevdata => ({
            ...prevdata,
            [name]: files ? files[0] : value,
        }));
    }

    async function publishPost(event) {
        event.preventDefault();
        const postData = new FormData();
        postData.append("title", postdata.title);
        postData.append("subtitle", postdata.subtitle);
        postData.append("text", postdata.text);
        postData.append("post_image", postdata.post_image);
        postData.append("user_id", postdata.user_id);
        const token = localStorage.getItem("JWT");
        console.log(token)
        const response = await fetch("http://127.0.0.1:8000/post/create", {
            method: "POST",
            body: postData,
            headers: {
                Authorization: `Bearer ${token}`,
            },

        });

        const res = await response.json();
        console.log("Post response", res);
        setResponseMessage(res?.message)
        setshowmessage(true)
        setTimeout(() => {
            setResponseMessage(null)
            setshowmessage(false)
            if (res.status === 200) {
                navigate("/")
            }
        }, 2000);
       

        
    }

    return (
        <div className="px-20 py-2">
            <input
                className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 mb-4 text-xl font-bold"
                type="text"
                name="title"
                value={postdata.title}
                onChange={handleInputChange}
                placeholder="Title"
            />
            <input
                className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 mb-4 text-lg"
                type="text"
                name="subtitle"
                value={postdata.subtitle}
                onChange={handleInputChange}
                placeholder="Subtitle"
            />
            <textarea
                className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 mb-4"
                name="text"
                value={postdata.text}
                onChange={handleInputChange}
                placeholder="Text"
                rows="5"
            ></textarea>
            <div className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 mb-4 flex items-center justify-center">
                <input
                    type="file"
                    name="post_image"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleInputChange}
                ></input>
                <img src="#" alt="Post Image" className="max-h-48 max-w-full" />
            </div>
            <button
                onClick={publishPost}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Publish
            </button>
            {showmessage && (<p className="bg-gray-600 text-white rounded-xl p-2 absolute ">
                  {responseMessage}
                </p>) }


            

        </div>
    );
}

export default CreatePost;
