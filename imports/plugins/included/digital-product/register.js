import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "digital-product",
  name: "digital-product",
  icon: "glyphicon-chevron-left glyphicon glyphicon-chevron-right",
  autoEnable: true,
  registry: [
    {
      name: "digital-product",
      provides: ["digital-product"],
      template: "digitalProduct"
    }
  ]
});
