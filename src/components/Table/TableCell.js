import React from 'react'
import styled from 'styled-components'


function TableCell({ children, align, ...props }) {
  return (
    <Td {...props}>
      <Content align={align}>
        {children}
      </Content>
    </Td>
  )
}

const Td = styled.td`
  padding: 20px;
  color: #fff;
  vertical-align: text-top;
  text-align: ${props => props.align};
  @media only screen and (max-width: 700px) {
    padding: 20px 10px;
  }
`

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${props => props.align === 'right' ? 'flex-end' : 'flex-start'};
`

export default TableCell
