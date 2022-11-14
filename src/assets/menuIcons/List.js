import React from 'react'

function List({ fill = '#a996ff' }) {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 12.5L9 12.5M21 6.5L9 6.5M21 18.5L9 18.5M5 12.5C5 13.0523 4.55228 13.5 4 13.5C3.44772 13.5 3 13.0523 3 12.5C3 11.9477 3.44772 11.5 4 11.5C4.55228 11.5 5 11.9477 5 12.5ZM5 6.5C5 7.05228 4.55228 7.5 4 7.5C3.44772 7.5 3 7.05228 3 6.5C3 5.94772 3.44772 5.5 4 5.5C4.55228 5.5 5 5.94772 5 6.5ZM5 18.5C5 19.0523 4.55228 19.5 4 19.5C3.44772 19.5 3 19.0523 3 18.5C3 17.9477 3.44772 17.5 4 17.5C4.55228 17.5 5 17.9477 5 18.5Z"
        stroke={fill}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default List
