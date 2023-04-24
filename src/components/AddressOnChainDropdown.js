import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import useSmartVaultChainCheck from '../hooks/useSmartVaultChainCheck'
import check from '../assets/mini-check.svg'
import { BodyXs, BodyS, BodyM } from '../styles/texts'
import ChainLogo from './ChainLogo'
import { useChainId } from '../hooks/useChainId'
import { CHAIN_INFO } from '../constants/chainInfo'
import Select, { components } from 'react-select'
import { useAppDispatch, useAppState } from '../context/appContext'
import { newIdInUrl } from '../hooks/useSmartVaultParam'

const AddressOnChainDropdown = ({ address }) => {
  const params = useParams()
  const location = useLocation().pathname
  const navigate = useNavigate()
  const { chainId } = useAppState()
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))
  }, [])
  const medium = 700
  const { updateChainId } = useAppDispatch()
  const availableChains = useSmartVaultChainCheck(address)

  const colorChars = 4

  const ChainColor = ({ addressSelected, chainIdToShow, hideShortName }) => {
    const first = addressSelected.slice(0, colorChars)
    const mid = addressSelected.slice(colorChars, 38)
    const last = addressSelected.slice(-colorChars)

    return (
      <SVAddress>
        <ChainLogo src={CHAIN_INFO[chainIdToShow]?.logoUrl} />
        <Space />
        {!hideShortName && (
          <ChainName>{CHAIN_INFO[chainIdToShow]?.shortName}:</ChainName>
        )}
        <BodyM>
          <SVAddressAlt>{first}</SVAddressAlt>
          {width >= medium ? mid : mid.slice(0, 8) + '...'}
          <SVAddressAlt>{last}</SVAddressAlt>
        </BodyM>
      </SVAddress>
    )
  }

  const Control = props => {
    const { children, innerRef, innerProps, menuIsOpen } = props

    return (
      <ControlContainer ref={innerRef} {...innerProps} menuIsOpen={menuIsOpen}>
        <ChainColor
          addressSelected={address}
          chainIdToShow={chainId}
          hideShortName={true}
        />
        {children}
      </ControlContainer>
    )
  }

  const Option = props => {
    const chainId = useChainId()
    const { children, innerRef, innerProps } = props
    const isSelected = props?.value === chainId

    return (
      <OptionContainer ref={innerRef} {...innerProps} isSelected={isSelected}>
        <OptionBox>
          <ChainColor addressSelected={address} chainIdToShow={props?.value} />
          {children}
        </OptionBox>
        {isSelected && <ImgCheck alt="check" src={check} />}
      </OptionContainer>
    )
  }

  const Menu = props => {
    return (
      <>
        <components.Menu {...props}>
          <div>
            <Title>Same address in other chains:</Title>
            <div>{props.children}</div>
          </div>
        </components.Menu>
      </>
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

  return availableChains && availableChains.length ? (
    <SelectElement
      components={{ Menu, Option, Control }}
      onChange={handleChange}
      options={availableChains.sort()}
      classNamePrefix="react-select"
    />
  ) : (
    <ChainColor
      addressSelected={address}
      chainIdToShow={chainId}
      hideShortName={true}
    />
  )
}

const ControlContainer = styled.div`
  display: flex;
  z-index: 300;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  background-color: ${props =>
    props.menuIsOpen ? props.theme.backgroundDefault : 'transparent'};
`

const SelectElement = styled(Select)`
  .react-select__control {
    background-color: transparent;
    border: none;
    /* min-width: 170px; */
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
    background-color: #393b3f;
    min-width: 300px;
    width: auto;
    /* padding: 20px 4px; */
    border-radius: 18px;
    /* right: 0; */
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

const OptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0;
  padding: 5px 18px;
  cursor: pointer;
  border-radius: 10px !important;
  font-size: 12px !important;
  div {
    display: flex;
  }
`

const OptionBox = styled.div`
  display: flex;
  align-items: center;
`

const ImgCheck = styled.img`
  width: 19px;
  padding-left: 5px;
`

const Title = styled(BodyS)`
  padding-left: 20px;
`

const ChainName = styled(BodyXs)`
  font-size: 12px;
  color: #d4d4d4;
  margin: 0 5px 0 0 !important;
  align-items: center;
  display: flex;
`

const SVAddress = styled.div`
  color: ${props => (props.color ? props.color : '#fcfcfc')};
  display: flex;
  flex-wrap: nowrap;
  color: #fff;
  p {
    margin: 0;
  }
`
const SVAddressAlt = styled.span`
  color: ${props => props.theme.secondaryDefault};
`
const Space = styled.div`
  width: 10px;
`

export default AddressOnChainDropdown
