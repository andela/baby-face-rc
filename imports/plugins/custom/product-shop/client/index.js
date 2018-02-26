import {
  registerComponent, withCurrentAccount, withCurrentUser, withIsAdmin
} from "@reactioncommerce/reaction-components";

import "./templates/index.html";
import "./templates/index.js";

import { ShopPage, ShopLink, ShopReviewForm } from "./component";

registerComponent("ShopPage", ShopPage);
registerComponent("ShopLink", ShopLink);
registerComponent("ShopReviewForm", ShopReviewForm, [withCurrentUser, withIsAdmin, withCurrentAccount]);
