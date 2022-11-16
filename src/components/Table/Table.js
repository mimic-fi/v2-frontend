import React from 'react'
import styled from 'styled-components'

function Table({ header, children, noSideBorders = 'false', ...props }) {
  return (
    <StyledTable noSideBorders={noSideBorders} {...props}>
      {header && <thead>{header}</thead>}
      <tbody>{children}</tbody>
    </StyledTable>
  )
}

const BORDER = '#414141'

const StyledTable = styled.table`
  width: 100%;
  border-spacing: 0;
  background: #2d3034;
  box-shadow: 0px 4px 40px rgba(26, 28, 30, 0.24);
  border-radius: 8px;

  td {
    border-bottom: 1px solid ${BORDER};
  }

  /* First and last cell styling */
  tr:first-child td {
    border-top: 1px solid ${BORDER};
  }
`

export default Table
