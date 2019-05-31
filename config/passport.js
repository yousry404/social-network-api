const  { ExtractJwt, Strategy} = require("passport-jwt")
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;
const { User } = require("../models")
module.exports = passport => {
  passport.use('jwt', new Strategy(opts, (jwt_payload, done) => {
    User.findOne({
      id: jwt_payload.id
    }).then(user => {
      if (user) {
        return done(null, user)
      }
      return done(null, false)
    })
    .catch(err => {
      console.log(err)
    })
  })) 
}