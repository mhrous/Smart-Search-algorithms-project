const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
let game;
let history;
let path;
let stack;
let queue;
let start;
let numNode;
let p_queue;

const solve = (type, border, col, row) => {
  game = new Game({ border, col, row });
  history = {};
  path = {};
  stack = queue = [border];
  p_queue = [{ g: 0, border }];
  start = game.toString();
  numNode = 1;

  switch (type) {
    case 'DSF':
      return DSF();

    case 'BFS':
      return BFS();
    case 'uinqForm':
      return uinqForm();
    case 'A*':
      return aStart();

    default:
      break;
  }
};

const getPath = last => {
  let array = [last];
  let hash = game.toString(last);
  let parent = path[hash];
  let i = 0;

  while (true) {
    array.unshift(parent);
    hash = game.toString(parent);
    if (hash == start) break;
    parent = path[hash];
  }
  return array;
};

const DSF = () => {
  const last = stack.pop();
  if (!last) return false;
  const hash = game.toString(last);
  if (!history[hash]) {
    if (game.isEnd(last)) {
      console.log(
        'solve dfs in ',
        numNode,
        ' in steb ',
        Object.keys(path).length
      );
      return getPath(last);
    }
    const all = game.getAllBorderFromState(last);
    const ObjectArry = Object.values(all);
    numNode += ObjectArry.length;
    ObjectArry.map(e => {
      const e_hash = game.toString(e);
      if (!path[e_hash]) path[e_hash] = last;
    });
    stack = [...stack, ...ObjectArry];
    const hash = game.toString(last);
    history[hash] = true;
  }
  return DSF();
};

const BFS = () => {
  const last = queue.shift();
  if (!last) return false;
  const hash = game.toString(last);
  if (!history[hash]) {
    if (game.isEnd(last)) {
      console.log(
        'solve bfs in ',
        numNode,
        ' in steb ',
        Object.keys(path).length
      );

      return getPath(last);
    }
    const all = game.getAllBorderFromState(last);
    const ObjectArry = Object.values(all);
    // numNode += ObjectArry.length;
    //////////
    for (let i of ObjectArry) {
      if (!history[game.toString(i)]) numNode++;
    }

    ////
    ObjectArry.map(e => {
      const e_hash = game.toString(e);
      if (!path[e_hash]) path[e_hash] = last;
    });
    queue = [...queue, ...ObjectArry];
    const hash = game.toString(last);
    history[hash] = true;
  }
  return BFS();
};

const aStart = () => {
  while (p_queue.length) {
    const lastItem = p_queue.shift();
    const last = lastItem.border;

    const g = lastItem.g;
    const hash = game.toString(last);
    if (!history[hash]) {
      if (game.isEnd(last)) {
        console.log('solve uinqForm in node ', numNode, ' in steb ');

        return getPath(last);
      }
      const all = game.getAllBorderFromState(last);
      let ObjectArry = Object.values(all);
      // numNode += ObjectArry.length;
      //////////
      for (let i of ObjectArry) {
        if (!history[game.toString(i)]) numNode++;
      }

      ////

      ObjectArry = ObjectArry.map(e => {
        const e_hash = game.toString(e);
        if (!path[e_hash]) path[e_hash] = last;
        return { g: g + 1, border: e, h: game.dist(e) };
      });
      p_queue = [...p_queue, ...ObjectArry];
      p_queue.sort((a, b) => {
        return a.g + a.h - (b.g + b.h);
      });
      const hash = game.toString(last);
      history[hash] = true;
    }
  }

  return false;
};

const uinqForm = () => {
  while (p_queue.length) {
    const lastItem = p_queue.shift();
    const last = lastItem.border;

    const g = lastItem.g;
    const hash = game.toString(last);
    if (!history[hash]) {
      if (game.isEnd(last)) {
        console.log('solve uinqForm in node ', numNode, ' in steb ');

        return getPath(last);
      }
      const all = game.getAllBorderFromState(last);
      let ObjectArry = Object.values(all);
      // numNode += ObjectArry.length;
      //////////
      for (let i of ObjectArry) {
        if (!history[game.toString(i)]) numNode++;
      }

      ////

      ObjectArry = ObjectArry.map(e => {
        const e_hash = game.toString(e);
        if (!path[e_hash]) path[e_hash] = last;
        return { g: g + 1, border: e };
      });
      p_queue = [...p_queue, ...ObjectArry];
      p_queue.sort((a, b) => a.g - b.g);
      const hash = game.toString(last);
      history[hash] = true;
    }
  }

  return false;
};
