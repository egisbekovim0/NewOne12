import ExerciseType from "../models/ExerciseType.js";


export const getAllExericiseTypes = async (req, res, next) => {
    try {
        const exerciseTypes = await ExerciseType.find();
        return res.status(200).json({ exerciseTypes });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const addExerciseType = async (req, res, next) => {
    const { name } = req.body;

    try {
        const exerciseType = new ExerciseType({
            name
        });

        await exerciseType.save();

        return res.status(200).json({ exerciseType });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const renderExercisePage = async (req, res) => {
    try {
        const exerciseTypes = await ExerciseType.find();
        return res.render("exercisesOne", { exerciseTypes, i18n: res });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const updateExerciseType = async (req, res, next) => {
    const { name} = req.body;
    const exerciseTypeId = req.params.id;

    try {
        const exerciseType = await ExerciseType.findByIdAndUpdate(exerciseTypeId, {
            name
        });

        return res.status(200).json({ exerciseType });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const getExerciseTypeById = async (req, res, next) => {
    const exerciseTypeId = req.params.id;

    try {
        const exerciseType = await ExerciseType.findById(exerciseTypeId);
        if (!exerciseType) {
            return res.status(404).json({ message: "Category not found" });
        }
        return res.status(200).json({ exerciseType });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const deleteExerciseType = async (req, res, next) => {
    const exerciseTypeId = req.params.id;

    try {
        const exerciseType = await ExerciseType.findByIdAndDelete(exerciseTypeId);
        if (!exerciseType) {
            return res.status(404).json({ message: "Order not found" });
        }
        return res.status(200).json({ message: "Successfully deleted" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

