/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'crypto'

export async function transactionsPixRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const transactionsPix = await knex('users as u')
      .select('*')
      .innerJoin('transactionsPix as t', 'u.id', 't.idUser')
    return transactionsPix
  })

  app.get('/:id', async (req) => {
    const getUserParamsSchema = z.object({
      id: z.string(),
    })

    const { id } = getUserParamsSchema.parse(req.params)

    const transactionsPix = await knex('users as u')
      .select('*')
      .innerJoin('transactionsPix as t', 'u.id', 't.idUser')
      .where('u.id', id)

    return transactionsPix
  })

  app.post('/', async (req, reply) => {
    const createTransanctionPix = z.object({
      nameClient: z.string(),
      keyPix: z.string(),
      valuePix: z.string(),
      city: z.string(),
      description: z.string(),
      idUser: z.string(),
    })

    const { nameClient, keyPix, valuePix, city, description, idUser } =
      createTransanctionPix.parse(req.body)

    await knex('transactionsPix').insert({
      id: randomUUID(),
      nameClient,
      keyPix,
      valuePix,
      city,
      description,
      idUser,
    })

    reply.status(201).send()
  })
}
