import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('transactionsPix', (table) => {
    table.uuid('id').primary()
    table.text('nameClient').notNullable()
    table.text('keyPix').notNullable()
    table.text('valuePix')
    table.text('city').notNullable()
    table.text('description')
    table.text('idUser')
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('transactionsPix')
}
