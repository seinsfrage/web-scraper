var express = require('express'),
 	Router  = express.Router(),
 	Article = require("../models/article.js"),
 	Comment = require("../models/comment.js"),
 	request = require("../request/request.js"),
 	mongoose = require("mongoose");


Router.get("/", function(req, res) {
	
	function getArticles () {
		Article.find({})
		.populate("comments")
		.exec(function (err, articles) {
	    	if (err) {
	      		throw err;
	    	} else {
            articles.forEach(function (article) {
              console.log("Article:", article);
            })
	      		res.render('index', {articles:articles});
	    	}
		});
	}
	request.scraper(getArticles);
	
});

Router.post("/comment/:id", function(req, res) {
  var newComment = new Comment(req.body);

  newComment.save(function(error, data) {
    if (error) {
      res.send(error);
    }
    else {
      Article.findOneAndUpdate({"_id":req.params.id}, {"comment": data._id})
      .exec(function(err, comment) {
        if (err) {
          throw err;
        } else {
          res.send(comment);
        }
      })
    }
  });
});

Router.delete("/delete/:id", function (req, res) {
  Comment.remove({"_id": req.params.id}, function(err, data) {
    if (err){
      throw err;
    } else {
      console.log("Success");
    }
  });
});



module.exports = Router;