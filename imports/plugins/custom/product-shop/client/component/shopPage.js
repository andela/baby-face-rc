import React from "react";
import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";
import { Components, composeWithTracker } from "@reactioncommerce/reaction-components";
import { Shops } from "/lib/collections";
import { Router } from "/client/api";
import ShopRating from "./shopRating";
import ShopReviewsList from "./shopReviewList";

const ShopPage = props => {
  return (
    <div className="shop-page">
      <h1 className="pdp header">{props.shop.name}</h1>
      <ShopRating />
      <Components.Divider label={`products sold by ${props.shop.name}`} />
      <Components.Products />
      <div className="container">
        <Components.ShopReviewForm />
        <ShopReviewsList />
      </div>
    </div>
  );
};

const composer = (props, onData) => {
  const shopId = Router.getParam("shopSlug");
  const subHandle = Meteor.subscribe("Shops", shopId);
  if (subHandle.ready()) {
    const shop = Shops.find({
      _id: shopId
    }, {
      fields: { name: 1 }
    }).fetch();
    onData(null, { shop: shop[0] });
  }
};

ShopPage.propTypes = {
  shop: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired
};

export default composeWithTracker(composer)(ShopPage);
