import styled from 'styled-components'
import Select, { components } from 'react-select'
import { CHAIN_INFO } from '../constants/chainInfo'
import { useChainId } from '../hooks/useChainId'
import { useAppDispatch } from '../context/appContext'
import { BodyL, BodyS } from '../styles/texts'
import ChainLogo from './ChainLogo'

const NetworkInfo = () => {
  const { updateChainId } = useAppDispatch()
  const chainId = useChainId()

  const Control = props => {
    const { children, innerRef, innerProps, menuIsOpen } = props

    return (
      <ControlContainer ref={innerRef} {...innerProps} menuIsOpen={menuIsOpen}>
        <ChainLogo src={CHAIN_INFO[chainId]?.logoUrl} />
        {children}
      </ControlContainer>
    )
  }

  return (
    <Container>
      <SelectElement
        components={{ Menu, Option, Control }}
        defaultValue={CHAIN_INFO[chainId]}
        onChange={e => updateChainId(e?.value)}
        options={Object.values(CHAIN_INFO).sort().filter(item => {
          return item.isDisabled ? null : item
        })}
        classNamePrefix="react-select"
      />
    </Container>
  )
}

const Option = props => {
  const chainId = useChainId()
  const { children, innerRef, innerProps } = props
  const { isTestnet, logoUrl, name} = CHAIN_INFO[(props?.value)]

  return (
    <OptionContainer ref={innerRef} {...innerProps} isSelected={props?.value === chainId }>
      <OptionBox>
        <ChainLogo src={logoUrl} />
        <ChainName>{name}</ChainName>
        { isTestnet && <Badge>testnet</Badge>}
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
  return (
    <>
      <components.Menu {...props}>
        <div>
          <BodyL>Select network</BodyL>
          <div>{props.children}</div>
          <Hr />
          <BodyS>Coming soon</BodyS>
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
        </div>
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
    background-color: #393B3F;
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
  .react-select__menu-list{
    max-height: 600px;
  }
`

const OptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0;
  padding: 5px 18px;
  background: ${props =>
    props.isSelected ? props.theme.mainDefault : 'transparent'};
  border-radius: 10px !important;
  color: ${props =>
    props.isSelected ? props.theme.backgroundDefault : 'white'};
  div {
    display: flex;
  }
  .selector {
    width: 12px;
    height: 12px;
    background: ${props => (props.isSelected ? 'white' : '#A5A1B7')};
    border: solid 5px
      ${props => (props.isSelected ? props.theme.mainDark : '#A5A1B7')};
    border-radius: 100%;
  }
`

const Box = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 13px;
  margin-bottom: 24px;
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
  background: #a5a1b7;
  width: 100%;
  height: 1px;
`

const Container = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  color: white;
`

export default NetworkInfo
