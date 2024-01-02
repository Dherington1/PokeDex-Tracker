const mongoose = require('mongoose');
const { Schema } = mongoose;

// Sub for GenerationSchema
const PokemonSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  displayNumber: {
    type: String,
    required: true
  },
  dexNumber: {
    type: String,
    required: true
  },
  checked: {
    type: Boolean,
    default: false
  }
});

// Sub for GenerationPokedexSchem
const GenerationSchema = new Schema({
  game: {
    type: String,
    required: true
  }, 
  totalChecked: {
    type: Number,
    default: 0
  },
  pokemons: [PokemonSchema]
});

// Main schema for GenerationPokedex
const GenerationPokedexSchema = new Schema({
  games: [GenerationSchema]
});

// Create the model
const GenerationPokedex = mongoose.model('GenerationPokedex', GenerationPokedexSchema);

module.exports = GenerationPokedex;
