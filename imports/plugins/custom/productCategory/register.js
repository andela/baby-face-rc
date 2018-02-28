import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "ProductCategory",
  name: "ProductCategory",
  autoEnable: true,
  registry: [
    {
      name: "ProductCategory",
      provides: ["ProductCategory"],
      template: "ProductCategory"
    }
  ]
});
