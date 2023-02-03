import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import useSmartVaultChainCheck from '../hooks/useSmartVaultChainCheck'
import check from '../assets/mini-check.svg'
import { BodyS } from '../styles/texts'
import ChainLogo from './ChainLogo'
import { useChainId } from '../hooks/useChainId'
import { CHAIN_INFO } from '../constants/chainInfo'
import Select, { components } from 'react-select'
import { useAppDispatch } from '../context/appContext'

const AddressOnChainDropdown = ({ address }) => {
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))
  }, [])
  const medium = 700
  const chainId = useChainId()
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
        <SVAddressAlt>{first}</SVAddressAlt>
        {width >= medium ? mid : mid.slice(0, 8) + '...'}
        <SVAddressAlt>{last}</SVAddressAlt>
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
        {isSelected && <ImgCheck src={check} />}
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

  return availableChains && availableChains.length ? (
    <SelectElement
      components={{ Menu, Option, Control }}
      onChange={e => updateChainId(e?.value)}
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

const ChainName = styled.div`
  font-size: 12px;
  color: #d4d4d4;
`

const SVAddress = styled.div`
  font-family: 'GTWalsheimPro';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 28px;
  letter-spacing: 0.75px;
  color: ${props => (props.color ? props.color : '#fcfcfc')};
  @media only screen and (min-width: 1440px) {
    font-size: 18px;
    line-height: 32px;
  }
  display: flex;
  flex-wrap: nowrap;
  color: #fff;
`
const SVAddressAlt = styled.div`
  font-size: 15px;
  color: ${props => props.theme.secondaryDefault};
`
const Space = styled.div`
  width: 10px;
`

export default AddressOnChainDropdown
