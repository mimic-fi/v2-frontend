import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import logo from '../assets/logo-navbar.svg'
import { Container } from '../styles/texts'

const Sidebar = () => {
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))
  }, [])

  const medium = 700

  return (
    <SidebarSection>
      <Logo src={logo} />
    </SidebarSection>
  )
}

const Logo = styled.img`
  height: 37px;
  padding: 25px 36px;
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
