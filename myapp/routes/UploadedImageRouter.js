/**
 * @author Keawa Rozet, Albert Du, U Keong Cheong
 * @name UploadedImageRouter
 * @package router
 * @description This is the router to handle displaying images and uploading images
 **/

/**
 * Import dependencies for image upload and processing.
 * @module express to handle routing.
 * @module jimp for image thumbnails.
 * @module image-size to determine the dimensions of the image.
 * @module multer to handle files passed from frontend.
 * @module mongoose to map MongoDB database.
 * @module keyword-extractor to take the image_description and pull tags from it.
 **/
var express = require('express');
var router = express.Router();
var Images = require("../models/UploadedImage");
var Jimp = require('jimp');
var sizeOf = require('image-size');
var multer = require('multer');
var mongoose = require('mongoose');
var keyword_extractor = require("keyword-extractor");
const path = require('path');

/**
 * @summary Used to define where the image is stored and under what alias
 **/
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

/**
 * @summary Checks the extention of the file to ensure it is an image
 * @param req request
 * @param file the file passed from the frontend
 * @param cb callback
 **/
const fileFilter = (req, file, cb) => {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    isImage = true;
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
};

/**
 * @summary defines the store, and fileFilter being used. Also limits file size.
 **/
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 16000000
  },
  fileFilter: fileFilter
});

/**
 * @summary Finds the pending images
 * @param "/pending" true path is /images/pending
 * @return a JSON of pending images and thumbnails
 */
router.get("/pending", function(req, res) {
    var noMatch = false;
    // Get all images and thumbnails from db
    Images.find({'status': 2}, function(err, allImages) {
    thumbnails = allImages.map(function (allImages) {return allImages.image_medium_path;});
      if(err){
        console.log(err);
      } else {
         res.json({images: allImages, thumbnails: thumbnails, noMatch: noMatch});
      }
    });
});

/**
 * @summary Finds the specific image by _id and updates its status to approved
 * @param "/set-approve" true path is /images/set-approve
 */
router.get("/set-approved", function(req, res) {
  Images.findOneAndUpdate({_id: req.query._id}, {$set: {status: 1}}, {new: true}, function(err, doc){
    if(err){
      console.log("Something wrong when updating data: " + err);
    }
    console.log(doc);
    res.sendStatus(200);
  });
});

/**
 * @summary Finds the specific image by _id and updates its status to pending
 * @param "/set-pending" true path is /images/set-pending
 */
router.get("/set-pending", function(req, res) {
  Images.findOneAndUpdate({_id: req.query._id}, {$set: {status: 2}}, {new: true}, function(err, doc){
    if(err){
      console.log("Something wrong when updating data: " + err);
    }
    console.log(doc);
    res.sendStatus(200);

  });
});

/**
 * @summary Finds the specific image by and updates its status to rejected
 * @param "/set-rejected" true path is /images/set-rejected
 */
router.get("/set-rejected", function(req, res) {
  Images.findOneAndUpdate({_id: req.query._id}, {$set: {status: 3}}, {new: true}, function(err, doc){
    if(err){
      console.log("Something wrong when updating data: " + err);
    }
    console.log(doc);
    res.sendStatus(200);
  });
});

/**
 * @summary Finds all of the images
 * @param "/every-image" true path is /images/every-image
 * @return a JSON of all images and thumbnails
 */
router.get("/every-image", function(req, res) {
    var noMatch = false;
    // Get all images and thumbnails from db
    Images.find({}, function(err, allImages) {
    thumbnails = allImages.map(function (allImages) {return allImages.image_medium_path;});
      if(err){
        console.log(err);
      } else {
         res.json({images: allImages, thumbnails: thumbnails, noMatch: noMatch});
      }
    });
});

/**
 * @summary Finds the image thumbnail for each ACCEPTED image in the database
 * @param "/all-thumbnails" true path is /images/all-thumbnails
 * @return a JSON of all accepted images and thumbnails
 */
router.get("/all-thumbnails", function(req, res) {
    var noMatch = false;
    // Get all images and thumbnails from db
    Images.find({'status': 1}, function(err, allImages) {
    thumbnails = allImages.map(function (allImages) {return allImages.image_medium_path;});
      if(err){
        console.log(err);
      } else {
         res.json({images: allImages, thumbnails: thumbnails, noMatch: noMatch});
      }
    });
});

/**
 * @summary Finds the image for each pending image in the database
 * @param "/admin" true path is /images/admin
 * @return a JSON of all pending images
 **/
router.get("/admin", function(req, res) {
    var noMatch = false;
    // Get all images and thumbnails from db
    Images.find({'status': 2}, function(err, allImages) {
      if(err){
        console.log(err);
      } else {
         res.json({images: allImages});
      }
    });
});

/**
 * @summary Uses Fuzzy search on tags to find images based on category
 * @param "/search-thumbnails" true path is /images/search-thumbnails
 * @return array of image thumbnails after fuzzy search in JSON
 **/
router.get("/search-thumbnails", function(req, res) {
    var noMatch = false;

    // Handles if the user enters something into the search bar
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');

        // Get all images and image thumbnails from image db
        // based on search and category
        Images.find({'image_category': req.query.image_category, 'status': 1, tags: regex}, function(err, allImages) {
          thumbnails = allImages.map(function (allImages) {return allImages.image_medium_path;});
          if(err) {
            console.log(err);
          } else {
            // if no images were found, return all images in selected category
            if (allImages.length < 1) {
              noMatch = true;
              // Get all images and thumbnails from db in only the selected category
              Images.find({'image_category': req.query.image_category, 'status': 1}, function(err, restOfImages){
                thumbnails = restOfImages.map(function (restOfImages) {return restOfImages.image_medium_path;});
                  if(err){
                    console.log(err);
                  } else {
                    res.json({images: restOfImages, thumbnails: thumbnails, noMatch: noMatch});
                  }
             });
            // primary action, returns images and thumbnails of successfull search and category
           } else {
             res.json({images: allImages, thumbnails: thumbnails, noMatch: noMatch});
           }
          }
        });
    // if no search was entered, return all images in selected category
    } else {
        // Get all images and thumbnails from db in only the selected category
        Images.find({'image_category': req.query.image_category, 'status': 1}, function(err, allImages){
          thumbnails = allImages.map(function (allImages) {return allImages.image_medium_path;});
            if(err){
              console.log(err);
            } else {
              res.json({images: allImages, thumbnails: thumbnails, noMatch: noMatch});
            }
       });
    }
});

 /**
  * @summary Takes in a Form and uploads the image to the database
  * @param "/" true path is /images/
  * @return res.status 201 if successfull, err if not
  **/
router.post("/", upload.single('image'), function(req, res) {
  console.log(req.body);
  // used to get the width and height of the
  var dimensions = sizeOf(req.file.path);
  // extracts tags from image_description
  var tags = keyword_extractor.extract(req.body.image_description, {
                                  language:"english",
                                  remove_digits: true,
                                  return_changed_case:true,
                                  remove_duplicates: false
                                });

  var thumbnail_buffer;
  // path for thumbnail
  var thumbnail_path = "./uploads/_t" + req.file.originalname;

  // Creates a 128x128 image thumbnail.
  // JPEG thumbnails are 50% of the original image quality.
  // PNG thumbnails use RGB colors and Paeth filtering.
  // Other image formats are resized to 128x128.
  Jimp.read(req.file.path, function (err, thumbnail) {
    var extension = thumbnail.getExtension();

    if(err) {
        throw err;
    } else if((extension === "jpg") || (extension === "jpeg")) {
        // writes the thumbnail to the folder
        thumbnail.resize(128, 128)
            .quality(50)
            .write(thumbnail_path);
        // turns the image into buffer data
        thumbnail.getBuffer(req.file.mimetype, function(err, data) {
            if(err) {
              console.log(err);
            } else {
              thumbnail_buffer = data;
            }
        });
    } else if((extension === "png")) {
        thumbnail.resize(128, 128)
                .rgba(false)        // Use RGB colors
                .filterType(4)      // Paeth filtering
                .write(thumbnail_path);
        // Turns the image into buffer data
        thumbnail.getBuffer(req.file.mimetype, function(err, data) {
            if(err) {
              console.log(err);
            } else {
              thumbnail_buffer = data;
            }
        });
    } else {
        thumbnail.resize(128, 128)
                .write(thumbnail_path);
        // Turns the image into buffer data
        thumbnail.getBuffer(req.file.mimetype, function(err, data) {
            if(err) {
              console.log(err);
            } else {
              thumbnail_buffer = data;
            }
        });
    }
  });

  var medium_res_buffer;
  // path for medium resolution image.
  var medium_res_path = "./uploads/_m" + req.file.originalname;

  // Creates a 256x256 medium resolution image.
  // JPEG medium res images are 75% of the original image quality.
  // PNG medium res images use RGB colors and Average filtering.
  // Other image formats are resized to 256x256.
  Jimp.read(req.file.path, function (err, medium) {
    var extension = medium.getExtension();

    if(err) {
        throw err;
    } else if((extension === "jpg") || (extension === "jpeg")) {
        // writes the thumbnail to the folder
        medium.resize(256, 256)
            .quality(75)
            .write(medium_res_path);
        // turns the image into buffer data
        medium.getBuffer(req.file.mimetype, function(err, data) {
            if(err) {
              console.log(err);
            } else {
              medium_res_buffer = data;
            }
        });
    } else if((extension === "png")) {
        medium.resize(256, 256)
                .rgba(false)        // Use RGB colors
                .filterType(3)      // Average filtering
                .write(medium_res_path);
        // Turns the image into buffer data
        medium.getBuffer(req.file.mimetype, function(err, data) {
            if(err) {
              console.log(err);
            } else {
              medium_res_buffer = data;
            }
        });
    } else {
        medium.resize(256, 256)
                .write(medium_res_path);
        // Turns the image into buffer data
        medium.getBuffer(req.file.mimetype, function(err, data) {
            if(err) {
              console.log(err);
            } else {
              medium_res_buffer = data;
            }
        });
    }
  });

  // creates the image based off of the UploadedImage model
  const image = new Images({
    _id: new mongoose.Types.ObjectId(),
    image_original: req.file.path,
    image_category: req.body.image_category,
    image_file_format: req.file.mimetype,
    image_file_name: req.file.originalname,

    // thumbnail
    image_thumbnail: thumbnail_buffer,
    image_thumbnail_path: thumbnail_path,

    // Medium resolution image
    image_medium: medium_res_buffer,
    image_medium_path: medium_res_path,

    // 1=accepted, 2=pending, 3=rejected
    status: 2,

    // We can think of type Number as similar to int
    image_file_size: req.file.fileSize,
    image_height: dimensions.height,
    image_width: dimensions.width,
    image_views: 0,
    image_downloads: 0,
    image_description: req.body.image_description,
    uploaded_by: req.body.uploaded_by,
    upload_date: new Date(),
    tags: tags
  });
  image
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created image successfully",
        createdProduct: {
            image_file_name: result.image_file_name,
            image_file_size: result.image_file_size,
            _id: result._id,
            // request: {
            //     type: 'GET',
            //     url: "http://localhost:3000/products/" + result._id
            // }
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

// Used to run the fuzzy search
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;
