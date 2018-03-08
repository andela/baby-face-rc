import { Template } from "meteor/templating";
import ActionableAnalyticsContainer from "../container/index";
// import "./actionableAnalytics.html";

// Template.actionableAnalytics.onCreated(function () {});

Template.actionableAnalytics.helpers({
  ActionableAnalytics() {
    return {
      component: ActionableAnalyticsContainer
    };
  }
});
