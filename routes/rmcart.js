var express = require('express');
var router = express.Router();
var connection = require('../database.js');

router.get('/', function (req, res, next) {
        let dogid = req.query.dogid
        
        connection.query('SELECT * FROM User WHERE Email = ? ', [req.session.username], function (error, results, fields) {
            //console.log(results);
            connection.query('DELETE FROM CartList WHERE UserID = ? AND DogID = ?', [results[0].idUser,dogid], async function (error, cartlist, fields) {
              console.log(cartlist);  
              res.redirect("/cart");  
            });
          });

});

module.exports = router;