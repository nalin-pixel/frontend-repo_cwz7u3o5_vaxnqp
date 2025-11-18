import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  { period: "AUG 2025 – CURRENT", title: "Data Analyst", company: "Amazon Web Services (AWS)" },
  { period: "JUN 2024 – JUL 2025", title: "Instrument ML Engineer", company: "Total Energies" },
  { period: "FEB 2025 – CURRENT", title: "Programme Support Coordinator", company: "BeyondQuantum | Beyond Thinking" },
  { period: "2023 – JUL 2024", title: "Junior Instrument Engineer", company: "PTTEP" },
  { period: "SEP 2023 – FEB 2024", title: "Machine Learning Engineer", company: "Omdena" },
  { period: "2023", title: "Open Source Contributor", company: "Google Summer of Code" },
  { period: "DEC 2022 – JAN 2023", title: "Developer Intern", company: "Accenture" },
  { period: "AUTUMN 2022", title: "Software Engineering Intern", company: "Cisco" },
  { period: "2021 – 2022", title: "System Admin & Analyst", company: "Snowy" },
  { period: "2017 – 2018", title: "Apprentice Electronics Technician", company: "Digital Star Electronics" },
]

export default function Experience() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.xp-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out'
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="relative py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.12),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.12),transparent_40%)]" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white/90 mb-10">Career Timeline</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((xp) => (
            <div key={xp.title+xp.period} className="xp-card rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow hover:shadow-[0_0_40px_rgba(59,130,246,0.35)] transition">
              <div className="text-xs uppercase tracking-wide text-blue-200/70">{xp.period}</div>
              <div className="mt-2 text-xl font-semibold text-white/90">{xp.title}</div>
              <div className="text-blue-200/80">{xp.company}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
