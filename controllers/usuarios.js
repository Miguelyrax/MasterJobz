const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs  = require('bcryptjs');

const getUsuarios =async(req, res= response)=>{
    try { 
        const {limit = 5, base = 0} = req.query;
        const query = {"status":true};
        
        

        

        const [usuarios,total] = await Promise.all([
           Usuario.find(query).skip(Number(base)).limit(Number(limit)),
         Usuario.countDocuments(query)
        ]);

        res.json({
            ok:true,
            total,
            usuarios
        })
    } catch (error) {
        
    }
}
const newUsuario =async(req, res= response)=>{
    try {
         
        const {nombre, email, password, role} = req.body;
       
        const usuario = new Usuario({nombre, email, password, role});

        const salt = bcryptjs.genSaltSync(1);
        usuario.password = bcryptjs.hashSync(password, salt);

        await usuario.save();
        res.status(201).json({
            ok:true,
            usuario
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:'Error al crear usuario',
            error
        });
    }
}
const editUsuario =async(req, res= response)=>{
    try {
        const _id = req.params.id;
        const {password , email, google, ...rest} = req.body;
        
     

        if(password){
            const salt = bcryptjs.genSaltSync(1);
            rest.password = bcryptjs.hashSync(password ,salt);
        }

        const usuario = await Usuario.findByIdAndUpdate(_id, rest,{new:true});
        
        res.json({
            ok:true,
            usuario
        })
         
    } catch (error) {
        console.log(error)
        res.json({
            ok:false,
            msg:'Error al actualizar',
            error
        })
    }
}
const deleteUsuario =async(req, res= response)=>{
    try {
        const id = req.params.id;
        const usuario = req.usuario;
        
        const renovado = await Usuario.findByIdAndUpdate(id, {status:false}, {new:true});  


        res.json({
            ok:true,
            renovado,
            auth:usuario
        })
    } catch (error) {
        console.log(error)
        res.json({
            ok:true,
            msg:'Error al borrar'
        })
    }
}

module.exports = {
getUsuarios,
newUsuario,
editUsuario,
deleteUsuario,
    
}