import React, { useState, useEffect } from 'react'
import { Inside } from 'use-inside'
import styled from 'styled-components'

const MENUWIDTH = 216

function Split({ primary, secondary, invert }) {
  const large = 900
  const [width, setWidth] = useState(window.innerWidth)
  const [oneColumn, setOneColumn] = useState(false)
  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))
    if (width < large) {
      setOneColumn(true)
    }
  }, [width])

  const primaryContent = (
    <Inside name="Split:primary">
      <Primary oneColumn={oneColumn}>{primary}</Primary>
    </Inside>
  )

  const secondaryContent = (
    <Inside name="Split:secondary">
      <Secondary oneColumn={oneColumn}>{secondary}</Secondary>
    </Inside>
  )

  return (
    <Inside name="Split">
      <Content oneColumn={oneColumn}>
        {secondaryContent}
        {primaryContent}
      </Content>
    </Inside>
  )
}

const Content = styled.div`
  display: ${props => (props.oneColumn ? 'block' : 'flex')};
  padding-bottom: 24px;
  width: 100%;
`

const Primary = styled.div`
  flex-grow: 1;
  margin-left: ${props => (!props.oneColumn ? '16' : '0')}px;
  padding-top: ${props => (props.oneColumn ? '16' : '0')}px;
  width: ${props =>
    props.oneColumn ? '100%' : 'calc(100% - ' + MENUWIDTH + 'px)'};
`

const Secondary = styled.div`
  flex-shrink: 0;
  flex-grow: 0;
  width: ${props => (props.oneColumn ? '100%' : MENUWIDTH + 'px')};
  margin-right: ${props => (!props.oneColumn ? 16 : 0)}px;
  padding-top: ${props => (props.oneColumn ? 16 : 0)}px;
`
export { Split }
export default Split
