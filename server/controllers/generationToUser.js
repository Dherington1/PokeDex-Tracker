// Add these imports at the top of your file
const GenerationPokedex = require('../models/GenerationPokedexSchema');
const UserPokedexes = require('../models/UserPokedexSchema');
const User = require('../models/UserSchema');

exports.addGenerationToUser = async (req, res) => {
  console.log('in generation to user');
  try {
    const { userId, generationNumber } = req.body;
    
   // Fetch all generation data from GenerationPokedex model
    const allGenerationData = await GenerationPokedex.findOne({}); 
    if (!allGenerationData) {
      return res.status(404).json({ message: 'Generations not found' });
    }

    // get gen wanted 
    const targetGeneration = allGenerationData.generations.find(gen => gen.gen === `Gen${generationNumber}`);
    if (!targetGeneration) {
      return res.status(404).json({ message: `Generation ${generationNumber} not found` });
    }

    // Map the target generation data to match the UserPokedexes schema
    const mappedPokemons = targetGeneration.pokemons.map(pokemon => {
      return {
        pokemonId: Number(pokemon.number), 
        name: pokemon.name,
      };
    });

    // Create a new UserPokedexes
    const newUserPokedex = await UserPokedexes.create({
      userId,
      pokedex: mappedPokemons
    });

    // update User's pokedexes array
    const user = await User.findById(userId);
    user.pokedexes.push(newUserPokedex._id);
    await user.save();

    res.status(200).json({ message: 'Generation added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};



  