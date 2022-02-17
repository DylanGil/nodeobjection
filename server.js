const express = require("express")
const knex = require("knex")
const { Model } = require("objection")
const knexfile = require("./knexfile")
const morgan = require("morgan")
const userRoutes = require("./src/routes/users.js")

const app = express()
const port = 3000
app.use(morgan("dev"))
const db = knex(knexfile)
Model.knex(db)
app.use(express.json())

userRoutes({ app })

app.listen(port, () => console.log(`🎉 Listening on :${port}`))
