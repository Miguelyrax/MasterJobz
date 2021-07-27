const {model,Schema} = require('mongoose');

const RequerimientoSchema = new Schema({
    
    idJob:{
        type:Schema.Types.ObjectId,
        ref:'Job',
        required:true
    },
    title:{
        type:String,
        required:true
    },
   
})


module.exports =  model('Requerimiento', RequerimientoSchema);