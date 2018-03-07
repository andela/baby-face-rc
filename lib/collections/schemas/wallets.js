import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { registerSchema } from "@reactioncommerce/reaction-collections";

/**
 * @name Wallet
 * @summary Schema for user's wallet
 * @type {SimpleSchema}
 * @memberof schemas
 * @property {Number} balance
 * @property {String} ownerEmail required
 */
export const Wallets = new SimpleSchema({
  ownerEmail: {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  balance: {
    type: Number,
    label: "balance",
    decimal: true,
    optional: true,
    defaultValue: 0
  }
});

registerSchema("Wallets", Wallets);
