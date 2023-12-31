import bcrypt from 'bcrypt'

import prisma from '../databases/init.prisma'
import HttpError from '../helpers/httpError'
import { RegisterByGoogle, RegisterRequest } from '../@types/user'

const getAllUsers = async (page: number, offset: number) => {
  const total = await prisma.user.count()

  const users = await prisma.user.findMany({
    skip: (page - 1) * offset,
    take: offset,
    select: {
      id: true,
      username: true,
      roles: true,
      avatarUrl: true,
      account: {
        select: {
          email: true,
          isActive: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  if (!users) throw new HttpError(404, 'Not found')

  return { users, total }
}

const getUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      roles: true,
      avatarUrl: true,
      account: {
        select: {
          email: true,
          isActive: true
        }
      }
    }
  })
}

const getUserByEmail = async (email: string) => {
  return await prisma.account.findUnique({
    where: { email },
    select: {
      id: true,
      userId: true,
      email: true,
      isActive: true,
      password: true,
      user: {
        select: {
          id: true,
          username: true,
          roles: true,
          avatarUrl: true
        }
      }
    }
  })
}

const checkUserExisted = async (email: string, username: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ account: { email } }, { username }]
      },
      include: {
        account: {
          select: {
            email: true,
            isActive: true
          }
        }
      }
    })

    if (user) {
      if (user.account && user.account.email === email)
        throw new HttpError(409, 'Conflict/EmailExisted')
      if (user.username === username) throw new HttpError(409, 'Conflict/UsernameExisted')
    }

    return true
  } catch (error) {
    if (error instanceof HttpError) throw error

    throw new HttpError(500, 'Internal server error')
  }
}

const createUser = async ({
  email,
  username,
  password,
  roles,
  avatarUrl
}: RegisterRequest & { avatarUrl?: string }) => {
  try {
    // Hash password
    const hashedPassword: string = await bcrypt.hash(<string>password, 10)

    return await prisma.account.create({
      data: {
        email,
        password: hashedPassword,
        user: {
          create: {
            username,
            avatarUrl,
            roles
          }
        }
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            roles: true,
            avatarUrl: true
          }
        }
      }
    })
  } catch (error) {
    throw new HttpError(500, 'Internal server error')
  }
}

const createAccountWithGoogle = async (userData: RegisterByGoogle) => {
  const { id, username, avatarUrl, email } = userData
  return await prisma.account.create({
    data: {
      email,
      password: 'login with google',
      user: {
        create: {
          id,
          username,
          avatarUrl
        }
      }
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          roles: true,
          avatarUrl: true
        }
      }
    }
  })
}

const updateAvatar = async (userId: string, avatarUrl: string) => {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      avatarUrl
    },
    include: {
      account: {
        select: {
          email: true,
          isActive: true
        }
      }
    }
  })
}

export default {
  getAllUsers,
  getUserById,
  getUserByEmail,
  checkUserExisted,
  createUser,
  createAccountWithGoogle,
  updateAvatar
}
