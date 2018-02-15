import React from "react";
import { Router } from "/client/api";

const ListItems = ({ subtitles }) => {
  return (
    <div>
      {subtitles.map(item => {
        return (
          <a
            onClick={e => {
              e.preventDefault();
              Router.go(`/category/${item.label}`);
            }}
            key={item.name}
            id={item.name}
            className="list-group-item text-capitalize"
          >
            <i className="fa fa-arrow-circle-right" aria-hidden="true" /> {item.name}
          </a>
        );
      })}
    </div>
  );
};

export default ListItems;
