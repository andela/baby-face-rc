import React from "react";
import { Router } from "/client/api";

const Sidebar = ({ display }) => {
  return (
    <div className="col-lg-3 col-md-3 p-0 m-0 mt-10 hidden-sm hidden-xs categories-sm">
      <div className="side-bar-sm-top">
        <div className="side-bar-detail">
          <div className="side-bar-text">
            <h3 className="white-bg text-capitalize">{display}</h3>
            <a
              onClick={e => {
                e.preventDefault();
                Router.go(`/category/${display}`);
              }}
              className="slider-btn hvr-icon-wobble-horizontal"
            >
              Shop Now &nbsp;
            </a>
          </div>
          <img src={`resources/img/${display}.jpg`} alt={display} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
