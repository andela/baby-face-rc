import { Meteor } from "meteor/meteor";
import { Packages } from "/lib/collections";
import request from "request";

const getPaystackHeader = (secretKey) => {
  return {
    "Authorization": `Bearer ${secretKey}`,
    "Content-Type": "application/json"
  };
};

export const Paystack = {
  accountOptions: function () {
    const settings = Packages.findOne({
      name: "reaction-paymentmethod"
    }).settings;
    if (!settings.secrtetKey && !settings.publickey) {
      throw new Meteor.Error("403", "Invalid Credentials");
    }
    return { secretKey: settings.secretKey,
      publicKey: settings.publicKey };
  },

  authorize: function (cardInfo, paymentInfo, callback) {
    Meteor.call("paystackSubmit", "authorize", cardInfo, paymentInfo, callback);
  },
  verify: (referenceNumber, secretKey, callback) => {
    const referenceId = referenceNumber;
    const headers = getPaystackHeader(secretKey);
    const paystackUrl = `https://api.paystack.co/transaction/verify/${referenceId}`;
    request.get(paystackUrl, {
      headers
    }, (error, response, body) => {
      const responseBody = JSON.parse(body);
      if (responseBody.status) {
        callback(null, responseBody);
      } else {
        callback(responseBody, null);
      }
    });
  }
};
