import styled from 'styled-components'
import Select from 'react-select'
import { Link } from 'react-router-dom'
import { BodyM } from '../styles/texts'
import { CHAIN_INFO } from '../constants/chainInfo'
import etherscan from '../assets/etherscan.svg'
import discord from '../assets/discord-menu.svg'

const PageSelector = ({ active, address, chainId }) => {
  const options = [
    {
      value: 'overview',
      label: 'Overview',
      active: active,
      address: address,
      link: '/',
    },
    {
      value: 'history',
      label: 'Action history',
      active: active,
      address: address,
      link: '/action-history/',
    },
    {
      value: 'configuration',
      label: 'Configuration',
      active: active,
      address: address,
      link: '/config/',
    },
    {
      value: 'explorer',
      label: 'Open on explorer',
      link: CHAIN_INFO[chainId].explorer + 'address/' + address,
      icon: etherscan,
      type: 'external',
    },
    {
      value: 'discord',
      label: 'Ask us on discord',
      link: 'https://discord.mimic.fi',
      icon: discord,
      type: 'external',
    },
  ]
  const Control = props => {
    const { children, innerRef, innerProps, menuIsOpen } = props

    return (
      <ControlContainer
        ref={innerRef}
        {...innerProps}
        active={active}
        menuIsOpen={menuIsOpen}
        address={address}
      >
        <BodyM>{props.options.filter(obj => { return obj.value === active })[0]?.label} </BodyM>
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
  if (props.data.type === 'external') {
    return (
      <OptionContainer ref={innerRef} {...innerProps}>
        <a href={props.data.link} target="_blank" rel="noreferrer">
          <Body>
            <img src={props.data.icon} alt="" />
            {props.label}
          </Body>
        </a>
      </OptionContainer>
    )
  }
  return (
    <OptionContainer ref={innerRef} {...innerProps}>
      <Link to={`/smart-vaults/${props.data.address}${props.data.link}`}>
        <BodyM
          className={props.data.active === props.data.value ? 'active' : ''}
        >
          {props.label}
        </BodyM>
      </Link>
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
    padding: 0px 24px;
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
  text-align: end;
  &:hover {
    transition: 0.25s ease background;
    background: #00000069;
  }
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
`

export default PageSelector
