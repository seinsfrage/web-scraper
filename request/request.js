var request = require('request'),
    cheerio = require('cheerio'),
    express = require('express'),
    mongoose = require('mongoose'),
    Article = require("../models/article.js"),
    Router  = express.Router();


module.exports.scraper = function (cb) {
  var articleArray = [];
  
  request("https://mynintendonews.com/", function(error, response, html) {

    mongoose.connection.db.dropCollection('articles');

    var $ = cheerio.load(html);
    
    $("article.type-post").each(function(i, element) {

      var storyData = {},
          header = $(this).find('a[rel="bookmark"]')
      
      storyData.imgsrc  = $(this).find('a.thumbnail img').attr('src');
      storyData.summary = $(this).find('div.excerpt p').text();
      storyData.title   = header.text().trim();
      storyData.link    = header.attr('href');

      var newArticle = new Article(storyData);
      articleArray.push(newArticle);
    });
    Article.insertMany(articleArray, cb);
  });
}

module.exports.Router = Router;



  


