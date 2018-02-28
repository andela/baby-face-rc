import { Template } from "meteor/templating";
import { Components } from "@reactioncommerce/reaction-components";

Template.CategoryPage.helpers({
  CategoryPage() {
    return Components.CategoryPage;
  }
});
