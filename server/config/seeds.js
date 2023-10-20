const mongoose = require('mongoose');
const GenerationPokedex = require('../models/GenerationPokedexSchema');

// generation pokemon imports
const gen1Pokemon = require('./generationSeeds/gen1Seeds');
const gen2Pokemon = require('./generationSeeds/gen2Seeds')

async function connectToMongo() {
    try {
        await mongoose.connect("mongodb+srv://User-db:Samison12@cluster0.qtthm.mongodb.net/?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Successfully connected to MongoDB!");
    } catch (err) {
        console.error('DB connection failed:', err.message);
    }
}

async function seedData() {
    try {
        await connectToMongo();

        const newGenerationPokedex = new GenerationPokedex({
            generations: [
                {
                    gen: 'Gen1',
                    pokemons: gen1Pokemon
                },
                {
                    gen: 'Gen2',
                    pokemons: gen2Pokemon
                },
            ]
        });

        await newGenerationPokedex.save();
        console.log("Seed data inserted!");
        mongoose.connection.close();
    } catch(err) {
        console.log(err);
    }
}

seedData();
