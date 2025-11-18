import { useEffect, useState } from 'react'
import Preloader from './components/Preloader'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Education from './components/Education'
import Projects from './components/Projects'
import Achievements from './components/Achievements'
import Contact from './components/Contact'

function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // optional: lock scroll while preloading
    if (!loaded) document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [loaded])

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}

      <header className="fixed top-0 left-0 right-0 z-40">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
          <a href="#home" className="text-sm font-semibold tracking-wide text-blue-200/80">MATTRAL</a>
          <nav className="hidden md:flex items-center gap-6 text-blue-200/80">
            <a href="#about" className="hover:text-white/90">About</a>
            <a href="#experience" className="hover:text-white/90">Timeline</a>
            <a href="#education" className="hover:text-white/90">Education</a>
            <a href="#projects" className="hover:text-white/90">Projects</a>
            <a href="#achievements" className="hover:text-white/90">Awards</a>
            <a href="#contact" className="hover:text-white/90">Contact</a>
          </nav>
        </div>
      </header>

      <main className="relative">
        <Hero />
        <About />
        <Experience />
        <Education />
        <Projects />
        <Achievements />
        <Contact />
      </main>

      <footer className="relative py-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.15),transparent_40%)]" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-blue-200/70">© {new Date().getFullYear()} MATTRAL</div>
          <div className="flex items-center gap-4 text-blue-200/80">
            <a href="#" className="hover:text-white/90">GitHub</a>
            <a href="#" className="hover:text-white/90">Twitter</a>
            <a href="#" className="hover:text-white/90">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
