import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { registerSchema } from "@reactioncommerce/reaction-collections";
import { check } from "meteor/check";


export const ProductReview = new SimpleSchema({
  userId: { type: String, regEx: SimpleSchema.RegEx.Id },
  productId: { type: String, regEx: SimpleSchema.RegEx.Id },
  review: { type: String, optional: true, min: 3, label: "Review" },
  rating: { type: Number, optional: true, min: 0, max: 5, defaultValue: 0, label: "Rating" },
  createdAt: {
    type: Date,
    optional: true,
    autoValue: function () {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {
          $setOnInsert: new Date
        };
      }
    }
  },
  updatedAt: {
    type: Date,
    autoValue: function () {
      return new Date;
    },
    optional: true
  }
}, { check });

registerSchema("ProductReview", ProductReview);
