import { Routes, Route } from 'react-router-dom'

import { ROLES } from './config/roles'
import LoggedIn from './features/auth/components/LoggedIn'
import PersistLogin from './features/auth/components/PersistLogin'
import RequireAuth from './features/auth/components/RequireAuth'
import Login from './features/auth/Login'
import Signup from './features/auth/Signup'
import Home from './features/music/Home'
import TrackerWrapper from './components/TrackerWrapper'
import Artist from './features/music/Artist'

function App() {
  return (
    <Routes>
      <Route path="/" element={<PersistLogin />}>
        {/* PUBLIC ROUTES */}
        <Route element={<LoggedIn />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<TrackerWrapper />}>
          <Route path="/" element={<Home />} />
          <Route path="/:artistId" element={<Artist />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
