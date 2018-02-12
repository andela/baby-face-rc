import React from "react";
import StarRating from "react-stars";
import { Meteor } from "meteor/meteor";
import { composeWithTracker } from "@reactioncommerce/reaction-components";
import PropTypes from "prop-types";
import Tooltip from "react-simple-tooltip";
import { ProductReviews } from "../../lib/collections";

const ProductRating = props => {
  return (
    <div>
      <h3>Rating</h3>
      {
        !props.productRating ?
          <p>This product currently has no rating</p> :
          <div>
            <div style={{ display: "inline-block" }}>
              <StarRating value={props.productRating} edit={false} size={18} />
            </div>
            <Tooltip
              placement="bottom"
              padding={5}
              content={`This rating is based on votes from ${props.ratingsCount} users`}
            >
              <span style={{ verticalAlign: "super", fontSize: "1.5rem", marginLeft: "1rem" }}>
                ({props.ratingsCount} votes)
              </span>
            </Tooltip>
          </div>
      }

    </div>
  );
};

function composer(props, onData) {
  const subHandle = Meteor.subscribe("ProductReviews", props.product._id);
  if (subHandle.ready()) {
    const productReviews = ProductReviews.find(
      {
        productId: props.product._id
      },
      {
        fields: {
          rating: 1
        }
      })
      .fetch();
    const ratings = productReviews.map((review) => {
      if (review.rating === 0) {
        return;
      }
      return review.rating;
    });
    const ratingSum = ratings.reduce((prevValue, currentValue) => prevValue + currentValue, 0);
    const productRating = Math.round(ratingSum / ratings.length);
    onData(null, { ratingsCount: ratings.length, productRating });
  }
}

ProductRating.propTypes = {
  productRating: PropTypes.number,
  ratingsCount: PropTypes.number
};

export default composeWithTracker(composer)(ProductRating);

