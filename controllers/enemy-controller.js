import Enemy from "../models/Enemy.js";


export const getAllEnemies = async(req, res, next) =>{
    let enemies
    try {
        enemies = await Enemy.find()
    }catch(err){
        return console.log(err)
    }
    if (!enemies) {
        return res.status(404).json({message:"No enemies found"})
    }
    return res.status(200).json({enemies})
}


export const fetchForEnemies = async (req, res) => {
    const enemies = await Enemy.find()
    try {
        res.render('enemyPartial', { enemies, i18n: res });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const addEnemy = async (req,res,next)=>{
    const {name, name_secondary, description, description_secondary, health, damage, reward, photo} =req.body
    const enemy = new Enemy({
        name,
        name_secondary,
        description,
        description_secondary,
        health,
        damage,
        reward,
        photo
    })
    try{
        await enemy.save()
    }catch(err){
        console.log(err)
        return res.status(500).json({message:err})
    }
    return res.status(200).json({enemy})
}

export const updateEnemy = async (req, res, next) =>{
    const {name, name_secondary, description, description_secondary, health, damage, reward, photo } = req.body
    const enemyId = req.params.id
    let enemy

    try {
        enemy = await Enemy.findByIdAndUpdate(enemyId, {
            name,
            name_secondary,
            description,
            description_secondary,
            health,
            damage,
            reward,
            photo
        })
    }catch(err){
        return console.log(err)
    }
    if(!enemy){
        return res.status(500).json({message: "couldn't update enemy"})
    }
    return res.status(200).json({enemy})
}

export const getById = async (req,res,next)=>{
    const id = req.params.id
    let enemy
    try {
        enemy = await Enemy.findById(id)
    }catch(err){
        return console.log(err)
    }
    if (!enemy){
        return res.status(404).json({message:"enemy not found"})
    } 
    return res.status(200).json({enemy})
}


export const deleteEnemy = async (req,res,next) =>{
    const id = req.params.id
    let enemy 
    try {
        enemy = await Enemy.findByIdAndDelete(id)
    }catch(err){
        return console.log(err)
    }
    if (!enemy){
        return res.status(500).json({message:"unable to delete"})
    }
    return res.status(200).json({message:"succesfully deleted"})
}

