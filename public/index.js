"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const CATEGORIES_BOX = document.getElementById("categories");
const JOKES_BOX = (document.getElementById("jokes_container"));
const LOADER = document.getElementById("loader_container");
const fetchData = (url) => __awaiter(void 0, void 0, void 0, function* () {
    let res = yield fetch(url);
    let data = yield res.json();
    return data;
});
window.onload = () => __awaiter(void 0, void 0, void 0, function* () {
    LOADER.style.display = "flex";
    let categories = yield fetchData("https://api.chucknorris.io/jokes/categories");
    init(categories);
});
const init = (categories) => {
    categories.forEach((cat) => {
        let tmp = document.createElement("option");
        tmp.innerText = cat;
        CATEGORIES_BOX.append(tmp);
    });
    CATEGORIES_BOX.addEventListener("change", (event) => {
        changeJoke(event.target.value);
    });
    LOADER.style.display = "none";
};
const changeJoke = (value) => __awaiter(void 0, void 0, void 0, function* () {
    LOADER.style.display = "flex";
    let result = yield fetchData(`https://api.chucknorris.io/jokes/random?category=${value}`);
    addJokeToDocument(result.value, result.icon_url);
});
const addJokeToDocument = (value, image) => {
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
