import React, { Component } from "react";
import { compose } from "recompose";
import _ from "lodash";
import { Reaction } from "/client/api";
import { registerComponent } from "@reactioncommerce/reaction-components";
import SearchSubscription from "./searchSubscription";

function tagToggle(arr, val) {
  if (arr.length === _.pull(arr, val).length) {
    arr.push(val);
  }
  return arr;
}

const wrapComponent = (Comp) => (
  class SearchModalContainer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        collection: "products",
        value: localStorage.getItem("searchValue") || "",
        renderChild: true,
        facets: [],
        sortKey: {},
        priceFilter: {}
      };
    }

    componentDidMount() {
      document.addEventListener("keydown", this.handleKeyDown);
    }

    componentWillUnmount() {
      document.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown = (event) => {
      if (event.keyCode === 27) {
        this.setState({
          renderChild: false
        });
      }
    }

    handleChange = (event, value) => {
      localStorage.setItem("searchValue", value);

      this.setState({ value });
    }

    handleClick = () => {
      localStorage.setItem("searchValue", "");
      this.setState({ value: "" });
    }

    handleAccountClick = (event) => {
      Reaction.Router.go("account/profile", {}, { userId: event._id });
      this.handleChildUnmount();
    }

    handleTagClick = (tagId) => {
      const newFacet = tagId;
      const element = document.getElementById(tagId);
      element.classList.toggle("active-tag");

      this.setState({
        facets: tagToggle(this.state.facets, newFacet)
      });
    }

    handleToggle = (collection) => {
      this.setState({ collection });
    }

    handleChildUnmount = () =>  {
      this.setState({ renderChild: false });
    }

    handleSort = (id) => {
      const sortValue = document.getElementById(id).value;

      if (sortValue === "relevance") {
        this.setState(() => ({
          sortKey: {}
        }));
      } else if (sortValue === "lowest") {
        this.setState(() => ({
          sortKey: { "price.min": 1 }
        }));
      } else if (sortValue === "highest") {
        this.setState(() => ({
          sortKey: { "price.max": -1 }
        }));
      } else if (sortValue === "newest") {
        this.setState(() => ({
          sortKey: { createdAt: -1 }
        }));
      }
    }

    handlePriceFilter = (id) => {
      const priceFilterValue = document.getElementById(id).value;
      const priceArray = priceFilterValue.split("-");
      this.setState(() => ({
        priceFilter: {
          minimumValue: priceArray[0],
          maximumValue: priceArray[1]
        }
      }));
    }

    render() {
      return (
        <div>
          {this.state.renderChild ?
            <div className="rui search-modal js-search-modal">
              <Comp
                handleChange={this.handleChange}
                handleClick={this.handleClick}
                handleToggle={this.handleToggle}
                handleAccountClick={this.handleAccountClick}
                handleTagClick={this.handleTagClick}
                handleSort={this.handleSort}
                handlePriceFilter={this.handlePriceFilter}
                value={this.state.value}
                unmountMe={this.handleChildUnmount}
                searchCollection={this.state.collection}
                facets={this.state.facets}
                sortKey={this.state.sortKey}
                priceFilter={this.state.priceFilter}
              />
            </div> : null
          }
        </div>
      );
    }
  }
);

registerComponent("SearchSubscription", SearchSubscription, [ wrapComponent ]);

export default compose(wrapComponent)(SearchSubscription);
