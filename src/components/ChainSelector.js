import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import Select, { components } from 'react-select'
import { CHAIN_INFO } from '../constants/chainInfo'
import { useChainId } from '../hooks/useChainId'
import { useAppDispatch, useAppState } from '../context/appContext'
import { newIdInUrl } from '../hooks/useSmartVaultParam'
import { Hxxs } from '../styles/texts'
import ChainLogo from './ChainLogo'

const NetworkInfo = () => {
  const params = useParams()
  const location = useLocation().pathname
  const navigate = useNavigate()
  const { chainId } = useAppState()
  const { updateChainId } = useAppDispatch()

  const Control = props => {
    const { children, innerRef, innerProps, menuIsOpen } = props

    return (
      <ControlContainer ref={innerRef} {...innerProps} menuIsOpen={menuIsOpen}>
        <ChainLogo src={CHAIN_INFO[chainId]?.logoUrl} />
        {children}
      </ControlContainer>
    )
  }
  function handleChange(e) {
    if (params && params.id) {
      let id = params.id?.toString().split(':')
      let smartVaultId = id[id.length - 1]
      let url = newIdInUrl(params.id, location, e?.value, smartVaultId)
      navigate(url)
    }
    updateChainId(e?.value)
  }

  return (
    <Container>
      <SelectElement
        components={{ Menu, Option, Control }}
        defaultValue={CHAIN_INFO[chainId]}
        onChange={handleChange}
        options={Object.values(CHAIN_INFO)
          .sort()
          .filter(item => {
            return item.isDisabled ? null : item
          })}
        classNamePrefix="react-select"
      />
    </Container>
  )
}

const Option = props => {
  const chainId = useChainId()
  const { innerRef, innerProps } = props
  const { isTestnet, logoUrl, name } = CHAIN_INFO[(props?.value)]

  return (
    <OptionContainer
      ref={innerRef}
      {...innerProps}
      isSelected={props?.value === chainId}
    >
      <OptionBox>
        <ChainLogo src={logoUrl} />
        <ChainName>{name}</ChainName>
        {isTestnet && <Badge>testnet</Badge>}
      </OptionBox>
      <div className="selector" />
    </OptionContainer>
  )
}

const ComingSoon = ({ logo, name }) => {
  return (
    <div>
      <ChainLogo src={logo} />
      <ChainName>{name}</ChainName>
    </div>
  )
}

const Menu = props => {
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))
  }, [])
  const medium = 700
  return (
    <>
      <components.Menu {...props}>
        <MenuContainer>
          <Hxxs>Select network</Hxxs>
          <div>{props.children}</div>
          {width >= medium && (
            <>
              <Hr />
              <Box>
                {Object.values(CHAIN_INFO)
                  .filter(item => {
                    return item.isDisabled ? item : null
                  })
                  .map(item => (
                    <ComingSoon
                      key={item.name}
                      logo={item.logoUrl}
                      name={item.name}
                    />
                  ))}
              </Box>
            </>
          )}
        </MenuContainer>
      </components.Menu>
    </>
  )
}

const SelectElement = styled(Select)`
  .react-select__control {
    background-color: transparent;
    border: none;
    min-width: 170px;
    transition: all 0.5s ease-out;
  }
  .react-select__value-container {
    display: none;
  }
  .react-select__indicator-separator {
    display: none;
  }
  .react-select__single-value,
  .react-select__indicator {
    color: white;
  }
  .react-select__menu {
    background: #454748;
    min-width: 300px;
    width: auto;
    right: 0;
    margin: 15px 0 0 0;
    animation: fadeIn 0.2s;
    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
  p {
    margin-bottom: 0;
  }
  .react-select__menu-list {
    max-height: 600px;
  }
`

const MenuContainer = styled.div`
  h6 {
    padding: 25px 35px 15px 35px;
    @media only screen and (max-width: 700px) {
      padding: 16px 20px 6px 20px;
    }
  }
`

const OptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0;
  padding: 12px 35px;
  @media only screen and (max-width: 700px) {
    padding: 5px 20px;
  }
  background: ${props => (props.isSelected ? '#383A3C' : 'transparent')};
  color: white;
  div {
    display: flex;
  }
  .selector {
    width: 12px;
    height: 12px;
    background: #2d3034;
    border: solid 5px
      ${props => (props.isSelected ? props.theme.mainDefault : '#2D3034')};
    border-radius: 100%;
  }
`

const Box = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 13px;
  margin-bottom: 24px;
  padding: 0 35px;
  div {
    display: flex;
    align-items: center;
    width: 40%;
  }
`

const Badge = styled.div`
  background-color: #6f6b83;
  color: white;
  font-size: 11px;
  padding: 1px 5px;
  border-radius: 5px;
`
const OptionBox = styled.div`
  display: flex;
  align-items: center;
`

const ControlContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  opacity: ${props => (props.isDisabled ? '0.25' : '1')};
  background-color: ${props =>
    props.menuIsOpen ? props.theme.backgroundDefault : 'transparent'};
  border-radius: 15px;
  padding: 2px 0 2px 10px;
  text-align: end;
  &:hover {
    transition: 0.25s ease background;
    background: #00000069;
  }
`

const ChainName = styled.div`
  padding: 10px 10px;
`

const Hr = styled.div`
  background: #2d3034;
  width: 100%;
  height: 2px;
`

const Container = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  color: white;
`

export default NetworkInfo
