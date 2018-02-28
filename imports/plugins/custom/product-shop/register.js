import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "product-shop",
  name: "productShop",
  icon: "fa fa-th",
  autoEnable: true,
  registry: [
    {
      label: "shop",
      name: "shops",
      route: "shops/:shopSlug",
      workflow: "coreProductWorkflow",
      template: "ShopPage"
    }
  ]
});
