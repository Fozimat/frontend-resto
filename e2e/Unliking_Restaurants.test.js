const assert = require("assert");

Feature("Unliking Restaurants");

Before(({ I }) => {
  I.amOnPage("/#/like");
});

Scenario("Unliking one restaurant", async ({ I }) => {
  I.see("Kamu belum memilih restoran favorit.", "#no_favorite");

  I.amOnPage("/");
  I.waitForElement(".post-item");

  I.seeElement(".post-item");
  const firstRestaurant = locate(".post-item__title a").first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.waitForElement("#likeButton");
  I.seeElement("#likeButton");
  I.click("#likeButton");

  I.amOnPage("/#/like");
  I.seeElement(".post-item");
  const likedRestaurantName = await I.grabTextFrom(".post-item__title");

  assert.strictEqual(firstRestaurantName, likedRestaurantName);

  I.click(likedRestaurantName);

  I.waitForElement("#likeButton");
  I.seeElement("#likeButton");
  I.click("#likeButton");

  I.amOnPage("/#/like");
  I.waitForElement("#posts");
  I.seeElement("#posts");

  const unlikedRestaurant = await I.grabTextFrom("#no_favorite");
  const emptyFavorite = "Kamu belum memilih restoran favorit.";
  assert.strictEqual(unlikedRestaurant, emptyFavorite);
});
