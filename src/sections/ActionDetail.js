import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import transactionHash from '../assets/transactionHash.svg'
import date from '../assets/date.svg'
import executed from '../assets/executed.svg'
import { Hm, Hxs, BodyS, BodyM, BodyL, BodyXl } from '../styles/texts'

const ActionDetail = ({
  open,
  primitives,
  title,
  children,
  right,
  onClose,
}) => {
  console.log(primitives, 'p')
  return (
    <Detail isOpen={open}>
      <div className="overlay" onClick={onClose} />
      <div
        className="wrap"
        onClick={e => e.target.tagName.toLowerCase() === 'a' && onClose()}
      >
        <Hm>{title}</Hm>
        <DetailItem>
          <img alt="" src={transactionHash} />
          <div>
            <BodyS className="label">Transaction hash</BodyS>
            <BodyL>{primitives ? primitives[0].transaction : ''}</BodyL>
          </div>
        </DetailItem>
        <DetailItem>
          <img alt="" src={date} />
          <div>
            <BodyS className="label">Date executed</BodyS>
            <BodyL>
              {primitives
                ? moment.unix(primitives[0].executedAt).format('MMM Do, h:mm')
                : ''}
            </BodyL>
          </div>
        </DetailItem>
        <DetailItem>
          <img alt="" src={executed} />
          <div>
            <BodyS className="label">Executed by</BodyS>
            <BodyL>{primitives ? primitives[0].sender : ''}</BodyL>
          </div>
        </DetailItem>
        <br />
        <br />
        <Hxs>Breakdown</Hxs>
        <Breakdown>
          <div className="line" />
          {primitives &&
            primitives.map(item => {
              return <BreakdownItem primitive={item} />
            })}
          <Item>
            <BodyXl className="noMarginBottom">Transaction completed</BodyXl>
          </Item>
        </Breakdown>
        <Footer>
          <Hxs>Have doubts?</Hxs>
          <BodyM>
            We are commited to ensure transparent & safe business. Check out our
            <a href="https://docs.mimic.fi/miscellaneous/faqs" target="_blank" rel="noreferrer">Frequently asked questions</a> here.
          </BodyM>
          <BodyM>If you have any concerns, reach us at <a href="mailto:support@mimic.fi">support@mimic.fi</a></BodyM>

          <br />
          <br />
          <BodyXl>Thanks for doing business  with Mimic!</BodyXl>
        </Footer>
      </div>
    </Detail>
  )
}

const BreakdownItem = ({ primitive }) => {
  return (
    <Item>
      <BodyXl className="noMarginBottom">{primitive.type}</BodyXl>
      <BodyM className="grey">
        {moment.unix(primitive.executedAt).format('MMM Do, h:mm')}
      </BodyM>
      <br />
      <BodyM className="noMarginBottom">From Smart Vault</BodyM>
      <BodyM className="grey">{primitive.sender}</BodyM>
      <BodyM className="noMarginBottom">To Smart Vault</BodyM>
      <BodyM className="grey">{primitive.target}</BodyM>
    </Item>
  )
}

const Breakdown = styled.div`
  text-align: left;
  position: relative;
  .line {
    content: '';
    position: absolute;
    width: 1px;
    height: calc(100% - 32px);
    background-color: #fff;
    top: 16px;
    left: 0;
    z-index: 99;
  }
`

const Footer = styled.div`
  text-align: center!important;
  a {
    color: #8286F2;
  }

`

const Item = styled.div`
  text-align: left;
  padding-left: 40px;
  position: relative;
  margin-bottom: 70px;
  word-break: break-word;
  &:before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    background-color: #fff;
    border-radius: 100%;
    top: 12px;
    left: -8px;
    z-index: 99;
  }
  .grey {
    margin-top: 4px;
    color: #a5a1b7;
  }
  .noMarginBottom {
    margin-bottom: 0px;
  }
`

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  margin-bottom: 40px;
  img {
    width: 60px;
    padding-right: 18px;
  }
  p.label {
    color: #a5a1b7;
  }
  p {
    margin: 3px auto;
    word-break: break-word;
  }
  .relative {
    position: relative;
  }
`

const Detail = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 100;

  .overlay {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    opacity: 0;
    will-change: opacity;
    pointer-events: none;
    transition: opacity 0.3s cubic-bezier(0, 0, 0.3, 1);
  }

  ${props => props.isOpen && '.overlay { opacity: 1; pointer-events: auto;}'};

  .wrap {
    position: fixed;
    box-sizing: border-box;
    height: 100%;
    width: 504px;
    padding: 100px 50px 100px 50px;
    background: #2d3034;
    overflow-y: auto;
    overflow-x: hidden;
    transform: translateX(-100%);
    will-change: transform;
    z-index: 101;
    pointer-events: auto;
    transition: transform 130ms ease-out;
    right: 0;
    transform: translateX(100%);
  }

  ${props =>
    props.isOpen &&
    '.wrap { transform: none; pointer-events: auto; transition: transform 330ms ease-in;}'};

  h2 {
    text-align: left !important;
  }
`

export default ActionDetail
