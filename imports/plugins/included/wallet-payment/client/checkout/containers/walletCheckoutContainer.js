import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";
import { compose, withProps } from "recompose";
import { registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";

import { Reaction } from "/client/api";
import { Cart, Shops, Wallets, Packages } from "/lib/collections";

import Wallet from "../components/wallet";

const handlers = {
  checkout: function checkout(customerWallet) {
    const {
      _id: customerWalletId,
      ownerEmail: customerEmail,
      balance: customerBalance
    } = customerWallet;

    return new Promise((resolve, reject) => {
      const shop = Shops.findOne({ _id: Reaction.getShopId() });
      const { currency } = shop;
      const cart = Cart.findOne();

      const { address: shopOwnerEmail } = shop.emails[0];
      const amount = parseFloat(cart.getTotal());

      Meteor.subscribe("Packages", Reaction.getShopId());
      const packageData = Packages.findOne({
        name: "wallet",
        shopId: Reaction.getShopId()
      });

      if (amount > customerBalance) {
        return reject({
          message: "Insufficient Balance! Please fund your wallet.",
          type: "error"
        });
      }


      Meteor.call("wallet/get-user-walletId", customerEmail, (getWalletIdError, shopOwnerWalletId) => {
        if (getWalletIdError) {
          return reject({
            message: getWalletIdError.message,
            type: "error"
          });
        }
        const senderTransaction = {
          amount,
          transactionType: "debit",
          walletId: customerWalletId,
          from: customerEmail,
          to: shopOwnerEmail
        };
        const shopOwnerTransaction = {
          amount,
          transactionType: "credit",
          walletId: shopOwnerWalletId,
          from: customerEmail,
          to: shopOwnerEmail
        };

        const paymentMethod = {
          processor: "Wallet",
          method: "wallet",
          paymentPackageId: packageData._id,
          paymentSettingsKey: packageData.registry[0].settingsKey,
          transactionId: Random.id(),
          currency,
          amount,
          status: "passed",
          mode: "authorize",
          createdAt: new Date(),
          transactions: []
        };

        const transactions = [senderTransaction, shopOwnerTransaction];
        paymentMethod.transactions = transactions;

        transactions.forEach((transaction) => {
          paymentMethod.transactions.push(transaction);
          Meteor.call("wallet/update-balance", transaction);
          Meteor.call("wallet/insert-transaction", transaction);
        });

        Meteor.call("cart/submitPayment", paymentMethod);
        resolve({
          message: `Payment to ${shopOwnerEmail} successful`,
          type: "success"
        });
      });
    });
  }
};

function composer(props, onData) {
  const subcription = Meteor.subscribe("UserWallet");
  if (subcription.ready()) {
    const wallet = Wallets.find({}).fetch()[0];
    onData(null, { wallet });
  }
}

registerComponent("Wallet", Wallet, [
  withProps(handlers),
  composeWithTracker(composer)
]);

export default compose(
  withProps(handlers),
  composeWithTracker(composer)
)(Wallet);
