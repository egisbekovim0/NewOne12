import User from "../models/User.js";
import Exercise from "../models/Exercise.js";
import bcrypt from 'bcryptjs'
import mongoose from "mongoose";

export const getAllUser = async(req,res,next) => {
    let users
    try {
        users = await User.find()
    }catch (err){
        console.log(err)
    }
    if (!users) {
        return res.status(404).json({message: "no users found"})
    }
    return res.status(200).json({users})
}

export const getAllUserForAdmin = async(req,res,next) => {
    let users
    try {
        users = await User.find()
        res.render('admin', { users, user: req.user, i18n: res });
    }catch (err){
        console.log(err)
    }
    if (!users) {
        return res.status(404).json({message: "no users found"})
    }
    return res.status(200).json({users})

}

export const isAdminMiddleware = async (req, res, next) => {
    const one_user = req.session.user 
    try {
        if (one_user.role === 'admin') {
            return next();
        } else {
            res.redirect('/'); 
        }
    } catch (error) {
        console.error('Error in isAdminMiddleware:', error);
        res.status(500).send('Internal Server Error');
    }
}


export const editUser = async (req, res) => {
    const userId = req.params.id;

    let { role } = req.body;
    let rolika;
    role == 'user' ? rolika = 'admin' :  rolika = 'user'

    try {
        
        const user = await User.findByIdAndUpdate(userId, {
            role: rolika
        }, { new: true });
        await user.save();

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully' });

    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Internal Server Error');
    }
};

export const deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
    
        const result = await User.deleteOne({ _id: userId });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        } 

        res.status(200).json({ message: 'User deleted successfully' });

    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Internal Server Error');
    }
};

export const updateUsername = async (req, res) => {
    const userId = req.params.id;
    const { newUsername } = req.body;

    try {
        const user = await User.findByIdAndUpdate(userId, { name: newUsername }, { new: true });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Username updated successfully' });

    } catch (error) {
        console.error('Error updating username:', error);
        res.status(500).send('Internal Server Error');
    }
};


export const updateEmail = async (req, res) => {
    const userId = req.params.id;
    const { newEmail } = req.body;

    try {
        const user = await User.findByIdAndUpdate(userId, { email: newEmail }, { new: true });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Email updated successfully' });

    } catch (error) {
        console.error('Error updating email:', error);
        res.status(500).send('Internal Server Error');
    }
};



export const searchExercises = async (req, res) => {
    const exerciseName = req.body.exerciseName;
    const user = req.session.user 
    try {

        const matchingExercises = user ? user.exercises.filter(exercise => exercise.name.match(new RegExp(exerciseName, 'i'))) : [];

        res.render('exerciseSearchResults', { exercises: matchingExercises, i18n: res });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const fetchForProfile = async (req, res) => {
    const user = req.session.user 
    try {
        res.render('profilePart', { user: user, locale: req.getLocale(), i18n: res });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


export const searchExercisesForProfile = async (req, res) => {
    const exerciseName = req.body.exerciseName;
    const user = req.session.user 
    try {

        const matchingExercises = user ? user.exercises.filter(exercise => exercise.name.match(new RegExp(exerciseName, 'i'))) : [];

        res.render('profilePartial', { exercises: matchingExercises, i18n: res });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export async function decreaseHungerForAllUsers() {
    try {
        const users = await User.find();

        for (const user of users) {
            if (user.hunger > 0) {
                user.hunger -= 5;
                await user.save();
            }
        }

        console.log("Hunger decreased for all users.");
    } catch (error) {
        console.error("Error decreasing hunger:", error);
    }
}

export const getUserById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.render("profile", { user, i18n: res });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const signup = async (req,res, next) => {
    const {name, email, password, exercises} = req.body
    console.log(name)
    console.log(email)
    console.log(password)
    console.log(req.body)

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Username, email, and password are required.' });
    }

    let existingUser;
    try{
        existingUser = await User.findOne({email})
    }catch (err){
       return  console.log(err)
    }
    if (existingUser){
        return res.status(400).json({message:"user already exists. Login instead"})
    }
    const hashedPassword = bcrypt.hashSync(password)
    const user = new User({
        name, 
        email,
        password: hashedPassword,
        exercises: exercises || []
    })

    try {
        await user.save()
    }catch(err){
        return console.log(err)
    }
    return res.status(201).json({user})
}

export const login = async(req, res, next) => {
    const {email, password} = req.body
    let existingUser;
    try{
        existingUser = await User.findOne({email})
    }catch (err){
       return  console.log(err)
    }
    if (!existingUser){
        return res.status(404).json({message:"user is not found by this email"})
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)

    if (!isPasswordCorrect){
        return res.status(400).json({message:"incorrect password"})
    }
    req.session.user = existingUser 
    
    return res.status(200).json({message:"login succesful"})
}

export const updateUser = async (req, res, next) => {
    const userId = req.session.user._id
    const { name, email, password, weight, height} = req.body;

    console.log(userId)

    try {
        const updateFields = {};

        // Check if each field is present in the request body and add it to the updateFields object
        if (name) updateFields.name = name;
        if (email) updateFields.email = email;
        if (password) updateFields.password = bcrypt.hashSync(password);
        if (weight) updateFields.weight = weight;
        if (height) updateFields.height = height;

        const user = await User.findByIdAndUpdate(userId, updateFields, { new: true });
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ user });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
export const updateUser2 = async (req, res, next) => {
    const exerciseId = req.params.exerciseId;   
    const one_user = req.session.user 
    const userId = one_user._id

    try {
        const user = await User.findById(userId);

        const exerciseExists = user.exercises.some((exercise) =>
            exercise.exercise.equals(exerciseId)
        );
        const exercise = await Exercise.findById(exerciseId);

        const exercises = await Exercise.find()

        if (!exerciseExists) {
            if (user.money >= exercise.cost) {
                user.exercises.push({
                    name: exercise.name,
                    name_secondary: exercise.name_secondary,
                    description: exercise.description,
                    description_secondary: exercise.description_secondary,
                    exercise: exerciseId,
                    exercise_type: exercise.exerciseType,
                    muscleType: exercise.muscleType,
                    itemRole: exercise.itemRole,
                    mainBoost: exercise.mainBoost,
                    smallBoost: exercise.smallBoost,
                    foodProduce: exercise.foodProduce,
                    xpProduce: exercise.xpProduce,
                    reps: exercise.reps,
                    cost: exercise.cost,
                    updateCost: exercise.updateCost,
                    photos: exercise.photos
                });

                user.money -= exercise.cost;
                await user.save();

                const updatedUser = await fetchUpdatedUserInfo(userId);

                req.session.user = updatedUser;
                req.session.save((err) => {
                    if (err) {
                        console.error("Error saving session:", err);
                    } else {
                        console.log("Session saved successfully");
                    }
                })
                

                return res.render("exer", { exercises, success: {message: "Successfully added exercise"}, error: null, user: req.session.user, i18n: res});

            } else {
                return res.render("exer", { exercises, error: {message: "You don't have enough money"} , success:null, user: req.session.user, i18n: res});
            }
        } else {
            return res.render("exer", { exercises, error: { message: "Exercise already exists for the user" }, success: null, user: req.session.user, i18n: res });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

async function fetchUpdatedUserInfo(userId) {
    try {
        const result = await User.findById(userId);
        if (result) {
            return result;
        } else {
            console.error("User not found");
            return null; 
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error; 
    }
}

export const renderExercisePage = async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id).populate('exercises.exercise_type');
        return res.render("exercisePage", { user, i18n: res });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getExercises = async (req, res) => {
    const one_user = req.session.user 
    const userId = one_user._id
    const { exerciseType } = req.body;
    console.log(exerciseType)
    
    try {
        const user = await User.findById({_id: new mongoose.Types.ObjectId(userId)});
        console.log(user);
        return res.render("exercisePartial", { user, exerciseType, i18n: res });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateExerciseProgress = async (req, res, next) => {
    const one_user = req.session.user 
    const userId = one_user._id
    const exerciseId = req.params.exerciseId;
    const exercise = await Exercise.findById(exerciseId);
    
  
    try {
        const currentTime = new Date();
        const lastMidnight = new Date(currentTime);
        lastMidnight.setHours(0, 0, 0, 0);
        const userData = await User.findById(userId);
        
        if (userData.lastUpdate < lastMidnight) {
            userData.dailyXP = 0;
        }
        console.log(userId)
        console.log(exerciseId)

        const result = await User.updateOne(
            { 
                _id: new mongoose.Types.ObjectId(userId),
                "exercises.exercise": new mongoose.Types.ObjectId(exerciseId)
            },
            { $inc: {
                "exercises.$.progress": exercise.reps,
                "xp": exercise.xpProduce,
                "money": 1, 
                "hunger": exercise.foodProduce,
                "dailyXP": exercise.xpProduce},
                $set: {
                    lastUpdate: currentTime,
                }
            },
        );

        const updatedUser = await fetchUpdatedUserInfo(userId);
        await updatedUser.save();
        console.log(updatedUser)

        req.session.user = updatedUser;
        req.session.save((err) => {
            if (err) {
                console.error("Error saving session:", err);
            } else {
                console.log("Session saved successfully");
            }
        })
        
        
  
        if (result.nModified === 0) {
            return res.status(404).json({ message: "User or Exercise not found" });
        }
      
        return res.status(200).json({ message: "Exercise progress updated successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
};
  

export const getWeeklyXP = async (req, res) => {
    const userId = req.params.userId;

    try {
       
        const userData = await User.findById(userId);

        
        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }

       
        const weeklyXPData = userData.exercises.map(exercise => {
          
            const exerciseDate = new Date(exercise.timestamp);

            // Check if the exercise date is in the current week
            if (isInCurrentWeek(exerciseDate)) {
                return {
                    day: getDayOfWeek(exerciseDate),
                    xp: exercise.progress,
                };
            }

            return null; 
        }).filter(Boolean);

        
        return res.json({ weeklyXP: weeklyXPData });
    } catch (error) {
        console.error('Error fetching weekly XP:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


const isInCurrentWeek = (date) => {
    const today = new Date();
    const currentWeekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());

    return date >= currentWeekStart;
};

const getDayOfWeek = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
};
