var express = require('express');
var router = express.Router();

var images = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root: 'public' });
});

router.get('/images', function(req, res) {
  console.log('GET /images');
  res.send(images);
});

router.post('/images', function(req, res) {
    console.log('POST image');
    console.log(req.body);
    images.push(req.body);
    res.end('{"success" : "Posted Successfully", "status" : 200}');
});

router.put('/images', function(req,res) {
    console.log('UPDATE image');
    images[req.body.index] = req.body;
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});

module.exports = router;
