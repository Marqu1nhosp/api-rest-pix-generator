/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { FastifyInstance, FastifyRequest } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'crypto'
import fs from 'fs'
import util from 'util'
import { pipeline } from 'stream'
import path from 'path'

const pump = util.promisify(pipeline)

declare module 'fastify' {
  interface FastifyRequest { // you must reference the interface and not the type
    userId: string
  }
}

export function usersRoutes(app: FastifyInstance, options: any, done: () => void) {

  let globalUserId: string | null = null;

  app.addHook('onRequest', async (req: FastifyRequest) => {
    // Gera um novo userId apenas se ainda não estiver definido globalmente
    if (!globalUserId) {
      const userId = randomUUID();
      globalUserId = userId;
      req.userId = globalUserId;
  
      // Define o userId como null após 1 segundo
      setTimeout(() => {
        globalUserId = null;
      }, 30000); // 30 segundos
    } else {
      // Se o userId já estiver definido globalmente, apenas define na solicitação
      req.userId = globalUserId;
    }
  });
  
  app.get('/', async () => {
    const users = await knex('users').select('*');
    return users;
  });

 
  
  app.post('/', async (req, reply) => {
  

    const createUserBodySchema = z.object({
      name: z.string(),
      cpf: z.string(),
      email: z.string(),
      password: z.string(),
    });
  
    const { name, cpf, email, password } = createUserBodySchema.parse(
      req.body,
    );
  
    await knex('users')
      .insert({
        id: req.userId,
        name,
        cpf,
        email,
        password,
      });
  
    reply.status(201).send({ userId: req.userId });
   
  });
 
   app.post('/upload-profile-picture', async (req) => {
    const parts = req.files();
    const uploadedFiles = [];

    for await (const part of parts) {
      // Gerando um UUID
      const uuid = randomUUID();
    
      // Obtendo apenas a extensão do arquivo
      const fileExtension = path.extname(part.filename);
    
      // Construindo o novo nome do arquivo com UUID e extensão
      const newFileName = `${uuid}${fileExtension}`;
    
      // Construindo o caminho completo do arquivo
      const filePath = `./src/upload/profilePicture/${newFileName}`;
    
      // Salvando o arquivo
      await pump(part.file, fs.createWriteStream(filePath));
      uploadedFiles.push(filePath);
    
      // Atualizando o banco de dados com o novo nome do arquivo
      const profilePictureUrl = newFileName;
      await knex('users').where({ id: req.userId }).update({
        profilePicture: profilePictureUrl
      });
    }
    
    return { message: 'files uploaded', paths: uploadedFiles };
    });
    
  

 
 
app.put('/:id', async (req, reply) => {
  const createUserBodySchema = z.object({
    name: z.string(),
    cpf: z.string(),
    email: z.string(),
    password: z.string(),
    
  })

  const getUserParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = getUserParamsSchema.parse(req.params)

  const { name, cpf, email, password } = createUserBodySchema.parse(
    req.body,
  )

  await knex('users')
  .where({
    id,
  })
  .update({
    cpf,
    name,
    email,
    password,
    })

return reply.status(200).send()
})


  done()
}
