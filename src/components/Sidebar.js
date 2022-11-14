import React from 'react'
import styled from 'styled-components'
import logo from '../assets/logo-navbar.svg'
import Home from '../assets/menuIcons/Home.js'
import Configure from '../assets/menuIcons/Configure.js'
import List from '../assets/menuIcons/List.js'
import Lock from '../assets/menuIcons/Lock.js'

const Sidebar = () => {
  return (
    <SidebarSection>
      <Logo src={logo} />
      <Menu>
        <div className="active">
          <Home />
        </div>
        <div>
          <Configure fill="#fff" />
        </div>
        <div>
          <List fill="#fff" />
        </div>
        <div>
          <Lock fill="#fff" />
        </div>
      </Menu>
    </SidebarSection>
  )
}

const Menu = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  div {
    height: 37px;
    padding: 20px 40px;
    margin: 7px 0;
    &.active {
      border-right: solid 5px #a996ff;
    }
  }
`
const Logo = styled.img`
  height: 37px;
  padding: 22px 36px;
  background: #1f2021;
`
const SidebarSection = styled.section`
  background: transparent;
  z-index: 100;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 108px;
  flex-shrink: 1;
  border-right: 1px solid #4e4b66;
`

export default Sidebar
