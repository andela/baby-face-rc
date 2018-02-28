import React, { Component } from "react";
import { registerComponent } from "@reactioncommerce/reaction-components";
import { Reaction } from "/client/api";
import takeTour from "/imports/plugins/custom/onboarding";

// Components
import Carousel from "./Carousel";

// Stylesheets
import "../styles/css/hover.css";
import "../styles/css/util.css";

export default class LeadCarousel extends Component {
  componentDidMount() {
    const hasOnboardedUser = localStorage.getItem("hasOnboardedUser");
    const hasOnboardedAdmin = localStorage.getItem("hasOnboardedAdmin");

    if (!hasOnboardedUser) {
      takeTour();
      localStorage.setItem("hasOnboardedUser", true);
    }
    if (!hasOnboardedAdmin && Reaction.hasPermission("admin")) {
      takeTour();
      localStorage.setItem("hasOnboardedAdmin", true);
    }
  }
  render() {
    return (
      <div>
        <Carousel />
      </div>
    );
  }
}

registerComponent("LeadCarousel", LeadCarousel);
