import React, { useEffect, useState } from 'react'
import moment from 'moment'
import styled from 'styled-components'
import TableRow from '../components/Table/TableRow'
import TableCell from '../components/Table/TableCell'
import defaultAction from '../assets/default-action.svg'
import useActionMetadata from '../hooks/useActionMetadata'
import AddressName from '../components/AddressName'
import { CHAIN_INFO } from '../constants/chainInfo'
import { formatTokenAmount } from '../utils/math-utils'

const ActivityItem = ({ primitives, chain }) => {
  const item = primitives && primitives[0]
  const metadata = useActionMetadata(item?.transaction?.target, chain)
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))
  }, [])
  const medium = 700
  const [isOpen, setOpen] = useState(false)

  console.log(
    'action type:',
    item?.type,
    'metadata title:',
    metadata?.data?.title,
    'primitives:',
    primitives
  )

  return (
    <>
      <Row key={item?.id} onClick={() => setOpen(!isOpen)}>
        <TableCell align="left">
          <ChainLogo src={CHAIN_INFO[chain]?.logoUrl} />
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
          </Column>
        </TableCell>
        <TableCell>
          <Success>Fullfilled</Success>
        </TableCell>

        <TableCell>
          <Time>
            {// eslint-disable-next-line

            primitives?.map((p, i) => {
              switch (p.type) {
                case 'Bridge':
                  return (
                    <Text key={i}>
                      {formatTokenAmount(
                        p?.movements[0].amount,
                        p?.movements[0].token.decimals,
                        {
                          digits: 4,
                        }
                      )}{' '}
                      {p?.movements[0].token.symbol}
                    </Text>
                  )

                case 'Swap':
                  return (
                    <Text key={i}>
                      <Flex>
                        {formatTokenAmount(
                          p?.movements[0].amount,
                          p?.movements[0].token.decimals,
                          {
                            digits: 4,
                          }
                        )}
                        {'  '}
                        {p?.movements[0].token.symbol} <Arrow>➡️</Arrow>
                        {formatTokenAmount(
                          p?.movements[1].amount,
                          p?.movements[1].token.decimals,
                          {
                            digits: 4,
                          }
                        )}{' '}
                        {p?.movements[1].token.symbol}
                      </Flex>
                    </Text>
                  )

                case 'Wrap':
                  return <Text key={i}>+ wrap</Text>

                default:
                  return <></>
              }
            })}
          </Time>
        </TableCell>

        {width >= medium && (
          <TableCell>
            <AddressName address={item?.transaction?.sender} />
          </TableCell>
        )}
        <TableCell>
          <Time>
            {item?.transaction?.executedAt ? (
              <Column>
                {moment.unix(item?.transaction?.executedAt).fromNow()}
              </Column>
            ) : (
              '-'
            )}
          </Time>
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

const Success = styled.div`
  color: ${props => props.theme.success};
`

const Arrow = styled.div`
  width: 30px;
  display: flex;
  justify-content: center;
`

const Time = styled.div`
  padding-top: 7px;
  font-size: 14px;
  min-width: 101px;
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
export default ActivityItem
