import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// import loader from "../assets/loader.gif";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAvatarRoute } from "../utils/apiRoutes";
import { Buffer } from "buffer";

export default function Avatar() {
  const api = "https://api.multiavatar.com";
//   const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

//   const toastyOptions = {
//     position: "top-left",
//     autoClose: 10000,
//     pauseOnHover: true,
//     draggable: true,
//     theme: "dark",
//   };
//   const setProfilePicture = async () => {};

  useEffect(() => {
    const data = [];
    async function fetchImage() {
      for (let i = 0; i < 2; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 10000000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString('base64'));
        console.log(data)
      } 
    }
    fetchImage();
    setAvatars(data);
    setIsLoading(false);
  }, []);


  return (
    <>
      <Container>
        <div className="title-container">
          <h1>Pick an avatar as your profile picture</h1>
        </div>
        <div className="avatars">
          {avatars.map((avatar, index) => {
            return (
              <div
                key={index}
                className={`avatar ${
                  selectedAvatar === index ? "selected" : ""
                }`}
              >
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt="avatar"
                  onClick={() => setSelectedAvatar(index)}
                />
              </div>
            );
          })}
        </div>
      </Container>
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
    .avatars {
      display: flex;
      gap: 2rem;
      .avatar {
        border: 0.4rem solid transparent;
        padding: 0.4rem;
        border-radius: 5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.5s ease-in-out;
        img {
          height: 6rem;
        }
      }
      .selected {
        border: 0.4rem solid #4e0eff;
      }
    }
  }
`;
