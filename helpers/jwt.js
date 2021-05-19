const jwt = require('jsonwebtoken');

const  generarJWT = (uid, email)=>{
    return new Promise((resolve, reject ) =>{
        const payload = {uid, email};
        jwt.sign(payload, process.env.CLAVE_SECRETA,{
            expiresIn:'1h'
        },(err,token)=>{
            if(err){
                reject('No se pudo generar el token');
            }else{
                resolve(token);
            }
        })
    });
}

module.exports = {
    generarJWT
}