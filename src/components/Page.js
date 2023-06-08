import React from 'react'
import styled from 'styled-components'
import Navbar from './Navbar'

const Page = ({ children }) => {
  return (
    <Wrapper>
      <Container>
        <PageContainer>
          <NavbarContainer>
            <Navbar />
          </NavbarContainer>
          {children}
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
  overflow-x: hidden;
`

const Container = styled.div`
  z-index: 100;
  position: relative;
  display: flex;
  height: 100%;
`

const NavbarContainer = styled.div`
  flex-shrink: 0;
  position: relative;
  z-index: 2;
  height: 60px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 4px 24px rgba(31, 32, 33, 0.24);
`
const PageContainer = styled.div`
  background: ${props => props.theme.backgroundDefault};
  width: 100%;
  height: 100%;
  min-height: 100vh;
`



export default Page
