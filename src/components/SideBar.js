import React, { useState } from 'react'
import styled from 'styled-components'
import Overview from '../assets/menuIcons/Overview.js'
import Activity from '../assets/menuIcons/Activity.js'
import Tasks from '../assets/menuIcons/Tasks.js'
import Settings from '../assets/menuIcons/Settings.js'
import hide from '../assets/menuIcons/hide.svg'
import open from '../assets/menuIcons/open.svg'
import smartVault from '../assets/smart-vault.svg'
import useSmartVaultParam from '../hooks/useSmartVaultParam'
import useSmartVaultMetadata from '../hooks/useSmartVaultMetadata'

const Sidebar = ({ onSidebarOpenChange }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const id = useSmartVaultParam()
  const metadata = useSmartVaultMetadata(id)

  console.log(metadata)

  const handleClick = () => {
    const newSidebarOpen = !isSidebarOpen
    setSidebarOpen(newSidebarOpen)
    onSidebarOpenChange(newSidebarOpen)
  }
  const active = 'activity'
  return (
    <SidebarSection isSidebarOpen={isSidebarOpen}>
      <Menu>
        <Title isSidebarOpen={isSidebarOpen}>
          <img alt="smart vault logo" src={metadata?.data?.logo || smartVault} />
          <Label isSidebarOpen={isSidebarOpen}>
            {metadata?.data?.title || 'Smart vault'}
          </Label>
        </Title>
        <Item className="active">
          <Overview fill={active !== 'overview' ? '#A4A4A4' : '#8865D4'} />
          <Label active={active === 'overview'} isSidebarOpen={isSidebarOpen}>
            Overview
          </Label>
        </Item>
        <Item>
          <Activity fill={active !== 'activity' ? '#A4A4A4' : '#8865D4'} />
          <Label active={active === 'activity'} isSidebarOpen={isSidebarOpen}>
            Activity
          </Label>
        </Item>
        <Item>
          <Tasks fill={active !== 'tasks' ? '#A4A4A4' : '#8865D4'} />
          <Label active={active === 'tasks'} isSidebarOpen={isSidebarOpen}>
            Tasks
          </Label>
        </Item>
        <Item>
          <Settings fill={active !== 'settings' ? '#A4A4A4' : '#8865D4'} />
          <Label active={active === 'settings'} isSidebarOpen={isSidebarOpen}>
            Settings
          </Label>
        </Item>

        <Button onClick={handleClick}>
          <img alt="hide" src={isSidebarOpen ? hide : open} />
          <Label isSidebarOpen={isSidebarOpen}>Hide menu</Label>
        </Button>
      </Menu>
    </SidebarSection>
  )
}

const Item = styled.div`
  height: 37px;
  padding: 10px 0px;
  margin: 7px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  left: 32px;
  cursor: pointer;
`

const Title = styled(Item)`
  height: 100px;
  padding: 20px 0px;
  border-bottom: 1px solid #4e4b66;
  width: 100%;
  left: 0;
  div {
    width: ${({ isSidebarOpen }) => (isSidebarOpen ? '110px' : '0')};
    padding-left: ${({ isSidebarOpen }) => (isSidebarOpen ? '17px' : '0')};
    transition: all 0.3s ease-in-out;
  }
  img {
    height: 35px;
    border-radius: 100px;
  }
`

const Menu = styled.div`
  height: 100%;
  display: flex;
  position: sticky;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: relative;
`

const Button = styled.div`
  height: 37px;
  padding: 20px 0px;
  margin: 7px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  left: 32px;
  cursor: pointer;
  background: transparent;
  border: 0px solid transparent;
  color: #a4a4a4;
  margin-top: 100px;
  div{
    width: 90px;
  }
`

const Label = styled.div`
  opacity: ${({ isSidebarOpen }) => (isSidebarOpen ? '1' : '0')};
  color: ${({ active }) => (active ? '#8865D4' : ' #A4A4A4')};
  font-family: 'DMSans'
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 110%;
  letter-spacing: -0.02em;
  width: 70px;
  padding-left: 17px;
  text-align: left;
  transition: all 0.3s ease-in-out;
`

const SidebarSection = styled.section`
  background: transparent;
  z-index: 100;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: ${({ isSidebarOpen }) => (isSidebarOpen ? '200px' : '100px')};
  flex-shrink: 1;
  border-right: 1px solid #4e4b66;
  transition: all 0.3s ease-in-out;
`

export default Sidebar
