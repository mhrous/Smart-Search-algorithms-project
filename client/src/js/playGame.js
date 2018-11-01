$(document).ready(function() {
  const border = $('.border');
  const width = border.width();
  const height = border.height();
  let selectItem;
  $('.action').hide();

  const game = new Game({});

  const drawGame = () => {
    const str = game.draw(width, height);
    border.html(str);
  };

  const getGameFromServer = async id => {
    const response = await Api.get(`game/${id}`);
    const status = response.status;
    if (status === 200) {
      const json = await response.json();
      game.buildFromJson(json);
      drawGame();
    }
  };

  const updataMove = id => {
    if (!id) return;
    const move = game.getMoveForItem(id);
    $('.can-move').removeClass('can-move');

    for (let i of move) {
      $(`.${i}`).addClass('can-move');
    }
  };

  const cheakIfEnd = () => {
    if (game.isEnd()) {
      swal('END!', 'YOU WIN', 'success');
    }
  };
  const gameId = localStorage.getItem('GameId');
  getGameFromServer(gameId);

  $('.border').on('click', 'div', function() {
    $('.select').removeClass('select');
    $('.can-move').removeClass('can-move');
    selectItem = null;
    const id = $(this).data('id');
    if (id) {
      selectItem = id;
      $(`*[data-id="${id}"]`).addClass('select');
      updataMove(id);
    }
  });

  $('.T').on('click', function() {
    if ($(this).hasClass('can-move')) {
      const newBorder = game.getBorderAfterMoveItem(selectItem, 'T');
      game.newSteps(newBorder);
      updataMove(selectItem);

      drawGame();
      cheakIfEnd();
    }
  });
  $('.R').on('click', function() {
    if ($(this).hasClass('can-move')) {
      const newBorder = game.getBorderAfterMoveItem(selectItem, 'R');
      game.newSteps(newBorder);
      updataMove(selectItem);

      drawGame();
      cheakIfEnd();
    }
  });
  $('.B').on('click', function() {
    if ($(this).hasClass('can-move')) {
      const newBorder = game.getBorderAfterMoveItem(selectItem, 'B');
      game.newSteps(newBorder);
      updataMove(selectItem);

      drawGame();
      cheakIfEnd();
    }
  });
  $('.L').on('click', function() {
    if ($(this).hasClass('can-move')) {
      const newBorder = game.getBorderAfterMoveItem(selectItem, 'L');
      game.newSteps(newBorder);
      updataMove(selectItem);
      drawGame();
      cheakIfEnd();
    }
  });

  $('#PC').on('click', function() {
    $('.action').show();
  });
  $('#DFS').on('click', async () => {
    let i = 0;
    const last = game.getLast();
    const col = game.col;
    const row = game.row;
    const resoult = solve('DSF', last, col, row);
    if (!resoult) {
      swal('Error!', 'Imposipole', 'error');

      return;
    }
    for (let move of resoult) {
      game.newSteps(move);
      drawGame();
      await sleep(100);
      i++;
    }
    console.log(i);
  });
  $('#BSF').on('click', async () => {
    let i = 0;

    const last = game.getLast();
    const col = game.col;
    const row = game.row;
    const resoult = solve('DSF', last, col, row);
    if (!resoult) {
      swal('Error!', 'Imposipole', 'error');

      return;
    }
    for (let move of resoult) {
      game.newSteps(move);
      drawGame();
      await sleep(100);
      i++;
    }
    console.log(i);
  });
  $('#U').on('click', async () => {
    let i = 0;
    const last = game.getLast();
    const col = game.col;
    const row = game.row;
    const resoult = solve('uinqForm', last, col, row);
    if (!resoult) {
      swal('Error!', 'Imposipole', 'error');

      return;
    }
    for (let move of resoult) {
      game.newSteps(move);
      drawGame();
      i++;
      await sleep(100);
    }
    console.log(i);
  });
  $('#A').on('click', async () => {
    console.log(455555555);
    let i = 0;
    const last = game.getLast();
    const col = game.col;
    const row = game.row;
    const resoult = solve('A*', last, col, row);
    if (!resoult) {
      swal('Error!', 'Imposipole', 'error');

      return;
    }
    for (let move of resoult) {
      game.newSteps(move);
      drawGame();
      i++;
      await sleep(100);
    }
    console.log(i);
  });

  $('.C').on('click', () => {
    console.log(game.getAllBorderFromState());
  });

  $('#BACK').on('click', function() {
    game.backToPrevState();
    updataMove(selectItem);

    drawGame();
  });
});
