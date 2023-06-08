import React from 'react'

function Home({ fill = '#A288DF', opacity  = 1 }) {
  return (
    <svg
      width="33"
      height="35"
      viewBox="0 0 33 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity={opacity}>
        <path
          d="M10.1357 14.8779V24.8823"
          stroke={fill}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M16.5525 10.0909V24.8824"
          stroke={fill}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M22.8642 20.1644V24.8822"
          stroke={fill}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M22.9429 2.9165H10.0571C5.56548 2.9165 2.75 6.28829 2.75 11.0615V23.9381C2.75 28.7114 5.55238 32.0832 10.0571 32.0832H22.9429C27.4476 32.0832 30.25 28.7114 30.25 23.9381V11.0615C30.25 6.28829 27.4476 2.9165 22.9429 2.9165Z"
          stroke={fill}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  )
}

export default Home
