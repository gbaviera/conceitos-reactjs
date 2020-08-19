import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const repository = await api.post('repositories', {
      title: `A new Repository ${Date.now()}`,
      url: 'localhost:3333',
      techs: ["ReactJS", "React"]
    })

    setRepositories([...repositories, repository.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>

            <ul>
              <li><a href={repository.url} target="_blank">{repository.title}</a></li>
              <li>Likes: {repository.likes}</li>
            </ul>

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>

          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
