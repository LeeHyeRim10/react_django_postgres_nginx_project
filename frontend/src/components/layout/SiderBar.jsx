import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const SiderBar = ({ mobileMenu, setMobileMenu }) => {
  return (
    <>
      {
        mobileMenu &&
        <Overlay
          onClick={() => setMobileMenu(false)}
        />
      }

      <Container mobileMenu={mobileMenu}>

        <MenuBox>

          <MenuItem
            to="/"
            onClick={() => setMobileMenu(false)}
          >
            Home
          </MenuItem>

          <MenuItem
            to="/todo"
            onClick={() => setMobileMenu(false)}
          >
            Todo
          </MenuItem>

          <MenuItem
            to="/employee"
            onClick={() => setMobileMenu(false)}
          >
            고용인정보
          </MenuItem>

          <MenuItem
            to="/product"
            onClick={() => setMobileMenu(false)}
          >
            상품 정보
          </MenuItem>

          <MenuItem
            to="/sales"
            onClick={() => setMobileMenu(false)}
          >
            판매 정보
          </MenuItem>

        </MenuBox>

      </Container>
    </>
  )
}

export default SiderBar

const Container = styled.aside`
  width: 240px;
  height: calc(100vh - 70px);

  background-color: white;

  border-right: 1px solid #ddd;

  position: fixed;
  top: 70px;
  left: 0;

  padding: 24px;

  transition: 0.3s;

  @media (max-width: 768px) {

    left: ${({ mobileMenu }) =>
    mobileMenu ? '0' : '-240px'};

    z-index: 2000;
  }
`

const MenuBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const MenuItem = styled(Link)`
  text-decoration: none;
  color: #333;

  padding: 12px;
  border-radius: 8px;

  transition: 0.2s;

  &:hover {
    background-color: #e2e8f0;
  }
`

const Overlay = styled.div`
  position: fixed;
  top: 70px;
  left: 0;

  width: 100%;
  height: 100vh;

  background-color: rgba(0,0,0,0.4);

  z-index: 1500;

  @media (min-width: 769px) {
    display: none;
  }
`