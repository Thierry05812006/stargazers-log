const repositoryList = document.querySelector("#repositories");
const statusMessage = document.querySelector("#status");

async function loadStarredRepositories() {
  try {
    const response = await fetch("./events.json");
    if (!response.ok) {
      throw new Error(`Could not load repositories (${response.status})`);
    }

    const events = await response.json();
    if (!Array.isArray(events)) {
      throw new Error("Repository data must be a list");
    }

    const starredRepositories = events.filter((event) => event.type === "starred");
    for (const repository of starredRepositories) {
      const item = document.createElement("li");
      const heading = document.createElement("h2");
      const link = document.createElement("a");
      const description = document.createElement("p");
      const date = document.createElement("time");

      link.href = repository.url;
      link.textContent = repository.name;
      heading.append(link);
      description.textContent = repository.description;
      date.dateTime = repository.starred_at;
      date.textContent = `Starred on ${repository.starred_at}`;

      item.append(heading, description, date);
      repositoryList.append(item);
    }

    statusMessage.textContent = starredRepositories.length
      ? ""
      : "No starred repositories yet.";
  } catch (error) {
    statusMessage.textContent = "Unable to load starred repositories.";
    console.error(error);
  }
}

loadStarredRepositories();
