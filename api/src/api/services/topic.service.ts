import prisma from '../databases/init.prisma'

const getAllTopics = async (page: number, offset: number) => {
  const topics = await prisma.topic.findMany({
    skip: (page - 1) * offset,
    take: offset,
    select: {
      id: true,
      name: true
    }
  })

  const total = await prisma.topic.count()

  if (!topics) throw new Error('Topics not found')

  return {
    topics,
    total
  }
}

export default {
  getAllTopics
}
