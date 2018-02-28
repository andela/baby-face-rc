import React, { Component } from "react";
import PropTypes from "prop-types";
import { Components } from "@reactioncommerce/reaction-components";
import { Meteor } from "meteor/meteor";
import takeTour from "/imports/plugins/custom/onboarding";

// TODO: Delete this, and do it the react way - Mike M.
async function openSearchModalLegacy(props) {
  if (Meteor.isClient) {
    const { Blaze } = await import("meteor/blaze");
    const { Template } = await import("meteor/templating");
    const { $ } = await import("meteor/jquery");

    const searchTemplate = Template[props.searchTemplate];

    Blaze.renderWithData(searchTemplate, {}, $("html").get(0));

    $("body").css("overflow", "hidden");
    $("#search-input").focus();
  }
}

class NavBar extends Component {
  static propTypes = {
    brandMedia: PropTypes.object,
    hasProperPermission: PropTypes.bool,
    searchEnabled: PropTypes.bool,
    shop: PropTypes.object
  }

  state = {
    navBarVisible: false
  }

  toggleNavbarVisibility = () => {
    const isVisible = this.state.navBarVisible;
    this.setState({ navBarVisible: !isVisible });
  }

  handleCloseNavbar = () => {
    this.setState({ navBarVisible: false });
  }

  handleOpenSearchModal = () => {
    openSearchModalLegacy(this.props);
  }

  handleStartOnboarding = () => {
    takeTour();
  }

  renderLanguage() {
    return (
      <div id="languages" className="languages hidden-xs text-white">
        <Components.LanguageDropdown />
      </div>
    );
  }

  renderCurrency() {
    return (
      <div id="currencies" className="currencies hidden-xs text-white">
        <Components.CurrencyDropdown />
      </div>
    );
  }

  renderBrand() {
    const shop = this.props.shop || { name: "" };
    const logo = this.props.brandMedia && this.props.brandMedia.url();

    return (
      <Components.Brand
        logo={logo}
        title={shop.name}
      />
    );
  }

  renderSearchButton() {
    if (this.props.searchEnabled) {
      return (
        <div id="search" className="search text-white">
          <Components.FlatButton
            icon="fa fa-search"
            kind="flat"
            onClick={this.handleOpenSearchModal}
          />
        </div>
      );
    }
  }

  renderTourButton() {
    return (
      <div id="take-tour">
        <Components.FlatButton
          label="Take Tour"
          kind="flat"
          onClick={this.handleStartOnboarding}
        />
      </div>
    );
  }

  renderNotificationIcon() {
    if (this.props.hasProperPermission) {
      return (
        <Components.Notification />
      );
    }
  }

  renderCartContainerAndPanel() {
    return (
      <div id="cart-container" className="cart-container">
        <div className="cart text-white">
          <Components.CartIcon />
        </div>
        <div className="cart-alert text-white">
          <Components.CartPanel />
        </div>
      </div>
    );
  }

  renderMainDropdown() {
    return (
      <div id="accounts">
        <Components.MainDropdown />
      </div>
    );
  }

  renderHamburgerButton() {
    return (
      <div className="showmenu text-white"><Components.Button icon="bars" onClick={this.toggleNavbarVisibility} /></div>
    );
  }


  renderTagNav() {
    return (
      <div className="menu">
        <Components.TagNav
          isVisible={this.state.navBarVisible}
          closeNavbar={this.handleCloseNavbar}
        >
          <Components.Brand />
        </Components.TagNav>
      </div>
    );
  }

  renderStaticPages() {
    return (
      <div id="static-pages">
        <Components.StaticPagesComponent />
      </div>
    );
  }

  render() {
    return (
      <div className="rui navbar">
        {this.renderHamburgerButton()}
        {this.renderBrand()}
        {this.renderTagNav()}
        {this.renderSearchButton()}
        {this.renderTourButton()}
        {this.renderNotificationIcon()}
        {this.renderLanguage()}
        {this.renderCurrency()}
        {this.renderStaticPages()}
        {this.renderMainDropdown()}
        {this.renderCartContainerAndPanel()}
      </div>
    );
  }
}

export default NavBar;
