const mongoose = require('mongoose');
const { Schema } = mongoose;

// sub schema
const PokemonSchema = new Schema({
  pokemonId: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  checked: {
    type: Boolean,
    default: false
  }
}); 

// main schema
const UserPokedexesSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId, 
    ref: 'users',
    required: true
  },
  title: {
    type: String,
    require: true
  },
  pokedex: [PokemonSchema]
});

// Create the model
const UserPokedexes = mongoose.model('UserPokedexes', UserPokedexesSchema);

module.exports = UserPokedexes;
