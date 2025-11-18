import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const universityLogos = {
  "Imperial College London": "https://i.namu.wiki/i/Hr6ppbZ_Zg9wYD3I8GR8-Ya9M07NVvGUCffEDN759nggN-DB1VnP8saahjUgVcV40OqgVcj2l92UbyIntb7c1g.webp",
  "Geneva Business School": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGgZfYXQOT_Pq0Lehce7ZvLJ2hQj6bo3jWIQ&s",
  "University of the People": "https://via.placeholder.com/100/06b6d4/ffffff?text=UoPeople",
  "International University of Applied Sciences Berlin": "https://via.placeholder.com/100/8b5cf6/ffffff?text=IU",
  "Thanlyin Technological University": "https://via.placeholder.com/100/6366f1/ffffff?text=TTU"
}

const education = [
  { degree: "MSc in Data Science and Machine Learning", institution: "Imperial College London", logo: "🎓" },
  { degree: "Computer Science", institution: "University of the People", logo: "💻" },
  { degree: "Data Science and Applied AI", institution: "International University of Applied Sciences Berlin", logo: "🤖" },
  { degree: "BIM in Business Statistics", institution: "Geneva Business School", logo: "📊" },
  { degree: "Mechatronic Engineering", institution: "Thanlyin Technological University", logo: "⚙️" },
]

export default function Education() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.edu-item').forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 80%' },
          y: 40, opacity: 0, duration: 0.9, ease: 'power3.out'
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="education" ref={sectionRef} className="relative py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(59,130,246,0.12),transparent_35%),radial-gradient(circle_at_90%_90%,rgba(236,72,153,0.12),transparent_35%)]" />
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white/90 mb-10">Education</h2>
        <div className="space-y-10">
          {education.map((ed, idx) => (
            <div key={ed.degree} className="edu-item rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-10 shadow-2xl">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <img src={universityLogos[ed.institution]} alt={ed.institution} className="w-16 h-16 rounded-xl object-cover border border-white/10" />
                <div>
                  <div className="text-xl md:text-2xl font-semibold text-white/90">{ed.degree}</div>
                  <div className="text-blue-200/80 mt-1">{ed.institution} <span className="ml-2">{ed.logo}</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
