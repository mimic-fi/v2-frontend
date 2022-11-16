import React from 'react'
import styled from 'styled-components'
import Navbar from './Navbar'
import NetworkInfo from './NetworkInfo'
import Sidebar from './Sidebar'

const NAVBAR_HEIGHT = 80
const MENU_WIDTH = 109

const Page = ({ children }) => {
  return (
    <Wrapper>
      <Container>
        <Sidebar />
        <PageContainer>
          <NavbarContainer>
            <Navbar />
            <div />
            <NetworkInfo />
          </NavbarContainer>
          <SectionContainer>{children}</SectionContainer>
        </PageContainer>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100vh;
  width: 100vw;
`

const Container = styled.div`
  z-index: 100;
  position: relative;
  display: flex;
  height: 100%;
  width: 100%;
`

const NavbarContainer = styled.div`
  flex-shrink: 0;
  position: relative;
  z-index: 2;
  height: ${NAVBAR_HEIGHT}px;
  display: flex;
  justify-content: space-between;
  background: #1f2021;
  box-shadow: 0px 4px 24px rgba(31, 32, 33, 0.24);
`
const PageContainer = styled.div`
  background: #252627;
  width: 100%;
  height: 100%;
  min-height: 100vh;
`

const SectionContainer = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  background: #252627;
  width: 100%;
  height: calc(100vh - ${NAVBAR_HEIGHT}px);
`

export default Page
