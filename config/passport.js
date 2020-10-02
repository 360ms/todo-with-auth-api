const jwt_passport = require('passport-jwt')
const User = require('../mongodb/models/User')
const keys = require('./keys')

const options = {}
options.jwtFromRequest = jwt_passport.ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = keys.secret

module.exports = passport => {
    passport.use(
        new jwt_passport.Strategy(options, (payload, done) => {
            User.findById(jwt_passport.id)
                .then(user => {
                    if (user) return done(null, user)
                    else return done(null, false)
                })
                .catch(error => console.log(`JWT PASSPORT ERROR - ${error.message}`))
        })
    )
}