import React from "react";
import { Router } from "/client/api";

const Carousel = () => {
  return (
    <div className="col-lg-9 p-10 categories col-md-9 hidden-xs">
      <div id="ProductCarousel" className="carousel slide carousel-size" data-ride="carousel">
        <ol className="carousel-indicators custom-carousel-indicators">
          <li data-target="#ProductCarousel" data-slide-to="0" className="active" />
          <li data-target="#ProductCarousel" data-slide-to="1" />
          <li data-target="#ProductCarousel" data-slide-to="2" />
          <li data-target="#ProductCarousel" data-slide-to="3" />
        </ol>

        <div className="carousel-inner text-left category-caption" role="listbox">
          <div className="item active">
            <img src="resources/img/lando-banner.jpg" alt="firstImage" />
            <div className="carousel-caption">
              <div className="custom-caption">
                <h3 className="mb-10 red-bg">New Arrivals</h3>
                <a
                  onClick={e => {
                    e.preventDefault();
                    Router.go("/category/shoes");
                  }}
                  className="slider-btn hvr-icon-wobble-horizontal bold"
                >
                  Shop Now &nbsp;
                </a>
              </div>
            </div>
          </div>
          <div className="item">
            <img src="resources/img/banner-60.jpg" alt="secondImg" />
            <div className="carousel-caption">
              <div className="custom-caption">
                <h3 className="mb-10">Perfect combo</h3>
                <h5 className="mt-20 mb-20">
                  It's all about
                  <span className="orange-bg">Your Style</span>
                </h5>
                <a
                  onClick={e => {
                    e.preventDefault();
                    Router.go("/category/jeans");
                  }}
                  className="slider-btn hvr-icon-wobble-horizontal bold"
                >
                  Shop Now &nbsp;
                </a>
              </div>
            </div>
          </div>
          <div className="item">
            <img src="resources/img/filament-moose-spring-2017-web-site-banner_2048x.jpg" alt="secondImg" />
            <div className="carousel-caption">
              <div className="custom-caption">
                <h3 className="mb-10">Snickers</h3>
                <h5 className="mt-20 mb-20">
                  <span className="orange-bg">Get the best for less</span>
                </h5>
                <a
                  onClick={e => {
                    e.preventDefault();
                    Router.go("/category/snickers");
                  }}
                  className="slider-btn hvr-icon-wobble-horizontal bold"
                >
                  Shop Now &nbsp;
                </a>
              </div>
            </div>
          </div>
          <div className="item">
            <img src="resources/img/bags_banner.jpg" alt="secondImg" />
            <div className="carousel-caption">
              <div className="custom-caption">
                <h3 className="mb-20">
                  Elegant as <span className="red-bg">YOU</span>
                </h3>
                <a
                  onClick={e => {
                    e.preventDefault();
                    Router.go("/category/bags");
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
};

export default Carousel;
