import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './Header'
import SideBar from './SideBar'

type PropsType = {
  children: React.ReactNode
}

const variants = {
  hidden: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { duration: 0.6, type: 'easeOut', when: 'beforeChildren' }
  },
  exit: { opacity: 0 }
}

const DefaultLayout = ({ children }: PropsType) => {
  return (
    <AnimatePresence
      initial={true}
      onExitComplete={() => {
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0 })
        }
      }}
    >
      <div className="h-screen w-screen overflow-y-auto overflow-x-hidden bg-app-light">
        <Header />

        <div className="flex h-max items-start justify-start pt-8">
          <SideBar />

          <motion.div
            className="mx-auto min-h-content w-0 max-w-[1800px] shrink grow px-6"
            variants={variants}
            initial="hidden"
            animate="enter"
            exit="exit"
          >
            {children}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  )
}

export default DefaultLayout
