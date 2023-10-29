const mongoose = require('mongoose');
const GenerationPokedex = require('../models/GenerationPokedexSchema');

// generation pokemon imports
const gen1Pokemon = require('./generationSeeds/gen1Seeds');
const gen2Pokemon = require('./generationSeeds/gen2Seeds')
const pokemonOmegaRubyAlphaSapphire = require('./generationSeeds/OmegaRuby-&-AlphaSapphire');

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

        // this must match GenerationPokedex schema 
        const newGenerationPokedex = new GenerationPokedex({
            games: [
                {
                    game: 'Game1',
                    pokemons: pokemonOmegaRubyAlphaSapphire
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
