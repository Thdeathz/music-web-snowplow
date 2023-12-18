export const defaultVariant = {
  hidden: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, type: 'easeOut', when: 'beforeChildren' }
  },
  exit: { opacity: 0 }
}

export const gridList = {
  container: (delay = 0.1, stagger = 0.1) => ({
    hidden: { opacity: 1 },
    enter: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: stagger
      }
    }
  }),
  item: (duration = 0.2) => ({
    hidden: { y: -20, opacity: 0 },
    enter: {
      y: 0,
      transition: {
        duration
      },
      opacity: 1
    }
  })
}
