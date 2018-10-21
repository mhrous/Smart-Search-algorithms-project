const gameDB = require('../models/game.js');

const addGame = async (req, res, next) => {
  try {
    const id = await gameDB.addGame(req.body);
    res.status(200).json({ id });

    next();
  } catch (e) {
    next(e);
  }
};
const getGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await gameDB.getGame(id);
    res.status(200).json(response);
    next();
  } catch (e) {
    next(e);
  }
};

const getName = async (req, res, next) => {
  try {
    console.log(5);
    const response = await gameDB.getAllName();
    res.status(200).json(response);
    next();
  } catch (e) {
    next(e);
  }
};
module.exports = { addGame, getGame, getName };
