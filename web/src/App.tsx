import { Routes, Route } from 'react-router-dom'

import { ROLES } from './config/roles'
import LoggedIn from './features/auth/components/LoggedIn'
import PersistLogin from './features/auth/components/PersistLogin'
import RequireAuth from './features/auth/components/RequireAuth'
import Login from './features/auth/Login'
import Signup from './features/auth/Signup'
import Welcome from './features/users/Welcome'

function App() {
  return (
    <Routes>
      <Route path="/" element={<PersistLogin />}>
        {/* PUBLIC ROUTES */}
        <Route element={<LoggedIn />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path="/" element={<Welcome />} />
      </Route>
    </Routes>
  )
}

export default App
