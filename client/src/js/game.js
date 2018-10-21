class Game {
  constructor(game) {
    this.col = parseInt(game.col);
    this.row = parseInt(game.row);
    this.border = game.border;
    this.item = game.item;
  }

  draw(width, height) {
    const W = width / this.col;
    const H = height / this.row;
    let str = '';
    for (let i = 0, j = this.col * this.row; i < j; i++) {
      let item = this.border[i];
      console.log(item,i);
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
         }" data-index="${i}" data-id="${item.id}"></div>`;
    }

    return str;
  }
}
