const {model, Schema} = require('mongoose');

const ProfileSchema = new Schema({
    idUser:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
    nombre:{
        type:String,
        required:true
    },
    apellido:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    telefono:{
        type:String,
        required:true
    },
})


module.exports =  model('Profile', ProfileSchema);