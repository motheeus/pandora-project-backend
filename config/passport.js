const { authSecret } = require('../.env')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt
const db = require("../config/db.js")

const params = {
    secretOrKey: authSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const strategy = new Strategy(params, (payload, done) => {
    db('users')
        .where({id_user: payload.id})
        .first()
        .then(user => done(null, user ? {...payload} : false))
        .catch(err => done(err, false))
})

passport.use(strategy)

const authenticate = () => passport.authenticate('jwt', {session: false})

module.exports = authenticate
