import { Meteor } from "meteor/meteor";
import { ShopReviews } from "../../lib/collections";
import { getSchemas } from "@reactioncommerce/reaction-collections";


export const methods = {
  "shopReviews/add": function (data) {
    getSchemas().ShopReview.validate(data);
    const userHasReviewedShop =
      ShopReviews.findOne({ userId: data.userId, shopId: data.shopId });
    if (userHasReviewedShop) {
      ShopReviews.update({ userId: data.userId },
        { $set: { review: data.review, rating: data.rating } });
      return;
    }
    ShopReviews.insert(data);
  }
};

Meteor.methods(methods);
