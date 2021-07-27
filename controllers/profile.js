const { response } = require('express');
const Profile = require('../models/profile');

const getProfile = async(req, res = response)=>{
    try {
        const {idUser} = req.params; 
        const profile = await Profile.find({idUser}); 
        if(!profile){
            return res.status(404).json({
                ok:false,
                msg:'El usuario no existe'
            });
        }
        res.status(200).json({
            ok:true,
            profile
        })

        
    } catch (error) {
        
    }
}
const editProfile = async(req, res = response)=>{
    try {
        const {idUser} = req.params; 
        const profile = await Profile.find({idUser}); 
        if(!profile){
            return res.status(404).json({
                ok:false,
                msg:'El usuario no existe'
            });
        }
        const newProfile = await Profile.findByIdAndUpdate(profile._id, req.body, {new:true});
        res.status(200).json({
            ok:true,
            profile:newProfile
        })

        
    } catch (error) {
        
    }
}
const newProfile = async(req, res = response)=>{
    try {
        const profile = Profile(req.body);
        await profile.save();
        res.status(200).json({
            ok:true,
            profile
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
}

module.exports = {
    getProfile,
    newProfile,
    editProfile
}