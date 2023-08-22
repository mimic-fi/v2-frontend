import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Container } from '../styles/texts'
import defaultImg from '../assets/defaultCard.svg'

const ENVIROMENTS = [
  {
    id: '0xd5b927956057075377263aab7f8afc12f85100db',
    name: 'Paraswap Fee Collector',
    logo: 'https://v2-mimic.s3.amazonaws.com/paraswap.png',
    networks: '7 networks'
  },
  {
    id: '0x94dd9c6152a2a0bbcb52d3297b723a6f01d5f9f7',
    name: 'Balancer Fee collector',
    logo: 'https://v2-mimic.s3.amazonaws.com/balancer.png',
    networks: '5 networks'
  },
  {
    id: '0xdab8c0126102db3b5d678475e7f5ff6fbd390a54',
    name: 'Decentraland Mana Swapper',
    logo: 'https://v2-mimic.s3.amazonaws.com/decentraland.png',
    networks: '2 networks'
  },

]

const Cards = () => {
  return (
    <ListContainer>
      {ENVIROMENTS.map(item => (
        <AppLandingCard enviroment={item} key={item.id} />
      ))}
    </ListContainer>
  )
}

const AppLandingCard = ({ enviroment }) => {
  console.log(enviroment)
  return (
    <Link key={enviroment.id} to={'/smart-vaults/' + enviroment.id}>
      <Card>
        <div>
          <img alt="smartvault" src={enviroment.logo || defaultImg} />
        </div>
        <Title>{enviroment.name}</Title>
        <p>{enviroment.networks}</p>
        <p>375k tasks ran to date</p>
        <p className="bold">View</p>
      </Card>
    </Link>
  )
}

const ListContainer = styled(Container)`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  gap: 25px;
  max-width: 1180px;
`
const Title = styled.h3`
  color: #fcfcfd;
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: 'VisbyBold';
  font-size: 26px;
  text-align: left;
  font-style: normal;
  font-weight: 500;
  line-height: 125%;
  letter-spacing: 1px;
  margin-bottom: 10px;
`

const Card = styled.section`
  background: #2d3034;
  box-shadow: 0px 4px 40px rgba(26, 28, 30, 0.24);
  border-radius: 20px;
  padding: 30px;
  width: 212px;
  height: 323px;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  img {
    height: 55px;
    border-radius: 100px;
    margin-bottom: 35px;
  }
  p {
    color: #fff;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: 'DMSans';
    font-size: 17px;
    font-weight: 400;
    line-height: 32px;
    letter-spacing: 0.75px;
    margin: 0;
    &.bold {
      color: #6F5CE6;
      font-family: 'DMSansBold';
      font-weight: 700;
    }
  }
`

export default Cards
