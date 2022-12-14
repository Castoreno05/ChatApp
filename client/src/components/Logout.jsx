import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BiPowerOff } from "react-icons/bi";

export default function Logout() {
  const navigate = useNavigate();
  const logout = async () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Button onClick={logout}>
      <BiPowerOff />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 1rem;
  border: none;
  cursor: pointer;
  background-color: #9a86f3;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;
