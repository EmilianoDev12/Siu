const NodeRSA = require('node-rsa');
const fs = require('fs');
const crypto = require('crypto');
const tar = require('tar');
var fecha;

module.exports = {
    cifrar:function (req, res, next) {
        let key = new NodeRSA({b: 1024});
        let mensaje = req.body.msj;
        
        let public_key = '-----BEGIN PUBLIC KEY-----\n' +
        'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCra2EGUg5XK7cv/AMFJMaQizMM\n' +
        'b3NMMZFsNtDAP3pYpad6UFNbPJGTWxEV3G5vZlZBgxhgO64/qhd2kPX44HboIf2f\n' +
        'gP02tVcFuCgbcQnz3AyUOGM66H9MHhUil57vZEI+BSWgUonNMAwqzH3mngQi7ZS2\n' +
        '48knwW3virPnmKMcHQIDAQAB\n' +
        '-----END PUBLIC KEY-----';
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

        fecha = Date.now();
        let key_public = new NodeRSA(public_key);
        let key_private = new NodeRSA(private_key);
        let encrypted = key_public.encrypt(mensaje, 'base64');
        fs.mkdirSync('./' + fecha,{recursive:true});
        console.log(encrypted);
        fs.appendFile('./' + fecha + "/" + fecha + '_m.txt',encrypted,(error) => {
            if(error){
                throw error;
            }
            console.log("Archivo creado exitosamente");
        });
        let data = Buffer.from(encrypted);
        let sign = crypto.sign("SHA256", data,private_key);
        let signature = sign.toString('base64');
        console.log("----------------------------------------------------------");
        console.log(signature);
        fs.appendFile('./' + fecha + "/" + fecha + '_c.txt',signature,(error) => {
            if(error){
                throw error;
            }
            console.log("Archivo creado exitosamente");
        });
        fs.appendFile('./' + fecha + "/" + fecha + '_cpr.txt',private_key,(error) => {
            if(error){
                throw error;
            }
            console.log("Archivo creado exitosamente");
        });
        fs.appendFile('./' + fecha + "/" + fecha + '_cpu.txt',public_key,(error) => {
            if(error){
                throw error;
            }
            console.log("Archivo creado exitosamente");
        });
        tar.c(
            {
              gzip: true // this will perform the compression too
            },
            ["./" + fecha + "/"]
          ).pipe(fs.createWriteStream('./' + fecha + ".tgz"));
        res.redirect('/');
    },

    descargar:function (req, res, next) {
        res.download("./" + fecha + ".tgz", fecha + '.tgz', function (err) {
            if(err){
                console.log(err);
            }else{
                console.log("ya");
            }
        });
        res.redirect('/');
    }
}