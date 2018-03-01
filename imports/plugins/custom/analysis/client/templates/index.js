import { Template } from "meteor/templating";
import { Components } from "@reactioncommerce/reaction-components";

Template.ActionableAnalysis.helpers({
  ActionableAnalysis() {
    return Components.ActionableAnalysis;
  }
});
