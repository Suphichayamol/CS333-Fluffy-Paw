var express = require('express');
var router = express.Router();
var connection = require('../database.js');

router.post('/', function (req, res, next) {
            iddog = req.body.idDog
            connection.query('UPDATE SellDogList SET Status = "sold" WHERE idDog = ? ', [iddog], async function (error, result, fields) {    
            connection.query('DELETE FROM CartList WHERE DogID = ? ', [iddog], async function (error, cartlist, fields) {  
              res.redirect("/cart");  
            });
        });

});

module.exports = router;