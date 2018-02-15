import React, { Component } from "react";
import { Router } from "/client/api";

export default class Carousel extends Component {
  // recommendations, make the images load from the server
  render() {
    return (
      <div>
        <div id="carousel" className="carousel slide carousel-size" data-ride="carousel">
          <ol className="carousel-indicators custom-carousel-indicators">
            <li data-target="#carousel" data-slide-to="0" className="active" />
            <li data-target="#carousel" data-slide-to="1" />
            <li data-target="#carousel" data-slide-to="2" />
            <li data-target="#carousel" data-slide-to="3" />
          </ol>

          <div className="carousel-inner text-left" role="listbox">
            <div className="item active">
              <img src="resources/img/slider6.jpg" alt="firstImage" />
              <div className="carousel-caption ">
                <div className="custom-caption">
                  <h3 className="mb-10">Love birds?</h3>
                  <h5 className="mt-20 mb-20">
                    <span className="red-bg">This Valentine</span> shop for two
                  </h5>
                  <a
                    onClick={e => {
                      e.preventDefault();
                      Router.go("/category/others");
                    }}
                    className="slider-btn hvr-icon-wobble-horizontal bold"
                  >
                    Shop Now &nbsp;
                  </a>
                </div>
              </div>
            </div>
            <div className="item">
              <img src="resources/img/carousel-women.jpg" alt="secondImg" />
              <div className="carousel-caption">
                <div className="custom-caption">
                  <h3 className="mb-10">Stay Classy</h3>
                  <h5 className="mt-20 mb-20">
                    It's all about
                    <span className="orange-bg">Your Style</span>
                  </h5>
                  <a
                    onClick={e => {
                      e.preventDefault();
                      Router.go("/category/women's clothings");
                    }}
                    className="slider-btn hvr-icon-wobble-horizontal bold"
                  >
                    Shop Now &nbsp;
                  </a>
                </div>
              </div>
            </div>
            <div className="item">
              <img src="resources/img/slide3.jpg" alt="secondImg" />
              <div className="carousel-caption">
                <div className="custom-caption">
                  <h3 className="mb-10">Casuals</h3>
                  <h5 className="mt-20 mb-20">
                    <span className="orange-bg">Get the Best casual wears</span>
                  </h5>
                  <a
                    onClick={e => {
                      e.preventDefault();
                      Router.go("/category/others");
                    }}
                    className="slider-btn hvr-icon-wobble-horizontal bold"
                  >
                    Shop Now &nbsp;
                  </a>
                </div>
              </div>
            </div>
            <div className="item">
              <img src="resources/img/lg-smartphones-banner_V30_G6_Q6_D.jpg" alt="secondImg" />
              <div className="carousel-caption">
                <div className="custom-caption">
                  <h3 className="mb-10">Phones</h3>
                  <h5 className="mt-20 mb-20">
                    Get
                    <span className="red-bg">Best</span> Mobile Deals
                  </h5>
                  <a
                    onClick={e => {
                      e.preventDefault();
                      Router.go("/category/phones");
                    }}
                    className="slider-btn hvr-icon-wobble-horizontal bold"
                  >
                    Shop Now &nbsp;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
