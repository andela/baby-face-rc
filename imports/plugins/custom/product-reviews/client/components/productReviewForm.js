import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";
import "velocity-animate/velocity.ui";
import { Components } from "@reactioncommerce/reaction-components";
import StarRating from "react-stars";

const buttonStyle = {
  border: "1px solid #5cde86",
  backgroundColor: "#5cde86",
  color: "#FFF",
  borderRadius: "0 2px 2px 0",
  fontSize: "14px",
  padding: ".5em"
};

class ProductReviewForm extends Component {
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
      productId: this.props.product._id,
      userId: this.props.currentUser._id
    };
    Meteor.call("reviews/add", data, (error) => {
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
            label="Add your review for this product"
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
            style={buttonStyle}
            title="Submitting a new review or rating will replace your previous one"
            label="Submit review"
            onClick={this.handleFormSubmission}
          />
        </div>
      );
  }
}

ProductReviewForm.propTypes = {
  currentAccount: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  currentUser: PropTypes.shape({ _id: PropTypes.string }),
  isAdmin: PropTypes.bool,
  product: PropTypes.shape({ _id: PropTypes.string })
};

export default ProductReviewForm;
