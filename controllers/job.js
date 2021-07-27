const { response } = require('express');
const Job = require('../models/job');

const getJobs = async(req, res = response)=>{
    try {
        const jobs = await Job.find(); 
        res.status(200).json({
            ok:true,
            jobs
        })

        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
}
const getJob = async(req, res = response)=>{
    try {
        const {id} = req.params; 
        const job = await Job.findById(id); 
        if(!job){
            return res.status(404).json({
                ok:false,
                msg:'El trabajo no existe'
            });
        }
        res.status(200).json({
            ok:true,
            job
        })
       

        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
        console.log(error)
    }
}
const editJob = async(req, res = response)=>{
    try {
        const {id} = req.params; 
        const job = await Job.findById(id); 
        if(!job){
            return res.status(404).json({
                ok:false,
                msg:'El trabajo no existe'
            });
        }
        const newJob = await Job.findByIdAndUpdate(id, req.body, {new:true});
        res.status(200).json({
            ok:true,
            job:newJob
        })

        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        });
        console.log(error)
    }
}
const newJob = async(req, res = response)=>{
    try {
        req.body.idUser = req.usuario._id;
       
        const job = Job(req.body);
        await job.save();
        res.status(200).json({
            ok:true,
            job
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        });
        console.log(error);
    }
}
const deleteJob = async(req, res = response)=>{
    try {
        const {id} = req.params; 
        const job = await Job.findById(id); 
        if(!job){
            return res.status(404).json({
                ok:false,
                msg:'El trabajo no existe'
            });
        }
        job.status = false;
        await job.save();
        res.status(200).json({
            ok:true,
            job
        })

        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
}

module.exports = {
    getJobs,
    getJob,
    editJob,
    newJob,
    deleteJob
}