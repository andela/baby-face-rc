import { Meteor } from "meteor/meteor";
import { ProductReviews } from "../../lib/collections";
import { getSchemas } from "@reactioncommerce/reaction-collections";


export const methods = {
  "reviews/add": function (data) {
    getSchemas().ProductReview.validate(data);
    const userHasReviewedProduct =
      ProductReviews.findOne({ userId: data.userId, productId: data.productId });
    if (userHasReviewedProduct) {
      ProductReviews.update({ userId: data.userId },
        { $set: { review: data.review, rating: data.rating } });
      return;
    }
    ProductReviews.insert(data);
  }
};

Meteor.methods(methods);
