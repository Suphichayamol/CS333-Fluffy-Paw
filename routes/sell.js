var express = require('express');
var router = express.Router();
var connection = require('../database.js');


const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const { uploadFile, getFileStream } = require('./s3');
const session = require('express-session');

router.get('/', (req, res) => {
    if (req.session.username) {
        connection.query('SELECT * FROM User WHERE Email = ? ', [req.session.username], function (error, results, fields) {
            console.log(results);
              connection.query('SELECT * FROM CartList WHERE UserID = ?', [results[0].idUser], async function (error, cartlist, fields) {
                console.log(cartlist.length);
                res.render('upload', { Fullname: results[0], CartNum:cartlist.length ,successtext: ""});
              });
          });
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
})



router.post('/', upload.single('img'), async (req, res) => {
    if (req.session.username) {
        let topic = req.body.topic
        let province = req.body.province
        let city = req.body.city
        let price = req.body.price
        let detail = req.body.detail
        let breed = req.body.breed
        let phone = req.body.phone
        let status = "active"
        connection.query(`INSERT INTO SellDogList(Topic,Province,City,Price,Detail,SellerID,Breed,Phonenum,VisitCount,Status)
            VALUES (?,?,?,?,?,?,?,?,?,?);
            `
            , [topic, province, city, price, detail, req.session.userid,breed,phone,0,status],  function (error, addsell, fields) {
                
            });

            
            connection.query('SELECT * FROM SellDogList WHERE SellerID = ? AND idDog = (SELECT MAX(idDog) FROM SellDogList)', [req.session.userid] ,async function (error, findid, fields) {
                let success = "success"
                console.log(findid)
                const file = req.file
                
                const result = await uploadFile(file.buffer, findid[0].idDog + "_" + findid[0].SellerID, file.mimetype)

                
                connection.query('SELECT * FROM CartList WHERE UserID = ?', [req.session.userid], async function (error, cartlist, fields) {
                    res.render('upload', { successtext: success , Fullname:req.session.user,CartNum:cartlist.length});
                  });
              });
    }

    else {
        connection.query('SELECT * FROM SellDogList WHERE Status = "active" ', function (error, doglist, fields) {
            console.log(doglist);
            res.render('index', {
                Session: null,
                Doglist: doglist
            });
        });
    }
})




module.exports = router;
