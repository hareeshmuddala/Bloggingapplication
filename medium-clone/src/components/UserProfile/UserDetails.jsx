import React, { useState } from "react";

function UserDetails(props) {
  const [updateprofile, setUpdateProfile] = useState(false);
  const [image, setImage] = useState(null);

  function updateprofilehandler() {
    if (!image) {
      console.log("No image selected.");
      return;
    }

    const formData = new FormData();
    formData.append("user_image", image);
    const token = localStorage.getItem("JWT");
    fetch("http://127.0.0.1:8000/user/profile/update", {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
    },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Profile updated successfully:", data);
        // Add any logic after successful update
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  }

  function imageHandler(event) {
    setImage(event.target.files[0]);
  }

  return (
    <>
      <div className="flex flex-col items-center md:fixed top-20 right-40 rounded-lg shadow-xl sm:w-1/4 px-4 relative">
        <img
          src={props?.Info?.user?.user_image}
          alt="User Image"
          className="w-60 h-60 rounded-full mb-4"
        />
        <p className="text-lg">{props?.Info?.user?.username}</p>
        <p className="mb-2 text-slate-500">6.4k Followers</p>
        <button className="w-full h-7 bg-green-600 rounded-xl m-2 text-white">
          Follow
        </button>
        {props.show === undefined && (
          <button
            onClick={() => {
              setUpdateProfile((prev) => !prev);
            }}
            className="w-full h-7 bg-green-600 rounded-xl m-2 text-white"
          >
            Update Profile
          </button>
        )}
        {updateprofile && (
          <div className="absolute w-full flex flex-col items-center h-full bg-neutral-200 rounded-xl justify-center">
            <input
              type="file"
              name="user_image"
              accept=".jpg,.jpeg,.png"
              onChange={imageHandler}
            />
            <button
              onClick={updateprofilehandler}
              className="px-4 py-2 my-4 bg-blue-500 rounded-md"
            >
              Update
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default UserDetails;
