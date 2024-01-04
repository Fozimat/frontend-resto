import FavoriteRestoIdb from "../../data/favoriteresto-idb";
import { createRestaurantsTemplate } from "../templates/template-creator";

const Like = {
  async render() {
    return `
    <main>
        <section class="content" id="kontent">
            <div class="latest">
                <h1 class="latest__label" tabindex="0">Favorite Restoran</h1>
                <div class="posts" id="posts">
                <p id="no_favorite" style="display:none;text-align:center;">Kamu belum memilih restoran favorit.</p>
                </div>
            </div>
        </section>
  </main>
    `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestoIdb.getAllRestaurants();
    const restaurantsContainer = document.querySelector("#posts");
    const noFavoriteMessage = document.querySelector("#no_favorite");

    if (restaurants.length === 0) {
      noFavoriteMessage.style.display = "block";
    } else {
      restaurants.forEach((restaurant) => {
        restaurantsContainer.innerHTML += createRestaurantsTemplate(restaurant);
      });
      noFavoriteMessage.style.display = "none";
    }
  },
};

export default Like;
