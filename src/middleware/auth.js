const jsonwebtoken = require("jsonwebtoken")
const UserModel = require("../model/user.js")

const auth = async (req, res, next) => {
  const {
    headers: { authentication },
  } = req

  try {
    const {
      payload: {
        user: { email },
      },
    } = jsonwebtoken.verify(authentication, "dylanToken")

    req.user = await UserModel.query().findOne({ email })

    next()
  } catch (error) {
    res.status(401).send({ error: "no pasaran" })
  }
}

module.exports = auth
