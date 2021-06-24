const { response } = require("express");
const Logs = require("../models/logs");
const Usuario = require("../models/usuario");



const getLogs = async(req, res = response)=>{
    try {
        const {limit = 5, base = 0} = req.query;
        const logs = await Logs.find().skip(Number(base)).limit(Number(limit)).populate('usuario','nombre').sort({'createdAt':-1});
        logs
        res.json({
            ok:true,
            logs,
            
            msg:'ss'
        });
    } catch (error) {
        res.json({
            ok:false,
            msg:'Error administrativo'
        });
    }
}
const newLog = async(req, res = response)=>{
    try {
        const usuario = req.usuario;
        const log = new Logs(req.body);
        log.usuario = usuario;
        await log.save();
        res.json({
            ok:true,
            log
        });
    } catch (error) {
        res.json({
            ok:false,
            msg:'Error administrativo'
        });
    }
}
const editLog = async(req, res = response)=>{
    try {
        const id = req.params.id;
        const log = await Logs.findOne({_id:id});
        if(!log){
            return req.json({
                ok:true,
                msg:'El log no existe'
            });
        }
        const nuevoLog = await Logs.findByIdAndUpdate(id,req.body,{new:true});
        res.json({
            ok:true,
            log:nuevoLog
        });
    } catch (error) {
        res.json({
            ok:false,
            msg:'Error administrativo'
        });
    }
}
const deleteLog = async(req, res = response)=>{
    try {
        const id = req.params.id;
        const log = await Logs.findOne({_id:id});
        if(!log){
            return req.json({
                ok:true,
                msg:'El log no existe'
            });
        }
        await Logs.findByIdAndDelete(id);
        res.json({
            ok:true,
            msg:'Log eliminado'
        });
    } catch (error) {
        res.json({
            ok:false,
            msg:'Error administrativo'
        });
    }
}

module.exports = {
    getLogs,
    newLog,
    editLog,
    deleteLog,
}