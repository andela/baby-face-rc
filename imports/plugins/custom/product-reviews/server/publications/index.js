import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { ProductReviews } from "../../lib/collections";

Meteor.publish("ProductReviews", function (productId) {
  check(productId, String);
  return ProductReviews.find({
    productId
  });
});

Meteor.publish("Users", function (userId) {
  check(userId, String);
  return Meteor.users.find({
    _id: userId
  }, { fields: { emails: 1, username: 1, name: 1 } });
});
