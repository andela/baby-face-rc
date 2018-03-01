import { Hooks } from "/server/api";
import { addRolesToGroups } from "/server/api/core/addDefaultRoles";


Hooks.Events.add("afterCoreInit", () => {
  addRolesToGroups({ allShops: true, roles: ["dashboard/analysis"], shops: [], groups: ["guest", "anonymous", "customer"] });
});
