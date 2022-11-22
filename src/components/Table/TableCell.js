import React from 'react'
import styled from 'styled-components'

function ContentContainerDefault({ align = 'left', ...props }) {
  return <Content {...props} />
}

function TableCell({ children, align, ...props }) {
  return (
    <Td {...props}>
      <ContentContainerDefault align={align}>
        {children}
      </ContentContainerDefault>
    </Td>
  )
}

const Td = styled.td`
  padding: 20px;
  background: #2d3034;
  text-align: ${props => props.align};
  @media only screen and (max-width: 700px) {
    padding: 20px 5px;
  }
`

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${props => props.align === 'right' ? 'flex-end' : 'flex-start'};
`

export default TableCell
