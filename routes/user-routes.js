import express from 'express'
import { getAllUser, login, editUser, updateUser, deleteUser, signup, fetchForProfile, searchExercises, searchExercisesForProfile, decreaseHungerForAllUsers ,getExercises, getUserById, updateExerciseProgress, updateUser2} from '../controllers/user-controller.js'
const router = express.Router()


router.get("/", getAllUser )
router.put('/admin/edit/:id', editUser);
router.delete('/admin/delete/:id', deleteUser);
router.post("/searchExercises", searchExercises )
router.post("/fetchAllExercisesForProfile", fetchForProfile )
router.post("/searchExercisesForProfile", searchExercisesForProfile )
router.get("/profile", getUserById )
router.post("/gett", getExercises )
router.post("/signup", signup)
router.post("/login", login)
router.put("/updateUser1", updateUser)
router.put("/updateUser2/:exerciseId", updateUser2)
router.put("/updateExercise/:exerciseId", updateExerciseProgress)

router.post("/decreaseHungerForAllUsers", async (req, res) => {
    try {
        await decreaseHungerForAllUsers();
        return res.status(200).json({ message: "Hunger decreased for all users." });
    } catch (error) {
        console.error("Error decreasing hunger for all users:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

setInterval(async () => {
    try {
        await decreaseHungerForAllUsers();
    } catch (error) {
        console.error("Error decreasing hunger for all users:", error);
    }
}, 3600000);


export default router