const { response } = require('express');
const Requisito = require('../models/requisito');

const getRequisitos = async(req, res = response)=>{ 
    try {
        const {id} = req.params; 
        const requisitos = await Requisito.find({idRequerimiento:id}); 
        res.status(200).json({
            ok:true,
            requisitos
        })

        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
}

const editRequisito = async(req, res = response)=>{
    try {
        const {id} = req.params; 
        const requisito = await Requisito.findOne({_id:id}); 
        if(!requisito){
            return res.status(404).json({
                ok:false,
                msg:'El requisito no existe'
            });
        }
        const newRequisito = await Requisito.findByIdAndUpdate(id, req.body, {new:true});
        res.status(200).json({
            ok:true,
            requisito:newRequisito
        })

        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
}
const newRequisito = async(req, res = response)=>{
    try {
        req.body.idRequerimiento = req.params.id;
        const requisito = Requisito(req.body);
        await requisito.save();
        res.status(200).json({
            ok:true,
            requisito
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
}
const deleteRequisito = async(req, res = response)=>{
    try {
        const {id} = req.params; 
        const requisito = await Requisito.findOne({_id:id}); 
        if(!requisito){
            return res.status(404).json({
                ok:false,
                msg:'El requisito no existe'
            });
        }
        await Requisito.findByIdAndDelete(id);
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
    getRequisitos,
    editRequisito,
    newRequisito,
    deleteRequisito
}