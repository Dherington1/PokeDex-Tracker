const express = require('express');
const pokedexController = require('../controllers/generationToUser')

const router = express.Router();

router.post('/addGenerationToUser', pokedexController.addGenerationToUser);
router.post('/addGenerationToUser/:userId/:generationNumber',pokedexController.addGenerationToUser);
module.exports = router;
