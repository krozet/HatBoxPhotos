/**
 * @author Keawa Rozet
 * @name CategoryRouter
 * @package router
 * @description This is the router to handle returning categories
 **/

/**
 * Import dependencies for image upload and processing.
 * @module express to handle routing.
 * @module mongoose to map MongoDB database.
 **/
var express = require('express');
var router = express.Router();
var Category = require("../models/Category");
var mongoose = require('mongoose');
const path = require('path');

/**
 * @summary Finds the category for each Category in the database
 * @param "/" true path is /categories/
 * @return a JSON of all categories
 */
router.get("/", function(req, res) {
    var noMatch = false;
    // Get all categories from db
    Category.find({}, function(err, allCategories) {
    categories = allCategories.map(function (allCategories) {return allCategories;});
      if(err){
        console.log(err);
      } else {
         res.json({categories: categories});
      }
    });
});

/**
 * @summary Finds the specific category by _id or by category
 * @param "/category" true path is /categories/category
 * @return a JSON of the single category or _id
 */
router.get("/category", function(req, res) {
    // Get single category from db using _id
    if (req.query._id) {
    Category.findById(req.query._id, function(err, category) {
      if(err){
        console.log(err);
      } else {
         res.json({category: category.category});
      }
    });
  // Get single _id from db using category
  } else {
    Category.findOne({'category': req.query.category}, function(err, category) {
      if(err){
        console.log(err);
      } else {
         res.json({_id: category._id});
      }
    });
  }
});

/**
 * @summary Takes in an x-www-form-urlencoded and creates a category in the database
 * @param "/" true path is /categories/
 * @return res.status 201 if successfull, err if not
 **/
router.post('/', function (req, res, next) {
  // creates the category based off of the Categories model
  const category = new Category({
    _id: new mongoose.Types.ObjectId(),
    category: req.body.category
  });
  category
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created category successfully",
        createdProduct: {
            _id: result._id,
            category: result.category
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


module.exports = router;
