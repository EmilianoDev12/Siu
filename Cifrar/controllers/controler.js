const NodeRSA = require('node-rsa');
const fs = require('fs');
const crypto = require('crypto');
const tar = require('tar');
var fecha;

module.exports = {
    cifrar:function (req, res, next) {
        let key = new NodeRSA({b: 1024});
        let mensaje = req.body.msj;
        
        let public_key = key.exportKey('public');
        let private_key = key.exportKey('private');

        let key_public = new NodeRSA(public_key);
        let key_private = new NodeRSA(private_key);
        let encrypted = key_public.encrypt(mensaje, 'base64');
        let data = Buffer.from(encrypted);
        let sign = crypto.sign("SHA256", data,private_key);
        let signature = sign.toString('base64');
        fecha = Date.now();
        fs.mkdirSync('./' + fecha,{recursive:true});
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