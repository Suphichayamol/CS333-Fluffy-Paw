var express = require('express');
var router = express.Router();
var connection = require('../database.js');


/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.username) {
    connection.query('SELECT * FROM User WHERE Email = ? ', [req.session.username], function (error, results, fields) {
      
      connection.query('SELECT * FROM SellDogList WHERE Status = "active" ORDER BY VisitCount DESC', function (error, doglist, fields) {
        
        connection.query('SELECT * FROM CartList WHERE UserID = ?', [results[0].idUser], async function (error, cartlist, fields) {
          
          res.render('index', { Fullname: results[0], Session: req.session, Doglist: doglist, CartNum:cartlist.length });
        });
      });
    });
  }
  else {
    connection.query('SELECT * FROM SellDogList WHERE Status = "active" ORDER BY VisitCount DESC', function (error, doglist, fields) {
      
      res.render('index', {
        Session: null,
        Doglist: doglist
      });
    });
  }

});



module.exports = router;