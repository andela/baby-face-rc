import React from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { Components, composeWithTracker } from "@reactioncommerce/reaction-components";
import { Router } from "/client/api";
import ReviewCard from "../../../product-reviews/client/components/productReview";
import { ShopReviews } from "../../lib/collections";

const ShopReviewsList = (props) => {
  return (
    <div>
      <Components.Divider label="Shop Reviews" />
      {
        props.shopReviews.length === 0 ?
          (<div>This shop currently has no reviews</div>) :
          (<div>{props.shopReviews.map(review =>
            (<ReviewCard key={review._id} review={review} />))}</div>)
      }
    </div>
  );
};

ShopReviewsList.propTypes = {
  shopReviews: PropTypes.arrayOf(PropTypes.object)
};

const composer = (props, onData) => {
  const shopId = Router.getParam("shopSlug");
  const subHandle = Meteor.subscribe("ShopReviews", shopId);
  if (subHandle.ready()) {
    const shopReviews = ShopReviews.find({
      shopId
    }, { sort: { createdAt: -1 } }).fetch();
    onData(null, { shopReviews });
  }
};

export default composeWithTracker(composer)(ShopReviewsList);


