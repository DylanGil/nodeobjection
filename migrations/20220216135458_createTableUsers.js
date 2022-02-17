exports.up = async (knex) => {
  await knex.schema.createTable("users", (table) => {
    table.increments("id")
    table.text("firstName")
    table.text("lastName")
    table.text("email").notNullable()
    table.text("passwordHash").notNullable()
    table.text("passwordSalt").notNullable()
  })
}

exports.down = async (knex) => {
  await knex.schema.dropTable("users")
}
