const { Router } = require('express');

const { getGame, addGame, getName } = require('../middlewares/game');

const router = Router();

router.post('/game', addGame);
router.get('/game/:id', getGame);
router.get('/gameName', getName);

module.exports = router;
