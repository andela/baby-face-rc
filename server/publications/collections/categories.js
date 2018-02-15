import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import { Products } from "/lib/collections";
import { findProductMedia } from "./product";

/**
 * products publication
 * @param {Number} [productScrollLimit] - optional, defaults to 24
 * @param {Array} shops - array of shopId to retrieve product from.
 * @return {Object} return product cursor
 */
Meteor.publish("Categories", function (productScrollLimit = 24, category, sort = {}) {
  check(productScrollLimit, Number);
  check(category, String);
  check(sort, Match.OneOf(undefined, Object));

  const productCursor = Products.find(
    { category },
    {
      sort,
      limit: productScrollLimit
    }
  );

  const mediaProductIds = productCursor.fetch().map(p => p._id);
  const mediaCursor = findProductMedia(this, mediaProductIds);

  return [productCursor, mediaCursor];
});
