const {model,Schema} = require('mongoose');

const PostulanteSchema = new Schema({
    idUser:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
    idJob:{
        type:Schema.Types.ObjectId,
        ref:'Job',
        required:true
    },
    status:{
        type:Boolean,
        default:false
    }
   
})


module.exports =  model('Postulante', PostulanteSchema);