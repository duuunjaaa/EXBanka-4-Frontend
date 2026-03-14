import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useWindowTitle from '../hooks/useWindowTitle'
import { useTheme } from '../context/ThemeContext'
import { useClientAuth } from '../context/ClientAuthContext'

export default function ClientHomePage() {
  useWindowTitle('AnkaBanka')
  const { dark, toggle } = useTheme()
  const { clientUser, clientLogout } = useClientAuth()
  const navigate = useNavigate()
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouse = (e) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      setOffset({
        x: -((e.clientX - cx) / cx) * 45,
        y: -((e.clientY - cy) / cy) * 30,
      })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  async function handleLogout() {
    await clientLogout()
    navigate('/client')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col">

      {/* Client Navbar */}
      <nav className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-between py-5">
            {/* Brand */}
            <Link to="/client" className="flex items-center gap-3">
              <div className="w-7 h-7 border border-violet-500 dark:border-violet-400 flex items-center justify-center">
                <span className="text-violet-500 dark:text-violet-400 text-xs font-serif font-semibold">A</span>
              </div>
              <span className="text-slate-900 dark:text-white font-serif text-lg tracking-widest font-light">
                Anka<span className="text-violet-600 dark:text-violet-400">Banka</span>
              </span>
            </Link>

            <div className="flex items-center gap-4">
              {/* Dark mode toggle */}
              <button
                onClick={toggle}
                aria-label="Toggle dark mode"
                className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                {dark ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {clientUser ? (
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 border border-violet-600 dark:border-violet-400 text-violet-600 dark:text-violet-400 text-xs tracking-widest uppercase font-medium hover:bg-violet-600 dark:hover:bg-violet-500 hover:text-white transition-all duration-200"
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  to="/client/login"
                  className="px-5 py-2 border border-violet-600 dark:border-violet-400 text-violet-600 dark:text-violet-400 text-xs tracking-widest uppercase font-medium hover:bg-violet-600 dark:hover:bg-violet-500 hover:text-white transition-all duration-200"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Page content */}
      <main className="flex-1 container mx-auto px-6 py-16 max-w-7xl">
        <div className="relative min-h-[520px]">

          {/* Blobs */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div
              className="absolute w-[538px] h-[650px]"
              style={{
                top: '-10%', left: '10%',
                transform: `translate(${offset.x}px, ${offset.y}px) rotate(18deg)`,
                transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                background: dark
                  ? 'radial-gradient(ellipse at 50% 50%, rgba(126, 71, 255, 0.55) 0%, transparent 70%)'
                  : 'radial-gradient(ellipse at 50% 50%, rgba(138, 92, 246, 0.65) 0%, transparent 70%)',
                filter: 'blur(64px)',
              }}
            />
            <div
              className="absolute w-[700px] h-[375px]"
              style={{
                top: '30%', left: '45%',
                transform: `translate(${offset.x * 0.55}px, ${offset.y * 0.55}px) rotate(-12deg)`,
                transition: 'transform 1.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                background: dark
                  ? 'radial-gradient(ellipse at 50% 50%, rgba(31, 132, 255, 0.7) 0%, transparent 70%)'
                  : 'radial-gradient(ellipse at 50% 50%, rgba(96, 165, 250, 0.7) 0%, transparent 70%)',
                filter: 'blur(70px)',
              }}
            />
          </div>

          {/* Hero */}
          <section className="relative pt-8 pb-4">
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light text-slate-900 dark:text-white leading-tight mb-6">
              AnkaBanka
            </h1>
            <div className="w-10 h-px bg-violet-500 dark:bg-violet-400 mb-8" />

            {clientUser ? (
              <>
                <p className="text-slate-500 dark:text-slate-400 text-lg font-light max-w-lg mb-2 leading-relaxed">
                  Welcome back, <span className="text-slate-900 dark:text-white font-medium">{clientUser.firstName}</span>.
                </p>
                {/* Placeholder for future client dashboard sections */}
                <div className="mt-12 bg-white/70 dark:bg-slate-900/70 backdrop-blur border border-slate-200 dark:border-slate-700 rounded-xl p-10 shadow-sm text-center max-w-lg">
                  <p className="text-xs tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-3">Coming Soon</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Your accounts and transactions will appear here.
                  </p>
                </div>
              </>
            ) : (
              <>
                <p className="text-slate-500 dark:text-slate-400 text-lg font-light max-w-lg mb-10 leading-relaxed">
                  Access your accounts, view transactions, and manage your finances. Sign in with your client credentials to continue.
                </p>
                <Link to="/client/login" className="btn-primary">
                  Sign In
                </Link>
              </>
            )}
          </section>

        </div>
      </main>
    </div>
  )
}
