import jwtDecode from 'jwt-decode'

import { useAppSelector } from './useRedux'
import { selectCurrentToken } from '~/features/auth/store/authSlice'

type JwtPayload = {
  UserInfo: {
    username: string
    email: string
    avatarUrl: string
    roles: ROLE[]
  }
}

const useAuth = () => {
  const token = useAppSelector(selectCurrentToken)
  let isUser = false
  let isAdmin = false

  if (token) {
    const decoded = jwtDecode(token) as JwtPayload
    const { email, roles, username } = decoded.UserInfo

    isUser = roles?.includes('USER')
    isAdmin = roles?.includes('ADMIN')

    return { email, roles, isUser, isAdmin, username }
  }

  return { email: '', roles: [], isUser, isAdmin, username: '' }
}

export default useAuth
