import mongoose from 'mongoose';
import faker from 'faker';

const exerciseIds = [
    "65a8aee51b675ba7286f4b21",
    "65a8aef41b675ba7286f4b23",
    "65a8aefb1b675ba7286f4b25",
    "65a8af031b675ba7286f4b27",
    "65a8af201b675ba7286f4b29",
    "65a8af791b675ba7286f4b2d",
    "65a8af5c1b675ba7286f4b2b",
    "65a8af811b675ba7286f4b2f",
  ];
  
  const generateRandomPassword = (minLength) => {
    const passwordLength = faker.datatype.number({ min: minLength + 1, max: minLength + 10 });
    return faker.datatype.number({ min: 10000, max: 99999999 }).toString().slice(0, passwordLength);
  };

  const generateUsers = (num, exerciseIds) => {
    const users = [];
  
    for (let i = 0; i < num; i++) {
      const name = faker.name.firstName();
      const email = faker.internet.email();
      const password = generateRandomPassword(5);
      const user_level = faker.datatype.number({ min: 0, max: 5 });
      const xp = faker.datatype.number({ min: 0, max: 1000 });
      
      const exerciseId = faker.random.arrayElement(exerciseIds);
  
      const exercises = Array.from({ length: 3 }, () => ({
        exercise: exerciseId,
        progress: faker.datatype.number({ min: 0, max: 100 }),
        exercise_level: faker.datatype.number({ min: 0, max: 5 }),
      }));
  
      const createdAt = faker.date.past();
  
      users.push({
        name,
        email,
        password,
        user_level,
        xp,
        exercises,
        createdAt,
      });
    }
  
    return users;
  };

  const generateExerciseType = (num) => {
    const exerciseTypes = [];
  
    for (let i = 0; i < num; i++) {
      const name = faker.random.word();
  
      exerciseTypes.push({
        name,
      });
    }
  
    return exerciseTypes;
  };
  
  const generateOrders = (numOrders, users, products) => {
    const orders = [];
  
    for (let i = 0; i < numOrders; i++) {
      const user = faker.random.arrayElement(users)._id;
      const status = faker.random.arrayElement(['Pending', 'Shipped', 'Delivered']);
      const order_date = faker.date.past();
  
      const orderProducts = Array.from({ length: 3 }, () => ({
        product: faker.random.arrayElement(products)._id,
        quantity: faker.datatype.number({ min: 1, max: 10 }),
      }));
  
      orders.push({
        user: user._id,
        status,
        order_date,
        products: orderProducts,
      });
    }
  
    return orders;
  };
  
  
  const generateExercises = (num, exerciseTypes) => {
    const exercises = [];
  
    for (let i = 0; i < num; i++) {
      const name = faker.random.word();
      const exerciseType = exerciseTypes[faker.datatype.number({ min: 0, max: exerciseTypes.length - 1 })]._id;
  
      exercises.push({
        name,
        exerciseType,
      });
    }
  
    return exercises;
  };

  const generateProductCategories = (num) => {
    const productCategories = [];
  
    for (let i = 0; i < num; i++) {
      const name = faker.commerce.department();
  
      productCategories.push({
        name,
      });
    }
  
    return productCategories;
  };
  
  const generateProducts = (num, productCategories) => {
    const products = [];
  
    for (let i = 0; i < num; i++) {
      const name = faker.commerce.productName();
      const description = faker.lorem.sentence();
      const price = faker.datatype.number({ min: 5, max: 100 });
      const stock = faker.datatype.number({ min: 10, max: 1000 });
      const productCategory = productCategories[faker.datatype.number({ min: 0, max: productCategories.length - 1 })]._id;
  
      products.push({
        name,
        description,
        price,
        stock,
        productCategory,
      });
    }
  
    return products;
  };

export { generateProductCategories, generateProducts, generateExerciseType, generateOrders, generateExercises, generateUsers  };
  