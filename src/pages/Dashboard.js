import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import Activity from './Activity'
import Navbar from '../components/Navbarv3'
import Footer from '../components/Footer'
import Menu from '../components/SideBar'


function Dashboard() {
  const getWidth = () => divRef?.current?.offsetWidth
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [width, setWidth] = useState(null)
  const divRef = useRef(null)

  useEffect(() => {
    const handleResize = () => {
      setWidth(getWidth())
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleSidebarOpenChange = isSidebarOpen => {
    setSidebarOpen(isSidebarOpen)
  }

  return (
    <Container>
      <StickyNavbar>
        <Navbar />
      </StickyNavbar>
      <Content>
        <SidebarMenu sidebarOpen={sidebarOpen}>
          <Menu onSidebarOpenChange={handleSidebarOpenChange} />
        </SidebarMenu>
        <MainContent sidebarOpen={sidebarOpen} ref={divRef}>
          <Activity width={width} />
        </MainContent>
      </Content>
      <Footer>Footer</Footer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
`

const Content = styled.div`
  flex: 1;
  display: flex;
`

const SidebarMenu = styled.div`
  width: ${({ sidebarOpen }) => (sidebarOpen ? '200px' : '100px')};
  position: sticky;
  top: 60px;
  height: 100vh;
  transition: width 0.3s ease-in-out;
`

const MainContent = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  color: white;
  transition: width 0.3s ease-in-out;
  width: ${({ sidebarOpen }) =>
    sidebarOpen ? 'calc(100vw - 200px)' : 'calc(100vw - 100px)'};
`

const StickyNavbar = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 70px;
`

export default Dashboard
