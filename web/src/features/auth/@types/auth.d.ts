declare type UserCredentials = {
  email: string
  password: string
}

declare type ROLE = 'USER' | 'ADMIN'

declare interface JwtPayload {
  UserInfo: {
    id: string
    email: string
    username: string
    avatarUrl?: string
    roles: ROLE[]
  }
}

declare interface RegisterRequest {
  username: string
  email: string
  password: string
}
