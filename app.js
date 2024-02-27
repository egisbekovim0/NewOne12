import express from 'express'
import basicAuth from 'express-basic-auth'
import mongoose from 'mongoose'
import router from './routes/user-routes.js'
import session from 'express-session'
import flash from 'express-flash'
import ExerciseType from './models/ExerciseType.js'
import Exercise from './models/Exercise.js'
import exerciseRouter from './routes/exercise-routes.js'
import orderRouter from './routes/order-routes.js'
import productRouter from './routes/product-router.js'
import exerciseTypeRouter from './routes/exercise-type-routes.js'
import i18n from 'i18n'

import productCategoryRouter from './routes/product-category-routes.js'
import path from 'path'

import { fileURLToPath } from 'url'
import fitnessRouter from './routes/fitnessRoutes.js'
import muscleTypeRouter from './routes/muscle-type-routes.js'
import enemyRouter from './routes/enemy-routes.js'
import User from './models/User.js'
import foodRouter from './routes/food-routes.js'
const app = express()

app.use(express.json())
app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.use(i18n.init);


const users = {
    'admin': 'supersecret',
    'yerlan': 'lolol1',
    'user2': 'ajaj1'
}

app.use(basicAuth({
    users,
    challenge: true,
}))

app.use(
    session({
      secret: 'my-secret-diamon-key', 
      resave: true,
      saveUninitialized: true,
    })
)


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', path.join(__dirname, 'views'))
app.set("view engine", "ejs")
app.use('/css', express.static(path.join(__dirname, '..','frontend', 'css')));
app.use('/assets', express.static(path.join(__dirname, '..', 'frontend', 'assets')));
app.use('/assets2', express.static(path.join(__dirname, '..', 'frontend', 'assets2')));
app.use('/assets3', express.static(path.join(__dirname, '..', 'frontend', 'assets3')));
app.use('/scripts', express.static(path.join(__dirname, '..', 'frontend', 'scripts')));


i18n.configure({
    locales: ['en', 'ru'],  
    defaultLocale: 'en',
    directory: __dirname + '/locales', 
    queryParameter: 'lang',  
});

app.use((req, res, next) => {

    const lang = req.query.lang || req.session.lang || 'en';

    req.setLocale(lang);

    req.session.lang = lang;

    next();
});


app.use("/api/user", router)
app.use("/api/food", foodRouter)
app.use("/api/enemy", enemyRouter)
app.use("/api/fitnessQ", fitnessRouter)
app.use("/api/exercise", exerciseRouter)
app.use("/api/order", orderRouter)
app.use("/api/product", productRouter)
app.use("/api/exerciseType", exerciseTypeRouter)
app.use("/api/muscleType", muscleTypeRouter)
app.use("/api/productCategory", productCategoryRouter)


const requireAuth = (req, res, next) => {
    const currentUser = req.session.user;

    if (!currentUser) {
        
        req.flash('error', 'Please log in first.'); 
        return res.redirect('/login');
    }

    next();
};

app.use(['/profile', '/order', '/stats', '/shop', '/exerciseOne', '/statis', '/exercise', '/enemy', '/settings'], requireAuth);


app.get('/admin', async (req, res) => {
    const currentUser = req.session.user;
  
    if (currentUser && currentUser.role === 'admin') {
      const users = await User.find();
      if (users) {
        res.render('admin', { users, user: currentUser, i18n: res });
      } else {
        res.status(500).send('Internal Server Error');
      }
    } else {
      res.status(401).send('Unauthorized');
    }
});

app.get('/', (req, res) => {
    const one_user = req.session.user 
    if (one_user) {
        res.render('signin', { user: one_user, i18n: res })
    } else {
        res.render('signin', {user: null, i18n: res })
    } 
});

app.get('/index', (req, res) => {
    const one_user = req.session.user 
    if (one_user) {
        res.render('index', { user: one_user, i18n: res })
    } else {
        res.render('index', {user: null, i18n: res })
    } 

});
app.get('/order', (req, res) => {
    res.render('orders')
});

app.get('/quiz', (req, res) => {
    const one_user = req.session.user 
    res.render('quiz', { user: one_user, i18n: res })
});


app.get('/stats', (req, res) => {
    res.render('statistics')
});


app.get('/shop', async (req, res) => {
    const exercises = await Exercise.find(); 
    const one_user = req.session.user 
    res.render('exer', { exercises, error: null, success:null, user: one_user, i18n: res })
});
app.get('/exerciseOne', (req, res) => {
    const one_user = req.session.user 
    res.render('exercises', { user: one_user })
});
app.get('/statis', (req, res) => {
    const one_user = req.session.user 
    res.render('statsForWeek', { user: one_user })
});
app.get('/exercise', async (req, res) => {
    const exerciseTypes = await ExerciseType.find();
    const one_user = req.session.user 
    res.render("exercisesOne", { exerciseTypes, user: one_user, i18n: res  });
});
app.get('/enemy', async (req, res) => {
    const one_user = req.session.user 
    res.render("enemies", { user: one_user, i18n: res });
});
app.get('/settings', async (req, res) => {
    const one_user = req.session.user 
    res.render("settings", { user: one_user, i18n: res });
});

app.get('/profile', (req, res) => {
    const one_user = req.session.user 
    console.log(one_user)
    if (one_user) {
        res.render('profile', { user: one_user, i18n: res })
    } else {
        res.status(401).json({ message: 'User not authenticated' })
    } 
})

app.get('/login', (req, res) => {
    res.render('signin')
});
app.get('/register', (req, res) => {
    res.render('signup')
});
app.get('/about', (req, res) => {
    res.render('about')
});



mongoose.connect("mongodb+srv://guest:181817@clustercool.itryi0d.mongodb.net/TrainingCamp?retryWrites=true&w=majority").then(async () => {

  app.listen(5010, () => {
    console.log("Connected to database and listening on port 5010");
  });
}).catch((err) => console.error('Error connecting to database:', err));
