/* eslint-disable prettier/prettier */

import { Knex, knex as setupKnex } from 'knex'
import { env } from './env'

export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: env.DATABASE_URL
  }, 
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
  useNullAsDefault: false,
}

export const knex = setupKnex(config)
