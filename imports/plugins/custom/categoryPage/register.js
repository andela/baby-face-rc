import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "category-page",
  name: "category",
  icon: "fa fa-th",
  autoEnable: true,
  registry: [
    {
      label: "category",
      name: "Category",
      route: "category/:category",
      workflow: "coreProductWorkflow",
      permissions: [
        {
          label: "category",
          permission: "category"
        }
      ],
      template: "CategoryPage"
    }
  ]
});
