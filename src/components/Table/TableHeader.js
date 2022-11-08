import React from 'react'
import styled from 'styled-components'

function TableHeader({ title, align = 'left', ...props }) {
  return (
    <Header
      css={`

      `}
      {...props}
    >
      {title}
    </Header>
  )
}

const Header = styled.th`
padding: 0;
padding-left: ${props => props.align === 'left' ? 21 : 0}px;
padding-right: ${props => props.align === 'right' ? 21 : 0}px;
text-align: ${props => props.align};
white-space: nowrap;
color: white;
line-height: 32px;
`

export default TableHeader
