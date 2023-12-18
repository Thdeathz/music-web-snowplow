import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './Header'
import SideBar from './SideBar'
import PlayingMusicSection from '../PlayingMusicSection'

type PropsType = {
  children: React.ReactNode
  className?: string
}

const variants = {
  hidden: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, type: 'easeOut', when: 'beforeChildren' }
  },
  exit: { opacity: 0 }
}

const DefaultLayout = ({ children, className }: PropsType) => {
  return (
    <AnimatePresence
      initial={true}
      onExitComplete={() => {
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0 })
        }
      }}
    >
      <div className="h-screen w-screen overflow-hidden bg-app-light">
        <Header />

        <div className="flex h-max items-start justify-start pt-8">
          <SideBar />

          <div className="mx-auto flex h-content min-h-content w-0 max-w-[1800px] shrink grow items-center justify-center gap-16 px-6">
            <div className="sticky top-8 h-full max-w-[40rem] basis-5/12">
              <PlayingMusicSection />
            </div>

            <motion.div
              className={`h-full w-0 shrink grow basis-7/12 ${className}`}
              variants={variants}
              initial="hidden"
              animate="enter"
              exit="exit"
            >
              {children}
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  )
}

export default DefaultLayout
