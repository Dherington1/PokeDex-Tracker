const mongoose = require('mongoose');
const { Schema } = mongoose;

// Sub for GenerationSchema
const PokemonSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  }
});

// Sub for GenerationPokedexSchem
const GenerationSchema = new Schema({
  gen: {
    type: String,
    required: true
  },
  pokemons: [PokemonSchema]
});

// Main schema for GenerationPokedex
const GenerationPokedexSchema = new Schema({
  generations: [GenerationSchema]
});

// Create the model
const GenerationPokedex = mongoose.model('GenerationPokedex', GenerationPokedexSchema);

module.exports = GenerationPokedex;