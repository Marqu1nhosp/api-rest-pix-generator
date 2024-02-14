/* eslint-disable prettier/prettier */
import fastify from 'fastify'
import cors from '@fastify/cors'
import { usersRoutes } from './routes/users'
import multipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import path from 'path';
import { transactionsPixRoutes } from './routes/transactionsPix'
export const app = fastify()

const staticPath = path.join(__dirname, 'upload', 'profilePicture');

console.log('Caminho do diretório estático:', staticPath);

app.decorateRequest('userId', null)
app.register(multipart, {limits: { fileSize: 5 * 1024 * 1024}}) // Aumentar o limite de carga útil para 5MB
app.register(cors, {
  origin: '*',
})
app.register(usersRoutes, { prefix: '/users' })
app.register(transactionsPixRoutes, { prefix: '/transactions-pix' })
app.register(fastifyStatic, {
  root: staticPath,
  prefix: '/uploads',  // Prefixo da URL para os arquivos estáticos
});


