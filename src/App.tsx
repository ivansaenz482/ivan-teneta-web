import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { PROFILE } from './data'

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <div id="inicio" className="scroll-mt-0">
          <Hero />
        </div>
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />

      <motion.a
        href={PROFILE.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 18 }}
        aria-label="WhatsApp flotante"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-ink-950 shadow-[0_0_30px_rgba(250,204,21,0.5)]"
      >
        <MessageCircle size={26} strokeWidth={2.2} />
      </motion.a>
    </div>
  )
}
