import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { Hl, Hxxs, BodyL, BodyS } from '../styles/texts'
import check from '../assets/check.svg'
import list from '../assets/list.svg'
import lock from '../assets/lock.svg'
import useActionMetadata from '../hooks/useActionMetadata'
import { formatTokenAmount } from '../utils/math-utils'
import { USDC_DECIMALS } from '../constants/knownTokenDecimals'
//TODO: remove knownTokenDecimals and replace it with no hardcoded data.

const Hero = ({ primitive, totalValueManaged, totalActions }) => {
  //TODO: add real data. this is a mockup
  const lastAction = useActionMetadata(primitive.target)
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))
  }, [])
  const medium = 700

  return (
    <HeroSection>
      <BodyL>Hello diver!</BodyL>
      <Hl>
        {lastAction && lastAction.data && lastAction.data.successMessage + ' ✓'}
      </Hl>
      <BodyL>
        {primitive && moment.unix(primitive.executedAt).format('MMM Do, h:mm')}
      </BodyL>
      {totalValueManaged && (
        <Box>
          <Item>
            {width >= medium && <img alt="" src={lock} />}
            <div>
              <Hxxs>
                ${formatTokenAmount(totalValueManaged, USDC_DECIMALS, { digits: 2 })}
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
                <img alt="" src={list} />
                <BodyS>{totalActions} fulfilled actions to date</BodyS>
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
                <img alt="" src={list} />
                <div>
                  <Hxxs>{totalActions}</Hxxs>
                  <BodyS>fulfilled actions to date</BodyS>
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
  padding: 46px 40px;
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
    border-right: solid 4px #252627;
    border-left: solid 4px #252627;
    @media only screen and (max-width: 950px) {
      border: 0px;
      border-top: solid 4px #252627;
      border-bottom: solid 4px #252627;
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
  a,
  span.link {
    color: #a996ff;
    font-family: 'GTWalsheimProBold';
    padding-left: 7px;
  }
  h2 {
    max-width: 750px;
    text-align: center;
  }
`

export default Hero
