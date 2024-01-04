import UrlParser from "../../routes/url-parser";
import RestaurantSource from "../../data/restaurant-source";
import { createRestaurantDetailTemplate } from "../templates/template-creator";
import LikeButtonInitiator from "../../utils/like-button-initiator";

const Detail = {
  async render() {
    return `
      <div id="restaurant" class="restaurant"></div>
      <div id="likeButtonContainer"></div>
      `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantSource.detailRestaurant(url.id);
    const RestaurantContainer = document.querySelector("#restaurant");
    RestaurantContainer.innerHTML = createRestaurantDetailTemplate(
      restaurant.restaurant
    );

    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector("#likeButtonContainer"),
      restaurant: {
        id: restaurant.restaurant.id,
        city: restaurant.restaurant.city,
        pictureId: restaurant.restaurant.pictureId,
        name: restaurant.restaurant.name,
        rating: restaurant.restaurant.rating,
        address: restaurant.restaurant.address,
        description: restaurant.restaurant.description,
        category: restaurant.restaurant.categories,
        menus: restaurant.restaurant.menus,
        reviews: restaurant.restaurant.customerReviews,
      },
    });
  },
};

export default Detail;
