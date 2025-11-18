import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const chapters = [
  {
    id: 1,
    title: 'The Spark of Curiosity',
    image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop',
    content: 'From the earliest moments, there was a fascination—an insatiable hunger to understand how the world works. Every question led to another, every answer revealed deeper mysteries. Like a scholar absorbed in ancient texts, the journey began with simple wonder and evolved into purposeful exploration.',
    keywords: ['Wonder', 'Exploration', 'Learning']
  },
  {
    id: 2,
    title: 'Philosophy & Vision',
    image: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop',
    content: "Technology should feel alive, intuitive, and deeply human. The vision emerged: to create systems that don't just compute, but understand—that don't just respond, but anticipate. Innovation is not about complexity, but about finding elegant simplicity in the chaos.",
    keywords: ['Innovation', 'Elegance', 'Human-Centered']
  },
  {
    id: 3,
    title: 'Beyond the Code',
    image: 'https://images.unsplash.com/photo-1519074002996-a69e7ac46a42?q=80&w=1600&auto=format&fit=crop',
    content: 'Behind every line of code lies a deeper story—of mentorship, of growth, of connecting with others. The greatest innovations emerge not from isolation, but from collaboration, from understanding that technology serves humanity, not the other way around.',
    keywords: ['Mentorship', 'Growth', 'Connection']
  },
  {
    id: 4,
    title: 'Journey Continues',
    image: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop',
    content: 'This is not an ending, but an invitation. Every project, every line of code, every interaction is a step in an infinite journey. The portfolio ahead reveals the tangible manifestations of these principles—where philosophy meets practice, where vision becomes reality.',
    keywords: ['Innovation', 'Excellence', 'Future']
  }
]

export default function About() {
  const [index, setIndex] = useState(0)
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.chapter', { opacity: 0, y: 20, duration: 0.6, stagger: 0.15, ease: 'power2.out' })
    }, containerRef)
    return () => ctx.revert()
  }, [index])

  const next = () => setIndex((p) => (p + 1) % chapters.length)
  const prev = () => setIndex((p) => (p - 1 + chapters.length) % chapters.length)

  const item = chapters[index]

  return (
    <section id="about" className="relative min-h-[100svh] flex items-center py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_35%),radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.12),transparent_40%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      <div ref={containerRef} className="relative z-10 max-w-6xl mx-auto w-full px-6 md:px-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-10 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="chapter">
              <div className="relative group overflow-hidden rounded-2xl">
                <img src={item.image} alt={item.title} className="w-full h-72 md:h-[420px] object-cover scale-105 group-hover:scale-[1.08] transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
              </div>
            </div>
            <div className="chapter">
              <h3 className="text-2xl md:text-3xl font-bold text-white/90">{item.title}</h3>
              <p className="mt-4 text-blue-200/80 leading-relaxed">{item.content}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.keywords.map((k) => (
                  <span key={k} className="text-xs px-3 py-1 rounded-full bg-white/10 text-blue-100/90 border border-white/10 shadow hover:shadow-[0_0_24px_rgba(59,130,246,0.35)] transition">{k}</span>
                ))}
              </div>
              <div className="mt-8 flex items-center gap-3">
                <button onClick={prev} className="px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white hover:bg-white/15">Prev</button>
                <button onClick={next} className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-slate-950 font-semibold shadow">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
