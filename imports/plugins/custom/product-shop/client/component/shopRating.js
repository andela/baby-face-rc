import React from "react";
import StarRating from "react-stars";
import { Meteor } from "meteor/meteor";
import { composeWithTracker } from "@reactioncommerce/reaction-components";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";
import { Router } from "/client/api";
import { ShopReviews } from "../../lib/collections";

const ShopRating = props => {
  return (
    <div className="pdp header">
      <div style={{ display: "inline-block" }}>
        <StarRating value={props.shopRating} edit={false} size={18} />
      </div>
      <span data-tip data-for="ratingsCount" className="ratings-count">
        ({props.ratingsCount})
      </span>
      <ReactTooltip id="ratingsCount" effect="solid" place="right">
        {
          !props.ratingsCount ?
            "This shop has not been rated" :
            `Rating is based on vote from ${props.ratingsCount} users`
        }
      </ReactTooltip>
    </div>
  );
};

function composer(props, onData) {
  const shopId = Router.getParam("shopSlug");
  const subHandle = Meteor.subscribe("ShopReviews", shopId);
  if (subHandle.ready()) {
    const shopReviews = ShopReviews.find({ shopId, rating: { $gt: 0 } },
      { fields: { rating: 1 } }).fetch();
    const ratings = shopReviews.map((review) => {
      return review.rating;
    });
    const ratingSum = ratings.reduce((prevValue, currentValue) => prevValue + currentValue, 0);
    const shopRating = Math.round(ratingSum / ratings.length);
    onData(null, { ratingsCount: ratings.length, shopRating });
  }
}

ShopRating.propTypes = {
  ratingsCount: PropTypes.number,
  shopRating: PropTypes.number
};

export default composeWithTracker(composer)(ShopRating);
