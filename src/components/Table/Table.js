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

const StyledTable = styled.table`
  width: 100%;
  border-spacing: 0;
  border-radius: 8px;

  td {
    border-bottom: 2px solid ${props => props.theme.tableBorder};
  }

  /* First and last cell styling */
  tr:first-child td {
    border-top: 2px solid ${props => props.theme.tableBorder};
  }
  td:first-child, th:first-child {
    padding-left: 0;
  }
  td:last-child, th:last-child {
    padding-right: 0;
  }
`

export default Table
