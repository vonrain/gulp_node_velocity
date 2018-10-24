var express = require('express');
var router = express.Router();
var indexService = require('../service/index');

var http = require('http');

/* GET home page. */
router.get('/', function(req, res, next) {
    indexService.getData().then(function(data){
        // res.render('index', { title: data.name });
        res.render('index',data);
        console.log(data);
    });

});

module.exports = router;
