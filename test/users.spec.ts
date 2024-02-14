/* eslint-disable prettier/prettier */
import { it, beforeAll, afterAll, describe, expect } from 'vitest'
import { execSync } from 'node:child_process'
import request from 'supertest'
import { app } from '../src/app'
import { beforeEach } from 'node:test'


describe(('Users routes') , () => {
    beforeAll(async () => {
        await app.ready()
      })
    
      afterAll(async () => {
        await app.close()
      })
    
      beforeEach(() => {
        execSync('npm run knex migrate:rollback --all')
        execSync('npm run knex migrate:latest')  
      })

     
    it('should be able to create a new user', async () => {
        await request(app.server)
        .post('/users')
        .send({
           name: "New user",
           cpf: "12345678910",
           email: "marcos@gmail.com",
           password: "123456",
        })
        .expect(201)
      })

      it('should be able to list all users', async () => {
        await request(app.server)
        .post('/users')
        .send({
           name: "New user",
           cpf: "12345678910",
           email: "marcos@gmail.com",
           password: "123456",
        })

    // Listar todos os usuários
    const listUsersResponse = await request(app.server)
        .get('/users')
        .expect(200);

    // Esperar que a resposta seja um array com pelo menos um objeto contendo os dados do usuário criado
    expect(listUsersResponse.body).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                name: "New user",
                cpf: "12345678910",
                email: "marcos@gmail.com",
                password: "123456",
            }),
        ])
      );
   })  
})