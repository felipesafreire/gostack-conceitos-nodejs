const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

let repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const newRepo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(newRepo);
  return response.json(newRepo);
});

app.put("/repositories/:id", (request, response) => {
  const id = request.params.id;
  const { title, url, techs } = request.body;

  const repo = repositories.find((repo) => repo.id == id);

  if (!repo) {
    return response.status(400).json({ message: "Repository not found." });
  }

  repo.title = title;
  repo.url = url;
  repo.techs = techs;

  return response.json(repo);
});

app.delete("/repositories/:id", (request, response) => {
  const id = request.params.id;
  const repo = repositories.find((repo) => repo.id == id);

  if (!repo) {
    return response.status(400).json({ message: "Repository not found." });
  }

  repositories = repositories.filter((repository) => repository.id != repo.id);

  return response.status(204).json(repositories);
});

app.post("/repositories/:id/like", (request, response) => {
  const id = request.params.id;

  const repo = repositories.find((repo) => repo.id == id);

  if (!repo) {
    return response.status(400).json({ message: "Repository not found." });
  }

  repo.likes += 1;

  return response.json(repo);
});

module.exports = app;
