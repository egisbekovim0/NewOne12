import axios from 'axios'
import burnedCalorie from '../models/burnedCalorie.js';

  export const getDailyCalorie = async (req, res) => {
    const { age, gender, height, weight, activitylevel } = req.query;
  
    if (!age || !gender || !height || !weight || !activitylevel) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }
  
    const fitnessCalculatorOptions = {
      method: 'GET',
      url: 'https://fitness-calculator.p.rapidapi.com/dailycalorie',
      params: {
        age,
        gender,
        height,
        weight,
        activitylevel,
      },
      headers: {
        'X-RapidAPI-Key': '46ce995fe6msh1b461ea8153382ep13251fjsn93a736060287',
        'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com',
      },
    };
  
    try {
      const response = await axios.request(fitnessCalculatorOptions);
      return res.json({ dailyCalorie: response.data });
    } catch (error) {
      console.error('Error fetching daily calorie from Fitness Calculator API:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getBurnedCalorie = async (req, res) => {
    const { activityid, activitymin, weight } = req.query;
  
    if (!activityid || !activitymin || !weight) {
      // If parameters are missing, render the fitness page without making the API request
      const user = req.session.user;
      return res.render("fitness", { latestBurnedCalorie:null, user, errorMessage: 'Missing required parameters' });
    }
  
    const burnedCalorieOptions = {
      method: 'GET',
      url: 'https://fitness-calculator.p.rapidapi.com/burnedcalorie',
      params: {
        activityid,
        activitymin,
        weight,
      },
      headers: {
        'X-RapidAPI-Key': '46ce995fe6msh1b461ea8153382ep13251fjsn93a736060287',
        'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com',
      },
    };
  
    try {
      const response = await axios.request(burnedCalorieOptions);
      const user = req.session.user 

      let burnedCalorieData  = response.data;
      console.log('burnedCalorieData:', burnedCalorieData);

      const newBurnedCalorie = new burnedCalorie({
        activityid,
        activitymin,
        weight,
        burnedCalorie: burnedCalorieData.data.burnedCalorie,
        unit: burnedCalorieData.data.unit,
      });
      await newBurnedCalorie.save()
        const latestBurnedCalorie = await burnedCalorie.findOne().sort({ createdAt: -1 })
        res.render("fitness", { latestBurnedCalorie, user});
      // return res.json({latestBurnedCalorie,  burnedCalorie: response.data });
    } catch (error) {
      console.error('Error fetching burned calorie from Fitness Calculator API:', error);
      const user = req.session.user;
      return res.render("fitness", {latestBurnedCalorie:null,  user, errorMessage: 'Error fetching burned calorie from API' });
    }
};
