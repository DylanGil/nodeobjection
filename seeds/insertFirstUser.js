exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del()
  await knex("users").insert([
    {
      firstName: "Dylan",
      lastName: "GIL AMARO",
      email: "dylangilamaro@gmail.com",
      passwordHash: "test",
      passwordSalt: "test",
    },
  ])
}
