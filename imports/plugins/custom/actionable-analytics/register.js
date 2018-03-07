import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "actionable-analytics",
  name: "actionable analytics",
  icon: "fa fa-bar-chart",
  autoEnable: true,
  registry: [
    {
      label: "actionable-analytics",
      name: "actionable analytics",
      route: "/analytics",
      workflow: "coreProductWorkflow",
      permissions: [
        {
          label: "analytics",
          permission: "analytics"
        }
      ],
      template: "actionableAnalytics"
    }
  ]
});
