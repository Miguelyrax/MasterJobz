const {model, Schema}= require('mongoose');

const UsuarioSchema = Schema({
    nombre:{
        type:String,
        required:[true,'El nombre es requerido'],
    },
    email:{
        type:String,
        required:[true,'El email es requerido'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'El password es requerido'],
    },
    status:{
        type:Boolean,
        default:true
        
    },
    img:{
        type:String,
        
    },
    role:{
        type:String,
        required:true,
        emun:['ADMIN-ROLE','USER-ROLE']
    },
    google:{
        type:Boolean,
        default:false
    }
});

// UsuarioSchema.methods.toJSON = function() {
//     const { __v, password, ...rest} = this.toObject(); 
// }

module.exports = model('Usuario',UsuarioSchema);