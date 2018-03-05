import { WalletDashboardContainer } from "../container";

import { Template } from "meteor/templating";
import "./wallet.html";

Template.walletDashboard.helpers({
  WalletDashboard() {
    return  {
      component: WalletDashboardContainer
    };
  }
});
