import React from 'react'

const Watersvg = ({ isInCenter }) => {
  return (
    <svg
      class="waves"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 24 150 28"
      preserveAspectRatio="none"
      shape-rendering="auto"
    >
      <defs>
        <path
          id="gentle-wave"
          d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          fill={`${isInCenter ? "linear-gradient(60deg, #000000 0%, #000000 100%)" :"linear-gradient(60deg, rgba(84,58,183,1) 0%, rgba(0,172,193,1) 100%)"}`}
        ></path>
      </defs>
      <g class="parallax">
        <use xlinkHref="#gentle-wave" x="48" y="0" fill={`${isInCenter ? "#000000" : "rgb(10, 159, 192,0.7)" }`}></use>
        <use xlinkHref="#gentle-wave" x="48" y="3" fill={`${isInCenter ? "#000000" : "rgba(75,70,184,0.5)" }`}></use>
      </g>
    </svg>
  )
}

export default Watersvg
