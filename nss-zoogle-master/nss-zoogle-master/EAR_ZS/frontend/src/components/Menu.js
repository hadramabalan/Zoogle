import React from 'react'
import styled from 'styled-components'
import {
  Button,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'shards-react'

import logout from '../lib/logout'

import UserIcon from './icons/UserIcon'
import LogoutIcon from './icons/LogoutIcon'

const StyledNavbar = styled(Navbar)`
  position: sticky;
  width: 100%;
  height: 80px;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ul {
    align-items: center;

    li {
      margin: 0 10px;
    }
  }
`

const IconWrapper = styled.div`
  width: 25px;
  height: 25px;
  cursor: pointer;
`
const UserIconWrapper = styled(IconWrapper)`
  width: 30px;
  height: 30px;
  margin-left: 25px;
`

const Menu = ({ loggedIn, history, updateLog }) => (
  <StyledNavbar type="dark" theme="secondary" expand="md">
    <NavbarBrand href="/">ZOOGLE</NavbarBrand>
    <Nav navbar>
      <NavItem>
        <NavLink href="/">Ads</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/shelters">Shelters</NavLink>
      </NavItem>
      {loggedIn ? (
        <>
          <NavItem>
            <NavLink href="/my-ads">My ads</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/my-shelters">My shelters</NavLink>
          </NavItem>
          <NavItem>
            <Button pill theme="warning" size="sm" href="/new-ad">
              New ad
            </Button>
          </NavItem>
          <NavItem>
            <NavLink href="/user">
              <UserIconWrapper>
                <UserIcon />
              </UserIconWrapper>
            </NavLink>
          </NavItem>
          <NavItem>
            <IconWrapper onClick={() => logout(history, updateLog)}>
              <LogoutIcon />
            </IconWrapper>
          </NavItem>
        </>
      ) : (
        <NavItem>
          <Button pill theme="warning" size="sm" href="/login">
            Log in
          </Button>
        </NavItem>
      )}
    </Nav>
  </StyledNavbar>
)

export default Menu
