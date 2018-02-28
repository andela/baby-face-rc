import { Mongo } from "meteor/mongo";
import Schemas from "./schemas";

export const ShopReviews = new Mongo.Collection("ShopReviews");
ShopReviews.attachSchema(Schemas.ShopReview);
