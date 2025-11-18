import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Projects() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.proj', { y: 30, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={ref} className="relative py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(59,130,246,0.12),transparent_40%)]" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white/90 mb-10">Personal Projects & Blog</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="proj rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow hover:shadow-[0_0_40px_rgba(59,130,246,0.35)] transition">
              <div className="h-40 rounded-xl bg-gradient-to-br from-cyan-400/20 to-fuchsia-500/20 border border-white/10" />
              <div className="mt-4 text-xl font-semibold text-white/90">Project {i + 1}</div>
              <p className="text-blue-200/80">Cinematic placeholder description with elegant glow.</p>
              <a href="#" className="mt-4 inline-flex px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white hover:bg-white/15">Read more</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
