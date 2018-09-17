/**
 * @author Keawa Rozet, Albert Du
 * @name UserAccount
 * @package models
 * @description This is the model for the registeredusers collection in MongoDB
 *
 * HATBOXPHOTOSDB DATABASE LAYOUT
 * Collection: Registered users
 * Document: User account
 * Fields: See Login Credentials Schema
 **/


/**
 * Import mongoose and bcrypt dependencies.
 * @module mongoose to map MongoDB database
 * @module mongoose-unique-validator to validate user input, 
 *         i.e. prevent duplicates
 * @module bcrypt for hashing and salting password
 **/
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var bcrypt = require('bcrypt');

/**
 * @name LoginCredentialsSchema
 * @summary This schema defines the fields in user account documents
 **/
var LoginCredentialsSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        uniqueCaseInsensitive: true,
        required: [true, 'Enter a valid email address'],
        trim: true,
    },
    username: {
        type: String,
        unique: true,
        uniqueCaseInsensitive: true,
        required: [true, 'Enter a username'],
        trim: true,
        minlength: [2, 'Username must be at least 2 characters long'],
        maxlength: [20, 'Username must be less than 20 characters long']
        //_userID: LoginCredentialsSchema.Types.ObjectID
    },
    password: {
        type: String,
        required: [true, 'Enter a password'],
        trim: true,
        minlength: [3, 'Password must be at least 3 characters long'],
        maxlength: [20, 'Password must be less than 20 characters long'],
    }
});

// Apply the Mongoose Unique Validator plugin to LoginCredentialsSchema.
LoginCredentialsSchema.plugin(uniqueValidator);

/**
 * @summary Authenticate input against database
 * @param email string of text
 * @param password string of text
 * @param callback callback to original fuction
 * @return callback
 **/
LoginCredentialsSchema.statics.authenticate = function (email, password, callback) {
    RegisteredUser.findOne({ email: email }).exec(function (err, user) {
        if (err) {
            return callback(err);
        }
        else if (!user) {
            var err = new Error('User not found.');
            err.status = 401;
            return callback(err);
        }
        bcrypt.compare(password, user.password, function (err, result) {
            if (result === true) {
                return callback(null, user);
            }
            else {
                return callback();
            }
        });
    });
};

// Hashes password before saving it to the database
LoginCredentialsSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

// RegisteredUser models the RegisteredUser collection
// using LoginCredentialsSchema as UserAccount document fields.
//
/********************************IMPORTANT*************************************/
// The first argument in model() is the SINGULAR name of the collection
// the model is for. Mongoose automatically looks for the plural version
// of the model name. That's why the model is named RegisteredUser, without an s.

var RegisteredUser = mongoose.model('RegisteredUser', LoginCredentialsSchema);

module.exports = RegisteredUser;
