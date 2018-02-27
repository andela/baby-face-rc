import { Meteor } from "meteor/meteor";
import { Accounts, Wallets, WalletHistories } from "/lib/collections";

/**
 * Wallet publication
 * @return {Array} return wallet and wallethistroy cursor
 */
Meteor.publish("UserWallet", function () {
  let wallet;

  if (!this.userId) {
    return this.ready();
  }
  const owner = Accounts.findOne({ _id: this.userId });
  if (owner.emails.length === 0) {
    return this.ready();
  }

  const ownerEmail = owner.emails[0].address;
  wallet = Wallets.findOne({ ownerEmail });

  if (!wallet) {
    Wallets.insert({ ownerEmail, balance: 0 });
    wallet = Wallets.findOne({ ownerEmail });
  }

  return [
    Wallets.find({ ownerEmail }),
    WalletHistories.find({ walletId: wallet._id.valueOf() })
  ];
});
