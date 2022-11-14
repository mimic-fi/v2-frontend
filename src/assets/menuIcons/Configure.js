import React from 'react'

function Configure({ fill = '#a996ff' }) {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 17.5H13"
        stroke={fill}
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M10 7.5H20"
        stroke={fill}
        stroke-width="2"
        stroke-linecap="round"
      />
      <circle cx="17" cy="17.5" r="3" stroke={fill} stroke-width="2" />
      <circle cx="6" cy="7.5" r="3" stroke={fill} stroke-width="2" />
    </svg>
  )
}

export default Configure
