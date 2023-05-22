var express = require('express');
var router = express.Router();
var connection = require('../database.js');

router.get('/', function (req, res, next) {
    if (req.session.username) {
        let breed = req.query.breed;
        let province = req.query.province;
        let order = req.query.order;
        connection.query('SELECT * FROM User WHERE Email = ? ', [req.session.username], function (error, results, fields) {
            console.log(results);
            if (order == 'high') {
            connection.query('SELECT * FROM SellDogList WHERE Breed LIKE "%"?"%" AND Province LIKE "%"?"%" AND Status = "active" ORDER BY Price DESC', [breed, province], function (error, doglist, fields) {
                console.log(doglist);
                connection.query('SELECT * FROM CartList WHERE UserID = ?', [results[0].idUser], async function (error, cartlist, fields) {
                    console.log(cartlist.length);
                    res.render('shop', { Fullname: results[0], Session: req.session, Doglist: doglist, CartNum: cartlist.length });
                });
            });
            }
            else{
                connection.query('SELECT * FROM SellDogList WHERE Breed LIKE "%"?"%" AND Province LIKE "%"?"%" AND Status = "active" ORDER BY Price', [breed, province], function (error, doglist, fields) {
                    console.log(doglist);
                    connection.query('SELECT * FROM CartList WHERE UserID = ?', [results[0].idUser], async function (error, cartlist, fields) {
                        console.log(cartlist.length);
                        res.render('shop', { Fullname: results[0], Session: req.session, Doglist: doglist, CartNum: cartlist.length });
                    });
                });
            }
        });
    }
    else {
        let breed = req.query.breed;
        let province = req.query.province;
        let order = req.query.order;
        if (order == 'high') {
            connection.query('SELECT * FROM SellDogList WHERE Breed LIKE "%"?"%" AND Province LIKE "%"?"%" AND Status = "active" ORDER BY Price DESC', [breed, province], function (error, doglist, fields) {
                console.log(doglist);
                res.render('shop', {
                    Session: null,
                    Doglist: doglist
                });
            });
        }
        else{
            connection.query('SELECT * FROM SellDogList WHERE Breed LIKE "%"?"%" AND Province LIKE "%"?"%" AND Status = "active" ORDER BY Price', [breed, province], function (error, doglist, fields) {
                console.log(doglist);
                res.render('shop', {
                    Session: null,
                    Doglist: doglist
                });
            });
        }
    }


});


module.exports = router;