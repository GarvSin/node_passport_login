const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//LoadUSer Model
const User = require('../models/User');

module.exports = function(passport){
    passport.use(
        new LocalStartegy({usernameField: 'email' }, (email, password, done) => {
            //Match User
            User.findOne({email: email})
            .then(user => {
                if(!user){
                    return done(null, false, {message: 'That email is not registed'});
                }
                //Match password
                bcrypt.compare(password, user.password, (err, isMatch) =>{
                    if(err) throw err;

                    if(isMatch) {
                        return done(null, user);
                    }else{
                        return done(null, false, {message: 'Password is incorrect'});
                    }
                });
            })
            .catch(err => console.log(err));
        })
    );
}