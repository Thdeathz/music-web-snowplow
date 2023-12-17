import prisma from '../databases/init.prisma'

const getMusics = async (page: number, offset: number, topic?: string) => {
  if (topic) {
    return await getAllMusicsByTopic(page, offset, topic)
  }

  return await getAllMusics(page, offset)
}

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

  console.log('==> getAllMusics: ', musics)

  return {
    musics,
    total
  }
}

const getAllMusicsByTopic = async (page: number, offset: number, topic: string) => {
  const musics = await prisma.music.findMany({
    skip: (page - 1) * offset,
    take: offset,
    where: {
      topics: {
        some: {
          name: topic
        }
      }
    },
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

  const total = await prisma.music.count({
    where: {
      topics: {
        some: {
          name: topic
        }
      }
    }
  })

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
  getMusics,
  getAllMusics,
  getMusicById,
  getAllMusicsByTopic
}
