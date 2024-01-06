Feature("Liking Restaurants");

Before(({ I }) => {
  I.amOnPage("/#/like");
});

Scenario("showing empty liked restaurants", ({ I }) => {
  I.seeElement("#posts");
  I.see("Kamu belum memilih restoran favorit.", "#no_favorite");
});

Scenario("liking one restaurant", ({ I }) => {
  I.see("Kamu belum memilih restoran favorit.", "#no_favorite");

  I.amOnPage("/");

  I.waitForElement(".post-item__title", 3);

  I.seeElement(".post-item__title");
  I.click(locate(".post-item__title a").first());

  I.waitForElement("#likeButton", 3);

  I.seeElement("#likeButton");
  I.click("#likeButton");

  I.amOnPage("/#/like");

  I.waitForElement(".post-item__title", 3);

  I.seeElement(".post-item__title");
});
