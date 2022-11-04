import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.jpg";

export default function Contacts({ contacts, currentUser }) {
  const [currentUsername, setCurrentUsername] = useState(undefined);
  // const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      // setCurrentUserImage(currentUser.avatarImage);
      setCurrentUsername(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {};

  return (
    <>
      {currentUsername && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h3>Chat Application</h3>
          </div>

          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  key={index}
                >
                  {/* <div className="avatar">
                    <img src="" alt="" />
                  </div> */}
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="current-user">
            {/* <div className="avatar">
              <img src="" alt="" />
            </div> */}
            <div className="username">
              <h2>{currentUsername}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 2rem;
      border-radius: 0.6rem;
    }
    h3 {
      color: white;
      text-transform: uppercase
    }
  }  
  .contacts {
    display flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    .contact {
      background-color: #ffffff39;
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.6rem;
      padding: 0.4rem;
      align-items: center;
      display: flex;
      transition: 0.5s easy-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9186f3;
    }
  }
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
  }

`;
