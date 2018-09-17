/**
 * @author Keawa Rozet
 * @name Category
 * @package models
 * @description This is the model for the categories collection in MongoDB
 *
 * HATBOXPHOTOSDB DATABASE LAYOUT
 * Collection: Categories
 * Document: Category
 * Fields: See Categories Schema
 **/

/**
 * Import mongoose dependency.
 * @module mongoose is used to map MongoDB database.
 **/
var mongoose = require('mongoose');


/**
 * @name CategorySchema
 * @summary This schema defines the fields in the category documents
 **/
var CategorySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    category: {type: String}
});

// Category models the categories collection
// using CategorySchema as Category document fields.
//
// The first argument of model() is the singular name
// of the collection being modeled
var Category = mongoose.model('Categories', CategorySchema);

module.exports = Category;
