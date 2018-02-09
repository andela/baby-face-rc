import React, { Component } from "react";
import PropTypes from "prop-types";
import { Reaction } from "/client/api";
import { TextField, Button, IconButton, SortableTableLegacy } from "@reactioncommerce/reaction-ui";
import ProductGridContainer from "/imports/plugins/included/product-variant/containers/productGridContainer";
import { accountsTable } from "../helpers";

class SearchModal extends Component {
  static propTypes = {
    accounts: PropTypes.array,
    category: PropTypes.string,
    handleAccountClick: PropTypes.func,
    handleChange: PropTypes.func,
    handleClick: PropTypes.func,
    handlePriceFilter: PropTypes.func,
    handleSort: PropTypes.func,
    handleTagClick: PropTypes.func,
    handleToggle: PropTypes.func,
    handleVendorFilter: PropTypes.func,
    productVendors: PropTypes.array,
    products: PropTypes.array,
    siteName: PropTypes.string,
    tags: PropTypes.array,
    unmountMe: PropTypes.func,
    value: PropTypes.string
  }

  renderSearchInput() {
    return (
      <div className="rui search-modal-input">
        <label data-i18n="search.searchInputLabel">Search {this.props.siteName}</label>
        <i className="fa fa-search search-icon" />
        <TextField
          className="search-input"
          textFieldStyle={{ marginBottom: 0 }}
          onChange={this.props.handleChange}
          value={this.props.value}
        />
        <Button
          className="search-clear"
          i18nKeyLabel="search.clearSearch"
          label="Clear"
          containerStyle={{ fontWeight: "normal" }}
          onClick={this.props.handleClick}
        />
      </div>
    );
  }

  renderSearchTypeToggle() {
    if (Reaction.hasPermission("admin")) {
      return (
        <div className="rui search-type-toggle">
          <div
            className="search-type-option search-type-active"
            data-i18n="search.searchTypeProducts"
            data-event-action="searchCollection"
            data-event-value="products"
            onClick={() => this.props.handleToggle("products")}
          >
            Products
          </div>
          {Reaction.hasPermission("accounts") &&
            <div
              className="search-type-option"
              data-i18n="search.searchTypeAccounts"
              data-event-action="searchCollection"
              data-event-value="accounts"
              onClick={() => this.props.handleToggle("accounts")}
            >
              Accounts
            </div>
          }
        </div>
      );
    }
  }

  renderProductSearchTags() {
    return (
      <div className="rui search-modal-tags-container">
        <p className="rui suggested-tags" data-i18n="search.suggestedTags">Suggested tags</p>
        <div className="rui search-tags">
          {this.props.tags.map((tag) => (
            <span
              className="rui search-tag"
              id={tag._id} key={tag._id}
              onClick={() => this.props.handleTagClick(tag._id)}
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    );
  }

  renderSortSelect(vendors) {
    return (
      <div className="rui search-modal-sort-filter-container">
        <div className="row">
          <div className="col-md-4 col-xs-12 select-field">
            <div>
              <label>Vendor:</label>
            </div>
            <div className="rui select" >
              <select
                id="category-filter"
                className="category-filter"
                value={this.props.category}
                onChange={() => this.props.handleVendorFilter("category-filter")}
              >
                <option value="all">All Vendors</option>
                {vendors && vendors.map((vendor, index) => (
                  <option key={index.toString()} value={vendor}>{vendor}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-4 col-xs-12 select-field" >
            <div>
              <label>Price:</label>
            </div>
            <div className="rui select" >
              <select
                id="price-filter"
                className="price-filter"
                onChange={() => this.props.handlePriceFilter("price-filter")}
              >
                <option value="all">All Prices</option>
                <option value="0-4999.99">0 - 4999.99</option>
                <option value="5000-9999.99">5000 - 9999.99</option>
                <option value="10000-19999.99">10000 - 19999.99</option>
                <option value="20000-49999.99">20000 - 49999.99</option>
                <option value="50000-79999.99">50000 - 79999.99</option>
                <option value="80000-99999.99">80000 - 99999.99</option>
                <option value="100000-above">100000 and Above</option>
              </select>
            </div>
          </div>
          <div className="col-md-4 col-xs-12 select-field">
            <div>
              <label>Sort By:</label>
            </div>
            <div className="rui select" >
              <select
                id="sort-result"
                className="sort-result"
                onChange={() => this.props.handleSort("sort-result")}
              >
                <option value="relevance">Relevance</option>
                <option value="lowest">Price: Low to High</option>
                <option value="highest">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="rui search-modal-close"><IconButton icon="fa fa-times" onClick={this.props.unmountMe} /></div>
        <div className="rui search-modal-header">
          {this.renderSearchInput()}
          {this.renderSearchTypeToggle()}
          {this.props.tags.length > 0 && this.renderProductSearchTags()}
        </div>
        <div className="container">
          {this.renderSortSelect(this.props.productVendors)}
          {this.props.value.length > 1 && this.props.products.length < 1 &&
            <h4 className="search-info">
              <strong>{`No match found for "${this.props.value}", Please try again`}</strong>
            </h4>}
        </div>
        <div className="rui search-modal-results-container">
          {this.props.products.length > 0 &&
            <ProductGridContainer
              products={this.props.products}
              unmountMe={this.props.unmountMe}
              isSearch={true}
            />
          }
          {this.props.accounts.length > 0 &&
            <div className="data-table">
              <div className="table-responsive">
                <SortableTableLegacy
                  data={this.props.accounts}
                  columns={accountsTable()}
                  onRowClick={this.props.handleAccountClick}
                />
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default SearchModal;
