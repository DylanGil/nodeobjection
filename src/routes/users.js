const jsonwebtoken = require("jsonwebtoken")
const hashPassword = require("../hashPassword.js")
const auth = require("../middleware/auth.js")
const UserModel = require("../model/user.js")

const userRoutes = ({ app }) => {
  app.post("/sign-up", async (req, res) => {
    const {
      body: { email, password },
    } = req

    const user = await UserModel.query().findOne({ email })

    if (user) {
      res.send({ status: "OK" })

      return
    }

    const [hash, salt] = hashPassword(password)

    await UserModel.query().insert({
      email,
      passwordHash: hash,
      passwordSalt: salt,
    })

    res.send({ status: "User created" })
  })

  app.post("/sign-in", async (req, res) => {
    const {
      body: { email, password },
    } = req

    const user = await UserModel.query().findOne({ email })

    if (!user) {
      res.status(401).send({ error: "y'a pas wsh" })

      return
    }

    const [hash] = hashPassword(password, user.passwordSalt)

    if (hash !== user.passwordHash) {
      res.status(401).send({ error: "y'a pas, wsh" })

      return
    }

    const jwt = jsonwebtoken.sign(
      {
        payload: {
          user: {
            email: user.email,
            id: user.id,
          },
        },
      },
      "dylanToken",
      { expiresIn: "2 days" }
    )

    res.send(jwt)
  })

  app.get("/session", auth, async (req, res) => {
    res.send(req.user)
  })

  app.get("/users", async (req, res) => {
    const users = await UserModel.query()

    if (!users.length) {
      res.status(404).send({ error: "y a pas wesh" })

      return
    }

    res.send(users)
  })

  app.get("/users/:userId", async (req, res) => {
    const {
      params: { userId },
    } = req
    const user = await UserModel.query().findById(userId)

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

    const user = await UserModel.query().insertAndFetch({
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

    const user = await UserModel.query().updateAndFetchById(userId, {
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

    const user = await UserModel.query().findById(userId)

    if (!user) {
      res.status(404).send({ error: "y a pas wesh" })

      return
    }

    await UserModel.query().delete().where({ id: userId })

    res.send({ status: "user " + userId + " deleted" })
  })
}

module.exports = userRoutes
