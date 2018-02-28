import React from "react";
import { Router } from "/client/api";

const Carousel = () => {
  return (
    <div className="col-lg-9 p-10 categories col-md-9 hidden-xs">
      <div id="ProductCarousel-digital" className="carousel slide carousel-size" data-ride="carousel">
        <ol className="carousel-indicators custom-carousel-indicators">
          <li data-target="#ProductCarousel-digital" data-slide-to="0" className="active" />
          <li data-target="#ProductCarousel-digital" data-slide-to="1" />
          <li data-target="#ProductCarousel-digital" data-slide-to="2" />
          <li data-target="#ProductCarousel-digital" data-slide-to="3" />
        </ol>

        <div className="carousel-inner text-left category-caption" role="listbox">
          <div className="item active">
            <img src="resources/img/audio-books-56a324b93df78cf7727c00f5.jpg" alt="firstImage" />
            <div className="carousel-caption">
              <div className="custom-caption">
                <h3 className="mt-20 mb-20">
                  Get quality
                  <span className="red-bg">e-Books</span>
                </h3>
                <a
                  onClick={e => {
                    e.preventDefault();
                    Router.go("/category/e-books");
                  }}
                  className="slider-btn hvr-icon-wobble-horizontal bold"
                >
                  Shop Now &nbsp;
                </a>
              </div>
            </div>
          </div>
          <div className="item">
            <img src="resources/img/phonDig.jpg" alt="secondImg" />
            <div className="carousel-caption">
              <div className="custom-caption">
                <h3 className="mb-10">Embrace the future</h3>
                <h5 className="mt-20 mb-20">
                  Go
                  <span className="orange-bg">Digital</span>
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
            <img src="resources/img/audiobook-narrator.jpg" alt="secondImg" />
            <div className="carousel-caption">
              <div className="custom-caption">
                <h3 className="mb-10">Go Digital</h3>
                <h5 className="mt-20 mb-20">
                  Get quality
                  <span className="orange-bg">Audio Books</span>
                </h5>
                <a
                  onClick={e => {
                    e.preventDefault();
                    Router.go("/category/audio books");
                  }}
                  className="slider-btn hvr-icon-wobble-horizontal bold"
                >
                  Shop Now &nbsp;
                </a>
              </div>
            </div>
          </div>
          <div className="item">
            <img src="resources/img/Photography-Camera-HD-Wallpaper1.jpg" alt="secondImg" />
            <div className="carousel-caption">
              <div className="custom-caption">
                <h3 className="mb-10">Life is Art</h3>
                <h5 className="mt-20 mb-20">
                  Buy quality
                  <span className="red-bg">Art</span> edifices
                </h5>
                <a
                  onClick={e => {
                    e.preventDefault();
                    Router.go("/category/photography");
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
