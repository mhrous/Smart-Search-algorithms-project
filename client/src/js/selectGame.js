$(document).ready(function() {
  const border = $('.border');
  const width = border.width();
  const height = border.height();

  const startGame = () => {
    const id = $('.active').data('id');
    localStorage.setItem('GameId', id);
    window.location.href = './playGame.html';
  };
  const getNameGameFromServer = async () => {
    const response = await Api.get('gameName');
    const status = response.status;
    if (status === 200) {
      const json = await response.json();
      console.log(json);
      nameGame = json;
    }
    str = '';
    for (let i = 0; i < nameGame.length; i++) {
      str += `  <li class="list-group-item" data-id="${nameGame[i].id}">${
        nameGame[i].name
      }</li>

        `;
    }
    $('#game-name-list').append(str);
  };



  const getGameFromServer = async id => {
    const response = await Api.get(`game/${id}`);
    const status = response.status;
    if (status === 200) {
      const json = await response.json();
      const game = new Game(json);
      const str = game.draw(width, height);

      border.html(str);
    }
  };

  getNameGameFromServer();
  $('#game-name-list').on('click', 'li', function() {
    const self = $(this);
    const id = self.data('id');
    $('.active').removeClass('active');
    self.addClass('active');
    console.log(id);
    getGameFromServer(id);
    $('.play').removeClass('disabled');
    $('.play').on('click', startGame);
  });


});
