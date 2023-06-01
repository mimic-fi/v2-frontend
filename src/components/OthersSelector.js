import styled from 'styled-components'
import Select from 'react-select'
import { Link, useParams } from 'react-router-dom'
import { BodyM } from '../styles/texts'
import { CHAIN_INFO } from '../constants/chainInfo'
import etherscan from '../assets/etherscan.svg'
import discord from '../assets/discord-menu.svg'
import useSmartVaultParam from '../hooks/useSmartVaultParam'

const OthersSelector = ({ chainId }) => {
  const address = useSmartVaultParam()
  const params = useParams()
  const options = [
    {
      value: 'explorer',
      label: 'Open on explorer',
      link: CHAIN_INFO[chainId].explorer + 'address/' + address,
      icon: etherscan,
    },
    {
      value: 'discord',
      label: 'Ask us on discord',
      link: 'https://discord.mimic.fi',
      icon: discord,
    },
    {
      value: 'activity',
      internal: true,
      label: 'Activity on all chains',
      link: '/smart-vaults/' + params.id + '/activity',
    },
  ]
  const Control = props => {
    const { children, innerRef, innerProps, menuIsOpen } = props

    return (
      <ControlContainer ref={innerRef} {...innerProps} menuIsOpen={menuIsOpen}>
        <Body>More </Body>
        {children}
      </ControlContainer>
    )
  }

  return (
    <Container>
      <SelectElement
        components={{ Option, Control }}
        options={options}
        classNamePrefix="react-select"
      />
    </Container>
  )
}

const Option = props => {
  const { innerRef, innerProps } = props
  return (
    <OptionContainer ref={innerRef} {...innerProps}>
      {props.data.internal ? (
        <Link to={props.data.link}>
          <Body>
            <img src={props.data.icon} alt="" />
            {props.label}
          </Body>
        </Link>
      ) : (
        <a href={props.data.link} target="_blank" rel="noreferrer">
          <Body>
            <img src={props.data.icon} alt="" />
            {props.label}
          </Body>
        </a>
      )}
    </OptionContainer>
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
    background-color: #393b3f;
    min-width: 300px;
    width: auto;
    padding: 8px 24px 14px 24px;
    border-radius: 24px;
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
    margin: 8px 0;
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
  background: ${props => props.theme.backgroundLight};
  border-radius: 10px !important;
  color: ${props =>
    props.isSelected ? props.theme.backgroundDefault : 'white'};
  div {
    display: flex;
  }
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
  margin-left: -10px;
  margin-top: 3px;
  text-align: end;
  p {
    margin-top: 0px;
  }
`

const Container = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  color: white;
`
const Body = styled(BodyM)`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 auto;
  margin-bottom: 0 !important;
`

export default OthersSelector
