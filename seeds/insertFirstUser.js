exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del()
  await knex("users").insert([
    {
      firstname: "Dylan",
      lastname: "GIL AMARO",
      email: "dylangilamaro@gmail.com",
    },
    {
      firstname: "azeazeaze",
      lastname: "qqsdqsd",
      email: "aze@gmail.com",
    },
    {
      firstname: "qweqweqwe",
      lastname: "poiug",
      email: "qwe@gmail.com",
    },
    {
      firstname: "Mathieu",
      lastname: "Sabri",
      email: "mathieu@gmail.com",
    },
  ])
}
