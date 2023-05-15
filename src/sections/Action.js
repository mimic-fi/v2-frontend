import React, { useEffect, useState } from 'react'
import moment from 'moment'
import styled from 'styled-components'
import TableRow from '../components/Table/TableRow'
import TableCell from '../components/Table/TableCell'
import ActionDetail from './ActionDetail'
import check from '../assets/success.svg'
import defaultAction from '../assets/default-action.svg'
import useActionMetadata from '../hooks/useActionMetadata'
import AddressName from '../components/AddressName'
import { CHAIN_INFO } from '../constants/chainInfo'
import { formatTokenAmount } from '../utils/math-utils'

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
                {moment.unix(item?.transaction?.executedAt).format('YYYY-MM-DD ')} <br />
                {moment.unix(item?.transaction?.executedAt).format('HH:mm:ss')}
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
            <Description>
              <Text>{metadata.data ? metadata.data.description : ''}</Text>
            </Description>
          </Column>
        </TableCell>
        <TableCell>
          {
          // eslint-disable-next-line 
          primitives.map(p => {
            switch (p.type) {
              case 'Bridge':
                return <Text>
                  {formatTokenAmount(p?.movements[0].amount, p?.movements[0].token.decimals, {
                    digits: 4,
                  })} {p?.movements[0].token.symbol}</Text>

              case 'Swap':
                return <Text> {formatTokenAmount(p?.movements[0].amount, p?.movements[0].token.decimals, {
                  digits: 4,
                })} {p?.movements[0].token.symbol} ➡️  {formatTokenAmount(p?.movements[1].amount, p?.movements[1].token.decimals, {
                  digits: 4,
                })} {p?.movements[1].token.symbol}</Text>

              case 'Withdraw':
                if (p.data === '0x') {
                  return <Text>
                    {formatTokenAmount(p?.movements[0].amount, p?.movements[0].token.decimals, {
                      digits: 4,
                    })} {p?.movements[0].token.symbol}</Text>
                }
                break
              default:
                return <></>
            }
          })
          }
        </TableCell>


        {width >= medium && (
          <TableCell>
            <AddressName address={item?.transaction?.sender} />
          </TableCell>
        )}
        <TableCell>
          <img src={check} alt="check" />
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

const Flex = styled.div`
  display: flex;
  
`

const Time = styled.div`
  /* color: #6a6a6a; */
  padding-top: 7px;
  font-size: 14px;
  min-width: 101px;

`

const Description = styled.div`
  color: #6a6a6a;
  padding-top: 7px;
  font-size: 14px;
  max-width: 251px;

`
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
