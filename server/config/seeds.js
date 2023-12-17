const mongoose = require('mongoose');
const GenerationPokedex = require('../models/GenerationPokedexSchema');

// generation pokemon imports
const pokemonOmegaRubyAlphaSapphire = require('./generationSeeds/OmegaRuby-&-AlphaSapphire');
const pokemonMoonSun = require('./generationSeeds/Moon-&-Sun');
const pokemonUltraMoonSun = require('./generationSeeds/UltraMoon-&-UltraSun');
const LetsGoPikachuEevee = require('./generationSeeds/LetsGoPikachuEevee');
const SwordShield = require('./generationSeeds/Sword-&-Shield');
const LegendsArceus = require('./generationSeeds/LegendsArceus');
const ScarletViolet = require('./generationSeeds/ScarletViolet');

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
            games: [
                {
                    game: 'Game1',
                    pokemons: pokemonOmegaRubyAlphaSapphire
                },
                {
                    game: 'Game2',
                    pokemons: pokemonMoonSun
                },
                {
                    game: 'Game3',
                    pokemons: pokemonUltraMoonSun
                },
                {
                    game: 'Game4',
                    pokemons: LetsGoPikachuEevee
                },
                {
                    game: 'Game5',
                    pokemons: SwordShield
                },
                {
                    game: 'Game6',
                    pokemons: LegendsArceus
                },
                {
                    game: 'Game7',
                    pokemons: ScarletViolet
                }
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
