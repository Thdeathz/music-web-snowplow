import artistSeeder from './artist.seeder'
import musicSeeder from './music.seeder'
import prisma from './prisma-client'
import topicSeeder from './topic.seeder'

async function seed() {
  // Run the seed function
  const topics = await topicSeeder()

  const artists = await artistSeeder()

  await musicSeeder(topics, artists)
}

seed()
  .catch(e => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
