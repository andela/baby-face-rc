import React, { Component } from "react";
import { registerComponent } from "@reactioncommerce/reaction-components";

// Components
import Carousel from "./Carousel";

// Stylesheets
import "../styles/css/hover.css";
import "../styles/css/util.css";

export default class LeadCarousel extends Component {
  render() {
    return (
      <div>
        <Carousel />
      </div>
    );
  }
}

registerComponent("LeadCarousel", LeadCarousel);
