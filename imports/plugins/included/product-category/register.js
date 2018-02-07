import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "product-category",
  name: "product-category",
  icon: "glyphicon-chevron-left glyphicon glyphicon-chevron-right",
  autoEnable: true,
  registry: [
    {
      name: "product-category",
      provides: ["product-category"],
      template: "productCategory"
    }
  ]
});
