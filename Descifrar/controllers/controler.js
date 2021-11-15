const NodeRSA = require('node-rsa');
const fs = require('fs');
const crypto = require('crypto');
const tar = require('tar');
var fecha;

module.exports = {
    descifrar:function (req, res, next) {
        let key = new NodeRSA({b: 1024});
        let mensaje = req.body.msj;
        let verify = req.body.fir;
        console.log(mensaje);
        let private_key = '-----BEGIN RSA PRIVATE KEY-----\n' +
        'MIICWwIBAAKBgQCra2EGUg5XK7cv/AMFJMaQizMMb3NMMZFsNtDAP3pYpad6UFNb\n' +
        'PJGTWxEV3G5vZlZBgxhgO64/qhd2kPX44HboIf2fgP02tVcFuCgbcQnz3AyUOGM6\n' +
        '6H9MHhUil57vZEI+BSWgUonNMAwqzH3mngQi7ZS248knwW3virPnmKMcHQIDAQAB\n' +
        'AoGAdHHKBAgjs7V/iDoSNyFHPZNBhzYCRYT6e181KRM14hgNj7oXFcgsP8RB8+68\n' +
        'mjITcAdEvMJt2NOLgsBwRrL8Mg7kGB87/umTzORSRZsxiRMJ4sNHtQZXJ08HrmRr\n' +
        'gDjWAbaUeMNBwwS405FoLvuwYvD7/hFT09P8Mwnl49wqZ6ECQQDwpAE46WCEaLR2\n' +
        'cZJ9JaNf4RTTx7sqUZKIVEzshKnNBDsZrShWdBN5elAVpwg/6PkKkZ1IkD0AqB2e\n' +
        '1ZBNsloZAkEAtlxSJR1aSPOpnDSVSNdMv/AkxDdBz7FzR7QqB/6Uh5sPex/2iMgQ\n' +
        'uYg1l2pCazKR1utkGa9Jgigvd7HM1dyapQJAYmeu2EcXYQ4wPf9TmDm8BYlVqwUS\n' +
        'VMvm0Dko+8+EYIJKaMWWqUPucs7B0RjtFrV+ogPJ/dJ+H7af5kQPLrawgQJAYpJ6\n' +
        'sKcyI1baap4dx7bhPKrxJML9puezeaHQSmv5G2fcsWAwofUK3U7cMRF1/33hSTwJ\n' +
        '6rxOTrWsGtYX884AJQJASQWGKjrwYhEbvu2YlcIW5u39uexFffT6/JEQ/9Lmzh14\n' +
        'B76CQ5Xwo89ukkkfIYaLrvIvFxvG8iL1r/TrUXTKIQ==\n' +
        '-----END RSA PRIVATE KEY-----';

        let key_private = new NodeRSA(private_key);
        let encrypted = key_private.decrypt(mensaje, 'utf8');
        console.log(encrypted);
        let data = Buffer.from(encrypted);
        res.redirect('/');
    }
}