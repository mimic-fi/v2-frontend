import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const NAVBAR_HEIGHT = 80

const Page = ({ children }) => {
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))
  }, [])
  const medium = 700
  return (
    <Wrapper>
      <Container>
        {width >= medium && <Sidebar />}
        <PageContainer>
          <NavbarContainer>
            <Navbar />
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
  <<<<<<<headheight: 100%px;
  =======height: 100%;
  >>>>>>>9adf4c8cbe6ed1930db732bbdec7a58b56163a10width: 100%;
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
