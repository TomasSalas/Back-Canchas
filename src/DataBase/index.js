import { createPool } from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()
export const pool = createPool({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORTDB
})
