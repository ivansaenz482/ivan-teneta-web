import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import TechStack from './components/TechStack'
import Gallery from './components/Gallery'
import About from './components/About'
import Mission from './components/Mission'
import Store from './components/Store'
import Contact from './components/Contact'
import QRCode from './components/QRCode'
import Footer from './components/Footer'
import Admin from './components/Admin'
import BlobCursor from './components/reactbits/BlobCursor'
import SparksOverlay from './components/reactbits/SparksOverlay'
import { useConfig } from './lib/config'

function MainSite() {
  const { config, waLink, recordWhatsappClick } = useConfig()

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    const id = window.setTimeout(refresh, 600)
    return () => {
      window.removeEventListener('load', refresh)
      window.clearTimeout(id)
    }
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <BlobCursor />
      <SparksOverlay />
      <main>
        <div id="inicio" className="scroll-mt-0">
          <Hero />
        </div>
        <Services />
        <TechStack />
        <Gallery />
        <About />
        <Mission />
        <Store />
        <Contact />
        <QRCode />
      </main>
      <Footer />

      <motion.a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={recordWhatsappClick}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 18 }}
        aria-label={`WhatsApp de ${config.brandName}`}
        className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-[calc(1.25rem+env(safe-area-inset-right))] z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-aqua-400 to-aqua-600 text-ink-950 shadow-[0_0_30px_rgba(34,211,238,0.5)]"
      >
        <MessageCircle size={26} strokeWidth={2.2} />
      </motion.a>
    </div>
  )
}

export default function App() {
  const [hash, setHash] = useState(() => window.location.hash)
  const isAdmin = hash === '#admin'

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    if (isAdmin) window.scrollTo(0, 0)
  }, [isAdmin])

  if (isAdmin) return <Admin />

  return <MainSite />
}