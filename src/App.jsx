import { useEffect, useRef, useState } from 'react'

function clamp(v, min, max) { return Math.max(min, Math.min(max, v)) }

export default function App() {
  const canvasRef = useRef(null)
  const [running, setRunning] = useState(true)
  const [score, setScore] = useState({ human: 0, ai: 0 })
  const [message, setMessage] = useState('First to 7 wins')

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    // Logical playfield size (we scale to device pixel ratio for crispness)
    const WIDTH = 900
    const HEIGHT = 540
    const PADDLE_W = 14
    const PADDLE_H = 90
    const PUCK_R = 10

    // Entities
    const human = { x: 40, y: HEIGHT / 2 - PADDLE_H / 2, w: PADDLE_W, h: PADDLE_H, vy: 0 }
    const ai = { x: WIDTH - 40 - PADDLE_W, y: HEIGHT / 2 - PADDLE_H / 2, w: PADDLE_W, h: PADDLE_H, vy: 0 }
    const puck = { x: WIDTH / 2, y: HEIGHT / 2, vx: 4 * (Math.random() > 0.5 ? 1 : -1), vy: 3 * (Math.random() * 2 - 1) }

    let lastTime = 0
    let animationId
    let keys = new Set()

    // DPI fix
    function resize() {
      const dpr = window.devicePixelRatio || 1
      const rectW = canvas.clientWidth
      const rectH = Math.max(340, Math.min(HEIGHT, window.innerHeight - 40))
      canvas.style.height = rectH + 'px'
      const aspect = WIDTH / HEIGHT
      const computedW = Math.min(window.innerWidth - 40, rectH * aspect)
      canvas.style.width = computedW + 'px'
      canvas.width = WIDTH * dpr
      canvas.height = HEIGHT * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    function reset(servesToHuman = true) {
      puck.x = WIDTH / 2
      puck.y = HEIGHT / 2
      const speed = 4.2
      puck.vx = (servesToHuman ? -1 : 1) * speed
      puck.vy = (Math.random() * 2 - 1) * speed
    }

    function drawCourt() {
      // background
      ctx.fillStyle = '#0b1220'
      ctx.fillRect(0, 0, WIDTH, HEIGHT)

      // center line and circle
      ctx.strokeStyle = 'rgba(255,255,255,0.15)'
      ctx.lineWidth = 2
      ctx.beginPath();
      ctx.moveTo(WIDTH/2, 0); ctx.lineTo(WIDTH/2, HEIGHT); ctx.stroke()
      ctx.beginPath();
      ctx.arc(WIDTH/2, HEIGHT/2, 70, 0, Math.PI*2); ctx.stroke()

      // goals
      ctx.fillStyle = 'rgba(59,130,246,0.15)'
      ctx.fillRect(0, HEIGHT/2 - 70, 16, 140)
      ctx.fillRect(WIDTH-16, HEIGHT/2 - 70, 16, 140)

      // score
      ctx.fillStyle = '#e5edff'
      ctx.font = '24px Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(`${score.human} : ${score.ai}`, WIDTH/2, 36)

      if (!running) {
        ctx.fillStyle = '#fff'
        ctx.font = '28px Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif'
        ctx.fillText(message, WIDTH/2, HEIGHT/2 - 20)
        ctx.font = '18px Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif'
        ctx.fillText('Press Space to play again', WIDTH/2, HEIGHT/2 + 16)
      }
    }

    function drawPaddle(p, color) {
      ctx.fillStyle = color
      ctx.fillRect(p.x, p.y, p.w, p.h)
    }

    function drawPuck() {
      ctx.beginPath()
      ctx.arc(puck.x, puck.y, PUCK_R, 0, Math.PI * 2)
      ctx.fillStyle = '#22d3ee'
      ctx.fill()
      ctx.strokeStyle = 'rgba(255,255,255,0.3)'
      ctx.stroke()
    }

    function update(dt) {
      // Human control
      const speed = 380
      if (keys.has('ArrowUp') || keys.has('w')) human.vy = -speed
      else if (keys.has('ArrowDown') || keys.has('s')) human.vy = speed
      else human.vy = 0

      human.y += human.vy * dt
      human.y = clamp(human.y, 0, HEIGHT - human.h)

      // Simple AI: follow puck with smoothing, speed increases as puck approaches
      const aiTarget = puck.y - ai.h / 2
      const dist = aiTarget - ai.y
      const baseAiSpeed = 300
      const proximityBoost = 150 * (1 - Math.abs((puck.x - WIDTH) / WIDTH))
      const aiSpeed = baseAiSpeed + proximityBoost
      ai.y += clamp(dist, -aiSpeed * dt, aiSpeed * dt)
      ai.y = clamp(ai.y, 0, HEIGHT - ai.h)

      // Puck physics
      puck.x += puck.vx * (dt * 60) * 0.9
      puck.y += puck.vy * (dt * 60) * 0.9

      // Top/bottom walls
      if (puck.y - PUCK_R < 0) { puck.y = PUCK_R; puck.vy *= -1 }
      if (puck.y + PUCK_R > HEIGHT) { puck.y = HEIGHT - PUCK_R; puck.vy *= -1 }

      // Paddle collisions (AABB + circle approx)
      function collide(p) {
        if (
          puck.x + PUCK_R > p.x &&
          puck.x - PUCK_R < p.x + p.w &&
          puck.y + PUCK_R > p.y &&
          puck.y - PUCK_R < p.y + p.h
        ) {
          // Reflect and add some of paddle velocity for angle control
          const hitPos = ((puck.y - p.y) / p.h) - 0.5 // -0.5..0.5
          const angleBoost = hitPos * 6
          const speed = Math.hypot(puck.vx, puck.vy)
          const newSpeed = clamp(speed * 1.05 + 0.3, 5, 14)
          const dir = p === human ? 1 : -1
          puck.vx = newSpeed * dir
          puck.vy = clamp(puck.vy + angleBoost, -10, 10)

          // Nudge outside to avoid sticking
          if (dir === 1) puck.x = p.x + p.w + PUCK_R + 0.5
          else puck.x = p.x - PUCK_R - 0.5
        }
      }
      collide(human); collide(ai)

      // Goals
      const goalTop = HEIGHT/2 - 70
      const goalBottom = HEIGHT/2 + 70
      if (puck.x - PUCK_R <= 0) {
        if (puck.y >= goalTop && puck.y <= goalBottom) {
          setScore(s => ({ ...s, ai: s.ai + 1 }))
          reset(false)
        } else { puck.x = PUCK_R; puck.vx *= -1 }
      }
      if (puck.x + PUCK_R >= WIDTH) {
        if (puck.y >= goalTop && puck.y <= goalBottom) {
          setScore(s => ({ ...s, human: s.human + 1 }))
          reset(true)
        } else { puck.x = WIDTH - PUCK_R; puck.vx *= -1 }
      }
    }

    function render() {
      drawCourt()
      drawPaddle(human, '#22c55e') // Human: green
      drawPaddle(ai, '#f43f5e')    // AI: red
      drawPuck()
    }

    function loop(ts) {
      const dt = Math.min(0.033, (ts - lastTime) / 1000 || 0.016)
      lastTime = ts
      if (running) update(dt)
      render()
      animationId = requestAnimationFrame(loop)
    }
    animationId = requestAnimationFrame(loop)

    // Input: keyboard
    function onKey(e) {
      const k = e.key.toLowerCase()
      if (['arrowup','arrowdown','w','s'].includes(k)) {
        if (e.type === 'keydown') keys.add(k); else keys.delete(k)
        e.preventDefault()
      }
      if (e.type === 'keydown' && e.code === 'Space') {
        if (!running) {
          setScore({ human: 0, ai: 0 })
          setMessage('First to 7 wins')
        }
        setRunning(r => !r)
      }
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('keyup', onKey)

    // Input: mouse/touch to move human paddle
    function moveHuman(y) {
      human.y = clamp(y - human.h/2, 0, HEIGHT - human.h)
    }
    function onMouse(e) {
      const rect = canvas.getBoundingClientRect()
      const scaleY = HEIGHT / rect.height
      moveHuman((e.clientY - rect.top) * scaleY)
    }
    function onTouch(e) {
      const rect = canvas.getBoundingClientRect()
      const scaleY = HEIGHT / rect.height
      if (e.touches[0]) moveHuman((e.touches[0].clientY - rect.top) * scaleY)
    }
    canvas.addEventListener('mousemove', onMouse)
    canvas.addEventListener('touchmove', onTouch, { passive: true })

    // Resize
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('keyup', onKey)
      canvas.removeEventListener('mousemove', onMouse)
      canvas.removeEventListener('touchmove', onTouch)
    }
  }, [running])

  useEffect(() => {
    if (score.human >= 7 || score.ai >= 7) {
      setRunning(false)
      setMessage(score.human > score.ai ? 'You win! 🎉' : 'AI wins! 🤖')
    }
  }, [score])

  return (
    <div className="min-h-screen bg-[#0b1220] text-white flex flex-col items-center justify-center p-4 select-none">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">Hockey: Human vs AI</h1>
      <p className="text-white/70 mb-4 text-sm">Use mouse or W/S (↑/↓). Space to pause/resume. First to 7.</p>
      <div className="rounded-xl border border-white/10 shadow-2xl bg-gradient-to-b from-slate-900/60 to-slate-900/20 p-3">
        <canvas ref={canvasRef} className="block rounded-lg" style={{ width: '900px', height: '540px' }} />
      </div>
      <div className="mt-4 text-white/80 text-sm">Score updates live at top center.</div>
    </div>
  )
}
