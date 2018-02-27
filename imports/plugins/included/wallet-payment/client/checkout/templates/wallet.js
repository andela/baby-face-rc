import { Template } from "meteor/templating";

import "./wallet.html";
import { WalletCheckoutContainer } from "../containers";

Template.walletPayment.helpers({
  WalletCheckout() {
    return  {
      component: WalletCheckoutContainer
    };
  }
});
