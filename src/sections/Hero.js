import React, { useState } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { formatTokenAmount } from '../utils/math-utils'
import { Hxl, Hxs, BodyL, BodyS } from '../styles/texts'
import { Skeleton } from '../styles/general'
import ActionDetail from './ActionDetail'
import smartVault from '../assets/smart-vault.svg'
import { USDC_DECIMALS } from '../constants/knownTokenDecimals'
import useActionMetadata from '../hooks/useActionMetadata'
import useSmartVaultMetadata from '../hooks/useSmartVaultMetadata'

//TODO: remove knownTokenDecimals and replace it with no hardcoded data.

const Hero = ({ totalValueManaged, lastAction, isLoading, address }) => {
  const lastPrimitive = (lastAction && lastAction[0]) || []
  const target = lastPrimitive?.transaction?.target || ''
  const {
    data: lastActionMetadata,
    isLoading: isLoadingMetadata,
  } = useActionMetadata(target)

  const [isOpen, setOpen] = useState(false)

  const smartVaultMetadata = useSmartVaultMetadata(address)

  return (
    <HeroSection>
      <BodyL>Hello diver!</BodyL>
      {isLoading && isLoadingMetadata ? (
        <>
          <br/>
          <Skeleton height="180px" width="75%" marginBottom="30px" />
          <Skeleton />
        </>
      ) : (
        <>
          <Hxl>
            {lastAction && lastActionMetadata?.successMessage
              ? lastActionMetadata.successMessage + ' ✓'
              : 'No actions yet'}
          </Hxl>
          {lastAction &&
            lastActionMetadata?.successMessage && (
              <ActionDetail
                title={lastActionMetadata?.successMessage}
                primitives={lastAction}
                open={isOpen}
                onClose={() => setOpen(!isOpen)}
              />
            )}
          <BodyL>
            {lastAction &&
              moment
                .unix(lastPrimitive?.transaction?.executedAt)
                .fromNow()}{' '}
            <button onClick={() => setOpen(!isOpen)}>See receipt</button>
          </BodyL>
        </>
      )}
      <Box>
        <SVName>
          <img
            alt="smartvault"
            src={
              smartVaultMetadata.data && smartVaultMetadata.data.logo
                ? smartVaultMetadata.data.logo
                : smartVault
            }
          />
          <Hxs>
            {smartVaultMetadata.data && smartVaultMetadata.data.title
              ? smartVaultMetadata.data.title
              : 'Smart vault'}
          </Hxs>
        </SVName>
        <Item>
          {totalValueManaged && (
            <div>
              <Hxs>
                $
                {formatTokenAmount(totalValueManaged, USDC_DECIMALS, {
                  digits: 2,
                })}
              </Hxs>
              <BodyS>Total managed</BodyS>
            </div>
          )}
        </Item>
      </Box>
    </HeroSection>
  )
}

const Box = styled.div`
  margin: 150px auto 70px auto;
  position: relative;
  background: #2d3034;
  box-shadow: 0px 4px 40px rgba(26, 28, 30, 0.24);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px;

  @media only screen and (max-width: 1040px) {
    width: 90%;
    flex-direction: column;
    height: auto;
    margin: 80px auto 0 auto;
    justify-content: center;
  }
`

const Item = styled.div`
  display: flex;
  width: 50%;
  max-width: 100%;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  gap: 30px;
  @media only screen and (max-width: 1040px) {
    width: 90%;
  }
  @media only screen and (max-width: 700px) {
    padding: 25px 40px;
    justify-content: center;
    text-align: center;
  }
  p {
    margin: 4px 0;
  }
`

const SVName = styled(Item)`
  width: 70%;
  border-right: solid #fffffe45;
  margin-right: 39px;
  @media only screen and (max-width: 1040px) {
    width: 90%;
    margin-right: 0;
    border-bottom: solid #fffffe45;
    border-right: solid transparent 0px;
    margin-bottom: 30px;
    padding-bottom: 40px;
  }
  img {
    height: 120px;
    border-radius: 100px;
    @media only screen and (max-width: 1040px) {
      position: absolute;
      top: -30px;
      height: 60px;
      left: 10px;
    }
  }
  h5 {
    max-height: 100px;
    text-overflow: ellipsis;
    overflow: hidden;
    @media only screen and (max-width: 1040px) {
      max-height: initial;
    }
  }
`

const HeroSection = styled.section`
  height: auto;
  padding: 150px 20px 20px 20px;
  @media only screen and (max-width: 700px) {
    padding: 100px 20px 20px 20px;
  }
  color: white;
  text-align: left;

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
