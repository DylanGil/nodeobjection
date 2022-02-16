exports.up = async (knex) => {
  await knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.text("firstname").notNullable();
    table.text("lastname").notNullable();
    table.text("email").notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable("users");
};
