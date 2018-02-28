import { Meteor } from "meteor/meteor";
import { compose, withProps } from "recompose";
import { registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";

import { Reaction } from "/client/api";
import { Accounts } from "/lib/collections";
import { Wallets, WalletHistories  } from "/lib/collections";

import { Paystack } from "../../../../payments-paystack/lib/api";

import walletDashboard from "../components/walletDashboard";

const handlers = {
  fundWallet: function fundWallet(amount) {
    return new Promise((resolve, reject) => {
      if (amount <= 99) {
        return reject(new Error("Invalid amount! Amount must be N100 or greater"));
      }

      Meteor.subscribe("Packages", Reaction.getShopId());

      const email = Accounts.findOne({ _id: Meteor.userId() }).emails[0].address;

      Meteor.call("paystack/loadApiKeys", (err, keys) => {
        if (keys) {
          const {
            publicKey,
            secretKey
          } = keys;
          const payload = {
            key: publicKey,
            email,
            amount: (amount * 100),
            currency: "NGN",
            callback: function (response) {
              const { reference } = response;
              Paystack.verify(reference, secretKey, (paystackVerifyError, res) => {
                if (paystackVerifyError) {
                  reject(paystackVerifyError);
                } else {
                  Meteor.call("wallet/get-user-walletId", email, (getWalletIdError, walletId) => {
                    const transaction = {
                      amount: (res.data.amount / 100),
                      transactionType: "credit",
                      walletId,
                      from: email,
                      to: email
                    };

                    resolve({
                      message: "Wallet funded successfully",
                      type: "success"
                    });

                    Meteor.call("wallet/insert-transaction", transaction);
                    Meteor.call("wallet/update-balance", transaction);
                  });
                }
              });
            },
            onClose: function () {
              reject(new Error("paystack-popup-close"));
            }
          };
          PaystackPop.setup(payload).openIframe();
        } else {
          reject(err);
        }
      });
    });
  },

  transferToWallet: function transferToWallet(amount, receiverEmail, senderWallet) {
    const {
      _id: senderWalletId,
      ownerEmail: senderEmail,
      balance: senderBalance
    } = senderWallet;

    return new Promise((resolve, reject) => {
      if (receiverEmail === senderEmail) {
        return reject(new Error("You can't transfer to yourself"));
      }

      if (amount <= 0) {
        return reject(new Error("Invalid amount! Amount must be greater than zero"));
      }

      if (amount > senderBalance) {
        return reject(new Error("Insufficient Balance! Please fund your wallet"));
      }

      Meteor.call("wallet/get-user-walletId", receiverEmail, (getWalletIdError, receiverWalletId) => {
        if (getWalletIdError) {
          return reject(getWalletIdError);
        }
        const senderTransaction = {
          amount: parseInt(amount, 10),
          transactionType: "debit",
          walletId: senderWalletId,
          from: senderEmail,
          to: receiverEmail
        };
        const receiverTransaction = {
          amount: parseInt(amount, 10),
          transactionType: "credit",
          walletId: receiverWalletId,
          from: senderEmail,
          to: receiverEmail
        };

        const transactions = [senderTransaction, receiverTransaction];
        transactions.forEach((transaction) => {
          Meteor.call("wallet/update-balance", transaction);
          Meteor.call("wallet/insert-transaction", transaction);
        });

        resolve(new Error(`Transfer to ${receiverEmail} successful`));
      });
    });
  },

  fetchWalletHistory: function fetchWalletHistory(page = 1, limit = 5) {
    const offset = (page - 1) * limit;
    const walletHistoryCount = WalletHistories.find({}).count();

    const pagesCount = Math.ceil(walletHistoryCount / limit);

    const walletHistory = WalletHistories.find({}, {
      sort: { createdAt: -1 },
      limit,
      skip: offset
    }).fetch();

    return {
      walletHistory,
      pagesCount
    };
  }
};

function composer(props, onData) {
  const subcription = Meteor.subscribe("UserWallet");
  if (subcription.ready()) {
    const wallet = Wallets.find({}).fetch()[0];

    const { walletHistory, pagesCount } = handlers.fetchWalletHistory();

    onData(null, { wallet, walletHistory, pagesCount });
  }
}

registerComponent("walletDashboard", walletDashboard, [
  withProps(handlers),
  composeWithTracker(composer)
]);

export default compose(
  withProps(handlers),
  composeWithTracker(composer)
)(walletDashboard);
