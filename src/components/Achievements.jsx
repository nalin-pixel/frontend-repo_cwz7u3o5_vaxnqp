import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const achievements = [
  "🏆 Achieved Regional First 2 times in AWS Deepracer using Deep Reinforcement Learning",
  "🎓 Selected for Leadership Program from Harvard Business School's Aspire Institute",
  "👨🏻‍🎓 DAAD, Imperial, The Manchester, and Gates Scholarships",
  "⭐ Young Engineer and Scientist's Award & Asia Innovator Award",
  "🌏 Chosen for prestegious ASEF Young Leaders Summit (ASEFYLS)",
  "💡 1st Award National Hackathon, OpenAI, Semantic Search, Codex Hackathons",
  "🌍 Finalist in 2023 & 2024 Global Climate Science Olympiad - Top 0.1% globally",
  "🥈 Silver Maker Award from K-Lab IoT project competition with Korea",
  "⚛️ Invited to NEW Youth Forum and Nuclear Reactor Technology Fellowship at Obninsk",
  "🇯🇵 Invited to Japan International Youth Innovation Summit",
  "🌐 Selected for Asia World Model United Nations and ASEAN Youth Economic Forum 2024",
  "💎 Womanium Quantum Computing and AI Scholarship recipient",
  "☁️ Oracle and AWS certified Data Scientist",
  "🏆 AWS AI & ML Scholarship Phase 1 to 3 Finalist",
  "🌟 Junior Achievement Community Builder Alumni",
  "🌐 World Science Forum delegate"
]

const extracurricular = [
  "👩🏻‍🚀 NASA IMAP and EUROPA participant",
  "🏥 Developed & Donated 2 AIoT trollies for Covid-19 Center with patient monitoring",
  "⚜️ Rover Scout volunteer in Thanlyin Technological University",
  "🤖 Clash of Robots competition participant (2017)",
  "💚 Healthy Gateway project for MAKE-A-Thon (2020)",
  "💻 OpenAI + Semantic Search + AI21 Labs, and 15+ Global Hackathons participant",
  "📱 AIoT based Attendance System developer",
  "🦾 Self-Balancing Bi-pedal Humanoid project creator",
  "👨‍🏫 Technical Mentor at LabLabAI",
  "🔬 Contributor in Atlas AI Research",
  "🦾 Mobile Robotic ARM with Gesture Interpretation System",
  "🌍 Chapter Lead on Omdena Myanmar Chapter",
  "🚀 NASA Virtual Guest Program Participant",
  "♟️ 2300+ Elo in Chess",
  "🎤 Microsoft Learn Student Ambassador",
  "🇰🇷 South Korean Student Exchange"
]

export default function Achievements() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
      })
      tl.from('.ach-title', { y: 20, opacity: 0, duration: 0.6 })
      tl.from('.ach-left .card', { x: -50, opacity: 0, stagger: 0.08, duration: 0.6 }, '-=0.2')
      tl.from('.ach-right .card', { x: 50, opacity: 0, stagger: 0.08, duration: 0.6 }, '-=0.4')
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="achievements" ref={sectionRef} className="relative py-24 min-h-[100svh]">
      <div className="absolute inset-0">
        <div className="w-full h-[50vh]">
          <iframe src='https://my.spline.design/galaxyrollercoaster-kfGWUeXZv9xpNvrFyiN37ObY/' frameBorder='0' width='100%' height='100%'></iframe>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/60 to-slate-950/80" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        <h2 className="ach-title text-3xl md:text-4xl font-bold text-white/90 mb-10">Achievements & Awards</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="ach-left space-y-4 overflow-hidden">
            {achievements.map((a, i) => (
              <div key={i} className="card rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 text-white/90 shadow">{a}</div>
            ))}
          </div>
          <div className="ach-right space-y-4 overflow-hidden">
            {extracurricular.map((a, i) => (
              <div key={i} className="card rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 text-white/90 shadow">{a}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
