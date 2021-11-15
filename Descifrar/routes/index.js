const express = require('express');
const router = express.Router();
const controler = require('../controllers/controler');


/* GET home page. */
router.get('/', function (req, res) {
    res.render('index');
});

router.post('/descifrar', controler.descifrar);

module.exports = router;