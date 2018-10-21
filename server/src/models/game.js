const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const { generate } = require('shortid');

class Game {
  constructor() {
    const adapter = new FileSync('../data/gameName.json');
    const db = low(adapter);
    db.defaults({ names: [] }).write();
  }
  addGame(game) {
    console.log(game);
    const id = generate();
    const { name } = game;

    const adapter = new FileSync(`../data/Game/${id}.json`);
    const db = low(adapter);
    db.defaults({ game }).write();

    const adapterName = new FileSync('../data/gameName.json');
    const dbName = low(adapterName);
    const objName = { name, id };
    dbName
      .get('names')
      .push(objName)
      .write();

    return id;
  }

  getGame(id) {
    const adapter = new FileSync(`../data/Game/${id}.json`);
    const db = low(adapter);
    return db
      .get('game')
      .cloneDeep()

      .value();
  }

  getAllName() {
    const adapter = new FileSync('../data/gameName.json');
    const db = low(adapter);
    return db
      .get('names')
      .cloneDeep()

      .value();
  }
}

const gameDB = new Game();

module.exports = gameDB;
