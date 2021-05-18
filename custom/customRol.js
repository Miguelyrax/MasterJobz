const Role = require("../models/role");
const Usuario = require("../models/usuario");


const customRol = async(role = '')=>{
    
    const validarRol = await Role.findOne({role});
    if(!validarRol){
        throw new Error(`El rol ${role} no existe`)
    }
}
const emailExist = async(email = '')=>{
    
    const validarEmail = await Usuario.findOne({email});
    if(validarEmail){
        throw new Error(`El email ${email} ya existe`)
    }
}
const validarId = async(_id = '')=>{
    
    const validarId = await Usuario.findOne({_id});
    if(!validarId){
        throw new Error(`El id ${_id} no existe`)
    }
}

module.exports = {
    customRol,
    emailExist,
    validarId
}