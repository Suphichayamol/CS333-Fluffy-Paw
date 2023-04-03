var express = require('express');
var router = express.Router();
var connection  = require('../database.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.username){
    res.redirect('/')
  } 
  else 
  res.render('register1',{errtext:""});
});

router.post('/', function(req, res, next) {  
    let firstname = req.body.fname;
    let lastname = req.body.lname;
    let email = req.body.email;
    let password = req.body.psw;
    let rpassword = req.body.rpsw;
    console.log(req.body);
    if(password != rpassword){
        let pswerr = "Passwords do not match"
        res.render('register1',{errtext:pswerr});
    }
    else{
      // Execute SQL query that'll select the account from the database based on the specified username and password
      connection.query('SELECT * FROM User WHERE Email = ?', [email], function(error, results, fields) {
        // If there is an issue with the query, output the error   
        console.log(results);
        if (error) throw error;
        // If the account exists
        if (results.length > 0) {
            let pswerr = "Email existed"
            res.render('register1',{errtext:pswerr});
        } else {
            connection.query(`INSERT INTO User(Email,password,Firstname,Lastname)
            VALUES (?,?,?,?);
            `
            , [email,password,firstname,lastname], function (error, cartlist, fields) { 
                let pswerr = "success"
                res.render('register1',{errtext:pswerr});  
            });
        }			
      });
    
    }
    
    
    
            
        });

module.exports = router;