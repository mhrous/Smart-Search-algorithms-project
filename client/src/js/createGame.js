// swal('Good job!', 'You clicked the button!', 'success');
// "warning", "error", "success"  "info".
$(document).ready(function() {
  const data = { border: {} };
  let id = 1;

  let selectColor = '(243, 83, 105)';
  const biuldBorder = () => {
    const border = $('#border');
    const width = border.width() / data.col;
    const height = border.height() / data.row;
    for (let i = 0; i < data.col; i++) {
      data.border[i] = {};
    }
    for (let j = 0; j < data.row; j++) {
      for (let i = 0; i < data.col; i++) {
        data.border[i][j] = {};

        border.append(
          `<div class="rect" style="width:${width}px;height:${height}" data-row="${j}" data-col="${i}"></div>`
        );
      }
    }
  };

  $('#name').on('input', e => handelChange(e));
  $('#col').on('input', e => handelChange(e));
  $('#row').on('input', e => handelChange(e));
  $('#btnMainIfo').on('click', e => handelSumpit(e));

  const getId = color => {
    for (let i = 0; i < data.col; i++) {
      for (let j = 0; j < data.row; j++) {
        if (data.border[i][j].color == color) {
          return data.border[i][j].id;
        }
      }
    }
    return null;
  };

  $('.color-item').on('click', function() {
    const color = $(this).data('color');
    const redId = getId('(243, 83, 105)');
    console.log(color, redId, id);
    if (color == '(243, 83, 105)' && redId && redId != id) {
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

  const handelChange = e => {
    data[e.target.name] = e.target.value;
  };

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

  const redrawBorder = () => {
    const border = $('#border');
    const width = border.width() / data.col;
    const height = border.height() / data.row;
    border.html('');
    for (let j = 0; j < data.row; j++) {
      for (let i = 0; i < data.col; i++) {
        border.append(
          `<div class="rect" style="width:${width}px;height:${height};background:rgb${
            data.border[i][j].color
          }" data-row="${j}" data-col="${i}" data-id="${
            data.border[i][j].id
          }"></div>`
        );
      }
    }
  };

  const clearData = () => {
    for (let i = 0; i < data.col; i++) {
      for (let j = 0; j < data.row; j++) {
        data.border[i][j] = {};
      }
    }
    id = 1;
    selectColor = '(243, 83, 105)';
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

  const findId = id => {
    let arry = [];
    for (let i = 0; i < data.col; i++) {
      for (let j = 0; j < data.row; j++) {
        if (data.border[i][j].id == id) {
          arry.push([i, j]);
        }
      }
    }
    return arry.length ? arry : null;
  };
  $('#border').on('click', '.rect', function() {
    const col = $(this).data('col');
    const row = $(this).data('row');
    const arryId = findId(id);
    if (data.border[col][row].color) {
      swal('Error!', 'You  cont add this item hear', 'error');
      return;
    }
    if (arryId) {
      console.log(arryId, col, row);
      for (let i = 0; i < arryId.length; i++) {
        if (
          ((arryId[i][0] == col - 1 || arryId[i][0] == col + 1) &&
            arryId[i][1] == row) ||
          ((arryId[i][1] == row - 1 || arryId[i][1] == row + 1) &&
            arryId[i][0] == col)
        ) {
          data.border[col][row].color = selectColor;
          data.border[col][row].id = id;

          redrawBorder();
          return;
        }
      }
      swal('Error!', 'item must be connected', 'error');
      return;
    }
    data.border[col][row].color = selectColor;
    data.border[col][row].id = id;

    redrawBorder();
  });

  const improvementData = () => {
    const items = {};
    for (let i = 0; i < data.col; i++) {
      for (let j = 0; j < data.row; j++) {
        if (data.border[i][j].id) {
          if (items[data.border[i][j].id]) {
            items[data.border[i][j].id].push([i, j]);
          } else {
            items[data.border[i][j].id] = [[i, j]];
          }
        }
        if (
          i - 1 > 0 &&
          data.border[i][j].id &&
          data.border[i][j].id == data.border[i - 1][j].id
        ) {
          data.border[i][j].left = true;
        }
        if (
          j - 1 > 0 &&
          data.border[i][j].id &&
          data.border[i][j].id == data.border[i][j - 1].id
        ) {
          data.border[i][j].tob = true;
        }
        if (
          i + 1 < data.col &&
          data.border[i][j].id &&
          data.border[i][j].id == data.border[i + 1][j].id
        ) {
          data.border[i][j].right = true;
        }
        if (
          j + 1 < data.row &&
          data.border[i][j].id &&
          data.border[i][j].id == data.border[i][j + 1].id
        ) {
          data.border[i][j].botton = true;
        }
      }
    }
    data.items = items;

    if (!getId('(243, 83, 105)')) {
      return 'pleass add red item';
    }
    console.log(items);
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
    console.log(data);
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
