import React, { Component } from "react";
import { registerComponent } from "@reactioncommerce/reaction-components";

// Components
import PhysicalProducts from "./PhysicalProducts";
import DigitalProducts from "./DigitalProducts";

export default class ProductCategory extends Component {
  render() {
    return (
      <div>
        <PhysicalProducts />
        <DigitalProducts />
      </div>
    );
  }
}

registerComponent("ProductCategory", ProductCategory);
