const {model, schema, Schema} = require('mongoose');

const LogSchema = new Schema({
    log:{
        type:String,
        required:true
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
   
},{
    timestamps: true 
});
module.exports = model('Log', LogSchema);