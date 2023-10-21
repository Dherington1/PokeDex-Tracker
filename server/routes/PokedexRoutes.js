const express = require('express');
const dexController = require('../controllers/dexController')

const router = express.Router();

router.post('/addGenerationToUser', dexController.addGenerationToUser);
router.get('/userDexData/:userId', dexController.userPokedexData);
// router.post('/addGenerationToUser/:userId/:generationNumber',pokedexController.addGenerationToUser);

module.exports = router;
