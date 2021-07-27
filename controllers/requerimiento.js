const { response } = require('express');
const Requerimiento = require('../models/requerimiento');

const getRequerimientos = async(req, res = response)=>{ 
    try {
        const {id} = req.params; 
        const requerimiento = await Requerimiento.find({idJob:id}); 
        res.status(200).json({
            ok:true,
            requerimiento
        })

        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
}

const editRequerimiento = async(req, res = response)=>{
    try {
        const {id} = req.params; 
        const requerimiento = await Requerimiento.findById(id); 
        if(!requerimiento){
            return res.status(404).json({
                ok:false,
                msg:'El requerimiento no existe'
            });
        }
        const newRequerimiento = await Requerimiento.findByIdAndUpdate(id, req.body, {new:true});
        res.status(200).json({
            ok:true,
            requerimiento:newRequerimiento
        })

        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
}
const newRequerimiento = async(req, res = response)=>{
    try {
        req.body.idJob = req.params.id;
        
        const requerimiento = Requerimiento(req.body);
        await requerimiento.save();
        res.status(200).json({
            ok:true,
            requerimiento
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
}
const deleteRequerimiento = async(req, res = response)=>{
    try {
        const {id} = req.params; 
        const requerimiento = await Requerimiento.findById(id); 
        if(!requerimiento){
            return res.status(404).json({
                ok:false,
                msg:'El requerimiento no existe'
            });
        }
        await Requerimiento.findByIdAndDelete(id);
        res.status(200).json({
            ok:true,
        })

        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
}

module.exports = {
    getRequerimientos,
    editRequerimiento,
    newRequerimiento,
    deleteRequerimiento
}