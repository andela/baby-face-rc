import React, { Component } from "react";
import { registerComponent, composeWithTracker, Components } from "@reactioncommerce/reaction-components";
import { Router } from "/client/api";
import { Reaction } from "/client/api";

export default class ActionableAnalysis extends Component {
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
      </div>
    );
  }
}

registerComponent("ActionableAnalysis", ActionableAnalysis);
