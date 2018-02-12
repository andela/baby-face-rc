import {
  registerComponent, withCurrentUser, withIsAdmin, withCurrentAccount
} from "@reactioncommerce/reaction-components";

import { ProductReviewForm, ProductReviewListContainer, ProductRating } from "./components";

registerComponent("ProductReviewForm", ProductReviewForm, [withCurrentUser, withIsAdmin, withCurrentAccount]);
registerComponent("ProductReviews", ProductReviewListContainer);
registerComponent("ProductRating", ProductRating);
