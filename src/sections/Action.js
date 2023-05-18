import React, { useEffect, useState } from 'react'
import moment from 'moment'
import styled from 'styled-components'
import TableRow from '../components/Table/TableRow'
import TableCell from '../components/Table/TableCell'
import ActionDetail from './ActionDetail'
import openImg from '../assets/open.svg'
import defaultAction from '../assets/default-action.svg'
import useActionMetadata from '../hooks/useActionMetadata'
import AddressName from '../components/AddressName'
import { CHAIN_INFO } from '../constants/chainInfo'
import { formatTokenAmount } from '../utils/math-utils'
import { getEtherscanLink } from '../utils/web3-utils'

const Action = ({ primitives, chain }) => {
  const item = primitives && primitives[0]
  const metadata = useActionMetadata(item?.transaction?.target, chain)
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))
  }, [])
  const medium = 700
  // const large = 900
  const [isOpen, setOpen] = useState(false)

  return (
    <>
      <Row key={item?.id} onClick={() => setOpen(!isOpen)}>
        <TableCell align="left">
          <ChainLogo src={CHAIN_INFO[chain]?.logoUrl} />
        </TableCell>
        <TableCell>
          <Time>
            {item?.transaction?.executedAt
              ?
              <Column>
                {moment.unix(item?.transaction?.executedAt).fromNow()} 
              </Column>
              : '-'}
          </Time>
        </TableCell>
        <TableCell>
          <Column>
            <Flex>
              <ActionIcon
                src={metadata.data ? metadata.data.icon : defaultAction}
                alt=""
              />
              {metadata.data ? metadata.data.title : item?.type}
            </Flex>
            {/* <Description>
              <Text>{metadata.data ? metadata.data.description : ''}</Text>
            </Description> */}
          </Column>
        </TableCell>
        <TableCell>
        <Time>
<Flex>
          {
          // eslint-disable-next-line 
          primitives.map(p => {
            console.log(p)
            console.log(primitives)
            switch (p.type) {
              case 'Bridge':
                return <Text>
                  {formatTokenAmount(p?.movements[0].amount, p?.movements[0].token.decimals, {
                    digits: 4,
                  })} {p?.movements[0].token.symbol}</Text>

              case 'Swap' :

                return (
                  <Text> 
                    <Flex>
                <Swap>
                {formatTokenAmount(p?.movements[0].amount, p?.movements[0].token.decimals, {
                  digits: 4,
                })} {p?.movements[0].token.symbol} 
                </Swap>
                <Arrow>
                {'>'}  

                </Arrow>
                <Swap>
                {formatTokenAmount(p?.movements[1].amount, p?.movements[1].token.decimals, {
                  digits: 4,
                })} {p?.movements[1].token.symbol}
                </Swap>
                </Flex>
                </Text>
                )

              case 'Wrap' :
                return <Text>+ wrap</Text>


              // case 'Withdraw':
              //   if (p.data === '0x') {
              //     return <Text>
              //       {formatTokenAmount(p?.movements[0].amount, p?.movements[0].token.decimals, {
              //         digits: 4,
              //       })} {p?.movements[0].token.symbol}</Text>
              //   }
                // eslint-disable-next-line no-unreachable
              default:
                return <></>
            }
          })
          }
          </Flex>
        </Time>

        </TableCell>


        {width >= medium && (
          <TableCell>
            {/* {item?.transaction?.sender} */}
            <AddressName address={item?.transaction?.sender} />
          </TableCell>
        )}
        <TableCell>
          <Link href={getEtherscanLink(chain, item?.transaction?.hash, 'transaction')}>
          <OpenLink alt="" src={openImg} />

          </Link>
          <ActionDetail
            title={metadata.data ? metadata.data.successMessage : item?.type}
            primitives={primitives}
            open={isOpen}
            onClose={() => setOpen(!isOpen)}
          />
        </TableCell>
      </Row>
    </>
  )
}
const Row = styled(TableRow)`
  cursor: pointer;
`
const OpenLink = styled.img`
  height: 20px;
`

const Flex = styled.div`
  display: flex;
  
`
const Swap = styled.div`
  display: flex;
  min-width: 120px;
  
`
const Arrow = styled.div`
  width: 30px;
  
`

const Link = styled.a`
  &:hover {
    transition: 0.15s ease color;
    color: ${props => props.theme.mainDefault};
  }

`

const Time = styled.div`
  /* color: #6a6a6a; */
  padding-top: 7px;
  font-size: 14px;
  min-width: 101px;

`

// const Description = styled.div`
//   color: #6a6a6a;
//   padding-top: 7px;
//   font-size: 14px;
//   max-width: 251px;

// `
const ChainLogo = styled.img`
  width: 25px;
  object-fit: scale-down;
`
const Column = styled.div`
  display: flex;
  flex-direction: column;
`

const Text = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 400px;
  margin: 0;
  margin-right: 3px;
`
const ActionIcon = styled.img`
  height: 23px;
  margin-right: 15px;
  @media only screen and (max-width: 700px) {
    height: 17px;
    margin-right: 5px;
  }
`

export default Action
