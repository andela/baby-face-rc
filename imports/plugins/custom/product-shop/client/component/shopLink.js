import React from "react";
import { Meteor } from "meteor/meteor";
import { composeWithTracker } from "@reactioncommerce/reaction-components";
import { Shops } from "/lib/collections";
import { Router } from "/client/api";
import PropTypes from "prop-types";
import "../index.less";

const ShopLink = props => {
  return (
    <p className="shop-link">
      Sold by&nbsp;
      <a
        className="shop-link"
        onClick={() => Router.go(`/shops/${props.shop._id}`)}
      >
        {props.shop.name}
      </a>
    </p>
  );
};

export function composer(props, onData) {
  const subHandle = Meteor.subscribe("Shops", props.product.shopId);
  if (subHandle.ready()) {
    const shop = Shops.find({
      _id: props.product.shopId
    }, {
      fields: { name: 1 }
    }).fetch();
    onData(null, { shop: shop[0] });
  }
}

ShopLink.propTypes = {
  shop: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
};

export default composeWithTracker(composer)(ShopLink);
