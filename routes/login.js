var express = require('express');
var router = express.Router();
var connection  = require('../database.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.username){
    res.redirect('/')
  } 
  else 
  res.render('login');
});

router.post('/', function(req, res, next) {
      
    //  connection.query('SELECT * FROM User ',function(err,rows) {
     
    //         if(err){
    //          req.flash('error', err); 
    //          res.render('list',{page_title:"Users - Node.js",data:''});   
    //         }else{
                
    //             res.render('list',{page_title:"Users - Node.js",data:rows});
    //         }
                                
    //          });
    let username = req.body.email;
    let password = req.body.password;
    // let username = "test@gmail.com";
    // let password = "123456";
    if (username && password) {
      // Execute SQL query that'll select the account from the database based on the specified username and password
      connection.query('SELECT * FROM User WHERE Email = ? AND password = ?', [username, password], function(error, results, fields) {
        // If there is an issue with the query, output the error
              
        console.log(results);
        if (error) throw error;
        // If the account exists
        if (results.length > 0) {
          // Authenticate the user
          req.session.loggedin = true;
          req.session.username = username;
          req.session.userid = results[0].idUser
          // Redirect to home page
          //res.render('homePage',{Fullname:results[0]});
          res.redirect('/');
          
        } else {
          res.send('Incorrect Username and/or Password!');
        }			
        res.end();
      });
    } else {
      res.send('Please enter Username and Password!');
      res.end();
    }
    
            
        });

module.exports = router;