import React from "react";
import { registerComponent, composeWithTracker, Components } from "@reactioncommerce/reaction-components";
import { Router } from "/client/api";
import { Reaction } from "/client/api";
import ProductsComponent from "../../../../included/product-variant/components/products";
import { productComponentWrapper } from "../../../../included/product-variant/containers/productsContainer";
import productComposer from "./ProductComposer";

const CategoryPage = props => {
  const { category } = Router.current().params;
  const ProductsItems = productComponentWrapper(ProductsComponent);
  return (
    <div className="container-fluid">
      <div className="container">
        <Components.Divider label={category} />
      </div>
      <ProductsItems {...props} />
    </div>
  );
};

function composer(props, onData) {
  const category = Reaction.Router.getParam("category");
  productComposer(props, onData, category);
}

registerComponent("CategoryPage", CategoryPage, composeWithTracker(composer));
export default composeWithTracker(composer)(CategoryPage);
