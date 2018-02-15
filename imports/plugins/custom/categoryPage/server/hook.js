import { Reaction, Hooks } from "/server/api";
import { Shops } from "../../../../../lib/collections";

const addRolesToVisitors = () => {
  const shop = Shops.findOne(Reaction.getShopId());
  Shops.update(shop._id, {
    $addToSet: { defaultVisitorRole: "category" }
  });
  Shops.update(shop._id, {
    $addToSet: { defaultRoles: "category" }
  });
};

Hooks.Events.add("afterCoreInit", () => {
  addRolesToVisitors();
});
