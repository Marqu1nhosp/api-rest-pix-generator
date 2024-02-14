/* eslint-disable prettier/prettier */

import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../src/app'
import request from 'supertest'

describe('Transanctions Pix routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })


  it('should be able to create a new transaction pix', async () => {
     await request(app.server)
        .post('/transactions-pix')
        .send({
          nameClient: "Marcos Antonio",
		      keyPix: "77988695668",
		      valuePix: "110,40",
		      city: "Vitoria da Conquista",
		      description: "Desenvolvimento App",
		      idUser: "7d38143c-36e8-48b0-af61-f92f8e8d35b8",
        })
        .expect(201)
  })

  it('should be able to list all transactions pix', async () => {
    await request(app.server)
    .post('/transactions-pix')
    .send({
      nameClient: "Marcos Antonio",
      keyPix: "77988695668",
      valuePix: "110,40",
      city: "Vitoria da Conquista",
      description: "Desenvolvimento App",
      idUser: "7d38143c-36e8-48b0-af61-f92f8e8d35b8",
    })

     // Listar todos as transações pix
     const listTransactionsPixResponse = await request(app.server)
     .get('/users')
     .expect(200);

     expect(listTransactionsPixResponse.body).toEqual(
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

  

