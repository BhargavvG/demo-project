import React, { useRef } from 'react'
import WaterEffect from '../components/WaterEffect'
import CircleCanvas from '../components/CircleCanvas'
import useIsInViewport from '../utils/useIsInViewport'
const Home = () => {
  const circleRef = useRef(null)
  const isInCenter = useIsInViewport(circleRef)
  return (
    <div>
      <WaterEffect isInCenter={isInCenter} />
      <div style={{ position: 'relative' }}>
        <div className={`heading-section ${isInCenter ? 'centered' : ''}`}>
          <h1>Agency - Subscription</h1>
          <h1>Modal, Built to scale your</h1>
          <h1>Brand into the future</h1>
        </div>
        <CircleCanvas isInCenter={isInCenter} circleRef={circleRef} />
      </div>

    </div>
  )
}

export default Home
