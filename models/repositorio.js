const {model,Schema} = require('mongoose');

const RepositorioSchema = new Schema({
    idProfile:{
        type:Schema.Types.ObjectId,
        ref:'Profile',
        required:true
    },
    lenguaje:{
        type:String,
        required:true
    },
    titulo:{
        type:String,
        required:true
    },
    
})


module.exports =  model('Repositorio', RepositorioSchema);