const screen = {
  userProfile: document.querySelector('.profile-data'),
  renderUser(user) {
    this.userProfile.innerHTML = `<div class="info"> 
                                    <img src="${
                                      user.avatarUrl
                                    }" alt="Foto de perfil do usuário"/>
                                    <div class="data">
                                      <h1>${
                                        user.name ??
                                        'Não possui nome cadastrado 😥'
                                      }</h1>
                                      <p>${
                                        user.bio ??
                                        'Não possui bio cadastrada 😥'
                                      }</p>
                                      <div>
                                        <p>${user.followers} Seguidores</p>
                                        <p>${user.following} Seguindo</p>
                                      </div>
                                    </div>
                                  </div>`;

    let repositoriesItens = '';

    user.repositories.forEach(
      repo =>
        (repositoriesItens += `<li>
                                <a href="${repo.html_url}" target="_blank">
                                  ${repo.name}
                                  <div class="repo-stats">
                                    <p>🍴 ${repo.forks_count}</p>
                                    <p>⭐ ${repo.stargazers_count}</p>
                                    <p>👀 ${repo.watchers_count}</p>
                                    <p>👩‍💻 ${repo.language ?? 'Indefinido'}</p>
                                  </div>
                                </a>
                              </li>`)
    );

    if (user.repositories.length > 0) {
      this.userProfile.innerHTML += `<div class="repositories section">
                                        <h2>Repositórios</h2>
                                        <ul>${repositoriesItens}</ul>
                                     </div>`;
    }

    this.renderEvents(user.events);
  },

  renderEvents(events) {
    if (events.length === 0) {
      return (this.userProfile.innerHTML +=
        '<p>Usuário ainda sem eventos 😥</p>');
    }

    let eventsItens = '';
    events.forEach(event => {
      const isPushOrCreateEvent =
        event.type === 'PushEvent' || event.type === 'CreateEvent';

      if (isPushOrCreateEvent) {
        if (event.type === 'PushEvent') {
          eventsItens += `<li><h3>${event.repo.name}</h3><p>- ${event.payload.commits[0].message}</p></li>`;
        }
        if (event.type === 'CreateEvent') {
          eventsItens += `<li><h3>${event.repo.name}</h3><p>- Sem mensagem de commit</p></li>`;
        }
      } else return;
    });

    this.userProfile.innerHTML += `<div class="events section">
                                    <h2>Eventos</h2>
                                    <ul>${eventsItens}</ul>
                                  </div>`;
  },

  renderNotFound() {
    this.userProfile.innerHTML = '<p>Usuário não encontrado 😥</p>';
  },
};

export { screen };
