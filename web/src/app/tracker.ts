import { LinkClickTrackingPlugin } from '@snowplow/browser-plugin-link-click-tracking'
import { BrowserTracker, enableActivityTracking, newTracker, trackPageView } from '@snowplow/browser-tracker'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

let tracker: BrowserTracker

const initializeTracker = () => {
  tracker = newTracker('sp', 'http://snowplow.localhost:3000', {
    appId: 'chill-zone',
    plugins: [LinkClickTrackingPlugin()]
  })

  enableActivityTracking({
    minimumVisitLength: 30,
    heartbeatDelay: 10
  })
}

const useLocationChange = () => {
  const location = useLocation()
  useEffect(() => {
    trackPageView()
  }, [location])
}

const isTrackerInitialized = () => tracker !== undefined

export { tracker, initializeTracker, useLocationChange, isTrackerInitialized }
