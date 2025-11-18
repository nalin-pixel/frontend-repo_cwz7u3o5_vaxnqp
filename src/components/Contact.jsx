import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Contact() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-in', { y: 24, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="relative py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.12),transparent_40%)]" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white/90 mb-10">Contact</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="contact-in rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8 shadow-2xl">
            <form className="space-y-4">
              <div>
                <label className="text-sm text-blue-200/80">Name</label>
                <input className="mt-1 w-full rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-white placeholder:text-blue-200/50 focus:outline-none focus:ring-2 focus:ring-cyan-400" placeholder="Your name" />
              </div>
              <div>
                <label className="text-sm text-blue-200/80">Email</label>
                <input type="email" className="mt-1 w-full rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-white placeholder:text-blue-200/50 focus:outline-none focus:ring-2 focus:ring-cyan-400" placeholder="you@email.com" />
              </div>
              <div>
                <label className="text-sm text-blue-200/80">Message</label>
                <textarea rows="4" className="mt-1 w-full rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-white placeholder:text-blue-200/50 focus:outline-none focus:ring-2 focus:ring-cyan-400" placeholder="Say hello" />
              </div>
              <button type="button" className="inline-flex px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-slate-950 font-semibold shadow hover:scale-[1.02] active:scale-[0.98] transition">Send Message</button>
            </form>
          </div>
          <div className="contact-in space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
              <div className="text-blue-200/80">Find me on</div>
              <div className="mt-3 flex items-center gap-3">
                <a className="px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-white hover:bg-white/15" href="#">GitHub</a>
                <a className="px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-white hover:bg-white/15" href="#">Twitter</a>
                <a className="px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-white hover:bg-white/15" href="#">Facebook</a>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
              <p className="text-blue-200/80">Let’s build something extraordinary together.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
