const {model,Schema} = require('mongoose');

const RequisitoSchema = new Schema({
    idRequerimiento:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
    requisito:{
        type:String,
        required:true
    },
})


module.exports = model('Requisito', RequisitoSchema);