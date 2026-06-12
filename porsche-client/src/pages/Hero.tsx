import React from 'react'

const Hero = () => {
  return (
     <section className="relative h-[100dvh] w-full overflow-hidden">
      <video autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover">
        <source src="/video-hero.mp4" type="video/mp4" />
      </video>

    </section>
  )
}

export default Hero
