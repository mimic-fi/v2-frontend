import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { formatTokenAmount } from '../utils/math-utils'
import { Hl, Hxxs, BodyL, BodyS } from '../styles/texts'
import ActionDetail from './ActionDetail'
import check from '../assets/check.svg'
import open from '../assets/open.svg'
import lock from '../assets/lock.svg'
import { USDC_DECIMALS } from '../constants/knownTokenDecimals'
import { CHAIN_INFO } from '../constants/chainInfo'
import { useChainId } from '../hooks/useChainId'
import useActionMetadata from '../hooks/useActionMetadata'
import { getEtherscanLink } from '../utils/web3-utils'

//TODO: remove knownTokenDecimals and replace it with no hardcoded data.

const Hero = ({ totalValueManaged, lastAction, isLoading }) => {
  //TODO: add real data. this is a mockup
  const params = useParams()
  const chainId = useChainId()
  const lastPrimitive = (lastAction && lastAction[0]) || []
  const target = lastPrimitive?.target || ''
  const { data: lastActionMetadata, isLoading: isLoadingMetadata } = useActionMetadata(target)

  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))
  }, [])
  const medium = 700

  const [isOpen, setOpen] = useState(false)

  return (

    <HeroSection>
      {!isLoading && !isLoadingMetadata ?
        lastAction && lastActionMetadata?.successMessage ?
        <>
          <BodyL>Hello diver!</BodyL>
          <Hl>
            {lastActionMetadata?.successMessage + ' ✓' }
          </Hl>
          <ActionDetail
            title={lastActionMetadata?.successMessage}
            primitives={lastAction}
            open={isOpen}
            onClose={() => setOpen(!isOpen)}
          />

          <BodyL>
            {lastAction && moment.unix(lastPrimitive.executedAt).fromNow()}{' '}
            <button onClick={() => setOpen(!isOpen)}>See receipt</button>
          </BodyL>
        </>
        : 'No data actions yet'
        : 'loading...'
      }
      {totalValueManaged && (
        <Box>
          <Item>
            {width >= medium && <img alt="" src={lock} />}
            <div>
              <Hxxs>
                $
                {formatTokenAmount(totalValueManaged, USDC_DECIMALS, {
                  digits: 2,
                })}
              </Hxxs>
              <BodyS>Total assets managed</BodyS>
            </div>
          </Item>
          {width < medium && (
            <MobileItem>
              <div>
                <img alt="" src={check} />
                <BodyS>Active</BodyS>
              </div>
              <div>
                <img alt="" src={open} />
                <a
                  href={CHAIN_INFO[chainId]?.explorer + 'address/' + params.id}
                  target="_blank"
                  rel="noreferrer"
                >
                  <BodyS>Open on Etherscan</BodyS>
                </a>
              </div>
            </MobileItem>
          )}
          {width >= medium && (
            <>
              <Item>
                <img alt="" src={check} />
                <div>
                  <Hxxs>Active</Hxxs>
                </div>
              </Item>
              <Item>
                <img alt="" src={open} />
                <div>
                  <a
                    href={getEtherscanLink(chainId, params.id, 'address')}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Hxxs>Open on Etherscan</Hxxs>
                  </a>
                  <BodyS>(External link)</BodyS>
                </div>
              </Item>
            </>
          )}
        </Box>
      )}
    </HeroSection>
  )
}

const Box = styled.div`
  margin: 150px auto;
  background: #2d3034;
  box-shadow: 0px 4px 40px rgba(26, 28, 30, 0.24);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1081px;
  height: 150px;
  @media only screen and (min-width: 701px) and (max-width: 950px) {
    flex-direction: column;
    height: auto;
    width: 70%;
    margin: 150px auto;
  }
  @media only screen and (max-width: 700px) {
    width: 100%;
    flex-direction: column;
    height: auto;
    margin: 80px auto 0 auto;
    justify-content: center;
  }
`

const Item = styled.div`
  display: flex;
  width: 33%;
  padding: 46px 25px;
  align-items: center;
  justify-content: center;
  text-align: left;
  gap: 21px;
  @media only screen and (max-width: 700px) {
    width: 70%;
    padding: 25px 40px;
    justify-content: center;
    text-align: center;
  }
  @media only screen and (max-width: 950px) {
    width: 70%;
  }

  &:nth-child(2) {
    border-right: solid 4px ${props => props.theme.backgroundDefault};
    border-left: solid 4px ${props => props.theme.backgroundDefault};
    @media only screen and (max-width: 950px) {
      border: 0px;
      border-top: solid 4px ${props => props.theme.backgroundDefault};
      border-bottom: solid 4px ${props => props.theme.backgroundDefault};
      width: 100%;
    }
  }
  p {
    margin: 4px 0;
  }
`

const MobileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 5px;
  width: 100%;
  flex-wrap: wrap;
  padding: 16px 7px;
  box-sizing: border-box;
  border-top: 2px solid #414141;
  img {
    height: 24px;
    padding-right: 7px;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
`

const HeroSection = styled.section`
  height: auto;
  padding: 150px 20px 20px 20px;
  @media only screen and (max-width: 700px) {
    padding: 100px 20px 20px 20px;
  }
  color: white;
  text-align: center;

  h2 {
    max-width: 750px;
    text-align: center;
  }
  button {
    background: transparent;
    border: 0px;
    color: #a996ff;
    font-family: 'GTWalsheimPro';
    padding-left: 7px;
    cursor: pointer;
    font-size: 18px;
    line-height: 28px;
    letter-spacing: 0.75px;
    @media only screen and (max-width: 700px) {
      font-size: 17px;
      line-height: 28px;
    }
    @media only screen and (min-width: 1440px) {
      font-size: 20px;
      line-height: 32px;
    }
  }
`

export default Hero
