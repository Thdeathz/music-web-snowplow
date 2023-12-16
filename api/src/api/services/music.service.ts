import prisma from '../databases/init.prisma'

const getAllMusics = async (page: number, offset: number) => {
  const musics = await prisma.music.findMany({
    skip: (page - 1) * offset,
    take: offset,
    select: {
      id: true,
      title: true,
      thumbnail: true,
      duration: true,
      artist: {
        select: {
          id: true,
          name: true
        }
      },
      topics: {
        select: {
          id: true,
          name: true
        }
      }
    }
  })

  const total = await prisma.music.count()

  if (!musics) throw new Error('Musics not found')

  return {
    musics,
    total
  }
}

const getMusicById = async (id: string) => {
  const music = await prisma.music.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      title: true,
      thumbnail: true,
      duration: true,
      url: true,
      artist: {
        select: {
          id: true,
          name: true
        }
      },
      topics: {
        select: {
          id: true,
          name: true
        }
      }
    }
  })

  if (!music) throw new Error('Music not found')

  return music
}

export default {
  getAllMusics,
  getMusicById
}
