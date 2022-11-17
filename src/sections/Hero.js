import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import { Hl, Hxxs, BodyL, BodyS } from '../styles/texts'
import check from '../assets/check.svg'
import list from '../assets/list.svg'
import lock from '../assets/lock.svg'
import useActionMetadata from '../hooks/useActionMetadata'

const Hero = ({ primitive, totalValueManaged }) => {
  //TODO: add real data. this is a mockup
  const lastAction = useActionMetadata(primitive.target)

  return (
    <HeroSection>
      <BodyL>Hello diver!</BodyL>
      <Hl>{lastAction.data.description} ✓</Hl>
      <BodyL>
        {primitive && moment.unix(primitive.executedAt).format('MMM Do, h:mm')}{' '}
      </BodyL>
      <Box>
        <Item>
          <img alt="" src={lock} />
          <div>
            <Hxxs>${totalValueManaged}</Hxxs>
            <BodyS>Total assets managed</BodyS>
          </div>
        </Item>
        <Item>
          <img alt="" src={check} />
          <div>
            <Hxxs>Active</Hxxs>
            <BodyS>See Vault’s history</BodyS>
          </div>
        </Item>
        <Item>
          <img alt="" src={list} />
          <div>
            <Hxxs>Collect funds</Hxxs>
            <BodyS>Next scheduled action</BodyS>
          </div>
        </Item>
      </Box>
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
  max-width: 1060px;
  height: 150px;
`
const Item = styled.div`
  display: flex;
  width: 33%;
  padding: 46px 54px;
  align-items: center;
  justify-content: center;
  text-align: left;
  gap: 21px;
  p {
    margin: 4px 0;
  }
  &:nth-child(2) {
    border-right: solid 4px #252627;
    border-left: solid 4px #252627;
  }
`

const HeroSection = styled.section`
  height: auto;
  padding: 150px 80px 80px 80px;
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
