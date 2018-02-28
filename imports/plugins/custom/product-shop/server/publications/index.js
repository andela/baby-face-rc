import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Shops } from "/lib/collections";
import { ShopReviews } from "../../lib/collections";

Meteor.publish("Shops", function (shopId) {
  check(shopId, String);
  return Shops.find({
    _id: shopId
  });
});

Meteor.publish("ShopReviews", function (shopId) {
  check(shopId, String);
  return ShopReviews.find({
    shopId
  });
});
