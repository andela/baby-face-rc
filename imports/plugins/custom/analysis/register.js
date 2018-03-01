import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "actionable-analysis",
  name: "actionable-analysis",
  icon: "fa fa-bar-chart",
  autoEnable: true,
  registry: [
    {
      label: "actionable-analysis",
      name: "actionable-analysis",
      route: "dashboard/analysis",
      workflow: "coreProductWorkflow",
      permissions: [
        {
          label: "analysis",
          permission: "dashboard/analysis"
        }
      ],
      template: "ActionableAnalysis"
    }
  ]
});
