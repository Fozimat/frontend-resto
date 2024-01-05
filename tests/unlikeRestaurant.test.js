import LikeButtonInitiator from "../src/scripts/utils/like-button-initiator";
import FavoriteRestoIdb from "../src/scripts/data/favoriteresto-idb";

describe("Unliking a Restaurant", () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteRestoIdb.putRestaurant({ id: 1 });
  });

  afterEach(async () => {
    await FavoriteRestoIdb.deleteRestaurant(1);
  });

  it("should display unlike widget when the restaurant has benn liked", async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector("#likeButtonContainer"),
      restaurant: {
        id: 1,
      },
    });

    expect(
      document.querySelector('[aria-label="unlike this restaurant"]')
    ).toBeTruthy();
  });

  it("should not display like widget when the restaurant has been liked", async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector("#likeButtonContainer"),
      restaurant: {
        id: 1,
      },
    });

    expect(
      document.querySelector('[aria-label="like this restaurant"]')
    ).toBeFalsy();
  });

  it("should be able to removed liked restaurant from the list", async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector("#likeButtonContainer"),
      restaurant: {
        id: 1,
      },
    });

    document
      .querySelector('[aria-label="unlike this restaurant"]')
      .dispatchEvent(new Event("click"));

    expect(await FavoriteRestoIdb.getAllRestaurants()).toEqual([]);
  });

  it("should not throw error when user click unlike widget if the unliked", async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector("#likeButtonContainer"),
      restaurant: {
        id: 1,
      },
    });

    await FavoriteRestoIdb.deleteRestaurant(1);

    document
      .querySelector('[aria-label="unlike this restaurant"]')
      .dispatchEvent(new Event("click"));

    expect(await FavoriteRestoIdb.getAllRestaurants()).toEqual([]);
  });
});
