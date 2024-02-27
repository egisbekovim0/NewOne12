import axios from 'axios'
import FoodData from "../models/Food.js";

export const getFood = async (req, res) => {
    const {foodName} = req.query
    console.log(foodName)
    const apiKey = 'qSLDsLrzFXsGfW33yWr1qb9x53kPepV8yYTYos07';
    const APIUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&query=${foodName}`
    
    let food, error = null;
    const user = req.session.user 
    try {
        const response = await axios.get(APIUrl);
        food = response.data;
        

        const foodNutrients = food.foods[0].foodNutrients.map(nutrient => ({
            nutrientName: nutrient.nutrientName,
            unitName: nutrient.unitName,
            value: nutrient.value,
        }));
        
        

        const newFoodData = new FoodData({
            query: foodName,
            description: food.foods[0].description,
            ingredients: food.foods[0].ingredients,
            foodCategory: food.foods[0].foodCategory,
            packageWeight: food.foods[0].packageWeight,
            servingSizeUnit: food.foods[0].servingSizeUnit,
            servingSize: food.foods[0].servingSize,
            foodNutrients: foodNutrients,         
        })
        await newFoodData.save()

        const latestFoodData = await FoodData.findOne().sort({ createdAt: -1 })

        res.render("Food", { latestFoodData, error, user });
        
    } catch (err) {
        error = "Error, Please try again";
        res.render("Food", { latestFoodData: null, error, user });
    }

}