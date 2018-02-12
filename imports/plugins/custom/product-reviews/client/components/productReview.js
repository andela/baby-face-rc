import React from "react";
import StarRating from "react-stars";
import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";
import { Components, composeWithTracker } from "@reactioncommerce/reaction-components";


const ProductReview = (props) => {
  const { emails, username } = props.user;

  const rating =
    <div style={{ marginTop: "1rem" }}>
      {
        !!props.review.rating &&
        <StarRating
          name="user-rating"
          value={parseInt(props.review.rating, 10)}
          size={18}
          edit={false}
        />
      }
    </div>;

  const userDetailsAndDate = (
    <div style={{ verticalAlign: "top", display: "inline-block" }}>
      <p style={{ marginLeft: "1rem", fontSize: "1.5rem", marginBottom: "0" }}>
        {username || "Guest"}
      </p>
      <span style={{ marginLeft: "1rem" }}>
        {props.review.createdAt.toDateString()}
      </span>
    </div>
  );

  // do not display if the review has no content
  const reviewAndRatingCard = props.review.review ? (
    <Components.Card>
      <Components.CardBody>
        <Components.ReactionAvatar size={50} email={emails[0].address} />
        {userDetailsAndDate}
        <Components.Divider />
        {rating}
        <p style={{ marginTop: "1rem", fontSize: "1.75rem" }}>{props.review.review}</p>
      </Components.CardBody>
    </Components.Card>
  ) : null;

  return reviewAndRatingCard;
};

function composer(props, onData) {
  const subHandle = Meteor.subscribe("Users", props.review.userId);
  if (subHandle.ready()) {
    const user = Meteor.users.findOne({
      _id: props.review.userId
    }, { fields: { emails: 1, username: 1 } });
    onData(null, { user });
  }
}

ProductReview.propTypes = {
  review: PropTypes.shape({
    rating: PropTypes.number,
    review: PropTypes.string,
    createdAt: PropTypes.object
  }),
  user: PropTypes.shape({
    emails: PropTypes.arrayOf(PropTypes.object),
    username: PropTypes.string
  })
};

export default composeWithTracker(composer)(ProductReview);
