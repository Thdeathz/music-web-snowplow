import React from 'react'
import { Outlet } from 'react-router-dom'
import { useEffectOnce } from 'usehooks-ts'
import { initializeTracker } from '~/app/tracker'

const TrackerWrapper = () => {
  useEffectOnce(() => {
    initializeTracker()
  })

  return <Outlet />
}

export default TrackerWrapper
