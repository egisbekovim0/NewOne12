import Exercise from "../models/Exercise.js";



export const getAllExercises = async(req, res, next) =>{
    let exercises
    try {
        exercises = await Exercise.find()
    }catch(err){
        return console.log(err)
    }
    if (!exercises) {
        return res.status(404).json({message:"No exercises found"})
    }
    return res.status(200).json({exercises})
}

export const getExercises = async (req, res) => {
    const { exerciseType } = req.body;
    console.log(exerciseType)
    try {
        const exercises = await Exercise.find({ exerciseType });
        console.log(exercises);
        return res.render("exercisePartial", { exercises, i18n: res });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const addExercise = async (req,res,next)=>{
    const {name, name_secondary, description, description_secondary,
         exerciseType, muscleType, itemRole, mainBoost, 
        smallBoost,  photos, foodProduce, updateCost, cost, xpProduce, reps} =req.body
    const exercise = new Exercise({
        name,
        name_secondary,
        description,
        description_secondary,
        exerciseType,
        muscleType,
        itemRole,
        mainBoost,
        smallBoost,
        foodProduce,
        xpProduce,
        reps,
        updateCost,
        cost,
        photos
    })
    try{
        await exercise.save()
    }catch(err){
        console.log(err)
        return res.status(500).json({message:err})
    }
    return res.status(200).json({exercise})
}

export const updateExercise = async (req, res, next) =>{
    const {name, name_secondary, description, description_secondary,
        exerciseType, muscleType, itemRole, mainBoost, 
       smallBoost,  photos, foodProduce, updateCost, cost, reps, xpProduce} = req.body
    const exerciseId = req.params.id
    let exercise

    try {
        exercise = await Exercise.findByIdAndUpdate(exerciseId, {
            name,
            name_secondary,
            description,
            description_secondary,
            exerciseType,
            muscleType,
            itemRole,
            mainBoost,
            smallBoost,
            foodProduce,
            xpProduce,
            reps,
            updateCost,
            cost,
            photos
        })
    }catch(err){
        return console.log(err)
    }
    if(!exercise){
        return res.status(500).json({message: "couldn't update exercise"})
    }
    return res.status(200).json({exercise})
}

export const getById = async (req,res,next)=>{
    const id = req.params.id
    let exercise
    try {
        exercise = await Exercise.findById(id)
    }catch(err){
        return console.log(err)
    }
    if (!exercise){
        return res.status(404).json({message:"exercise not found"})
    } 
    return res.status(200).json({exercise})
}

export const deleteExercise = async (req,res,next) =>{
    const id = req.params.id
    let exercise 
    try {
        exercise = await Exercise.findByIdAndDelete(id)
    }catch(err){
        return console.log(err)
    }
    if (!exercise){
        return res.status(500).json({message:"unable to delete"})
    }
    return res.status(200).json({message:"succesfully deleted"})
}

