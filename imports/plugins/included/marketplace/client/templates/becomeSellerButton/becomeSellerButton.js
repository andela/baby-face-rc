import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Reaction, i18next } from "/client/api";

Template.becomeSellerButton.events({
  "click [data-event-action='button-click-become-seller']": function () {
    Meteor.call("shop/createShop", Meteor.userId(), function (error, response) {
      if (error) {
        const errorMessage = i18next.t("marketplace.errorCannotCreateShop", { defaultValue: "Could not create shop for current user {{user}}" });
        return Alerts.toast(`${errorMessage} ${error}`, "error");
      }

      const success = i18next.t("marketplace.yourShopIsReady", { defaultValue: "Your request was successfully submitted, We will get back to you shortly!" });
      Reaction.setShopId(response.shopId);
      return Alerts.toast(success, "success");
    });
  }
});
