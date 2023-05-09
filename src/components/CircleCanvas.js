import React, { useEffect, useRef, useState } from 'react'

const CircleCanvas = ({ circleRef, isInCenter }) => {
  const canvasRef = useRef(null)
  const [circleRadius, setCircleRadius] = useState(600)

  const handleMouseMove = (e) => {
    const ctx = canvasRef?.current.getContext('2d')
    const { clientX } = e
    let prevX = clientX
    const updateShadowOffset = () => {
      const diff = clientX / 15

      // Calculate the new shadow offset based on mouse movement
      const newShadowOffsetX = 40 - diff
      const newShadowOffsetY = 40 - diff
      // Update the shadow offsets
      ctx.shadowOffsetX = newShadowOffsetX
      ctx.shadowOffsetY = newShadowOffsetY

      prevX = clientX
      requestAnimationFrame(updateShadowOffset)
    }

    updateShadowOffset()
  }

  const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const targetRadius = isInCenter ? 150 : 600
    const duration = 1000
    const startRadius = circleRadius
    const startTime = performance.now()

    const animateCircle = () => {
      const elapsed = performance.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeInOutCubic(progress)
      const currentRadius = startRadius + (targetRadius - startRadius) * easedProgress

      // Draw the background gradient for the second circle
      const gradient = ctx.createRadialGradient(centerX, centerY, currentRadius, centerX, centerY, 0)
      gradient.addColorStop(0, 'rgba(84, 58, 183, 1)')
      gradient.addColorStop(1, 'rgba(0, 172, 193, 1)')

      ctx.fillStyle = isInCenter ? '#000000' : gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw the glowing circle animation
      const glowRadius = currentRadius + 20
      const glowOpacity = (1 - easedProgress) * 0.5 + 0.1 // Adjust the opacity as needed

      ctx.save()
      ctx.beginPath()
      ctx.arc(centerX, centerY, glowRadius, 0, 2 * Math.PI)
      //   Glow of black background
      const gradient3 = ctx.createRadialGradient(centerX, centerY, currentRadius, centerX, centerY, 0)
      gradient3.addColorStop(0, 'rgba(25, 0, 193, 0.5)')
      gradient3.addColorStop(0.5, 'rgba(25, 0, 193, 0)')
      gradient3.addColorStop(1, 'rgba(193, 0, 97, ' + glowOpacity + ')')
      //   Glow of gradient background
      const gradient4 = ctx.createRadialGradient(centerX, centerY, currentRadius, centerX, centerY, 0)
      gradient4.addColorStop(0, 'rgba(0, 172, 193, 0.1)')
      gradient4.addColorStop(1, 'rgba(84, 58, 183, 0.1)')
      ctx.fillStyle = isInCenter ? gradient3 : gradient4

      ctx.shadowColor = 'rgba(0, 172, 193, 0.3)'
      ctx.shadowBlur = 50
      ctx.shadowOffsetX = -40
      ctx.shadowOffsetY = -40
      ctx.fill()
      ctx.restore()

      // Draw the main circle
      ctx.beginPath()
      ctx.arc(centerX, centerY, currentRadius, 0, 2 * Math.PI)
      const gradient2 = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient2.addColorStop(0, 'rgba(0, 172, 193, 1)') // End color
      gradient2.addColorStop(1, 'rgba(84, 58, 183, 1)') // Start color with brightness
      ctx.fillStyle = isInCenter ? '#000000' : gradient2
      ctx.fill()

      if (progress < 1) {
        requestAnimationFrame(animateCircle)
      } else {
        setCircleRadius(targetRadius)
      }
    }

    animateCircle()

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset
      const windowHeight = window.innerHeight
      const canvasTop = canvas.offsetTop
      const canvasBottom = canvasTop + canvas.height
      const viewportCenter = scrollY + windowHeight / 2

      if (canvasBottom < viewportCenter && !isInCenter) {
        animateCircle(600, 1000) // Circle is in the viewport, set radius to 600
      } else if (canvasBottom >= viewportCenter && isInCenter) {
        animateCircle(150, 1000) // Circle is in the center, set radius to 150
      }
    }

    window.addEventListener('scroll', handleScroll)
    // Clean up the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [canvasRef?.current, isInCenter, circleRef?.current?.offsetTop, circleRadius])

  return (
    <div id="canvas-wrap">
      <canvas
        ref={canvasRef}
        width={1920}
        height={600}
        style={{
          background: isInCenter
            ? 'linear-gradient(60deg, #000000 0%, #000000 100%)'
            : 'linear-gradient(60deg, rgba(84,58,183,1) 0%, rgba(0,172,193,1) 100%)',
        }}
        onMouseEnter={handleMouseMove}
        onMouseMove={handleMouseMove}
      />
      <div className="center-canvas" ref={circleRef}></div>
    </div>
  )
}

export default CircleCanvas
