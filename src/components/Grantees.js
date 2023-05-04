import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { BodyS } from '../styles/texts'
import { SMART_VAULT_FUNCTIONS_HASHED } from '../utils/smartVault-utils'

const Grantees = ({ grantees }) => {
  const [showAll, setShowAll] = useState(false)
  const [text, setText] = useState('')

  useEffect(
    () => {
      const textArray = grantees.permissions.map((p, i) =>
        getMethodName(p.method)
      )
      setText(textArray.join('\n'))
    },
    [grantees]
  )

  const toggleShowAll = () => setShowAll(!showAll)
  const toggleText = showAll ? 'Hide details' : 'Show details'
  const textLines = text.split('\n')
  const visibleText = showAll ? text : textLines.slice(0, 4).join('\n')

  return (
    <div>
      <TextSec>{visibleText}</TextSec>
      {textLines.length > 4 && (
        <SeeMore onClick={toggleShowAll}>{toggleText}</SeeMore>
      )}
    </div>
  )
}

const getMethodName = method => {
  const meth = method.slice(2)
  return SMART_VAULT_FUNCTIONS_HASHED[meth]
}

const SeeMore = styled(BodyS)`
  font-weight: 700;
  cursor: pointer;
  color: #5dfbd7;
`

const TextSec = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  color: #a5a1b7;
  line-height: 22px;
`


export default Grantees
