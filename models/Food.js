    import mongoose from 'mongoose';

    const Schema = mongoose.Schema;

    const foodDataSchema = new Schema({
        query: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        ingredients: {
            type: String,
            required: true
        },
        foodCategory: {
            type: String,
            required: true
        },
        packageWeight: {
            type: String,
            required: true
        },
        servingSizeUnit: {
            type: String,
            required: true
        },
        servingSize: {
            type: String,
            required: true
        },
        foodNutrients: [
            {
                nutrientName: {
                    type: String,
                    required: true,
                },
                unitName: {
                    type: String,
                },
                value: {
                    type: Number,
                },
            }
        ],
    }, { timestamps: true });

    const FoodData = mongoose.model('FoodData', foodDataSchema);

    export default FoodData;
