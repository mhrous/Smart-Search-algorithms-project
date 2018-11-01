class Game {
  constructor(game) {
    this.col = parseInt(game.col);
    this.row = parseInt(game.row);
    this.border = game.border;
    this.steps = [game.border];
    this.numSteps = 0;
  }

  getLast() {
    return this.steps[this.numSteps];
  }

  buildFromJson(json) {
    this.col = parseInt(json.col);
    this.row = parseInt(json.row);
    this.border = json.border;
    this.steps = [json.border];
    this.numSteps = 0;
  }

  draw(width, height, border = this.steps[this.numSteps]) {
    const W = width / this.col;
    const H = height / this.row;
    let str = '';
    for (let i in border) {
      const item = border[i];
      str += `
        <div class="rect"
        style="width:${W}px;height:${H};
        ${item.color ? ` background:rgb${item.color};` : ''}
        ${item.botton ? `border-bottom-color:rgb${item.color}; ` : ''}
        ${item.top ? `border-top-color:rgb${item.color}; ` : ''} ${
        item.left ? `border-left-color:rgb${item.color}; ` : ''
      }
         ${
           item.right ? `border-right-color:rgb${item.color} ` : ''
         }" data-index="${i}" ${
        item.id ? `data-id="${item.id ? item.id : ''}"` : ''
      }>${item.id ? item.id : ''}</div>`;
    }

    return str;
  }

  getItmesFromBorder(border = this.steps[this.numSteps]) {
    const items = {};
    for (let i in border) {
      i = parseInt(i);
      const idItem = border[i].id;
      if (idItem) {
        if (items[idItem]) items[idItem].push(i);
        else items[idItem] = [i];
      }
    }
    return items;
  }

  getLeft(index) {
    const left = index - 1;
    return left >= 0 &&
      Math.floor(left / this.col) == Math.floor(index / this.col)
      ? left
      : null;
  }
  getTop(index) {
    const Top = index - this.col;
    return Top >= 0 ? Top : null;
  }
  getBotton(index) {
    const Botton = index + this.col;
    return Botton < this.col * this.row ? Botton : null;
  }
  getRight(index) {
    const Right = index + 1;
    return Right < this.col * this.row &&
      Math.floor(Right / this.col) == Math.floor(index / this.col)
      ? Right
      : null;
  }

  newSteps(border) {
    this.steps.push(border);
    this.numSteps += 1;
  }

  backToPrevState() {
    if (this.numSteps) {
      this.steps.pop();
      this.numSteps -= 1;
    }
  }

  getItemAfterMove(id, move, border = this.steps[this.numSteps]) {
    const Obj = {};
    const item = this.getItmesFromBorder(border)[id];
    let newItem = [];
    switch (move) {
      case 'T':
        newItem = item.map(e => this.getTop(e));
        break;
      case 'R':
        newItem = item.map(e => this.getRight(e));
        break;
      case 'B':
        newItem = item.map(e => this.getBotton(e));

        break;
      case 'L':
        newItem = item.map(e => this.getLeft(e));
        break;

      default:
        break;
    }
    for (let i in item) {
      const _new = newItem[i];
      const _last = item[i];
      Obj[_new] = border[_last];
    }
    return Obj;
  }
  initItem(id, border = this.steps[this.numSteps]) {
    const Obj = {};
    const item = this.getItmesFromBorder(border)[id];
    for (let e of item) {
      Obj[e] = {};
    }
    return Obj;
  }
  getBorderAfterMoveItem(id, move, border = this.steps[this.numSteps]) {
    const _init = this.initItem(id, border);
    const _new = this.getItemAfterMove(id, move, border);
    return Object.assign({}, border, _init, _new);
  }

  getMoveForItem(id, border = this.steps[this.numSteps]) {
    id = parseInt(id);

    let L, R, T, B;
    L = R = T = B = 0;
    const items = this.getItmesFromBorder(border);

    const item = items[id];

    //dont have item
    if (!item) {
      console.error('dont select item');
      return;
    }
    for (let e of item) {
      const Left = this.getLeft(e);
      const Right = this.getRight(e);
      const Botton = this.getBotton(e);
      const Top = this.getTop(e);
      if (Left != null && (!border[Left].id || border[Left].id == id)) L++;
      if (Right != null && (!border[Right].id || border[Right].id == id)) R++;
      if (Botton != null && (!border[Botton].id || border[Botton].id == id))
        B++;
      if (Top != null && (!border[Top].id || border[Top].id == id)) T++;
    }
    let move = [];
    if (L == item.length) move.push('L');
    if (R == item.length) move.push('R');
    if (T == item.length) move.push('T');
    if (B == item.length) move.push('B');

    return move;
  }

  getAllMove(border = this.steps[this.numSteps]) {
    const itemObj = this.getItmesFromBorder(border);
    const itemesArray = Object.keys(itemObj);
    const move = {};
    for (let itemId of itemesArray) {
      move[itemId] = this.getMoveForItem(itemId, border);
    }
    return move;
  }
  getAllBorderFromState(border = this.steps[this.numSteps]) {
    const move = this.getAllMove(border);
    const allBorder = {};
    for (let item in move) {
      for (let dir of move[item]) {
        allBorder[item + dir] = this.getBorderAfterMoveItem(item, dir, border);
      }
    }
    return allBorder;
  }

  isEnd(border = this.steps[this.numSteps]) {
    const lastItemIndex = this.col * this.row - 1;

    //(243, 83, 105) is red color
    return border[lastItemIndex].color == '(255,0,0)';
  }

  toString(border = this.steps[this.numSteps]) {
    let str = '';
    for (let i in border) {
      str += border[i].id ? `_${border[i].id}_` : '*';
    }
    return str;
  }

  dist(border = this.steps[this.numSteps]) {
    let arry = [];
    for (let i in border) {
      const item = border[i];
      const col = this.col - (i % this.col) - 1;
      const row = this.row - Math.floor(i / this.row) - 1;

      if (item.color == '(255,0,0)') {
        arry.push(col + row);
      }
    }
    return Math.min(...arry);
  }
}
