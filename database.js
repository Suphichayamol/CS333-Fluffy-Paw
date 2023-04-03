var mysql = require('mysql');
var conn = mysql.createConnection({
  host: 'database-1.cjnatp4tuw7s.us-east-1.rds.amazonaws.com', // Replace with your host name
  user: 'admin',      // Replace with your database username
  password: 'fluffypaw',      // Replace with your database password
  database: 'fluffypaw_db' // // Replace with your database Name
}); 
 
conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = conn;