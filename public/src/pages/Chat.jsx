import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { allUsersRoute } from "../utils/apiRoutes";
import Contacts from "../components/Contacts";

function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    async function verify() {
      if (!localStorage.getItem("application-user")) {
        navigate("/login");
      } else {
        setCurrentUser(
          await JSON.parse(localStorage.getItem("application-user"))
        );
      }
    }
    verify();
  });

  useEffect(() => {
    async function loggedInUser() {
      if (currentUser) {
        if (currentUser.isAvatarImageSet === true) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          console.log("Not connected");
        }
      }
    }
    loggedInUser();
  }, [currentUser]);

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser} />
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
