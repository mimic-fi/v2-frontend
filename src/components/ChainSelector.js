import styled from 'styled-components'
import Select, { components } from 'react-select'
import { CHAIN_INFO } from '../constants/chainInfo'
import { useChainId } from '../hooks/useChainId'
import { useAppDispatch } from '../context/appContext'
import { BodyL, BodyS } from '../styles/texts'

const NetworkInfo = () => {
  const { updateChainId } = useAppDispatch()
  const chainId = useChainId()

  const Control = props => {
    const { children, innerRef, innerProps } = props
    return (
      <ControlContainer ref={innerRef} {...innerProps}>
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
        options={Object.values(CHAIN_INFO).filter(item => {
          return item.isDisabled ? null : item
        })}
        classNamePrefix="react-select"
      />
    </Container>
  )
}

const Option = props => {
  console.log('props', props)
  const { children, isSelected, innerRef, innerProps } = props
  return (
    <OptionContainer ref={innerRef} {...innerProps} isSelected={isSelected}>
      <div>
        <ChainLogo src={CHAIN_INFO[(props?.value)].logoUrl} />
        <ChainName>{children}</ChainName>
      </div>
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
          <hr />
          <BodyS>Coming soon</BodyS>
          <Box>
            {Object.values(CHAIN_INFO)
              .filter(item => {
                return item.isDisabled ? item : null
              })
              .map(item => (
                <ComingSoon
                  key={item.label}
                  logo={item.logoUrl}
                  name={item.label}
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
    background-color: #373839;
    min-width: 300px;
    width: auto;
    padding: 24px;
    border-radius: 24px;
    right: 0;
  }
  p {
    margin-bottom: 0;
  }
`

const ChainLogo = styled.img`
  width: 25px;
  object-fit: scale-down;
`

const OptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 16px 0;
  padding: 10px 24px;
  background: ${props =>
    props.isSelected ? props.theme.mainDefault : 'transparent'};
  border-radius: 24px !important;
  div {
    display: flex;
  }
  .selector {
    width: 17px;
    height: 17px;
    background: ${props =>
      props.isSelected ? 'white' : '#A5A1B7'};
      border: solid 7px ${props =>
        props.isSelected ? props.theme.mainDark : '#A5A1B7'};
    border-radius: 100%;
  }
`

const Box = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
    width: 40%;
  }
`

const ControlContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  opacity: ${props => (props.isDisabled ? '0.25' : '1')};
  text-align: end;
`

const ChainName = styled.div`
  padding: 10px 10px;
`

const Container = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  color: white;
`

export default NetworkInfo
