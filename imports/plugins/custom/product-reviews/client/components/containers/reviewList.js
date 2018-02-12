import React from "react";
import { Meteor } from "meteor/meteor";
import { composeWithTracker } from "@reactioncommerce/reaction-components";
import { ProductReviews } from "../../../lib/collections";

import ProductReviewList from "../productReviewList";

const ReviewListContainer = props => (<ProductReviewList {...props} />);

function composer(props, onData) {
  const subHandle = Meteor.subscribe("ProductReviews", props.product._id);
  if (subHandle.ready()) {
    const productReviews = ProductReviews.find({
      productId: props.product._id
    }, { sort: { createdAt: -1 } }).fetch();
    onData(null, { productReviews });
  }
}

export default composeWithTracker(composer)(ReviewListContainer);
