import { Template } from "meteor/templating";
import { Components } from "@reactioncommerce/reaction-components";

Template.LeadCarousel.helpers({
  LeadCarousel() {
    return Components.LeadCarousel;
  }
});
