const {model,Schema} = require('mongoose');

const JobSchema = new Schema({
    idUser:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
    title:{
        type:String,
        required:true
    },
    subtitle:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:true
    },
    totalRequerido:{
        type:Number,
        required:true
    }
})


module.exports =  model('Job', JobSchema);