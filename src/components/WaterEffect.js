import React from 'react'
import Watersvg from '../icons/Watersvg'

const WaterEffect = ({ isInCenter }) => {
  return (
    <>
      <div class={`header ${isInCenter ? 'center' : ''}`}>
        <div class={`inner-header  ${isInCenter ? 'center' : ''}`}>
          <h1>West Coast Brandmakers,</h1>
          <h2>with a global edge.</h2>
        </div>

        <div>
          <Watersvg isInCenter={isInCenter} />
        </div>
      </div>
    </>
  )
}

export default WaterEffect
