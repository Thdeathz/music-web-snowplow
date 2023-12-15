import dotenv from 'dotenv'
import { Redis } from 'ioredis'

dotenv.config()

const redis = new Redis(process.env.REDIS_URI as string)

export default redis
