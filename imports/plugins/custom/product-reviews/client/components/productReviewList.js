import React from "react";
import PropTypes from "prop-types";
import { Components } from "@reactioncommerce/reaction-components";
import ProductReview from "./productReview";

const ProductReviewList = (props) => {
  return (
    <div>
      <Components.Divider label="Product Reviews" />
      {
        props.productReviews.length === 0 ?
          (
            <div>
              This product currently has no reviews
            </div>
          ) :
          (
            <div>
              {
                props.productReviews.map(review =>
                  (<ProductReview key={review._id} review={review} />))
              }
            </div>
          )
      }
    </div>
  );
};

ProductReviewList.propTypes = {
  productReviews: PropTypes.arrayOf(PropTypes.object)
};

export default ProductReviewList;


