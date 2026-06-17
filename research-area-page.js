(function () {
  const areaSlug = document.body.dataset.researchArea;
  const data = window.rezaeeResearchAreas?.[areaSlug];

  if (!data) {
    return;
  }

  const setText = (selector, value) => {
    const element = document.querySelector(selector);
    if (element) {
      element.textContent = value;
    }
  };

  const createResourceCard = (item) => {
    const article = document.createElement("article");
    article.className = "research-resource-card";

    const title = document.createElement("h3");
    title.textContent = item.title;
    article.append(title);

    if (item.meta) {
      const meta = document.createElement("p");
      meta.className = "resource-meta";
      meta.textContent = item.meta;
      article.append(meta);
    }

    if (item.authors) {
      const authors = document.createElement("p");
      authors.className = "resource-authors";
      authors.textContent = item.authors;
      article.append(authors);
    }

    if (item.description) {
      const description = document.createElement("p");
      description.textContent = item.description;
      article.append(description);
    }

    if (item.url) {
      const link = document.createElement("a");
      link.className = "research-resource-link";
      link.href = item.url;
      link.textContent = item.url.startsWith("/") ? "Open page" : "Open source";

      if (!item.url.startsWith("/")) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }

      article.append(link);
    }

    return article;
  };

  const renderList = (selector, items, emptyMessage) => {
    const target = document.querySelector(selector);

    if (!target) {
      return;
    }

    target.replaceChildren();

    if (!items.length) {
      const empty = document.createElement("div");
      empty.className = "research-empty-state";

      const message = document.createElement("p");
      message.textContent = emptyMessage;
      empty.append(message);

      const link = document.createElement("a");
      link.href = "/publications/";
      link.textContent = "Back to all publications";
      empty.append(link);

      target.append(empty);
      return;
    }

    target.append(...items.map(createResourceCard));
  };

  const renderOptionalSection = (sectionSelector, listSelector, items) => {
    const section = document.querySelector(sectionSelector);

    if (!section) {
      return;
    }

    section.hidden = items.length === 0;

    if (items.length) {
      renderList(listSelector, items, "");
    }
  };

  document.title = `${data.title} | Research | Zabihollah Rezaee`;
  setText("#area-title", data.title);
  setText("#area-description", data.description);

  const tags = document.querySelector("#area-tags");
  if (tags) {
    tags.replaceChildren(
      ...data.tags.map((tag) => {
        const span = document.createElement("span");
        span.textContent = tag;
        return span;
      })
    );
  }

  renderList(
    "#selected-publications-list",
    data.publications,
    "No specific publications are currently listed for this research area."
  );
  renderOptionalSection("#related-books-section", "#related-books-list", data.books);
  renderOptionalSection("#related-projects-section", "#related-projects-list", data.projects);
  renderOptionalSection("#profile-content-section", "#profile-content-list", data.profile);
})();
