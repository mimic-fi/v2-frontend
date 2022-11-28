import styled from 'styled-components'
// import { getChainInfo } from '../constants/enviroment'
import Select from 'react-select'
import { CHAIN_INFO } from '../constants/chainInfo'
import { useChainId } from '../hooks/useChainId'
import { useAppDispatch } from '../context/appContext'


const NetworkInfo = () => {
  const { updateChainId } = useAppDispatch()
  const chainId = useChainId()

  const options = Object.keys(CHAIN_INFO).map(c => CHAIN_INFO[c])

  const Control = props => {
    const {
      children,
      innerRef,
      innerProps
    } = props
    return (
      <ControlContainer
        ref={innerRef}
        {...innerProps}
      >
        <ChainLogo src={CHAIN_INFO[chainId]?.logoUrl} />
        {children}
      </ControlContainer>
    )
  }

  return (
    <Container>
      <SelectElement
        components={{ Option, Control }}
        defaultValue={CHAIN_INFO[chainId]}
        onChange={e => updateChainId(e?.value)}
        options={options}
        classNamePrefix="react-select"
      />
    </Container>
  )
}

const Option = props => {
  const {
    children,
    isDisabled,
    innerRef,
    innerProps
  } = props
  return (
    <OptionContainer
      ref={innerRef}
      {...innerProps}
      isDisabled={isDisabled}
    >
      <ChainLogo src={CHAIN_INFO[props?.value].logoUrl} />
      <ChainName>{children}</ChainName>
    </OptionContainer>
  )
}

const SelectElement = styled(Select)`
  .react-select__control {
    background-color: transparent;
    border: none;
    min-width: 170px;
  }
  .react-select__single-value {
    color: white;
  }
  .react-select__menu {
   background-color: #373839;
   min-width: 170px;
  }

  .react-select__input-container{}
  .react-select__indicators {}
  .react-select__input {}
  .react-select-container {}
`

const ChainLogo = styled.img`
 width: 25px;
 object-fit: scale-down;

`
const OptionContainer = styled.div`
  display: flex;
  margin: 0px 10px;
  opacity: ${props => props.isDisabled ? '0.25' : '1'};

`

const ControlContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  opacity: ${props => props.isDisabled ? '0.25' : '1'};
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
