import { getUser } from './services/user.js';
import { getRepos } from './services/repositories.js';
import { getEvents } from './services/events.js';

import { user } from './objects/user.js';
import { screen } from './objects/screen.js';

document.getElementById('btn-search').addEventListener('click', () => {
  const userName = document.getElementById('input-search').value;
  if (isInputEmpty(userName)) return;
  getUserData(userName);
});

// Adiciona um listener de evento para o input de busca, escutando o evento 'keyup'
document.getElementById('input-search').addEventListener('keyup', e => {
  // Obtém o valor do input, que é o nome do usuário digitado
  const userName = e.target.value;

  // Verifica qual tecla foi pressionada, seja pelo código ou pela tecla
  const key = e.which || e.keyCode;
  // Verifica se a tecla pressionada foi 'Enter' (cujo o código no javaScript é 13)
  const isEnterPressed = key === 13;

  // Se a tecla 'Enter' foi pressionada, chama a função getUserProfile com o nome do usuário
  if (isEnterPressed) {
    if (isInputEmpty(userName)) return;
    getUserData(userName);
  }
});

async function getUserData(userName) {
  const userResponse = await getUser(userName);
  
  
  if (userResponse.message === 'Not Found') {
    screen.renderNotFound();
    return;
  }
  
  const repositoriesResponse = await getRepos(userName);
  const eventsResponse = await getEvents(userName);
  
  user.setInfo(userResponse);
  user.setRepositories(repositoriesResponse);
  user.setEvents(eventsResponse);

  screen.renderUser(user);  
}

function isInputEmpty(userName) {
  if (userName.length === 0) {
    alert('Preencha o campo com o nome do usuário do Github');
    return true;
  }
}
