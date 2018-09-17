/**
 * @author Keawa Rozet, Albert Du, U Keong Cheong
 * @name UploadedImage
 * @package models
 * @description This is the model for the uploadedimages collection in MongoDB
 *
 * HATBOXPHOTOSDB DATABASE LAYOUT
 * Collection: Uploaded Images
 * Document: Image
 * Fields: See Uploaded Image Schema
 **/

/**
 * Import mongoose dependency.
 * @module mongoose is used to map MongoDB database.
 **/
var mongoose = require('mongoose');

/**
 * @name UploadedImageSchema
 * @summary This schema defines the fields in the image documents
 **/
var UploadedImageSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    image_original: {type: Buffer, contentType: String},
    image_medium: {type: Buffer, contentType: String},
    image_medium_path: {type: String},
    image_thumbnail: {type: Buffer, contentType: String},
    image_thumbnail_path: {type: String},

    // Uses the _id to reference the correct category
    image_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories'
    },
    
    image_file_name: {type: String},
    image_file_format: {type: String},

    // 1=accepted, 2=pending, 3=rejected
    status: {type: Number},

    // We can think of type Number as similar to int
    image_file_size: {type: Number },
    image_height: {type: Number},
    image_width: {type: Number},
    image_views: {type: Number},
    image_downloads: {type: Number},
    image_description: {type: String},
    uploaded_by: {type: String},
    upload_date: {type: Date},

    // will consist of key words in the image_description
    tags: [{type: String}]
});

// UploadedImage models the UploadedImages collection
// using UploadedImageSchema as Image document fields.
//
// The first argument of model() is the singular name
// of the collection being modeled
var UploadedImage = mongoose.model('UploadedImage', UploadedImageSchema);

module.exports = UploadedImage;
