import React from 'react'

function Home({ fill = '#a996ff' }) {
  return (
    <svg
      fill="none"
      height="25"
      viewBox="0 0 22 25"
      width="22"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m1 10.3801c0-.95351.45332-1.85027 1.22115-2.41568l8.77885-6.46442 8.7788 6.46443c.7679.5654 1.2212 1.46216 1.2212 2.41567v10.6199c0 1.3807-1.1193 2.5-2.5 2.5h-3.5c-.5523 0-1-.4477-1-1v-6c0-.2761-.2239-.5-.5-.5h-5c-.27614 0-.5.2239-.5.5v6c0 .5523-.44772 1-1 1h-3.5c-1.38071 0-2.5-1.1193-2.5-2.5z"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

export default Home
