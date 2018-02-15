import React, { Component } from "react";

// Components
import ProductLinks from "./ListItems";
import Carousel from "./Carousel";
import Sidebar from "./Sidebar";
import categories from "./categories";

export default class PhysicalProducts extends Component {
  render() {
    const { women, men, watches, toys, computers, electronics, phones, shoes } = categories;
    return (
      <div>
        <section className="row bg-white ">
          <div className="col-lg-2 col-md-3 col-xs-12 col-sm-3 p-10">
            <div className="list-group">
              <a className="list-group-item header">Categories</a>
              <a
                className="list-group-item group-header"
                role="button"
                data-toggle="collapse"
                href="#women"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                <i className="fa fa-chevron-circle-right " aria-hidden="true" /> Women’s Clothing
              </a>
              <div className="collapse ml-10 list-group" id="women">
                <ProductLinks subtitles={women} />
              </div>
              <a
                className="list-group-item group-header"
                role="button"
                data-toggle="collapse"
                href="#men"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                <i className="fa fa-chevron-circle-right " aria-hidden="true" /> Men’s Clothing
              </a>
              <div className="collapse ml-10 list-group" id="men">
                <ProductLinks subtitles={men} />
              </div>
              <a
                className="list-group-item group-header"
                role="button"
                data-toggle="collapse"
                href="#phones"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                <i className="fa fa-chevron-circle-right " aria-hidden="true" /> Phones & Accessories
              </a>
              <div className="collapse ml-10 list-group" id="phones">
                <ProductLinks subtitles={phones} />
              </div>
              <a
                className="list-group-item group-header"
                role="button"
                data-toggle="collapse"
                href="#computers"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                <i className="fa fa-chevron-circle-right " aria-hidden="true" /> Computers
              </a>
              <div className="collapse ml-10 list-group" id="computers">
                <ProductLinks subtitles={computers} />
              </div>
              <a
                className="list-group-item group-header"
                role="button"
                data-toggle="collapse"
                href="#electronics"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                <i className="fa fa-chevron-circle-right " aria-hidden="true" /> Electronics
              </a>
              <div className="collapse ml-10 list-group" id="electronics">
                <ProductLinks subtitles={electronics} />
              </div>
              <a
                className="list-group-item group-header"
                role="button"
                data-toggle="collapse"
                href="#watch"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                <i className="fa fa-chevron-circle-right " aria-hidden="true" /> Jewelry & Watches
              </a>
              <div className="collapse ml-10 list-group" id="watch">
                <ProductLinks subtitles={watches} />
              </div>
              <a
                className="list-group-item group-header"
                role="button"
                data-toggle="collapse"
                href="#shoes"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                <i className="fa fa-chevron-circle-right " aria-hidden="true" /> Bags & Shoes
              </a>
              <div className="collapse ml-10 list-group" id="shoes">
                <ProductLinks subtitles={shoes} />
              </div>
              <a
                className="list-group-item group-header"
                role="button"
                data-toggle="collapse"
                href="#toys"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                <i className="fa fa-chevron-circle-right " aria-hidden="true" /> Toys, Kids & Baby
              </a>
              <div className="collapse ml-10 list-group" id="toys">
                <ProductLinks subtitles={toys} />
              </div>
            </div>
          </div>
          <div className="col-lg-10 col-md-9 col-sm-9 col-xs-9">
            <Carousel />
            <Sidebar display={"watches"} />
            <Sidebar display={"snickers"} />
          </div>
        </section>
      </div>
    );
  }
}
