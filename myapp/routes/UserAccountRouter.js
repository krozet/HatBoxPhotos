/**
 * @author Keawa Rozet, Albert Du
 * @name UploadedImageRouter
 * @package router
 * @description This is the router to handle user Log In and Registration
 **/

/**
 * Import dependencies for user Log In and Registration.
 * @module express to handle routing.
 **/
var express = require('express');
var router = express.Router();
var RegisteredUser = require('../models/UserAccount');
var multer = require('multer');
var upload = multer();

/**
 * @summary GET route for reading data from login or registration page
 * @param "/" true path is /users/
 * @return redirect to /photographer/profile
 **/
router.get('/', function (req, res, next) {
    return res.sendFile(path.join(__dirname + '/templateLogReg/index.html'));
});

/**
 * @summary POST route for sending data to the server
 * @param "/" true path is /users/
 * @return redirect to /photographer/profile
 **/
router.post('/', upload.any(), function (req, res, next) {
  // res.setHeader("Content-Type", "application/x-www-form-urlencoded");

    // REGISTRATION ROUTE
    // Adds a new registered user to the registered users collection
    // after user enters all fields in registration form.
    if (req.body.email &&
        req.body.username &&
        req.body.password) {

        // Fields for account document from user input
        var userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        };

        // Creates an account document in registered users collection
        // with userData fields
        RegisteredUser.create(userData, function (error, user) {
            if (error) {
                return next(error);
            }
            // Navigate new registered user to their profile once registration
            // is complete.
            // This starts a session. SEE: SESSION ROUTE
            else {
              console.log("Account successfully created.");

              req.session.userId = user._id;
              return res.redirect('/users/photographer/profile');
            }
        });
    }

    // LOGIN ROUTE
    else if (req.body.email && req.body.password) {
        // Checks if email and password entered by user
        // matches the email and password in the registered user collection
        RegisteredUser.authenticate(req.body.email, req.body.password, function (error, user) {
            if (error || !user) {
                var err = new Error("Wrong email or password.");
                err.status = 401;
                return next(err);
            }
            // Redirect admin to profile page if authentication was successful.
            // See ADMIN SESSION ROUTE
            else if(user.email === 'HatBossPhotos@admin.hatboxphotos.com') {
                IsAdmin = true;

                console.log("Admin successfully logged in");
                req.session.userId = user._id;
                return res.redirect('/users/admin/profile');
            }
            // Redirect user to profile page if authentication was successful
            // See SESSION ROUTE
            else {
                console.log("Successfully logged in.");
                req.session.userId = user._id;
                return res.redirect('/users/photographer/profile');
            }
        });
    }
    else {
        var err = new Error("All fields required.");
        err.status = 400;
        return next(err);
    }
});

/**
 * @summary ADMIN SESSION ROUTE, redirect admin user to profile page
 *          after successful login
 * @param "/profile" true path is /users/profile/
 * @return Display name and email of admin
 **/
router.get('/admin/profile', function (req, res, next) {
    RegisteredUser.findById(req.session.userId).exec(function (error, admin) {
        if (error) {
            console.log("Couldn't access admin profile page");
            return next(error);
        }
        else if(admin === null) {
            var err = new Error("Not authorized! Go back!");
            err.status = 400;
            return next(err);
        }
        else {
            console.log("Admin profile page accessed");
            return res.send('<h1>Display Name: </h1>' + admin.username + '<h2>Email: </h2>' + admin.email + '<br><a type="button" href="/logout">Logout</a>');
        }
    });
});

/**
 * @summary SESSION ROUTE, redirect registered user to profile page
 *          after successful registration or login
 * @param "/profile" true path is /users/profile/
 * @return Display name and email of registered user
 **/
router.get('/photographer/profile', function (req, res, next) {
    RegisteredUser.findById(req.session.userId).exec(function (error, user) {
        if (error) {
            console.log("Couldn't access profile page");
            return next(error);
        }
        else if (user === null) {
            var err = new Error("Not authorized! Go back!");
            err.status = 400;
            return next(err);
        }

        // Note: this looks like user profile page. Perhaps front-end
        // can edit this
        else {
            console.log("Profile page accessed");
            return res.send('<h1>Display Name: </h1>' + user.username + '<h2>Email: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>');
        }
    });
});

/**
 * @summary LOGOUT ROUTE, Ends user session
 * @param "/logout" true path is /users/logout/
 * @return redirect to homepage
 **/
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      }
      else {
        return res.redirect('/');
      }
    });
  }
});

/**
 * @summary POST route for deleting a user by their id
 * @param "/delete" true path is /users/delete/
 **/
router.post('/delete', function (req, res, next) {
  RegisteredUser.findByIdAndRemove(req.body._id, function(err, user) {
    if (err) {
      console.log(err);
    } else {
    console.log('findByIdAndRemove user: ', user);
    }
    return user;
  })
});

/**
 * @summary Finds the image thumbnail for each image in the database
 * @param "/all-thumbnails" true path is /images/all-thumbnails
 * @return a JSON of all images and thumbnails
 */
router.get("/all-users", function(req, res) {
    var noMatch = false;
    // Get all users and emails from db
    RegisteredUser.find({}, function(err, allUsers) {
        emails = allUsers.map(function (allUsers) {return allUsers.email;});
        if(err){
            console.log(err);
        } else {
            res.json({users: allUsers, emails: emails, noMatch: noMatch});
        }
    });
});

module.exports = router;
