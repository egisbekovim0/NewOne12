import MuscleType from "../models/MuscleType.js";


export const getAllMuscleTypes = async (req, res, next) => {
    try {
        const muscleTypes = await MuscleType.find();
        return res.status(200).json({ muscleTypes });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const addMuscleType = async (req, res, next) => {
    const { name } = req.body;

    try {
        const muscleType = new MuscleType({
            name
        });

        await muscleType.save();

        return res.status(200).json({ muscleType });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const updateMuscleType = async (req, res, next) => {
    const { name} = req.body;
    const muscleTypeId = req.params.id;

    try {
        const muscleType = await MuscleType.findByIdAndUpdate(muscleTypeId, {
            name
        });

        return res.status(200).json({ muscleType });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const getMuscleTypeById = async (req, res, next) => {
    const muscleTypeId = req.params.id;

    try {
        const muscleType = await MuscleType.findById(muscleTypeId);
        if (!muscleType) {
            return res.status(404).json({ message: "Muscle type not found" });
        }
        return res.status(200).json({ muscleType });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const deleteMuscleType = async (req, res, next) => {
    const muscleTypeId = req.params.id;

    try {
        const muscleType = await MuscleType.findByIdAndDelete(muscleTypeId);
        if (!muscleType) {
            return res.status(404).json({ message: "Muscle type not found" });
        }
        return res.status(200).json({ message: "Successfully deleted" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

