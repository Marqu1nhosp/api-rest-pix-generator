/* eslint-disable prettier/prettier */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Knex } from 'knex'

declare module 'knex/types/tables' {
    export interface Tables{
        users: {
            id: string
            name: string
            email: string
            cpf: string
            password: string
            created_at: string
            profilePicture: string
        }, 
        transactionsPix: {
            id: string
            nameClient: string
            keyPix: string
            valuePix: string
            city: string
            description: string
            idUser: string
            created_at: string
        }
    }
}