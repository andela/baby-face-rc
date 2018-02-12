import { Mongo } from "meteor/mongo";
import Schemas from "./schemas";

export const ProductReviews = new Mongo.Collection("ProductReviews");
ProductReviews.attachSchema(Schemas.ProductReview);
