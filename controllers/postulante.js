const { response } = require('express');
const Postulante = require('../models/postulante');
const Job = require('../models/job');
const getPostulantes = async(req, res = response)=>{
    try {
        const {id} = req.params; 
        const postulantes = await Postulante.find({idJob:id}); 
        res.status(200).json({
            ok:true,
            postulantes
        })

        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
}

const newPostulante = async(req, res = response)=>{
    try {
        const {id} = req.params; 
        const {_id:uid} = req.usuario;
        const postulacion =  Postulante({idJob:id, idUser:uid}); 
        await postulacion.save();
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

const aceptarPostulante = async(req, res = response)=>{
    try {
        const {idJob,idUser} = req.params; 
        
        const postulacion = await Postulante.findOne({idJob, idUser}); 
        
        if(!postulacion){
            return res.status(404).json({
                ok:false,
                msg:'La postulacion no existe'
            });
        }
        const job = await Job.findOne({_id:idJob}); 
        job.status=false;
        postulacion.status = true;
        await job.save();
        await postulacion.save();
        res.status(200).json({
            ok:true,
        })

        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
        console.log(error)
    }
}

module.exports = {
    getPostulantes,
    newPostulante,
    aceptarPostulante
}