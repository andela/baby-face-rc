import { Template } from "meteor/templating";
import { Components } from "@reactioncommerce/reaction-components";

Template.ProductCategory.helpers({
  ProductCategory() {
    return Components.ProductCategory;
  }
});
