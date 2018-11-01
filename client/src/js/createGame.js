$(document).ready(function() {
  const data = { border: {} };
  let id = 1;

  let selectColor = '(255,0,0)';
  const biuldBorder = () => {
    const border = $('#border');
    const width = border.width() / data.col;
    const height = border.height() / data.row;

    for (let i = 0, j = data.col * data.row; i < j; i++) {
      data.border[i] = {};
      border.append(
        `<div class="rect" style="width:${width}px;height:${height}" data-index="${i}"></div>`
      );
    }
  };

  const handelChange = e => {
    data[e.target.name] = e.target.value;
  };

  $('#name').on('input', e => handelChange(e));
  $('#col').on('input', e => handelChange(e));
  $('#row').on('input', e => handelChange(e));

  const handelSumpit = e => {
    e.preventDefault();
    if (data.name && data.row && data.col && data.name.length) {
      $('.game-name').html(
        `${data.name} <div  style="float: right;">${id}</div>`
      );
      biuldBorder();
      $('#main-info').addClass('hide');
      $('#fill-border').removeClass('hide');
    } else {
      swal('Error!', 'You  forgot some information!', 'error');
    }
  };

  $('#btnMainIfo').on('click', e => handelSumpit(e));

  const getId = color => {
    for (let i in data.border) {
      if (data.border[i].color == color) {
        return data.border[i].id;
      }
    }
    return null;
  };

  $('.color-item').on('click', function() {
    const color = $(this).data('color');
    const redId = getId('(255,0,0)');
    if (color == '(255,0,0)' && redId && redId != id) {
      swal('Error!', "You  can't add more then one red item ", 'error');
    } else {
      $('.activ').removeClass('activ');
      $(this).addClass('activ');

      selectColor = color;
      id++;
      $('.game-name').html(
        `${data.name} <div  style="float: right;">${id}</div>`
      );
    }
  });

  const redrawBorder = () => {
    const border = $('#border');
    const width = border.width() / data.col;
    const height = border.height() / data.row;
    border.html('');
    for (let i in data.border) {
      border.append(
        `<div class="rect" style="width:${width}px;height:${height};background:rgb${
          data.border[i].color
        }" data-index="${i}"  data-id="${data.border[i].id}"></div>`
      );
    }
  };

  const clearData = () => {
    for (let i in data.border) {
      data.border[i] = {};
    }
    id = 1;
    selectColor = '(255,0,0)';
    redrawBorder();
    $('.activ').removeClass('activ');
    $('.color-item')
      .first()
      .addClass('activ');
  };

  $('.action .clear').on('click', clearData);
  $('.action .new').on('click', () => {
    id++;
    $('.game-name').html(
      `${data.name} <div  style="float: right;">${id}</div>`
    );
  });

  const getLeft = (index, col, row) => {
    const left = parseInt(index) - 1;
    return left >= 0 && Math.floor(left / col) == Math.floor(index / col)
      ? left
      : null;
  };
  const getTop = (index, col, row) => {
    const Top = parseInt(index) - parseInt(col);
    return Top >= 0 ? Top : null;
  };
  const getBotton = (index, col, row) => {
    const Botton = parseInt(index) + parseInt(col);
    return Botton < col * row ? Botton : null;
  };
  const getRight = (index, col, row) => {
    const Right = parseInt(index) + 1;
    return Right < col * row &&
      Math.floor(Right / col) == Math.floor(index / col)
      ? Right
      : null;
  };

  $('#border').on('click', '.rect', function() {
    const index = $(this).data('index');
    if (data.border[index].color) {
      swal('Error!', 'You  cont add this item hear', 'error');
      return;
    }
    let bigItem = false;
    for (let i in data.border) {
      if (data.border[i].id == id) {
        bigItem = true;
        break;
      }
    }

    if (bigItem) {
      const Left = getLeft(index, data.col, data.row);
      const Right = getRight(index, data.col, data.row);
      const Botton = getBotton(index, data.col, data.row);
      const Top = getTop(index, data.col, data.row);

      if (
        (Left == null || data.border[Left].id != id) &&
        (Right == null || data.border[Right].id != id) &&
        (Botton == null || data.border[Botton].id != id) &&
        (Top == null || data.border[Top].id != id)
      ) {
        swal('Error!', 'item mast be connect ', 'error');
        return;
      }
    }
    data.border[index].color = selectColor;
    data.border[index].id = id;

    redrawBorder();
  });

  const improvementData = () => {
    const items = {};
    for (let i in data.border) {
      console.log(i, data.border[i], data.border[i].id);
      if (data.border[i].id) {
        if (items[data.border[i].id]) {
          items[data.border[i].id].push(i);
        } else {
          items[data.border[i].id] = [i];
        }
      }
      const Left = getLeft(i, data.col, data.row);
      const Right = getRight(i, data.col, data.row);
      const Botton = getBotton(i, data.col, data.row);
      const Top = getTop(i, data.col, data.row);
      console.log(Left, Botton, Right, Top);

      if (
        Left != null &&
        data.border[i].id &&
        data.border[Left].id == data.border[i].id
      ) {
        data.border[i].left = true;
      }
      if (
        Right != null &&
        data.border[i].id &&
        data.border[Right].id == data.border[i].id
      ) {
        data.border[i].right = true;
      }
      if (
        Botton != null &&
        data.border[i].id &&
        data.border[Botton].id == data.border[i].id
      ) {
        data.border[i].botton = true;
      }
      if (
        Top != null &&
        data.border[i].id &&
        data.border[Top].id == data.border[i].id
      ) {
        data.border[i].top = true;
      }
    }

    if (!getId('(255,0,0)')) {
      return 'pleass add red item';
    }
    if (Object.keys(items).length < 2) {
      return 'pleass add more item';
    }
    return null;
  };

  $('.action .create-game-button').on('click', async () => {
    const improv = improvementData();
    if (improv) {
      swal('Error!', improv, 'error');
      return;
    }
    const response = await Api.post('game', data);
    const status = response.status;
    if (status === 200) {
      const json = await response.json();
      if (json.id) {
        window.location.replace('./selectGame.html');
      }
    }
  });
});
