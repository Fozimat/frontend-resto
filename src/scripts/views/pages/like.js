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

                </div>
            </div>
        </section>
  </main>
    `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestoIdb.getAllRestaurants();
    const restaurantsContainer = document.querySelector("#posts");
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantsTemplate(restaurant);
    });
  },
};

export default Like;
