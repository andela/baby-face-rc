/* eslint camelcase: 0 */
import { Reaction } from "/server/api";

Reaction.registerPackage({
  name: "reaction-analytics",
  icon: "fa fa-bar-chart-o",
  autoEnable: true,
  settings: {
    public: {
      segmentio: {
        enabled: true,
        api_key: "4sImniwi4TGx9JK2QJMTKB35IQry8QeR"
      },
      googleAnalytics: {
        enabled: false,
        api_key: "UA-114930630-1"
      },
      mixpanel: {
        enabled: false,
        api_key: ""
      }
    }
  },
  registry: [
    {
      provides: ["dashboard"],
      label: "Analytics",
      description: "Analytics and tracking integrations",
      template: "reactionAnalytics",
      icon: "fa fa-bar-chart-o",
      priority: 3,
      container: "connect",
      permissions: [
        {
          label: "Reaction Analytics",
          permission: "dashboard/analytics"
        }
      ]
    },
    {
      label: "Analytics Settings",
      icon: "fa fa-bar-chart-o",
      route: "/dashboard/analytics/settings",
      provides: ["settings"],
      container: "dashboard",
      template: "reactionAnalyticsSettings"
    }
  ]
});
