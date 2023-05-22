var express = require('express');
var router = express.Router();
var connection = require('../database.js');


router.get('/', function (req, res, next) {
        if(req.session.username){
        let dogid = req.query.dogid
        connection.query('SELECT * FROM User WHERE Email = ? ', [req.session.username], function (error, results, fields) {
            console.log(results[0].idUser);
            connection.query(`INSERT INTO CartList(UserID,DogID)
            SELECT * FROM (SELECT ? AS UserID, ? AS DogID) AS new_value
            WHERE NOT EXISTS (
                SELECT DogID FROM CartList WHERE DogID = ? AND UserID = ?
            ) LIMIT 1;
            `
            , [results[0].idUser,dogid,dogid,results[0].idUser], async function (error, cartlist, fields) { 
              res.redirect('back') 
            });
          });
        }
        else{
            res.redirect('/login');
        }
});

module.exports = router;