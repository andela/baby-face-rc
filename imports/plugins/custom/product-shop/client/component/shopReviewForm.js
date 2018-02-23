import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";
import "velocity-animate/velocity.ui";
import { Components } from "@reactioncommerce/reaction-components";
import StarRating from "react-stars";
import ReactTooltip from "react-tooltip";
import { Router } from "/client/api";


class ShopReviewForm extends Component {
  state = {
    review: "",
    rating: 0
  }

  handleChange = (event, value) => {
    this.setState({
      review: value
    });
  }

  renderTextField() {
    return (
      <Components.TextField
        ref={(ref) => { this._input = ref; }}
        multiline={true}
        style={{ marginBottom: "0.5rem", height: "6rem" }}
        onChange={this.handleChange}
        value={this.state.review}
        i18nKeyPlaceholder="review"
      />
    );
  }

  handleFormSubmission = () => {
    if (!this.state.rating && !this.state.review) {
      Alerts.toast("Please add a rating or review", "error");
      return;
    }
    const data = {
      rating: this.state.rating,
      review: this.state.review.trim() || undefined,
      shopId: Router.getParam("shopSlug"),
      userId: this.props.currentUser._id
    };
    Meteor.call("shopReviews/add", data, (error) => {
      if (error) {
        Alerts.toast(error.reason, "error");
        return;
      }
      Alerts.toast("Review posted successfully", "success");
      this.setState({ review: "", rating: 0 });
    });
  }

  render() {
    const { currentAccount, isAdmin } = this.props;
    return currentAccount && !isAdmin &&
      (
        <div>
          <Components.Divider
            label="Add your review for this shop"
          />
          <div style={{ marginBottom: "0.5rem" }}>
            <StarRating
              name="user-rating"
              onChange={rating => this.setState({ rating })}
              count={5} size={22}
              value={this.state.rating}
              half={false}
            />
          </div>
          {this.renderTextField()}
          <Components.Button
            className="submit-review-btn"
            label="Submit review"
            data-tip
            data-for="submitButton"
            onClick={this.handleFormSubmission}
          />
          <ReactTooltip id="submitButton" place="top" effect="solid">
            <span>Submitting a new review or rating will replace your previous one</span>
          </ReactTooltip>
        </div>
      );
  }
}

ShopReviewForm.propTypes = {
  currentAccount: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  currentUser: PropTypes.shape({ _id: PropTypes.string }),
  isAdmin: PropTypes.bool
};

export default ShopReviewForm;
