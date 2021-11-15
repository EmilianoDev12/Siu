const express = require('express');
const router = express.Router();
const controler = require('../controllers/controler');


/* GET home page. */
router.get('/', function (req, res) {
    res.render('index');
});

router.post('/cifrar', controler.cifrar);
router.get('/descargar', controler.descargar);

module.exports = router;