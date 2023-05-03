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

        connection.query(`INSERT INTO SellDogList(Topic,Province,City,Price,Detail,SellerID)
            VALUES (?,?,?,?,?,?);
            `
            , [topic, province, city, price, detail, req.session.userid],  function (error, addsell, fields) {
                
            });

            
            connection.query('SELECT * FROM SellDogList WHERE SellerID = ? AND idDog = (SELECT MAX(idDog) FROM SellDogList)', [req.session.userid] ,async function (error, findid, fields) {
                let success = "success"
                console.log(findid)
                const file = req.file
                
                const result = await uploadFile(file.buffer, findid[0].idDog + "_" + findid[0].SellerID, file.mimetype)

                
                res.render('upload', { successtext: success });
              });






        
        //img
        // const file = req.file
        // console.log(file)
        // console.log("111")
        // const fileBuffer = await sharp(file.buffer)
        //     .resize({ height: 1920, width: 1080, fit: "contain" })
        //     .toBuffer()
        // console.log("222")
        // const result = await uploadFile(fileBuffer, "iii2", file.mimetype)

        // console.log(result)
        // res.render('s3test')
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




module.exports = router;