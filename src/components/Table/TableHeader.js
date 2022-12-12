import React from 'react'
import styled from 'styled-components'

function TableHeader({ title, align = 'left', ...props }) {
  return (
    <Header {...props} align={align}>
      {title}
    </Header>
  )
}

const Header = styled.th`
  padding-left: ${props => (props.align === 'left' ? 21 : 0)}px;
  padding-right: ${props => (props.align === 'right' ? 21 : 0)}px;
  padding-top: 40px;
  padding-bottom: 40px;
  text-align: ${props => props.align};
  white-space: nowrap;
  font-size: 15px;
  line-height: 24px;
  letter-spacing: 0.75px;
  color: ${props => props.theme.tableHeaderColor};

  @media only screen and (max-width: 700px) {
    padding-left: ${props => (props.align === 'left' ? 10 : 0)}px;
    padding-right: ${props => (props.align === 'right' ? 10 : 0)}px;
  }
`

export default TableHeader
