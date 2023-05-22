var express = require('express');
var router = express.Router();
var connection = require('../database.js');


/* GET home page. */

router.get('/', async function (req, res, next) {
    if (req.session.username) {
        connection.query('SELECT * FROM User WHERE Email = ? ', [req.session.username], function (error, results, fields) {
          connection.query('SELECT * FROM SellDogList WHERE SellerID = ?',[results[0].idUser], function (error, doglist, fields) {
            console.log(doglist);
            connection.query('SELECT * FROM CartList WHERE UserID = ?', [results[0].idUser], async function (error, cartlist, fields) {
              res.render('mydog', { Fullname: results[0], Session: req.session, cdlist: doglist, CartNum:cartlist.length });
            });
          });
        });
      }
      else {
        connection.query('SELECT * FROM SellDogList ', function (error, doglist, fields) {
          console.log(doglist);
          res.render('/', {
            Session: null,
            Doglist: doglist
          });
        });
      }

});


module.exports = router;