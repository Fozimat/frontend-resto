import LikeButtonInitiator from "../src/scripts/utils/like-button-initiator";
import FavoriteRestoIdb from "../src/scripts/data/favoriteresto-idb";

describe("Liking a Restaurant", () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it("should show like button when the restaurant has not been like before", async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector("#likeButtonContainer"),
      restaurant: {
        id: 1,
      },
    });

    expect(
      document.querySelector('[aria-label="like this restaurant"]')
    ).toBeTruthy();
  });

  it("should not show unlike button when the restaurant has not been like before", async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector("#likeButtonContainer"),
      restaurant: {
        id: 1,
      },
    });

    expect(
      document.querySelector('[aria-label="unlike this restaurant"]')
    ).toBeFalsy();
  });

  it("should be able to like the restaurant", async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector("#likeButtonContainer"),
      restaurant: {
        id: 1,
      },
    });

    document.querySelector("#likeButton").dispatchEvent(new Event("click"));

    const restaurant = await FavoriteRestoIdb.getRestaurant(1);
    expect(restaurant).toEqual({ id: 1 });

    await FavoriteRestoIdb.deleteRestaurant(1);
  });

  it("should not add a restaurant again when its already liked", async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector("#likeButtonContainer"),
      restaurant: {
        id: 1,
      },
    });

    await FavoriteRestoIdb.putRestaurant({ id: 1 });
    document.querySelector("#likeButton").dispatchEvent(new Event("click"));

    expect(await FavoriteRestoIdb.getAllRestaurants()).toEqual([{ id: 1 }]);
    await FavoriteRestoIdb.deleteRestaurant(1);
  });

  xit("should not add a restaurant when it has no id", async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector("#likeButtonContainer"),
      restaurant: {},
    });

    document.querySelector("#likeButton").dispatchEvent(new Event("click"));
    expect(await FavoriteRestoIdb.getAllRestaurants()).toEqual([]);
  });
});
