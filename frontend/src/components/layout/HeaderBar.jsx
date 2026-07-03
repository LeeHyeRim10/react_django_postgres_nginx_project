import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useCurrentUser, logout } from '../../store/hooks/useUser';
import LoginFormModal from '../user/LoginFormModal';
import RegisterFormModal from '../user/RegisterFormModal';
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";


const HeaderBar = () => {

  const navigate = useNavigate();
  const {data: user} = useCurrentUser();

  const [loginOpen, setLoginOpen] = useState(false) ;
  const [registerOpen, setRegisterOpen] = useState(false) ;
  const queryClient = useQueryClient();


  const handleLogout = () => {

    logout();
    alert("로그아웃 성공 ")
    queryClient.removeQueries({
      queryKey: ["currentUser"]
    })
    navigate("/")
  }

  return (
    <>
    <Container>
      <LeftBox>
        <Logo>
          CRUD PROJECT
        </Logo>
      </LeftBox>
      <RightBox>
        {user ? // true
          <div>
            <HeaderButton>{user.username}님</HeaderButton>  
            <HeaderButton onClick={handleLogout} >로그아웃</HeaderButton>  
          </div>
          : // false
          <div>
            <HeaderButton onClick={()=>setLoginOpen(true)}>로그인</HeaderButton>
            <HeaderButton onClick={()=>setRegisterOpen(true)}>회원가입</HeaderButton>
          </div>
        }
      </RightBox>
    </Container>
    <LoginFormModal open={loginOpen} setOpen={setLoginOpen}/>
    <RegisterFormModal open={registerOpen} setOpen={setRegisterOpen}/>
    </>
  )
}

export default HeaderBar

const Container = styled.header`
  width: 100%;
  height: 70px;

  background-color: #1e293b;
  color: white;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 24px;

  position: fixed;
  top: 0;
  left: 0;

  z-index: 1000;
`

const LeftBox = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const Logo = styled.div`
  font-size: 22px;
  font-weight: bold;
`

const RightBox = styled.div`
  display: flex;
  gap: 12px;
`

const HeaderButton = styled.button`
  padding: 8px 14px ;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin : 3px;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    padding: 6px 10px;
    font-size: 12px;
  }
`

const MenuButton = styled.button`
  display: none;

  background: none;
  border: none;

  color: white;
  font-size: 28px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`