import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { ProductReviews } from "../../lib/collections";
// import { ProductReview } from "../../lib/collections/schemas/index";

Meteor.publish("ProductReviews", function (productId = null) {
  if (!productId) {
    return ProductReviews.find({});
  }
  check(productId, String);
  return ProductReviews.find({
    productId
  });
});

Meteor.publish("Users", function (userId) {
  check(userId, String);
  return Meteor.users.find(
    {
      _id: userId
    },
    { fields: { emails: 1, username: 1, name: 1 } }
  );
});
