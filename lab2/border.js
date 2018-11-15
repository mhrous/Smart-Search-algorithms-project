const type = [
  { type: 'm', cost: 100 },
  { type: 'p', cost: 30 },
  { type: 's', cost: 10 },
  { type: 'w', cost: null }
];
class Border {
  constructor(border = null, target = null) {
    this.border = border;
    this.target = target;
    this.col = 4;
    this.row = 4;
    //inti rand border
    if (!border) {
      this.bulidRand();
    }
  }
  bulidRand() {
    this.border = {};
    for (let i = 0; i < 16; i += 1) {
      const rand = Math.floor(Math.random() * 4);
      this.border[i] = Object.assign({}, type[rand]);
    }
    //start Squer
    do {
      const start = Math.floor(Math.random() * 16);
      if (this.border['type'] != 'w') {
        this.start = start;
      }
    } while (!this.start);

    // target Squer
    do {
      const target = Math.floor(Math.random() * 16);
      if (this.border[target]['type'] != 'w') {
        this.target = target;
      }
    } while (!this.target);
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
  getBorderAfterMove(newStart, lastStart) {
    const newBorder = new Border(Object.assign({}, this.border), this.target);
    newBorder.start = newStart;
    return newBorder;
  }
  getAllMoveFromState(index = this.start) {
    const ObjMove = {};
    const R = this.getRight(index);
    const B = this.getBotton(index);
    const T = this.getTop(index);
    const L = this.getLeft(index);
    let cost;
    let Obj;
    let M;
    if (R && this.border[R]['type'] != 'w') {
      cost = this.border[R]['cost'];
      Obj = this.getBorderAfterMove(R, this.start);
      M = Obj.getM();
      ObjMove.R = { cost, Obj, M };
    }
    if (B && this.border[B]['type'] != 'w') {
      cost = this.border[B]['cost'];
      Obj = this.getBorderAfterMove(B, this.start);
      M = Obj.getM();

      ObjMove.B = { cost, Obj, M };
    }
    if (T && this.border[T]['type'] != 'w') {
      cost = this.border[T]['cost'];
      Obj = this.getBorderAfterMove(T, this.start);
      M = Obj.getM();

      ObjMove.T = { cost, Obj, M };
    }
    if (L && this.border[L]['type'] != 'w') {
      cost = this.border[L]['cost'];
      Obj = this.getBorderAfterMove(L, this.start);
      M = Obj.getM();

      ObjMove.L = { cost, Obj, M };
    }
    return ObjMove;
  }
  isEnd() {
    return this.start == this.target;
  }
  toStaring(Obj = this) {
    return `${Obj.start}_${Obj.target}`;
  }

  getM() {
    const R_T = Math.floor(this.target / 4);
    const C_T = this.target % 4;
    const R_S = Math.floor(this.start / 4);
    const C_S = this.start % 4;
    return Math.abs(R_S - R_T) + Math.abs(C_S - C_T);
  }
}
const uinqForm = obj => {
  let p_queue = [obj];
  const path = [];
  obj.cost = 0;

  const history = {};
  while (p_queue.length) {
    let last = p_queue.shift();
    if (last.Obj) last = last.Obj;

    const hash = last.toString();
    if (!history[hash]) {
      if (last.isEnd()) {
        console.log('solve uinqForm in node ', numNode, ' in steb ');
        return true;
        // return getPath(last);
      }
      const all = last.getAllMoveFromState();
      let ObjectArry = Object.values(all);
      // numNode += ObjectArry.length;
      //////////
      // for (let i of ObjectArry) {
      //   if (!history[game.toString(i)]) numNode++;
      // }

      ////
      // console.log(all,ObjectArry)

      ObjectArry = ObjectArry.map(e => {
        const hash = e.toString();
        if (!path[hash]) path[hash] = last;
        return e;
      });
      p_queue = [...p_queue, ...ObjectArry];
      console.log(p_queue);
      p_queue.sort((a, b) => a.cost + a.M - (b.cost + b.M));
      const hash = last.toString();
      history[hash] = true;
    }
  }

  return false;
};
