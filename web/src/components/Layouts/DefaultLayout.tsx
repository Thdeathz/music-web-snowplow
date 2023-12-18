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
      <div className="h-screen w-screen overflow-y-auto bg-app-light">
        <Header />

        <div className="flex h-max items-start justify-start">
          <SideBar />

          <div className="w-0 shrink grow">
            <div className="mx-auto flex min-h-main-content max-w-[1800px] items-start justify-center gap-16 px-6 pb-3">
              <div className="sticky top-24 h-full max-w-[40rem] basis-5/12">
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
      </div>
    </AnimatePresence>
  )
}

export default DefaultLayout
