const express = require("express")
const knex = require("knex")
const knexfile = require("./knexfile")
const morgan = require("morgan")
const { Model } = require("objection")

const app = express()
app.use(morgan("dev"))
const db = knex(knexfile)
Model.knex(db)
app.use(express.json())

class User extends Model {
  static tableName = "users"
}

app.get("/users", async (req, res) => {
  const users = await User.query()

  res.send(users)
})

app.get("/users/:userId", async (req, res) => {
  const {
    params: { userId },
  } = req
  const user = await User.query().findById(userId)

  if (!user) {
    res.status(404).send({ error: "y a pas wesh" })

    return
  }

  res.send(user)
})

app.post("/users", async (req, res) => {
  const {
    body: { id, firstname, lastname, email },
  } = req

  const user = await User.query().insertAndFetch({
    id,
    firstname,
    lastname,
    email,
  })

  res.send(user)
})

app.put("/users/:userId", async (req, res) => {
  const {
    params: { userId },
    body: { firstname, lastname, email },
  } = req

  const user = await User.query().updateAndFetchById(userId, {
    firstname,
    lastname,
    email,
  })

  if (!user) {
    res.status(404).send({ error: "y a pas wesh" })

    return
  }

  res.send(user)
})

app.delete("/users/:userId", async (req, res) => {
  const {
    params: { userId },
  } = req

  const [user] = await db("users").where({ id: userId })

  if (!user) {
    res.status(404).send({ error: "y a pas wesh" })

    return
  }

  await db("users").delete().where({ id: userId })

  res.send({ status: "user " + userId + " deleted" })
})

app.listen(3000, () => console.log("Listening on :3000"))
