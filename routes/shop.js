var express = require('express');
var router = express.Router();
var connection = require('../database.js');


/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.username) {
    connection.query('SELECT * FROM User WHERE Email = ? ', [req.session.username], function (error, results, fields) {
      console.log(results);
      connection.query('SELECT * FROM SellDogList ', function (error, doglist, fields) {
        console.log(doglist);
        connection.query('SELECT * FROM CartList WHERE UserID = ?', [results[0].idUser], async function (error, cartlist, fields) {
          console.log(cartlist.length);
          res.render('shop', { Fullname: results[0], Session: req.session, Doglist: doglist, CartNum:cartlist.length });
        });
      });
    });
  }
  else {
    connection.query('SELECT * FROM SellDogList ', function (error, doglist, fields) {
      console.log(doglist);
      res.render('shop', {
        Session: null,
        Doglist: doglist
      });
    });
  }

});


module.exports = router;