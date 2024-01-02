import json from "../public/data/DATA.json";

let resto = ``;
json.restaurants.forEach((restaurants) => {
  resto += `
        <article class="post-item" tabindex="0">
        <div class="post-header">
            <p class="post-item__city">${restaurants.city}</p>
        </div>
            <img class="post-item__thumbnail" src="${restaurants.pictureId}" alt="${restaurants.name}">
            <div class="post-item__content">
                <h1 class="post-item__title"><a href="#">${restaurants.name}</a></h1>
                <h2 class="post-item__rating"> Rating : ${restaurants.rating} ☆</h2>
                <p class="post-item__description">${restaurants.description}</p>
            </div>
        </article>
    `;
});

document.getElementById("posts").innerHTML = resto;

const mainNav = document.getElementById("menu");
const navBarToggle = document.getElementById("navbar-toggle");

navBarToggle.addEventListener("click", function () {
  mainNav.classList.toggle("open");
});
