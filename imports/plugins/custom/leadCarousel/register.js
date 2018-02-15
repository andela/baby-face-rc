import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "LeadCarousel",
  name: "LeadCarousel",
  autoEnable: true,
  registry: [
    {
      name: "LeadCarousel",
      provides: ["LeadCarousel"],
      template: "LeadCarousel"
    }
  ]
});
