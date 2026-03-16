import Character from './js/Character';
import Team from './js/Team';

const team1 = new Team();
const team2 = new Team();

const players = [
  new Character('Артур', 'Рыцарь'),
  new Character('Леголас', 'Лучник'),
  new Character('Гэндальф', 'Маг'),
  new Character('Арагорн', 'Следопыт'),
  new Character('Гимли', 'Воин'),
  new Character('Фродо', 'Хоббит'),
  new Character('Саурон', 'Темный властелин'),
  new Character('Галадриэль', 'Эльфийка'),
  new Character('Боромир', 'Воин'),
  new Character('Мерри', 'Хоббит'),
];

let selectedPlayer = null;

function render() {
  const playersPool = document.getElementById('playersPool');
  playersPool.innerHTML = players.map((player) => {
    let statusClass = '';
    if (team1.members.has(player) && team2.members.has(player)) {
      statusClass = 'in-both';
    } else if (team1.members.has(player)) {
      statusClass = 'in-team1';
    } else if (team2.members.has(player)) {
      statusClass = 'in-team2';
    } else if (selectedPlayer === player) {
      statusClass = 'selected';
    }

    return `
            <div class="player-card ${statusClass}" data-player="${player.name}">
                <strong>${player.name}</strong><br>
                <small>${player.type}</small>
            </div>
        `;
  }).join('');

  const team1Div = document.getElementById('team1');
  team1Div.innerHTML = Array.from(team1.members).map((player) => `
        <div class="player-card in-team1">
            <strong>${player.name}</strong><br>
            <small>${player.type}</small>
        </div>
    `).join('') || '<p>Команда пуста</p>';

  const team2Div = document.getElementById('team2');
  team2Div.innerHTML = Array.from(team2.members).map((player) => `
        <div class="player-card in-team2">
            <strong>${player.name}</strong><br>
            <small>${player.type}</small>
        </div>
    `).join('') || '<p>Команда пуста</p>';

  document.getElementById('team1Info').innerHTML = `
        <p><strong>Размер команды:</strong> ${team1.toArray().length}</p>
    `;

  document.getElementById('team2Info').innerHTML = `
        <p><strong>Размер команды:</strong> ${team2.toArray().length}</p>
    `;
}

document.addEventListener('click', (e) => {
  const playerCard = e.target.closest('.player-card');
  if (!playerCard || !playerCard.dataset.player) return;

  const playerName = playerCard.dataset.player;
  const player = players.find((p) => p.name === playerName);

  if (player) {
    selectedPlayer = player;
    render();
  }
});

document.getElementById('selectTeam1').addEventListener('click', () => {
  const message = document.getElementById('message');

  if (!selectedPlayer) {
    message.innerHTML = '<span class="error">❌ Сначала выберите игрока!</span>';
    return;
  }

  try {
    team1.add(selectedPlayer);
    message.innerHTML = `<span class="success">✅ ${selectedPlayer.name} добавлен в Команду 1</span>`;
    selectedPlayer = null;
  } catch (error) {
    message.innerHTML = `<span class="error">❌ ${error.message}</span>`;
  }

  render();
});

document.getElementById('selectTeam2').addEventListener('click', () => {
  const message = document.getElementById('message');

  if (!selectedPlayer) {
    message.innerHTML = '<span class="error">❌ Сначала выберите игрока!</span>';
    return;
  }

  try {
    team2.add(selectedPlayer);
    message.innerHTML = `<span class="success">✅ ${selectedPlayer.name} добавлен в Команду 2</span>`;
    selectedPlayer = null;
  } catch (error) {
    message.innerHTML = `<span class="error">❌ ${error.message}</span>`;
  }

  render();
});

document.getElementById('resetSelection').addEventListener('click', () => {
  selectedPlayer = null;
  document.getElementById('message').innerHTML = 'Выбор сброшен';
  render();
});

render();

console.log('Демонстрация addAll:');
console.log('Добавляем 3-х персонажей в Команду 1:');
team1.addAll(players[0], players[1], players[2]);
console.log('Команда 1 после addAll:', team1.toArray());
render();
