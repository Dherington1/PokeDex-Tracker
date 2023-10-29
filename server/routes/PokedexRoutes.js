const express = require('express');
const dexController = require('../controllers/dexController')

const router = express.Router();

router.post('/addGenerationToUser', dexController.addGenerationToUser);
router.get('/allUserDexData/:userId', dexController.allUserDexData);
router.get('/selectedDexEntry/:username/:dexTitle/:objectId/', dexController.selectedDexEntry)

module.exports = router;
