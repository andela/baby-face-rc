import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "Test",
  name: "testing",
  icon: "glyphicon-chevron-left glyphicon glyphicon-chevron-right",
  autoEnable: true,
  registry: [
    {
      name: "Test",
      provides: ["test"],
      template: "test"
    }
  ]
});
