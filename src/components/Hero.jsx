import { useEffect, useRef } from 'react'
import Spline from '@splinetool/react-spline'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const titleRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()
    tl.from(titleRef.current, { y: 24, opacity: 0, duration: 0.8, ease: 'power3.out' })
      .from(subRef.current, { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
      .from(ctaRef.current, { scale: 0.9, opacity: 0, duration: 0.6, ease: 'back.out(1.6)' }, '-=0.3')

    gsap.to('.hero-orb', {
      y: 18, x: 8, repeat: -1, yoyo: true, duration: 3, ease: 'sine.inOut'
    })
  }, [])

  return (
    <section id="home" className="relative min-h-[100svh] flex items-center">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/7m4PRZ7kg6K1jPfF/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/30 to-slate-950/70" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-24 w-full">
        <div className="max-w-3xl">
          <h1 ref={titleRef} className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white/90 leading-[1.05]">
            Hi, I’m Mattral – <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-500">Machine Learning Engineer</span>
          </h1>
          <p ref={subRef} className="mt-4 text-lg md:text-xl text-blue-200/80">
            Machine Learning Engineer | Data Analyst | Maker — glass reflections drift as ambient sound hums softly.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <a ref={ctaRef} href="#about" className="group inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-white border border-white/15 backdrop-blur-md hover:bg-white/15 transition shadow-[0_0_24px_rgba(59,130,246,0.35)]">
              <span className="font-semibold">Enter the Journey</span>
              <span className="hero-orb inline-block w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_16px_rgba(6,182,212,0.9)]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
