var express = require('express');
var router = express.Router();
var connection = require('../database.js');
const fetch = require('node-fetch');
/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.session.username) {
        function logJSONData() {
            return new Promise((resolve) => {
                dogid = req.query.dogid
                connection.query('UPDATE SellDogList SET VisitCount = VisitCount + 1 WHERE idDog = ?', [dogid], function (error, doglist, fields) {
                    connection.query('SELECT * FROM SellDogList WHERE idDog = ?', [dogid], function (error, doglist, fields) {

                        connection.query('SELECT * FROM CartList WHERE UserID = ?', [req.session.userid], async function (error, cartlist, fields) {
                            const response = await fetch("http://3.85.236.162/api/dog_breed?url_img=https://fluffy-bucket-333.s3.amazonaws.com/" + dogid + "_" + doglist[0].SellerID);
                            const jsonData = await response.json();

                        resolve({ doglist: doglist, jsonData: jsonData.dog_breed ,Fullname: req.session.user,CartNum: cartlist.length})
                        });
                    });
                });

            });
        }
        async function detail() {
            const results = await logJSONData()
            console.log(results)
            res.render('detail', {
                Session: req.session, Doglist: results.doglist, Breed: results.jsonData, Fullname: results.Fullname,CartNum: results.CartNum
            });
        }

        detail();


    }



    else {
        function logJSONData() {
            return new Promise((resolve) => {
                dogid = req.query.dogid
                connection.query('UPDATE SellDogList SET VisitCount = VisitCount + 1 WHERE idDog = ?', [dogid], function (error, doglist, fields) {
                    connection.query('SELECT * FROM SellDogList WHERE idDog = ?', [dogid], async function (error, doglist, fields) {
                        console.log(doglist[0].SellerID)
                        const response = await fetch("http://3.85.236.162/api/dog_breed?url_img=https://fluffy-bucket-333.s3.amazonaws.com/" + dogid + "_" + doglist[0].SellerID);
                        const jsonData = await response.json();

                        resolve({ doglist: doglist, jsonData: jsonData.dog_breed })
                    });
                });
            });
        }


        async function detail() {
            const results = await logJSONData()
            console.log(results)
            res.render('detail', {
                Session: null, Doglist: results.doglist, Breed: results.jsonData
            });
        }

        detail();
    }
});



module.exports = router;