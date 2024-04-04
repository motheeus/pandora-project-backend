const { saveUser, getUser } = require("../api/user.js")
const { signIn, validateToken } = require("../api/auth.js")
const express = require("express")
const authenticate = require("./passport.js")
const admin = require("./admin.js")

const router = express.Router()

router.post('/signup', saveUser)
router.post('/signin', signIn)
router.post('/validateToken', validateToken)

router.route('/users')
    .all(authenticate())
    .post(admin(saveUser))
    .get(admin(getUser))

router.route("/users/:id")
    .put(saveUser)    



module.exports = router