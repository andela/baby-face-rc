import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { PackageConfig } from "/lib/collections/schemas/registry";
import { registerSchema } from "@reactioncommerce/reaction-collections";

export const PaystackPackageConfig = new SimpleSchema([
  PackageConfig, {
    "settings.mode": {
      type: Boolean,
      defaultValue: true
    },
    "settings.secretKey": {
      type: String,
      label: "Secret Key",
      optional: true
    },
    "settings.publicKey": {
      type: String,
      label: "Public Key",
      optional: true
    }
  }
]);

registerSchema("PaystackPackageConfig", PaystackPackageConfig);

export const PaystackPayment = new SimpleSchema({
  payerName: {
    type: String,
    label: "Name"
  },
  email: {
    type: String,
    min: 13,
    max: 30,
    label: "Email"
  }
});

registerSchema("PaystackPayment", PaystackPayment);
