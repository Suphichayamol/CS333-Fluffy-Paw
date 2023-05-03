var express = require('express');
var router = express.Router();
var connection = require('../database.js');


/* GET home page. */

router.get('/', async function (req, res, next) {
  if (req.session.username) {
    
    function condata() {
      return new Promise((resolve) => {
      
      connection.query('SELECT * FROM User WHERE Email = ? ', [req.session.username], function (error, results, fields) {
        
        connection.query('SELECT * FROM CartList WHERE UserID = ?', [results[0].idUser], async function (error, cartlist, fields) {
          console.log(cartlist)
          const cdlist = [];
          for (let i = 0; i < cartlist.length; i++) {
            function looprun(cart){
            return new Promise((resolve) => {
              connection.query('SELECT * FROM SellDogList WHERE idDog = ?', [cart], function (error, doglist, fields) {
                 console.log(doglist[0])
                resolve(doglist[0]);

              });
              
            });
          }
          cdlist.push(await looprun(cartlist[i].DogID))
        }
        resolve({cdlist:cdlist, fullname:results[0], cartnum: cartlist.length});
        });
      });
      
    });
    }

    async function renderdata() {
      const results = await condata()
      console.log(results);
      res.render('cart1', { cdlist: results.cdlist, Fullname : results.fullname, CartNum :results.cartnum });
    }
    

    
    renderdata();
  }
  else {
    connection.query('SELECT * FROM SellDogList ', function (error, doglist, fields) {
      console.log(doglist);
      res.render('index', {
        Session: null,
        Doglist: doglist
      });
    });
  }

});


module.exports = router;