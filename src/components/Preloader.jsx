import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const tlRef = useRef(null)
  const barRef = useRef(null)
  const wrapRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    // Fake loader for demo; in production tie into image/asset loading
    const total = 100
    let current = 0
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 6) + 1
      if (current >= total) current = total
      setProgress(current)
      if (current === total) {
        clearInterval(interval)
        // exit sequence
        const tl = gsap.timeline({ onComplete: onComplete })
        tl.to(barRef.current, { width: '100%', duration: 0.4, ease: 'power2.out' })
          .to(labelRef.current, { opacity: 0.6, duration: 0.2 }, '<')
          .to(barRef.current, { opacity: 0, duration: 0.3 })
          .to(wrapRef.current, { scale: 0.85, opacity: 0, filter: 'blur(8px)', duration: 0.6, ease: 'power3.inOut' })
      }
    }, 60)
    return () => clearInterval(interval)
  }, [onComplete])

  useEffect(() => {
    // entry animation
    tlRef.current = gsap.timeline()
    tlRef.current.from(wrapRef.current, { opacity: 0, scale: 1.04, duration: 0.6, ease: 'power2.out' })
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950">
      <div ref={wrapRef} className="relative w-[min(560px,92vw)] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center shadow-[0_0_60px_rgba(59,130,246,0.25)]">
        <div className="mb-6">
          <div className="text-3xl md:text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 drop-shadow">MATTRAL</div>
          <div ref={labelRef} className="mt-2 text-sm text-blue-200/70">Initializing cinematic experience…</div>
        </div>
        <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
          <div ref={barRef} className="h-full w-[0%] bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500"></div>
        </div>
        <div className="mt-3 text-xs text-blue-200/70">{progress}%</div>
      </div>
    </div>
  )
}
