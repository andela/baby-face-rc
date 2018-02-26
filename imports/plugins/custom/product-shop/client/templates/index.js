import { Template } from "meteor/templating";
import { Components } from "@reactioncommerce/reaction-components";

Template.ShopPage.helpers({
  ShopPage() {
    return Components.ShopPage;
  }
});
