import { StaticPages } from "/lib/collections";
import { Reaction } from "/server/api";
import { Meteor } from "meteor/meteor";


/**
 * StaticPages
 * */

Meteor.publish("StaticPages", function () {
  const shopId = Reaction.getShopId();
  if (!shopId) {
    return this.ready();
  }
  return StaticPages.find({
    shopId
  });
});
