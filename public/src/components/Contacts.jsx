import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.jpg";

export default function Contacts({ contacts, currentUser }) {
  const [currentUsername, setCurrentUsername] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
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
            <div className="avatar">
              <img src="" alt="" />
            </div>
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
    grid-template-columns: 10% 75% 15%;
    overflow: hidden;
    background-color: #080420;
    .brand {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5rem;
        img {
            height: 2rem;
        }
        h3{
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
        }
    }
`;
