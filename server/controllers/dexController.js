// Add these imports at the top of your file
const GenerationPokedex = require('../models/GenerationPokedexSchema');
const UserPokedexes = require('../models/UserPokedexSchema');
const User = require('../models/UserSchema');

exports.addGenerationToUser = async (req, res) => {
  console.log('in generation to user');

  try {
    const { userId, generationNumber, title } = req.body;
    
   // Fetch all generation data from GenerationPokedex model
    const allGenerationData = await GenerationPokedex.findOne({}); 
    if (!allGenerationData) {
      return res.status(404).json({ message: 'Generations not found' });
    }

    // get gen wanted 
    const targetGeneration = allGenerationData.games.find(gen => gen.game === `Game${generationNumber}`);
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
      title,
      pokedex: mappedPokemons
    });

    // update User's pokedexes array
    const user = await User.findById(userId);
    user.pokedexes.push(newUserPokedex._id);
    // user.pokedexes.push(newUserPokedex);
    await user.save();

    res.status(200).json({ message: 'Generation added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};



exports.userPokedexData = async (req, res) => {
  try {
    console.log('in userPokedexData ');
    // Fetching all UserPokedexes documents related to a specific user
    const userId = req.params.userId; // Assuming you are sending userId as a URL parameter
    console.log("userId: ", userId);

    const userDexData = await UserPokedexes.find({ userId: userId }).select('title pokedex');
    console.log("userDexData: ", userDexData);

    // Check if data exists for the user
    if (!userDexData || userDexData.length === 0) {
      return res.status(404).json({ message: 'No pokedex data found for the user.' });
    }

    // Send back the pokedex and title data
    res.status(200).json(userDexData);

  } catch (error) {
    // Handle any other errors
    res.status(500).json({ message: 'An error occurred', error });
  }
};