import React, { Component } from "react";
import isEmpty from "lodash/isEmpty";
import { Meteor } from "meteor/meteor";
import * as Collections from "/lib/collections";
import { Components, composeWithTracker } from "@reactioncommerce/reaction-components";
import SearchModal from "../components/searchModal";

class SearchSubscription extends Component {
  render() {
    return (
      <SearchModal {...this.props}/>
    );
  }
}

function getSiteName() {
  const shop = Collections.Shops.findOne();
  return typeof shop === "object" && shop.name ? shop.name : "";
}

function getProductHashtags(productResults) {
  const foundHashtags = {}; // Object to keep track of results for O(1) lookup
  return productResults.reduce((hashtags, product) => {
    if (Array.isArray(product.hashtags)) {
      product.hashtags.forEach((tag) => {
        // If we haven't added this tag yet, push it and add it to the foundHashtags dict
        if (!foundHashtags[tag]) {
          hashtags.push(tag);
          foundHashtags[tag] = true;
        }
      });
    }
    return hashtags;
  }, []);
}

function getProductsVendor(productResults) {
  const foundVendors = {};
  return productResults.reduce((vendors, product) => {
    if (product.vendor && !foundVendors[product.vendor]) {
      vendors.push(product.vendor);
      foundVendors[product.vendor] = true;
    }
    return vendors;
  }, []);
}

function composer(props, onData) {
  const searchResultsSubscription = Meteor.subscribe("SearchResults", props.searchCollection, props.value, props.facets);
  const shopMembersSubscription = Meteor.subscribe("ShopMembers");

  if (searchResultsSubscription.ready() && shopMembersSubscription.ready()) {
    const siteName = getSiteName();
    let productResults = [];
    let tagSearchResults = [];
    let accountResults = [];
    let filterKey = {};
    let minimumPriceFilterKey = {};
    let maximumPriceFilterKey = {};
    let productVendors = [];
    let vendorFilterKey = {};

    if (isEmpty(props.priceFilter) || (props.priceFilter.minimumValue === "all")) {
      minimumPriceFilterKey = {};
      maximumPriceFilterKey = {};
    } else if (props.priceFilter.maximumValue === "above") {
      minimumPriceFilterKey = {
        "price.max": { $gt: 100000 }
      };
    } else {
      minimumPriceFilterKey = {
        "price.min": { $gte: parseInt(props.priceFilter.minimumValue, 10) }
      };
      maximumPriceFilterKey = {
        "price.max": { $lte: parseInt(props.priceFilter.maximumValue, 10) + 1 }
      };
    }

    if ((props.vendorFilter !== null) && props.vendorFilter !== "all") {
      vendorFilterKey = {
        vendor: props.vendorFilter
      };
    }

    filterKey = {
      $and: [minimumPriceFilterKey, maximumPriceFilterKey, vendorFilterKey]
    };

    /*
    * Product Search
    */
    if (props.searchCollection === "products") {
      productResults = Collections.ProductSearch.find(filterKey, {
        sort: props.sortKey
      }).fetch();

      const productHashtags = getProductHashtags(productResults);
      tagSearchResults = Collections.Tags.find({
        _id: { $in: productHashtags }
      }).fetch();

      productVendors = getProductsVendor(productResults);
    }

    /*
      * Account Search
      */
    if (props.searchCollection === "accounts") {
      accountResults = Collections.AccountSearch.find().fetch();
    }

    onData(null, {
      siteName,
      products: productResults,
      accounts: accountResults,
      tags: tagSearchResults,
      productVendors
    });
  }
}

export default composeWithTracker(composer, Components.Loading)(SearchSubscription);
