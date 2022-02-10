const CATEGORIES_BOX: HTMLSelectElement = document.getElementById(
  "categories"
) as HTMLSelectElement;

const JOKES_BOX: HTMLDivElement = <HTMLDivElement>(
  document.getElementById("jokes_container")
);

const LOADER: HTMLDivElement = document.getElementById(
  "loader_container"
) as HTMLDivElement;

const fetchData = async (url: string) => {
  let res = await fetch(url);
  let data = await res.json();
  return data;
};

window.onload = async () => {
  LOADER.style.display = "flex";
  LOADER.style.top = "0";
  let categories = await fetchData(
    "https://api.chucknorris.io/jokes/categories"
  );

  init(categories);
};
const init = (categories) => {
  categories.forEach((cat) => {
    let tmp = document.createElement("option");
    tmp.innerText = cat;
    CATEGORIES_BOX.append(tmp);
  });
  CATEGORIES_BOX.addEventListener("change", (event) => {
    changeJoke((event.target as HTMLOptionElement).value);
  });
  LOADER.style.display = "none";
};

const changeJoke = async (value: string) => {
  LOADER.style.display = "flex";
  LOADER.style.top = "0";
  let result = await fetchData(
    `https://api.chucknorris.io/jokes/random?category=${value}`
  );

  addJokeToDocument(result.value, result.icon_url);
};

const addJokeToDocument = (value: string, image: string) => {
  let container = document.createElement("div");
  let text_container = document.createElement("div");
  let image_container = document.createElement("div");
  image_container.classList.add("image_container");
  let imageElement = document.createElement("img");
  imageElement.style.border = "3px solid white";
  imageElement.src = image;
  imageElement.classList.add("image");
  image_container.append(imageElement);
  container.classList.add("singleJoke_container");
  text_container.classList.add("jokeText_container");
  container.append(image_container);
  let text = document.createElement("p");
  text.classList.add("jokeText");
  text.innerText = value;
  text_container.append(text);
  container.append(text_container);
  JOKES_BOX.prepend(container);
  LOADER.style.display = "none";
};
