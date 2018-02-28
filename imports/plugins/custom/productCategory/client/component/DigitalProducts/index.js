import React, { Component } from "react";
import { Router } from "/client/api";

// Components
import ListItems from "./ListItems";
import Carousel from "./carousel";

export default class DigitalProducts extends Component {
  render() {
    return (
      <section className="row bg-white mb-11">
        <ListItems />
        <div className="col-lg-10 col-md-9 col-sm-9 col-xs-9">
          <Carousel />
          <div className="col-lg-3 col-md-3 p-0 m-0 mt-10 hidden-sm hidden-xs categories-sm">
            <div className="side-bar-sm-top">
              <div className="side-bar-detail">
                <div className="side-bar-text">
                  <h3 className="white-bg">Music Albums</h3>
                  <a
                    onClick={e => {
                      e.preventDefault();
                      Router.go("/category/music albums");
                    }}
                    className="slider-btn hvr-icon-wobble-horizontal bold"
                  >
                    Shop Now &nbsp;
                  </a>
                </div>
                <img src="resources/img/albums.png" alt="albums" />
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 p-0 m-0 mt-10 hidden-sm hidden-xs categories-sm">
            <div className="side-bar-sm-top">
              <div className="side-bar-detail">
                <div className="side-bar-text">
                  <h3 className="white-bg">Blueprints</h3>
                  <a
                    onClick={e => {
                      e.preventDefault();
                      Router.go("/category/blueprints");
                    }}
                    className="slider-btn hvr-icon-wobble-horizontal bold"
                  >
                    Shop Now &nbsp;
                  </a>
                </div>
                <img src="resources/img/blueprint.png" alt="albums" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
