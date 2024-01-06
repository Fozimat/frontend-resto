import FavoriteRestoIdb from "../../src/scripts/data/favoriteresto-idb";
import LikeButtonInitiator from "../../src/scripts/utils/like-button-presenter";

const createLikeButtonPresenterWithRestaurant = async (restaurant) => {
  await LikeButtonInitiator.init({
    likeButtonContainer: document.querySelector("#likeButtonContainer"),
    favoriteRestaurants: FavoriteRestoIdb,
    restaurant,
  });
};

export { createLikeButtonPresenterWithRestaurant };
